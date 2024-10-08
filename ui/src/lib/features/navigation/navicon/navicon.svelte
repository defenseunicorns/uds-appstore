<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- SPDX-FileCopyrightText: 2024-Present The UDS Authors -->
<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  export let icon: typeof SvelteComponent;
  export let onClick: () => void = () => {};
  export let ariaLabel: string = '';
  export let tooltipId: string = '';
  export let tooltipText: string = '';
</script>

<button
  type="button"
  class="mr-1 rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:ring-4 focus:ring-gray-300 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-600"
  on:click={onClick}
  aria-label={ariaLabel}
  data-tooltip-target={tooltipId}
  data-tooltip-placement="bottom"
>
  <svelte:component this={icon} class="h-6 w-6" />
</button>

{#if tooltipId && tooltipText}
  <div
    id={tooltipId}
    role="tooltip"
    class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
  >
    <span class="block break-words">
      {tooltipText}
    </span>
    <div class="tooltip-arrow" data-popper-arrow></div>
  </div>
{/if}
