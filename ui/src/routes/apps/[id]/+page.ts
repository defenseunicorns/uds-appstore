// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2024-Present The UDS Authors

import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ params }) => {
	const { id } = params;

	return { id };
};
