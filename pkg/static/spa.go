// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2024-Present The UDS Authors

package static

import (
	"net/http"
	"os"
)

// SinglePageAppHandler serves the requested filepath by default or `index.html`
// if it is not found.
func SinglePageAppHandler(assetPath string) http.HandlerFunc {
	assetDir := http.Dir(assetPath)
	staticServer := http.FileServer(assetDir)

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// check whether a file exists or is a directory at the given path
		fi, err := assetDir.Open(r.URL.Path)

		if err == nil {
			defer fi.Close()
		} else if os.IsNotExist(err) {
			// set cache control header to prevent caching
			// this is to prevent the browser from caching the index.html
			// and serving old build of SPA App
			w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")

			r.URL.Path = "/"
		}

		// set cache control header to serve file for a year
		// static files in this case need to be cache busted
		// (usualy by appending a hash to the filename)
		w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")

		// otherwise, use http.FileServer to serve the static file
		staticServer.ServeHTTP(w, r)
	})
}
