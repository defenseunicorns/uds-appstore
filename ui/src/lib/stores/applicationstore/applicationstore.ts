import { type Application } from '$lib/types';
import { writable } from 'svelte/store';

// Initial state
const initialState = {
	applications: new Map()
};

// Create a writable store
const { subscribe, set, update } = writable(initialState);

// Function to add or update an application
function addOrUpdateApplication(application: Application): void {
	update((state) => {
		state.applications.set(application.metadata.name, application);
		return state;
	});
}

// Function to get an application by name
function getApplicationByName(name: string): Application | undefined {
	let app: Application | undefined;
	subscribe((state) => {
		app = state.applications.get(name);
	})();
	return app;
}

// Function to get all applications
function getApplications(): Application[] {
	let apps: Application[] = [];
	subscribe((state) => {
		apps = Array.from(state.applications.values());
	})();
	return apps;
}

// Count the number of applications
function size(): number {
	let count = 0;
	subscribe((state) => {
		count = state.applications.size;
	})();
	return count;
}

// Function to clear the store
function clearStore(): void {
	set({
		applications: new Map()
	});
}

// Function to fetch and add applications to the store
async function fetchCatalog(): Promise<void> {
	try {
		const response = await fetch('/api/apps/index.json');
		if (response.ok) {
			const catalog: Application[] = await response.json();
			catalog.forEach((app) => addOrUpdateApplication(app));
		} else {
			throw new Error(`Failed to fetch resource: ${response.statusText}`);
		}
	} catch (e) {
		console.error('Error fetching catalog:', e);
	}
}

export const applicationsStore = {
	subscribe,
	addOrUpdateApplication,
	getApplicationByName,
	getApplications,
	size,
	clearStore,
	fetchCatalog // Export the fetchCatalog function
};
