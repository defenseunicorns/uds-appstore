<script lang="ts">
  import { applicationStore } from '$lib/stores';
  import { onMount } from 'svelte';

  onMount(async () => {
    await applicationStore.fetchCatalog();
  });
</script>

<slot />
