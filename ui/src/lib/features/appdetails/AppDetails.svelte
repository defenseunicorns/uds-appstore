<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- SPDX-FileCopyrightText: 2024-Present The UDS Authors -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import type { Application } from '$lib/types';
  import { applicationStore } from '$lib/stores';
  import { AppCardHeader, Button } from '$lib/components';
  import SectionNav from './SectionNav/SectionNav.svelte';

  export let id: string;

  let app: Application | undefined;
  let appCount: number;
  let isLoading = true;
  let error: string | undefined;

  onMount(() => {
    const unsubscribe = applicationStore.subscribe(($store) => {
      app = $store.appMap.get(id);
      appCount = $store.appMap.size || 0;
      isLoading = $store.loading;
      error = $store.error;
    });
    return () => {
      unsubscribe();
    };
  });

  $: {
    if ((!isLoading && appCount && !app) || error) {
      goto('/404', { replaceState: true });
    }
  }
</script>

{#if app}
  <div class="p-8">
    <div class="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div class="flex items-center justify-start">
        <AppCardHeader {app} />
      </div>
      <div class="flex items-start sm:items-center">
        <Button href="https://www.defenseunicorns.com/contactus">
          Talk with a Mission Specialist
        </Button>
      </div>
    </div>

    <SectionNav {app} />
  </div>
{/if}
