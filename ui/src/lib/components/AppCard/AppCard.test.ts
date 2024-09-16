// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2024-present The UDS Authors
import type { Application } from '$lib/types';
import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import AppCard from './AppCard.svelte';

describe('AppCard', () => {
	const mockApp: Application = {
		metadata: {
			name: 'Test App'
		},
		spec: {
			vendor: {
				name: 'Defense Unicorns',
				url: 'https://defenseunicorns.com/contactus'
			},
			description: 'This is a test description for the app.',
			icons: [{ src: 'test-icon.svg', type: 'test-type', size: 'test-size' }],
			repository: 'https://example.com/repo',
			links: [{ description: 'Test Link', url: 'https://example.com' }],
			versions: ['1.0.0']
		}
	} as unknown as Application;

	it('renders the app name', () => {
		render(AppCard, { props: { app: mockApp } });
		expect(screen.getByText('Test App')).toBeTruthy();
	});

	it('renders the app icon', () => {
		render(AppCard, { props: { app: mockApp } });
		const icon = screen.getByAltText('App Icon') as HTMLImageElement;
		expect(icon).toBeTruthy();
		expect(icon.src).toContain('test-icon.svg');
	});

	it('renders the app description', () => {
		render(AppCard, { props: { app: mockApp } });
		expect(screen.getByText('This is a test description for the app.')).toBeTruthy();
	});

	it('truncates long descriptions', () => {
		const longDescApp = {
			...mockApp,
			spec: {
				...mockApp.spec,
				description: 'A'.repeat(200)
			}
		};
		render(AppCard, { props: { app: longDescApp } });
		const description = screen.getByText(/A+\.\.\./);
		expect(description.textContent?.length).toBe(153); // 150 chars + '...'
	});

	it('displays "No description available" when no description is provided', () => {
		const noDescApp: Application = {
			...mockApp,
			spec: {
				...mockApp.spec,
				description: undefined
			}
		} as unknown as Application;
		render(AppCard, { props: { app: noDescApp } });
		expect(screen.getByText('No description available')).toBeTruthy();
	});

	it('renders the "Learn More" button', () => {
		render(AppCard, { props: { app: mockApp } });
		expect(screen.getByText('Learn More')).toBeTruthy();
	});
});
