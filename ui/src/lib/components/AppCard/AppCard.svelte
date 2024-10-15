<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- SPDX-FileCopyrightText: 2024-Present The UDS Authors -->
<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown';
  import type { Application } from '$lib/types';
  import { AppCardHeader, Button } from '$lib/components';
  import { ArrowRight } from 'carbon-icons-svelte';
  import { truncateString } from '$lib/utils/helpers';
  import { goto } from '$app/navigation';

  export let app: Application;

  let description = 'No description available';

  $: {
    if (app.spec?.description) {
      description = truncateString(app.spec.description, 150);
    }
  }

  const handleClick = () => {
    goto(`/apps/${app.metadata?.name}`);
  };
</script>

<button
  class="app-card remove-btn-style flex h-[14.25rem] w-[16.0625rem] cursor-pointer flex-col items-start justify-start rounded-lg border border-gray-200 bg-white px-4 py-[20px] shadow dark:border-gray-700 dark:bg-gray-800"
  on:click={handleClick}
>
  <AppCardHeader {app} />

  <div class="flex flex-1 flex-col justify-between">
    <div class="app-card-description mt-3 flex text-xs leading-[150%] dark:text-gray-300">
      <SvelteMarkdown source={description} />
    </div>

    <div class="flex justify-end">
      <Button size="xs" color="dark" class="dark:text-blue-400" on:click={handleClick}
        ><div class="flex items-center gap-2">
          Learn More
          <ArrowRight />
        </div></Button
      >
    </div>
  </div>
</button>
