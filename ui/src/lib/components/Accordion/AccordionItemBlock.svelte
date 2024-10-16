<script lang="ts">

    export let index: number;
    export let question: string = "";
    export let answer: string = "";

</script>


<h2 id={`accordion-flush-heading-${index}`}>
    <button
            type="button"
            class="flex w-full items-center justify-between border-b border-gray-200 bg-white py-5 text-left font-medium text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            data-accordion-target={`#accordion-flush-body-${index}`}
            aria-expanded="true"
            aria-controls={`accordion-flush-body-${index}`}
    >
        <span>{question}</span>
        <svg
                data-accordion-icon=""
                class="h-6 w-6 shrink-0 rotate-180"
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
<div id={`accordion-flush-body-${index}`} class="" aria-labelledby={`accordion-flush-heading-${index}`}>
    <div class="border-b border-gray-200 py-5 dark:border-gray-700">
        {@html answer}
<!--        <p class="mb-2 text-gray-500 dark:text-gray-400">-->
<!--            Flowbite is an open-source library of interactive components built on top of Tailwind CSS-->
<!--            including buttons, dropdowns, modals, navbars, and more.-->
<!--        </p>-->
<!--        <p class="text-gray-500 dark:text-gray-400">-->
<!--            Check out this guide to learn how to <a-->
<!--                href="#"-->
<!--                class="text-primary-600 dark:text-primary-500 hover:underline">get started</a-->
<!--        > and start developing websites even faster with components on top of Tailwind CSS.-->
<!--        </p>-->
    </div>
</div>