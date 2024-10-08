<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- SPDX-FileCopyrightText: 2024-Present The UDS Authors -->

<script lang="ts">
  export let label: string;
  export let activeTab: string;
  export let href: string | undefined = undefined;
  export let onClick: (() => void) | undefined = undefined;

  function handleClick() {
    if (onClick) {
      onClick();
    }
    activeTab = label;
  }

  $: isActive = activeTab === label;
</script>

<li class="mr-2">
  <svelte:element
    this={href ? 'a' : 'button'}
    {href}
    role={href ? 'tab' : 'button'}
    on:click={handleClick}
    class="group inline-flex items-center justify-center rounded-t-lg border-b-2 p-4
	  {isActive
      ? 'active border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
      : 'border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'}"
    aria-current={isActive ? 'page' : undefined}
  >
    {label}
  </svelte:element>
</li>
