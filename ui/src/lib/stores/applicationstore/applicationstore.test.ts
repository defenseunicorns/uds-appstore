// SPDX-License-Identifier: Apache-2.0
import { Architecture, Category, Infrastructure, type Application } from '$lib/types';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as applicationsStore from './applicationstore';

describe('applicationsStore', () => {
	const sampleApp: Application = {
		metadata: { name: 'app1' },
		spec: {
			title: 'App 1',
			description: 'This is app 1',
			vendor: { name: 'Vendor 1', url: 'https://vendor1.com' },
			categories: [Category.Security],
			infrastructure: [Infrastructure.OnPrem],
			architecture: [Architecture.Amd64]
		}
	} as Application;

	const anotherApp: Application = {
		metadata: { name: 'app2' },
		spec: {
			title: 'App 2',
			description: 'This is app 2',
			vendor: { name: 'Vendor 2', url: 'https://vendor2.com' },
			categories: [Category.Arcade],
			infrastructure: [Infrastructure.AWSGov],
			architecture: [Architecture.Arm64]
		}
	} as Application;

	beforeEach(() => {
		applicationsStore.catalog.set({
			loading: false,
			error: undefined,
			appMap: new Map(),
			filteredApplications: []
		});
		applicationsStore.miniSearch.removeAll();
	});

	it('should populate catalog and miniSearch', () => {
		applicationsStore.populateCatalog([sampleApp, anotherApp]);
		expect(applicationsStore.getApplications().length).toEqual(2);
		expect(applicationsStore.miniSearch.documentCount).toBe(2);
	});

	it('should get application by name', () => {
		applicationsStore.populateCatalog([sampleApp, anotherApp]);
		expect(applicationsStore.getAppByName('app1')).toEqual(sampleApp);
		expect(applicationsStore.getAppByName('nonexistent')).toBeUndefined();
	});

	it('should search applications', () => {
		applicationsStore.populateCatalog([sampleApp, anotherApp]);
		const nameSearch = applicationsStore.search('app1');
		const vendorSearch = applicationsStore.search('vendor 2');
		const typoSearch = applicationsStore.search('nonexistent');

		expect(nameSearch[0]).toStrictEqual(sampleApp);
		expect(vendorSearch[0]).toStrictEqual(anotherApp);
		expect(typoSearch.length).toBe(0);
	});

	it('should filter applications', () => {
		applicationsStore.populateCatalog([sampleApp, anotherApp]);
		const filters = new Map([
			['spec.categories', [Category.Security]],
			['spec.infrastructure', [Infrastructure.OnPrem]]
		]);
		applicationsStore.filterApplications(filters);
		let filteredApps: Application[] = [];
		applicationsStore.catalog.subscribe((catalog) => {
			filteredApps = catalog.filteredApplications;
		})();
		expect(filteredApps).toEqual([sampleApp]);
	});

	it('should fetch catalog', async () => {
		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => [sampleApp, anotherApp]
		});

		await applicationsStore.fetchCatalog();
		expect(applicationsStore.getApplications()).toEqual([sampleApp, anotherApp]);
		expect(applicationsStore.miniSearch.documentCount).toBe(2);
	});

	it('should handle fetch errors', async () => {
		global.fetch = vi.fn().mockResolvedValue({
			ok: false,
			statusText: 'Not Found'
		});

		await applicationsStore.fetchCatalog();
		let error: string | undefined;
		applicationsStore.catalog.subscribe((catalog) => {
			error = catalog.error;
		})();
		expect(error).toBe('Failed to fetch applications: Not Found');
	});
});
