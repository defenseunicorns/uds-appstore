<script lang="ts">
  import AccordionItem from '$lib/components/Accordion/AccordionItem.svelte';
  import QuestionMarkIcon from '$lib/features/uds/QuestionMarkIcon.svelte';

  export let question: string = '';
  export let answer: string = '';
</script>

<AccordionItem>
  <span id="accordion-item-header" slot="header" class="w-full text-white">
    <div class="flex items-center gap-2">
      <div class="max-sm:w-1/12">
        <QuestionMarkIcon />
      </div>
      <div class="flex flex-1 pe-2">
        {question}
      </div>
    </div></span
  >
  <p class="faq text-gray-500 dark:text-gray-400">
    <!--eslint-disable-next-line svelte/no-at-html-tags -- The content displayed here is trusted-->
    {@html answer}
  </p>
</AccordionItem>
