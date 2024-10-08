// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2024-Present The UDS Authors

import type { Application } from '$lib/types';
import MiniSearch from 'minisearch';
import { writable, type Writable } from 'svelte/store';
import { sortApplicationsAlphabetically } from '$lib/utils';

export interface Filter {
	values: string[];
	label: string;
	field: string;
}

export interface CatalogStore {
	loading: boolean;
	error: string | undefined;
	appMap: Map<string, Application>;
	filteredApplications: Application[];
	selectedFilters: SelectedFilters;
	searchQuery: string;
}

export type SelectedFilters = Map<string, string[]>;

function extractField(application: Application, fieldName: string): string {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const getValue = (obj: Application, path: string[]): any => {
		return path.reduce((acc, part) => acc && acc[part], obj);
	};

	const fieldPath = fieldName.split('.');
	const value = getValue(application, fieldPath);

	if (value === undefined || value === null) {
		return '';
	}

	if (Array.isArray(value)) {
		return value.join(', ');
	} else {
		return String(value);
	}
}

class ApplicationStore {
	private catalog: Writable<CatalogStore>;
	private miniSearch: MiniSearch;

	constructor() {
		this.catalog = writable<CatalogStore>({
			loading: false,
			error: undefined,
			appMap: new Map(),
			filteredApplications: [],
			selectedFilters: new Map(),
			searchQuery: ''
		});

		this.miniSearch = new MiniSearch({
			idField: 'metadata.name',
			fields: [
				'kind',
				'metadata.name',
				'spec.title',
				'spec.tagline',
				'spec.description',
				'spec.architecture',
				'spec.categories',
				'spec.contractingDetails.number',
				'spec.contractingDetails.pricingModel',
				'spec.contractingDetails.smallBusinessStatus',
				'spec.contractingDetails.vehicle',
				'spec.infrastructure',
				'spec.keywords',
				'spec.repository',
				'spec.security.impactLevel',
				'spec.vendor.name',
				'spec.vendor.url',
				'spec.versions'
			],
			extractField: extractField,
			searchOptions: {
				boost: {
					'spec.title': 2,
					'spec.tagline': 2,
					'spec.description': 2,
					'spec.categories': 2,
					'spec.vendor.name': 2
				}
			}
		});
	}

	private clearDocuments(): void {
		this.miniSearch.removeAll();
	}

	private populateDocuments(): void {
		this.clearDocuments();
		this.miniSearch.addAll(this.getApplications());
	}

	private search(): Application[] {
		const searchQuery = this.getSearchQuery();
		const results = this.miniSearch.search(searchQuery, {
			prefix: true,
			combineWith: 'and',
			fuzzy: true
		});
		let appMap: Map<string, Application> = new Map();
		this.catalog.subscribe((catalog: CatalogStore) => {
			appMap = catalog.appMap;
			return catalog;
		})();
		return results.map((result) => appMap.get(result.id)).filter(Boolean) as Application[];
	}

	public getSelectedFilters(): SelectedFilters {
		let selectedFilters: SelectedFilters = new Map();
		this.catalog.subscribe((catalog: CatalogStore) => {
			selectedFilters = catalog.selectedFilters;
			return catalog;
		})();
		return selectedFilters;
	}

	public getSearchQuery(): string {
		let searchQuery = '';
		this.catalog.subscribe((catalog: CatalogStore) => {
			searchQuery = catalog.searchQuery;
			return catalog;
		})();
		return searchQuery;
	}

	public setSelectedFilters(selectedFilters: SelectedFilters): void {
		this.catalog.subscribe((catalog: CatalogStore) => {
			catalog.selectedFilters = selectedFilters;
			return catalog;
		})();
	}

	public setSearchQuery(searchQuery: string): void {
		this.catalog.subscribe((catalog: CatalogStore) => {
			catalog.searchQuery = searchQuery;
			return catalog;
		})();
	}

	public getApplications(): Application[] {
		let applications: Application[] = [];
		this.catalog.subscribe((catalog: CatalogStore) => {
			applications = Array.from(catalog.appMap.values());
		})();
		return applications;
	}

	public getAppByName(name: string): Application | undefined {
		let application: Application | undefined;
		this.catalog.subscribe((catalog: CatalogStore) => {
			application = catalog.appMap.get(name);
		})();
		return application;
	}

	public getCatalog(): Map<string, Application> {
		let appMap: Map<string, Application> = new Map();
		this.catalog.subscribe((catalog: CatalogStore) => {
			appMap = catalog.appMap;
		})();
		return appMap;
	}

	public populateCatalog(applications: Application[]): void {
		this.catalog.update((catalog: CatalogStore) => {
			catalog.filteredApplications = applications;
			catalog.appMap.clear();
			applications.forEach((application) => {
				if (application.metadata && application.metadata.name) {
					catalog.appMap.set(application.metadata.name, application);
				}
			});
			return catalog;
		});
		this.populateDocuments();
	}

	public filterApplications(): void {
		const searchQuery = this.getSearchQuery();
		let searchResults: Application[] = [];
		if (searchQuery === '') {
			searchResults = this.getApplications();
		} else {
			searchResults = this.search();
			this.clearDocuments();
			this.miniSearch.addAll(searchResults);
		}
		const selectedFilters = this.getSelectedFilters();
		const hasFilters = Array.from(selectedFilters.values()).some((values) => values.length > 0);

		let filteredApplications: Application[];
		if (!hasFilters) {
			filteredApplications = sortApplicationsAlphabetically(searchResults);
		} else {
			const filteredMap = new Map();
			for (const [field, values] of selectedFilters.entries()) {
				if (values.length === 0) {
					continue;
				}
				const results = this.miniSearch.search(values.join(','), {
					prefix: true,
					combineWith: 'and',
					fields: [field]
				});
				results.forEach((result) => {
					const application = this.getAppByName(result.id);
					if (application && application.metadata && application.metadata.name) {
						filteredMap.set(application.metadata.name, application);
					}
				});
			}
			filteredApplications = Array.from(filteredMap.values());
		}

		this.catalog.update((catalog: CatalogStore) => {
			catalog.filteredApplications = filteredApplications;
			return catalog;
		});

		this.populateDocuments();
	}

	public async fetchCatalog(): Promise<void> {
		this.catalog.update((catalog: CatalogStore) => {
			catalog.loading = true;
			catalog.error = undefined;
			return catalog;
		});

		try {
			const response = await fetch('/api/apps/index.json');
			if (response.ok) {
				let applications: Application[] = await response.json();
				applications = sortApplicationsAlphabetically(applications);
				this.populateCatalog(applications);
			} else {
				throw new Error(`Failed to fetch applications: ${response.statusText}`);
			}
		} catch (e) {
			this.catalog.update((catalog: CatalogStore) => {
				catalog.error = e instanceof Error ? e.message : 'An unknown error occurred';
				return catalog;
			});
		} finally {
			this.catalog.update((catalog: CatalogStore) => {
				catalog.loading = false;
				return catalog;
			});
		}
	}

	public subscribe(callback: (value: CatalogStore) => void) {
		return this.catalog.subscribe(callback);
	}

	public update(callback: (value: CatalogStore) => CatalogStore) {
		this.catalog.update(callback);
	}
}

export const applicationStore = new ApplicationStore();
