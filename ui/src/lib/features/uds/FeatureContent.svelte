<script lang="ts">
  export let title: string;
  export let description: string;
</script>

<div id="content" class="flex flex-1 flex-col gap-2">
  <div class="text-xl font-bold">{title}</div>
  <div class="text-gray-400">
    {description}
  </div>
</div>
