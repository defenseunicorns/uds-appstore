<script lang="ts">
  const responsiveTitleFontSizes =
    'text-xl font-semibold !leading-[140%] sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-[2.5rem]';
  const responsiveSubtitleFontSizes =
    'text-xs font-normal !leading-[150%]  sm:text-sm lg:text-base xl:text-lg 2xl:text-xl';
</script>

<div
  id="catalog-header-container"
  class="flex max-w-screen-2xl items-start justify-between self-stretch rounded-lg"
>
  <div
    id="catalog-header"
    class="lightgray mb-9 flex flex-1 flex-col items-start gap-2 bg-[url('/images/doug_world_official_faded.png')] bg-cover bg-[center] bg-no-repeat px-6 py-5"
  >
    <div id="catalog-header-title" class={responsiveTitleFontSizes}>
      Applications Deployable <br /> Anywhere with UDS!
    </div>
    <div id="catalog-header-subtext" class={responsiveSubtitleFontSizes}>
      A marketplace of pre-integrated, ready-to-deploy solutions that leverage Unicorn Delivery
      Service (UDS) for rapid deployments and ATOs.
    </div>
  </div>
</div>
