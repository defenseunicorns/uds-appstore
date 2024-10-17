<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- SPDX-FileCopyrightText: 2024-Present The UDS Authors -->

<script lang="ts">
  import type { Application } from '$lib/types';
  export let app: Application;

  const DEFAULT_ICON = '/images/icons/default.svg';

  $: image = DEFAULT_ICON;
  // $: image = app.icon_path || DEFAULT_ICON;
  $: vendor = app.vendor?.name;
  $: title = app.title || app.name;
</script>

<div class="app-card-header flex max-w-full flex-row items-start gap-2 truncate">
  <img src={image} class="app-card-header-icon h-[48px] w-[48px] rounded" alt="App Icon" />

  <div class="flex flex-col gap-1">
    <div id="app-title" class="app-card-header-title text-lg font-semibold leading-tight">
      {title}
    </div>
    <div class="flex items-center gap-1">
      <span class="text-xs text-gray-500 dark:text-gray-300">By: </span>
      <span class="text-xs font-thin text-gray-400">
        {vendor}
      </span>
    </div>
  </div>
</div>
