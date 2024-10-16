package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/defenseunicorns/uds-appstore/pkg/api"
	"github.com/defenseunicorns/uds-appstore/pkg/static"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/jmoiron/sqlx"
)

func main() {
	if err := Serve(); err != nil {
		log.Fatal(err, "failed to start the API server")
	}
}

func Serve() error {
	port := os.Getenv("PORT")
	assetDir := os.Getenv("UI_ASSETS_DIR")
	dbPath := os.Getenv("SEC_HUB_DB_DIR")

	r := chi.NewRouter()

	r.Use(middleware.Compress(5))
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	db, err := sqlx.Connect("sqlite3", filepath.Join(dbPath, "uds-security-hub.db"))
	if err != nil {
		return fmt.Errorf("failed to connect to database: %w", err)
	}

	r.Mount("/api", api.NewRouter(db))

	// Serve static files
	r.NotFound(static.SinglePageAppHandler(assetDir))

	log.Printf("Starting server on %s (assets=%s; db=%s)\n", port, assetDir, dbPath)
	if err := http.ListenAndServe(port, r); err != nil {
		return fmt.Errorf("server failed to start: %w", err)
	}

	return nil
}
