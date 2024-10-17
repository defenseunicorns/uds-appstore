<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- SPDX-FileCopyrightText: 2024-Present The UDS Authors -->

<script lang="ts">
  import type { Application } from '$lib/types';
  export let app: Application;

  const DEFAULT_ICON = '/images/icons/default.svg';

  $: image = app.spec?.icons?.[0]?.src || DEFAULT_ICON;
  $: vendor = app.spec?.vendor?.name;
  $: title = app.spec?.title || app.metadata?.name;
</script>

<div class="app-card-header flex max-w-full flex-row items-start gap-2 truncate">
  <img src={image} class="app-card-header-icon h-[48px] w-[48px] rounded" alt="App Icon" />

  <div class="flex flex-col gap-1">
    <div id="app-title" class="app-card-header-title text-lg font-semibold leading-tight">
      {title}
    </div>
    <div class="flex items-center gap-1 text-xs text-gray-400 line-height-[125%]">
      <span>By: </span>
      <span>
        {vendor}
      </span>
    </div>
  </div>
</div>
