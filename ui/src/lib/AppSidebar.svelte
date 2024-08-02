<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- SPDX-FileCopyrightText: 2024-Present The UDS Authors -->

<script lang="ts">
  import { page } from '$app/stores';

  import {
    Sidebar,
    SidebarDropdownItem,
    SidebarDropdownWrapper,
    SidebarGroup,
    SidebarItem,
    SidebarWrapper,
  } from 'flowbite-svelte';
  import { routes } from '$lib/data';

  export let sidebarHidden: boolean = false;

  let iconClass =
    'flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white';
  let itemClass =
    'flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600';
  let groupClass = 'pt-2 space-y-2';

  $: activeUrl = $page.url.pathname;
</script>

<Sidebar
  class={sidebarHidden ? 'hidden' : ''}
  {activeUrl}
  activeClass="bg-gray-100 dark:bg-gray-700"
  asideClass="fixed inset-0 z-30 flex-none h-full w-64 lg:h-auto border-e border-gray-200 dark:border-gray-600 lg:overflow-y-visible lg:pt-16 lg:block"
>
  <SidebarWrapper
    divClass="overflow-y-auto px-3 pt-20 lg:pt-5 h-full bg-white scrolling-touch max-w-2xs lg:h-[calc(100vh-4rem)] lg:block dark:bg-gray-800 lg:me-0 lg:sticky top-2"
  >
    <SidebarGroup ulClass={groupClass}>
      {#each routes as route}
        {#if route.children}
          <SidebarDropdownWrapper label={route.name}>
            <svelte:fragment slot="icon">
              <svelte:component this={route.icon} class={iconClass} />
            </svelte:fragment>

            {#each route.children as child}
              <SidebarDropdownItem class={itemClass} label={child.name} href={route.path + child.path}
              ></SidebarDropdownItem>
            {/each}
          </SidebarDropdownWrapper>
        {:else}
          <SidebarItem class={itemClass} label={route.name} href={route.path}>
            <svelte:fragment slot="icon">
              <svelte:component this={route.icon} class={iconClass} />
            </svelte:fragment>
          </SidebarItem>
        {/if}
      {/each}
    </SidebarGroup>
  </SidebarWrapper>
</Sidebar>
