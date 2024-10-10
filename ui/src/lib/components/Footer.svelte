<script lang="ts">
  import { base } from '$app/paths';
  import { twMerge } from 'tailwind-merge';

  // TODO - continue work on responsiveness
  // TODO - test

  const responsiveImageStyling = 'w-[50%] sm:w-[33%]  2xl:w-auto';

  type Link = { title: string; href: string };
  const sections: { [category: string]: Link[] } = {
    'For Missions': [
      { title: 'Benefits of Deploying on UDS', href: '/' },
      { title: 'SLA Support', href: '/' },
      { title: 'Available Contracts', href: '/' },
      { title: 'Request Custom App', href: '/' }
    ],
    'Defense Unicorns': [
      { title: 'About Company', href: '/' },
      { title: 'Solutions', href: '/' },
      { title: 'Products', href: '/' },
      { title: 'Contact Us', href: '/' }
    ],
    'For Partners': [
      { title: 'Contact Partnership Manager', href: '/' },
      { title: 'Why list in App store', href: '/' }
    ]
  };
</script>

<div
  id="branding"
  class=" flex w-full flex-col items-center justify-center gap-5 bg-[url('/images/doug_world_official_faded.png')] bg-[length:100%_458.084%] bg-[position:-1.761px_-15.844px] bg-no-repeat"
>
  <div class="2xl:w-8/10 flex w-11/12 flex-col items-center justify-between sm:flex-row xl:w-4/5">
    <img
      alt="unicorn guarantee"
      src="{base}/images/unicorn_guarantee.png"
      class={twMerge('h-auto py-4 xl:py-8', responsiveImageStyling)}
    />
    <div class="flex flex-col items-center gap-2 pb-[0.87rem] pt-4 2xl:pt-8">
      <img
        alt="within 2 weeks"
        src="{base}/images/within_2_weeks.png"
        class={twMerge('h-auto', responsiveImageStyling)}
      />
      <div class="text-center text-sm font-medium 2xl:text-xl">
        <div>Your chosen applications will be deliverable to your target environment</div>
        <div>with documentation for an ATO</div>
      </div>
      <div class="text-center text-xs font-light text-gray-400">
        *Guaranteed timeline is for supported infrastructures. Timeline starts after the completion
        of technical prerequisites.
      </div>
    </div>
  </div>
</div>

<div id="links" class="flex w-full justify-center">
  <div class="flex w-4/5 flex-col justify-between gap-8 py-16 sm:flex-row">
    {#each Object.entries(sections) as section}
      <div
        id={`link-section-${section[0]}`}
        class="flex w-full flex-col items-center gap-4 sm:items-start"
      >
        <div class="text-sm font-semibold uppercase">{section[0]}</div>
        {#each section[1] as link}
          <a
            href={link.href}
            class="font-normal text-gray-400 transition-colors duration-300 ease-in-out hover:text-white"
            >{link.title}</a
          >
        {/each}
      </div>
    {/each}
  </div>
</div>

