import type { LayoutLoad } from './$types';
import type { Application } from '$lib/types';

export const load: LayoutLoad = async ({ fetch }) => {
	const res = await fetch('/api/apps/index.json');
	const apps: Application[] = await res.json();

	return { apps };
};
