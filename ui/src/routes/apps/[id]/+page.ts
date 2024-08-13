import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { Application } from '$lib/types';

export const load: PageLoad = async ({ fetch, params }) => {
  const res = await fetch('/api/apps/index.json');
	const apps: Application[] = await res.json();

  const app = apps.find(a => a.metadata.name === params.id);

  if (app !== undefined) {
    return { app };
  }

	error(404, 'Not found');
};
