// SPDX-License-Identifier: Apache-2.0
import {
	Architecture,
	Category,
	ImpactLevel,
	Infrastructure,
	PricingModel,
	type Application
} from '$lib/types';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as applicationsStore from './applicationstore';

describe('applicationsStore', () => {
	const sampleApp: Application = {
		metadata: { name: 'app1' },
		vendor: { name: 'vendorName', url: 'vendorUrl' }
		// ... other properties
	} as unknown as Application;

	const anotherApp: Application = {
		metadata: {
			name: 'app2',
			vendor: { name: 'vendorName', url: 'vendorUrl' }
		}
		// ... other properties
	} as unknown as Application;

	beforeEach(() => {
		applicationsStore.clearStore();
	});

	it('should add or update an application', () => {
		applicationsStore.addOrUpdateApplication(sampleApp);
		const app = applicationsStore.getApplicationByName('app1');
		expect(app).toEqual(sampleApp);
	});

	it('should get an application by name', () => {
		applicationsStore.addOrUpdateApplication(sampleApp);
		const app = applicationsStore.getApplicationByName('app1');
		expect(app).toEqual(sampleApp);
	});

	it('should return undefined for non-existent application', () => {
		const app = applicationsStore.getApplicationByName('nonExistentApp');
		expect(app).toBeUndefined();
	});

	it('should get all applications', () => {
		applicationsStore.addOrUpdateApplication(sampleApp);
		applicationsStore.addOrUpdateApplication(anotherApp);
		const apps = applicationsStore.getApplications();
		expect(apps).toEqual([sampleApp, anotherApp]);
	});

	it('should count the number of applications', () => {
		applicationsStore.addOrUpdateApplication(sampleApp);
		applicationsStore.addOrUpdateApplication(anotherApp);
		const count = applicationsStore.size();
		expect(count).toBe(2);
	});

	it('should clear the store', () => {
		applicationsStore.addOrUpdateApplication(sampleApp);
		applicationsStore.clearStore();
		const app = applicationsStore.getApplicationByName('app1');
		expect(app).toBeUndefined();
		const count = applicationsStore.size();
		expect(count).toBe(0);
	});

	it('should get the error', () => {
		const error = applicationsStore.getError();
		expect(error).toBeUndefined();
	});

	it('should get unfiltered applications', () => {
		applicationsStore.addOrUpdateApplication(sampleApp);
		applicationsStore.addOrUpdateApplication(anotherApp);
		const unfilteredApps = applicationsStore.getFilteredApplications();
		expect(unfilteredApps).toEqual([sampleApp, anotherApp]);
	});

	it('should filter applications', () => {
		const app1: Application = {
			...sampleApp,
			spec: {
				categories: [Category.AIMl],
				pricingModel: [PricingModel.Free],
				security: { impactLevel: [ImpactLevel.The2] },
				infrastructure: [Infrastructure.OnPrem],
				architecture: [Architecture.Amd64]
			}
		};
		const app2: Application = {
			...anotherApp,
			spec: {
				categories: [Category.Arcade],
				pricingModel: [PricingModel.BringYourOwnLicense],
				security: { impactLevel: [ImpactLevel.The4] },
				infrastructure: [Infrastructure.OnPrem],
				architecture: [Architecture.Amd64]
			}
		};

		applicationsStore.clearStore();
		applicationsStore.addOrUpdateApplication(app1);
		applicationsStore.addOrUpdateApplication(app2);

		const filters = new Map<string, string[]>([
			['categories', [Category.Arcade]],
			['pricingModel', [PricingModel.BringYourOwnLicense]]
		]);

		applicationsStore.filterApplications(filters);
		const filteredApps = applicationsStore.getApplications();
		expect(filteredApps).toEqual([app2]);
	});

	it('should clear filtered applications', () => {
		applicationsStore.addOrUpdateApplication(sampleApp);
		applicationsStore.addOrUpdateApplication(anotherApp);

		const filters = new Map<string, string[]>([['categories', [Category.Arcade]]]);
		applicationsStore.filterApplications(filters);

		applicationsStore.clearFilteredApplications();
		const apps = applicationsStore.getApplications();
		expect(apps).toEqual([sampleApp, anotherApp]);
	});

	it('should ');

	it('should fetch and add applications to the store', async () => {
		const mockFetch = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => [sampleApp, anotherApp]
		});
		global.fetch = mockFetch;

		await applicationsStore.fetchCatalog();
		const apps = applicationsStore.getApplications();
		expect(apps).toEqual([sampleApp, anotherApp]);
		expect(applicationsStore.getFilteredApplications()).toEqual([sampleApp, anotherApp]);
		expect(applicationsStore.getError()).toBeUndefined();
	});

	it('should handle fetch errors', async () => {
		const mockFetch = vi.fn().mockResolvedValue({
			ok: false,
			statusText: 'Not Found'
		});
		global.fetch = mockFetch;

		await applicationsStore.fetchCatalog();
		const error = applicationsStore.getError();
		expect(error).toBe('Failed to fetch applications: Not Found');
	});

	it('should search and set applications based on a query', () => {
		const app1: Application = {
			...sampleApp,
			metadata: { name: 'Test App 1' },
			spec: { description: 'This is a test application' }
		};
		const app2: Application = {
			...anotherApp,
			metadata: { name: 'Another App' },
			spec: { description: 'This is another application' }
		};

		applicationsStore.clearStore();
		applicationsStore.addOrUpdateApplication(app1);
		applicationsStore.addOrUpdateApplication(app2);

		applicationsStore.searchAndSetApps('test');
		const searchResults = applicationsStore.getApplications();
		expect(searchResults).toEqual([app1]);

		applicationsStore.searchAndSetApps('another');
		const anotherSearchResults = applicationsStore.getApplications();
		expect(anotherSearchResults).toEqual([app2]);

		applicationsStore.searchAndSetApps('application');
		const allResults = applicationsStore.getApplications();
		expect(allResults).toEqual([app1, app2]);

		applicationsStore.searchAndSetApps('nonexistent');
		const noResults = applicationsStore.getApplications();
		expect(noResults).toEqual([]);
	});

	it('should reset to all applications when search query is empty', () => {
		const app1: Application = {
			...sampleApp,
			metadata: { name: 'Test App 1' }
		};
		const app2: Application = {
			...anotherApp,
			metadata: { name: 'Another App' }
		};

		applicationsStore.clearStore();
		applicationsStore.addOrUpdateApplication(app1);
		applicationsStore.addOrUpdateApplication(app2);

		applicationsStore.searchAndSetApps('test');
		expect(applicationsStore.getApplications()).toEqual([app1]);

		applicationsStore.searchAndSetApps('');
		expect(applicationsStore.getApplications()).toEqual([app1, app2]);
	});

	it('should ');

	it('should fetch and add applications to the store', async () => {
		const mockFetch = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => [sampleApp, anotherApp]
		});
		global.fetch = mockFetch;

		await applicationsStore.fetchCatalog();
		const apps = applicationsStore.getApplications();
		expect(apps).toEqual([sampleApp, anotherApp]);
		expect(applicationsStore.getFilteredApplications()).toEqual([sampleApp, anotherApp]);
		expect(applicationsStore.getError()).toBeUndefined();
	});

	it('should handle fetch errors', async () => {
		const mockFetch = vi.fn().mockResolvedValue({
			ok: false,
			statusText: 'Not Found'
		});
		global.fetch = mockFetch;

		await applicationsStore.fetchCatalog();
		const error = applicationsStore.getError();
		expect(error).toBe('Failed to fetch applications: Not Found');
	});
});
