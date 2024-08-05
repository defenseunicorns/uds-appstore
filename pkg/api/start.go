// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2024-Present The UDS Authors

package api

import (
	"bufio"
	"embed"
	"fmt"
	"io"
	"io/fs"
	"log"
	"net/http"
	"os"

	"strings"

	"github.com/defenseunicorns/uds-marketplace/pkg/api/udsmiddleware"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

// @title UDS Marketplace API
// @version 0.0.0
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
	// Parse redirects at startup
	redirects, err := parseRedirects(root)
	if err != nil {
		return fmt.Errorf("failed to parse redirects: %w", err)
	}

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

		redirect, ok := redirects[path]
		if ok {
			log.Printf("redirecting %s to %s with status %d", redirect.From, redirect.To, redirect.Status)
			http.Redirect(w, r, redirect.To, redirect.Status)
			return
		}

		// Serve static files for all other paths
		fs.ServeHTTP(w, r)
	})

	return nil
}

type redirect struct {
	From   string
	To     string
	Status int
}

// parseRedirects parses the _redirects file and returns a map of redirects
func parseRedirects(root http.FileSystem) (map[string]redirect, error) {
	redirects := make(map[string]redirect)

	file, err := root.Open("_redirects")
	if err != nil {
		if os.IsNotExist(err) {
			// If the file doesn't exist, return an empty map
			return redirects, nil
		}
		return nil, err
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue // Skip empty lines and comments
		}

		parts := strings.Fields(line)
		if len(parts) < 2 {
			return nil, fmt.Errorf("invalid redirect line: %s", line)
		}

		from, to := parts[0], parts[1]
		status := http.StatusFound // 302 by default

		if len(parts) > 2 {
			if parts[2] == "301" {
				status = http.StatusMovedPermanently
			} else if parts[2] == "307" {
				status = http.StatusTemporaryRedirect
			}
		}

		redirects[from] = redirect{From: from, To: to, Status: status}
	}

	if err := scanner.Err(); err != nil {
		return nil, fmt.Errorf("failed to parse redirects: %w", err)
	}

	return redirects, nil
}
