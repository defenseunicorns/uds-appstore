<script lang="ts">
  import 'flowbite';
  import { initFlowbite } from 'flowbite';
  import 'flowbite/dist/flowbite.css';
  import { afterNavigate } from '$app/navigation';
  import { Navbar } from '$lib/features/navigation';
  import '../app.postcss';

  afterNavigate(initFlowbite);
</script>

<Navbar />

<main
  class="relative h-screen w-full overflow-hidden transition-all duration-300 ease-in-out dark:bg-gray-900 dark:text-white"
>
  <div class="h-full overflow-y-auto" style="padding-top: var(--nav-height);">
    <slot />
  </div>
</main>
