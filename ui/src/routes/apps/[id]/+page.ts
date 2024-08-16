import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ params }) => {
	const { id } = params;

	return { id };
};
