import { redirect, type Load } from '@sveltejs/kit';

export const load: Load = async ({ url }) => {
	if (url.pathname === '/') {
		throw redirect(307, '/apps');
	}
};
