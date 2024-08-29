// SPDX-License-Identifier: Apache-2.0
import { type Application } from '$lib/types';
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

	it('should fetch and add applications to the store', async () => {
		const mockFetch = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => [sampleApp, anotherApp]
		});
		global.fetch = mockFetch;

		await applicationsStore.fetchCatalog();
		const apps = applicationsStore.getApplications();
		expect(apps).toEqual([sampleApp, anotherApp]);
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
