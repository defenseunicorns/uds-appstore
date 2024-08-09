import type { Application } from '../../types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('/api/apps/index.json');
	const apps: Application[] = await res.json();

	return { apps };
};
