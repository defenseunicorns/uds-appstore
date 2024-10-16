<script lang="ts">
  export let name: string = 'Details';
</script>

<div
  class=" flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 p-2 shadow dark:bg-gray-800"
>
  <slot class="h-6 w-6 text-gray-500 dark:text-gray-400" />
  <span class="sr-only">{`${name} icon`}</span>
</div>
