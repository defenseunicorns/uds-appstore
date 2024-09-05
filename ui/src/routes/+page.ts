// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2024-Present The UDS Authors

import { redirect, type Load } from '@sveltejs/kit';

export const load: Load = async ({ url }) => {
	if (url.pathname === '/') {
		throw redirect(307, '/apps');
	}
};
