// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2024-Present The UDS Authors

import { Application } from 'carbon-icons-svelte';

import type { CarbonIcon } from 'carbon-icons-svelte';

export interface Route {
  name: string;
  path: string;
  icon?: typeof CarbonIcon;
  class?: string;
  children?: Route[];
}

export const routes = [
  createRoute({
    name: 'Apps',
    icon: Application,
  }),
];

// Convert the path to a URL-friendly format
function createPath(prefix: string, part: string) {
  return `${prefix}/${part.replace(/\s+/g, '-').toLowerCase()}`;
}

function createRoute(r: Partial<Route> & { name: string }, root: string = ''): Route {
  const path = r.path || createPath(root, r.name);

  return {
    ...r,
    path,
    children: r.children?.map((c) => createRoute(c, path)),
  };
}
