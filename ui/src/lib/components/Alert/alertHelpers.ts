// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2024-Present The UDS Authors

// Function to get the color classes for an alert
export function getAlertColorClasses(color: string): string {
  if (color in alertColorClasses) {
    return alertColorClasses[color];
  }
  return `text-${color}-800 border-${color}-300 bg-${color}-50 dark:bg-gray-800 dark:text-${color}-400 dark:border-${color}-800`;
}

// Define the color classes for each alert color that is default from flowbite
export const alertColorClasses: Record<string, string> = {
  info: 'text-blue-800 border-blue-300 bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800',
  danger:
    'text-red-800 border-red-300 bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800',
  success:
    'text-green-800 border-green-300 bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800',
  warning:
    'text-yellow-800 border-yellow-300 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800',
  dark: 'text-gray-800 border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300'
};
