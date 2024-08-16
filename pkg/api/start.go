// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2024-Present The UDS Authors

package api

import (
	"embed"
	"fmt"
	"io"
	"io/fs"
	"log"
	"net/http"

	"strings"

	"github.com/defenseunicorns/uds-marketplace/pkg/api/udsmiddleware"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

// @title UDS Marketplace API
// @version 0.0.1
// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html
// @BasePath /api/v1
// @schemes http https
func Start(assets embed.FS) error {
	r := chi.NewRouter()

	r.Use(udsmiddleware.ConditionalCompress)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	// ctx := context.Background()
	// cache, err := resources.NewCache(ctx)
	// if err != nil {
	// 	return fmt.Errorf("failed to create cache: %w", err)
	// }

	// Serve static files from embed.FS
	staticFS, err := fs.Sub(assets, "ui/build")
	if err != nil {
		return fmt.Errorf("failed to create static file system: %w", err)
	}

	if err := fileServer(r, http.FS(staticFS)); err != nil {
		return fmt.Errorf("failed to serve static files: %w", err)
	}

	log.Println("Starting server on :8080")
	//nolint:gosec
	if err := http.ListenAndServe(":8080", r); err != nil {
		return fmt.Errorf("server failed to start: %w", err)
	}

	return nil
}

func fileServer(r chi.Router, root http.FileSystem) error {
	// Load index.html content and modification time at startup
	f, err := root.Open("index.html")
	if err != nil {
		return err
	}
	defer f.Close()

	stat, err := f.Stat()
	if err != nil {
		return err
	}
	indexModTime := stat.ModTime()

	indexHTML, err := io.ReadAll(f)
	if err != nil {
		return err
	}

	fs := http.FileServer(root)

	r.Get("/*", func(w http.ResponseWriter, r *http.Request) {
		path := r.URL.Path
		file, err := root.Open(path)
		if err != nil {
			// If the file doesn't exist, serve the pre-loaded index.html
			w.Header().Set("Content-Type", "text/html; charset=utf-8")
			// Serve the index.html file with the pre-loaded content
			http.ServeContent(w, r, "index.html", indexModTime, strings.NewReader(string(indexHTML)))
			return
		}
		file.Close()

		// Serve static files for all other paths
		fs.ServeHTTP(w, r)
	})

	return nil
}
