// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2024-Present The UDS Authors

package api

import (
	"net/http"
	"strings"

	"github.com/coreos/go-semver/semver"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"

	"github.com/jmoiron/sqlx"
	"github.com/jmoiron/sqlx/reflectx"
	_ "github.com/mattn/go-sqlite3"
)

type Api struct {
	db *sqlx.DB
}

func NewRouter(db *sqlx.DB) chi.Router {
	db.Mapper = reflectx.NewMapperFunc("json", strings.ToLower)

	api := &Api{
		db: db,
	}

	r := chi.NewRouter()

	r.Get("/apps", api.GetApps)
	r.Get("/apps/{name}", api.GetApp)
	r.Get("/apps/{name}/flavors", api.GetAppFlavors)

	return r
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

type AppFlavors map[string]ReportByPackage

func (api *Api) GetAppFlavors(w http.ResponseWriter, r *http.Request) {
	name := chi.URLParam(r, "name")
	reports := []ReportByPackage{}

	if err := api.db.Select(&reports, `select * from report_by_package where application_name=$1`, name); err != nil {
		render.Render(w, r, ErrRender(err))
		return
	}

	flavors := make(AppFlavors)

	for _, r := range reports {
		version := semver.New(r.PackageTag)
		flavor := r.PackageTag[strings.LastIndex(r.PackageTag, "-")+1:]

		if found, ok := flavors[flavor]; ok {
			if semver.New(found.PackageTag).LessThan(*version) {
				flavors[flavor] = r
			}
		} else {
			flavors[flavor] = r
		}
	}

	render.JSON(w, r, flavors)
}
