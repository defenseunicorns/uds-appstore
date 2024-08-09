import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	if (url.pathname === '/') {
		throw redirect(307, '/apps');
	}
};
