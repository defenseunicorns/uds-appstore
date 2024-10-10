<script lang="ts">
  import 'flowbite';
  import { initFlowbite } from 'flowbite';
  import 'flowbite/dist/flowbite.css';
  import { afterNavigate } from '$app/navigation';
  import { Navbar } from '$lib/features/navigation';
  import '../app.postcss';

  afterNavigate(initFlowbite);
</script>

<div
  class="flex min-h-screen flex-col transition-all duration-300 ease-in-out dark:bg-gray-900 dark:text-white"
>
  <Navbar />
  <main
    class="mt-[var(--navbar-height)] flex h-full max-h-[calc(100vh-var(--navbar-height))] flex-1 overflow-hidden"
  >
    <slot />
  </main>
</div>
