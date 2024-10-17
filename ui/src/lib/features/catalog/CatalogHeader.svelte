<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  const responsiveTitleFontSizes =
    'text-xl font-semibold !leading-[140%] sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-[2.5rem]';
  const responsiveSubtitleFontSizes =
    'text-xs font-normal !leading-[150%]  sm:text-sm lg:text-base xl:text-lg 2xl:text-xl';
</script>

<div
  id="catalog-header"
  class="lightgray mb-9 flex flex-col items-start gap-2 rounded-lg bg-[url('/images/doug_world_official_faded.png')] bg-cover bg-no-repeat px-6 py-5"
>
  <div id="catalog-header-title" class={responsiveTitleFontSizes}>
    Applications Deployable <br /> Anywhere with UDS!
  </div>
  <div id="catalog-header-subtext" class={twMerge(responsiveSubtitleFontSizes)}>
    A marketplace of pre-integrated, ready-to-deploy solutions that leverage Unicorn Delivery
    Service (UDS) for rapid deployments and ATOs.
  </div>
</div>
