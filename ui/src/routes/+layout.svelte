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
  <main class="flex flex-1 h-full max-h-[calc(100vh-var(--navbar-height))] overflow-hidden mt-[var(--navbar-height)]">
    <slot />
  </main>
</div>
