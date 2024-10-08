// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2024-Present The UDS Authors

import type { Application } from '$lib/types';

export const stringToSnakeCase = (name: string) => name.split(' ').join('-').toLocaleLowerCase();

// Truncates a string to a maximum length, adding ellipses if necessary, and ensuring "words" are not cut off
export const truncateString = (str: string, maxLength: number) => {
  const ellipses = '...';
  str = sanitize(str);
  if (str.length > maxLength) {
    const truncated = str.slice(0, maxLength - ellipses.length);
    const lastSpaceIndex = truncated.lastIndexOf(' ');
    if (lastSpaceIndex > 0) {
      return truncated.slice(0, lastSpaceIndex).trimEnd() + ellipses;
    } else {
      return truncated.trimEnd() + ellipses;
    }
  }
  return str;
};

const sanitize = (str: string) => {
  return str.replace(/\n/g, ' ');
};

// Sorts an array of applications alphabetically by title or name and returns a new array (does not mutate the original array)
export const sortApplicationsAlphabetically = (applications: Application[]) =>
  [...applications].sort((a, b) => {
    const nameA = a.spec?.title?.toUpperCase() ?? a.metadata?.name?.toUpperCase() ?? '';
    const nameB = b.spec?.title?.toUpperCase() ?? b.metadata?.name?.toUpperCase() ?? '';
    return nameA.localeCompare(nameB);
  });
