// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2024-Present The UDS Authors

import '@testing-library/jest-dom'
import { vi } from 'vitest'

const mockComponent = () => ({
  $$: {
    on_mount: [],
    on_destroy: [],
    before_update: [],
    after_update: [],
  },
})

// Mock the entire component
vi.mock('$components', () => {
  return {
    DataTable: vi.fn().mockImplementation(mockComponent),
  }
})
