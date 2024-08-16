import { type Application } from '$lib/types';
import { writable } from 'svelte/store';

export type ApplicationStore = {
	applications: Map<string, Application>;
	error: string | undefined;
	loading: boolean;
};

// Initial state
const initialState = (): ApplicationStore => ({
	applications: new Map(),
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
		// TODO: use a unique identifier for the application?
		state.applications.set(application.metadata.name, application);
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
