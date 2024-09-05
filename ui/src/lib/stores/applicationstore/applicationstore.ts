// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2024-Present The UDS Authors

import {
	Architecture,
	Category,
	ImpactLevel,
	Infrastructure,
	PricingModel,
	type Application
} from '$lib/types';
import { writable } from 'svelte/store';

export type ApplicationStore = {
	applications: Map<string, Application>;
	unfilteredApplications: Application[];
	error: string | undefined;
	loading: boolean;
};

export type FilterMap = Map<string, string[]>;

// Initial state
const initialState = (): ApplicationStore => ({
	applications: new Map(),
	unfilteredApplications: [],
	error: undefined,
	loading: false
});

// Create a writable store
const store = writable<ApplicationStore>(initialState());
const { subscribe, set, update } = store;
export { subscribe };

// Function to add or update an application
export function addOrUpdateApplication(application: Application): void {
	update((state) => {
		if (application.metadata?.name) {
			if (!state.applications.has(application.metadata.name)) {
				state.unfilteredApplications.push(application);
			}
			state.applications.set(application.metadata.name, application);
		}
		return state;
	});
}

// Function to get an application by name
export function getApplicationByName(name: string): Application | undefined {
	let app: Application | undefined;
	store.subscribe((state) => {
		app = state.applications.get(name);
	})();
	return app;
}

function clearApplications(): void {
	update((state) => {
		state.applications = new Map();
		return state;
	});
}

// Function to get all applications
export function getApplications(): Application[] {
	let apps: Application[] = [];
	store.subscribe((state) => {
		apps = Array.from(state.applications.values());
	})();
	return apps;
}

// Count the number of applications
export function size(): number {
	let count = 0;
	store.subscribe((state) => {
		count = state.applications.size;
	})();
	return count;
}

// Function to get the error
export function getError(): string | undefined {
	let error: string | undefined;
	store.subscribe((state) => {
		error = state.error;
	})();
	return error;
}

// Function to clear the store
export function clearStore(): void {
	set(initialState());
}

export function getUnfilteredApplications(): Application[] {
	let apps: Application[] = [];
	store.subscribe((state) => {
		apps = state.unfilteredApplications;
	})();
	return apps;
}

export function filterApplications(filters: FilterMap): void {
	clearApplications();
	const hasFilters = Array.from(filters.values()).some((values) => values.length > 0);
	if (!hasFilters) {
		for (const app of getUnfilteredApplications()) {
			addOrUpdateApplication(app);
		}
		return;
	}
	for (const app of getUnfilteredApplications()) {
		if (!app.spec) {
			continue;
		}
		for (const [field, values] of filters) {
			if (values.length === 0) {
				continue;
			}
			switch (field) {
				case 'categories':
					if (values.some((value) => app.spec?.categories?.includes(value as Category))) {
						addOrUpdateApplication(app);
					}
					break;
				case 'pricingModel':
					if (values.some((value) => app.spec?.pricingModel.includes(value as PricingModel))) {
						addOrUpdateApplication(app);
					}
					break;
				case 'impactLevel':
					if (
						values.some((value) => app.spec?.security?.impactLevel?.includes(value as ImpactLevel))
					) {
						addOrUpdateApplication(app);
					}
					break;
				case 'infrastructure':
					if (values.some((value) => app.spec?.infrastructure?.includes(value as Infrastructure))) {
						addOrUpdateApplication(app);
					}
					break;
				case 'architecture':
					if (values.some((value) => app.spec?.architecture?.includes(value as Architecture))) {
						addOrUpdateApplication(app);
					}
					break;
			}
		}
	}
}

export function clearFilteredApplications(): void {
	update((state) => {
		state.applications = new Map();
		return state;
	});
	for (const app of getUnfilteredApplications()) {
		addOrUpdateApplication(app);
	}
}

// Function to fetch and add applications to the store
export async function fetchCatalog(): Promise<void> {
	update((state) => {
		state.loading = true;
		return state;
	});
	try {
		const response = await fetch('/api/apps/index.json');
		if (response.ok) {
			const catalog: Application[] = await response.json();
			catalog.forEach((app) => addOrUpdateApplication(app));
			update((state) => {
				state.unfilteredApplications = catalog;
				state.error = initialState().error; // Clear any previous error
				return state;
			});
		} else {
			throw new Error(`Failed to fetch applications: ${response.statusText}`);
		}
	} catch (e) {
		update((state) => {
			state.error = e instanceof Error ? e.message : 'An unknown error occurred';
			return state;
		});
	} finally {
		update((state) => {
			state.loading = false;
			return state;
		});
	}
}
