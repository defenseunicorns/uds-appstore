<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- SPDX-FileCopyrightText: 2024-Present The UDS Authors -->

<script lang="ts">
  import type { Application } from '$lib/types';
  export let app: Application;

  const DEFAULT_ICON = '/images/icons/default.svg';

  $: image = app.spec?.icons?.[0]?.src || DEFAULT_ICON;
  $: vendor = app.spec?.vendor?.name;
  $: vendorUrl = app.spec?.vendor?.url;
  $: title = app.spec?.title || app.metadata?.name;
</script>

<div class="app-card-header flex flex-row items-start gap-2">
  <img src={image} class="app-card-header-icon h-[48px] w-[48px] rounded" alt="App Icon" />

  <div class="flex flex-col gap-1">
    <div class="text-lg font-semibold leading-tight">{title}</div>
    <div class="flex items-center gap-1">
      <span class="text-xs text-gray-500 dark:text-gray-300">By: </span>
      <a class="link text-xs font-thin text-gray-400" href={vendorUrl} rel="noopener noreferrer">
        {vendor}
      </a>
    </div>
  </div>
</div>
