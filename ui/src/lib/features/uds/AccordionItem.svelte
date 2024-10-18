<script lang="ts">
  import { slide } from 'svelte/transition';
  export let index: number;
  export let question: string = '';
  export let answer: string = '';

  let open = false;
  const toggle = () => {
    open = !open;
  };
</script>

<h2 id={`accordion-flush-heading-${index}`}>
  <button
    type="button"
    class="flex w-full items-center justify-between border-b border-gray-700 bg-gray-900 py-5 text-left font-medium"
    data-accordion-target={`#accordion-flush-body-${index}`}
    aria-expanded="true"
    aria-controls={`accordion-flush-body-${index}`}
    on:click={toggle}
  >
    <div class="flex items-center text-white">
      <svg
        class="mr-2 h-5 w-5 flex-shrink-0 text-gray-500 dark:text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
          clip-rule="evenodd"
        ></path></svg
      >
      <span>{question}</span>
    </div>
    <svg
      data-accordion-icon=""
      class="h-6 w-6 shrink-0 {open ? '' : 'rotate-180'}"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      ><path
        fill-rule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clip-rule="evenodd"
      ></path></svg
    >
  </button>
</h2>

{#if open}
  <div
    id={`accordion-flush-body-${index}`}
    class=""
    aria-labelledby={`accordion-flush-heading-${index}`}
    transition:slide
  >
    <div class="border-b border-gray-200 py-5 text-gray-400 dark:border-gray-700">
      <!--eslint-disable-next-line svelte/no-at-html-tags -- Content here is static and trusted-->
      {@html answer}
    </div>
  </div>
{/if}
