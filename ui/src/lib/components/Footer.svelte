<script lang="ts">
  import { base } from '$app/paths';

  // TODO - continue work on responsiveness
  // TODO - test
</script>

<div
  class=" flex w-full flex-col items-center justify-center gap-5 bg-[url('/images/doug_world_official_faded.png')] bg-no-repeat"
>
  <div class="flex w-11/12 flex-col items-center justify-between sm:flex-row lg:w-4/5">
    <img
      alt="unicorn guarantee"
      src="{base}/images/unicorn_guarantee.png"
      class="h-auto w-[25%] py-4 xl:py-8"
    />
    <div class="flex flex-col items-center gap-2 pt-4 pb-[0.87rem] xl:pt-8">
      <img alt="within 2 weeks" src="{base}/images/within_2_weeks.png" class="h-auto w-[33%]" />
      <div class="text-center text-sm font-medium leading-[150%] xl:text-xl">
        <div>Your chosen applications will be deliverable to your target environment</div>
        <div>with documentation for an ATO</div>
      </div>
      <div class="text-xs font-light leading-[125%] text-gray-400">
        *Guaranteed timeline is for supported infrastructures. Timeline starts after the completion
        of technical prerequisites.
      </div>
    </div>
  </div>
</div>
