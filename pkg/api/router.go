// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2024-Present The UDS Authors

package api

import (
	"net/http"
	"strings"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"

	"github.com/jmoiron/sqlx"
	"github.com/jmoiron/sqlx/reflectx"
	_ "github.com/mattn/go-sqlite3"
)

type Api struct {
	db *sqlx.DB
}

func NewRouter(db *sqlx.DB) (chi.Router, error) {
	db.Mapper = reflectx.NewMapperFunc("json", strings.ToLower)

	api := &Api{
		db: db,
	}

	r := chi.NewRouter()

	r.Get("/apps", api.GetApps)
	r.Get("/apps/:name", api.GetApp)

	return r, nil
}

func (api *Api) GetApps(w http.ResponseWriter, r *http.Request) {
	apps := []Application{}

	if err := api.db.Select(&apps, `select * from applications`); err != nil {
		render.Render(w, r, ErrInvalidRequest(err))
		return
	}

	render.JSON(w, r, apps)
}

func (api *Api) GetApp(w http.ResponseWriter, r *http.Request) {
	name := chi.URLParam(r, "name")
	app := Application{}

	if err := api.db.Get(&app, `select * from applications where name=$1`, name); err != nil {
		render.Render(w, r, ErrNotFound)
		return
	}

	render.JSON(w, r, app)
}
