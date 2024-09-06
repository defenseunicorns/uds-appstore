// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2024-Present The UDS Authors

import type { Application } from '$lib/types';
import MiniSearch from 'minisearch';
import { writable } from 'svelte/store';

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
}

export type SelectedFilters = Map<string, string[]>;

// Create a writable store
export const catalog = writable<CatalogStore>({
	loading: false,
	error: undefined,
	appMap: new Map(),
	filteredApplications: []
});

// Create a miniSearch instance
export const miniSearch = new MiniSearch({
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
	extractField: (application: Application, fieldName: string): string => {
		const getValue = (obj: Application, path: string[]): Application => {
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
	},
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

export function search(query: string): Application[] {
	const results = miniSearch.search(query);
	const filteredResult: Application[] = [];
	catalog.subscribe((catalog: CatalogStore) => {
		results.forEach((result) => {
			const application = catalog.appMap.get(result.id);
			if (application) {
				filteredResult.push(application);
			}
		});
	})();
	return filteredResult;
}

export function getApplications(): Application[] {
	let applications: Application[] = [];
	catalog.subscribe((catalog: CatalogStore) => {
		applications = Array.from(catalog.appMap.values());
	})();
	return applications;
}

export function getAppByName(name: string): Application | undefined {
	let application: Application | undefined;
	catalog.subscribe((catalog: CatalogStore) => {
		application = catalog.appMap.get(name);
	})();
	return application;
}

export function getCatalog(): Map<string, Application> {
	let appMap: Map<string, Application> = new Map();
	catalog.subscribe((catalog: CatalogStore) => {
		appMap = catalog.appMap;
	})();
	return appMap;
}

export function populateCatalog(applications: Application[]): void {
	catalog.update((catalog: CatalogStore) => {
		catalog.filteredApplications = applications;
		catalog.appMap.clear();
		applications.forEach((application) => {
			if (application.metadata && application.metadata.name) {
				catalog.appMap.set(application.metadata.name, application);
			}
		});
		return catalog;
	});
}

export function filterApplications(selectedFilters: SelectedFilters) {
	const applications: Application[] = getApplications();
	const filteredApplications: Application[] = [];
	const hasFilters = Array.from(selectedFilters.values()).some((values) => values.length > 0);

	if (!hasFilters) {
		catalog.update((catalog: CatalogStore) => {
			catalog.filteredApplications = applications;
			return catalog;
		});
		return;
	}

	for (const [field, values] of selectedFilters.entries()) {
		if (values.length === 0) {
			continue;
		}
		const results = miniSearch.search(values.join(','), {
			prefix: true,
			combineWith: 'and',
			fields: [field]
		});
		console.log('results', results);
		results.forEach((result) => {
			const application = getAppByName(result.id);
			if (application) {
				filteredApplications.push(application);
			}
		});
	}

	catalog.update((catalog: CatalogStore) => {
		catalog.filteredApplications = filteredApplications;
		return catalog;
	});
}
// Function to fetch and add applications to the store
export async function fetchCatalog(): Promise<void> {
	catalog.update((catalog: CatalogStore) => {
		catalog.loading = true;
		catalog.error = undefined;
		return catalog;
	});

	try {
		const response = await fetch('/api/apps/index.json');
		if (response.ok) {
			const applications: Application[] = await response.json();
			populateCatalog(applications);
			miniSearch.addAll(applications);
		} else {
			throw new Error(`Failed to fetch applications: ${response.statusText}`);
		}
	} catch (e) {
		catalog.update((catalog: CatalogStore) => {
			catalog.error = e instanceof Error ? e.message : 'An unknown error occurred';
			return catalog;
		});
	} finally {
		catalog.update((catalog: CatalogStore) => {
			catalog.loading = false;
			return catalog;
		});
	}
}
