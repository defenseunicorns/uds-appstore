<script lang="ts">
  export let title: string;
</script>

<div
  class="max-h-full rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:p-6"
>
  <h2 class="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>

  <div class="mt-2 divide-y divide-gray-200 dark:divide-gray-700 dark:border-gray-800">
    <slot />
  </div>
</div>
