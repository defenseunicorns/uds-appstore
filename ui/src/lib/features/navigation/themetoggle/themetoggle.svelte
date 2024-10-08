<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- SPDX-FileCopyrightText: 2024-Present The UDS Authors -->

<script lang="ts">
  import { onMount } from 'svelte';
  import { isDarkMode } from '$lib/features/navigation/store';
  import { AsleepFilled, Light } from 'carbon-icons-svelte';
  import { initTooltips } from 'flowbite';

  function toggleDarkMode() {
    $isDarkMode = !$isDarkMode;
    updateDarkMode();
  }

  function updateDarkMode() {
    if ($isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', $isDarkMode ? 'true' : 'false');
  }

  onMount(() => {
    initTooltips();
    const storedDarkMode = localStorage.getItem('darkMode');

    if (storedDarkMode !== null) {
      $isDarkMode = storedDarkMode === 'true';
    } else {
      $isDarkMode = true;
    }
    updateDarkMode();
  });
</script>

<button
  type="button"
  id="theme-toggle"
  class="mr-1 rounded-lg p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-4 focus:ring-gray-600"
  on:click={toggleDarkMode}
  data-tooltip-target="tooltip-toggle"
  data-tooltip-placement="bottom"
  aria-label="Toggle dark mode"
>
  {#if $isDarkMode}
    <Light class="h-f6 w-6" />
  {:else}
    <AsleepFilled class="h-f6 w-6" />
  {/if}
</button>
<div
  id="tooltip-toggle"
  role="tooltip"
  class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
  data-popper-placement="top"
>
  <span class="block break-words">
    Toggle {$isDarkMode ? 'light' : 'dark'} mode
  </span>
  <div class="tooltip-arrow" data-popper-arrow></div>
</div>
