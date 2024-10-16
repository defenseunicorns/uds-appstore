<script lang="ts">
  import FeatureIcon from '$lib/features/uds/FeatureIcon.svelte';
  import FeatureContent from '$lib/features/uds/FeatureContent.svelte';
  import { Compass, DocumentSecurity, License } from 'carbon-icons-svelte';
  import { onMount } from 'svelte';

  const iconClass = 'h-6 w-6 text-gray-500 dark:text-gray-400';

  onMount(() => {
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/v2.js';
    script.charset = 'utf-8';
    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          // region: 'na1',
          portalId: '45966648',
          formId: 'b2b08c42-5a3e-4a08-af61-7841950bc08b',
          target: '#hubspot-form'
        });
      }
    };
    document.body.appendChild(script);
  });
</script>

<div id="page-container" class="flex w-full justify-center  py-6">
  <div id="grid" class="grid grid-cols-1 gap-16 2xl:grid-cols-2 md:w-[90rem]">
    <div id="left-panel" class="w-full">
      <div id="left-panel-header" class="flex flex-col gap-4 pb-4">
        <div class="text-4xl font-extrabold leading-tight">
          For any system<br /> For any environment<br /> We help missions win the fight.
        </div>
        <div class="text-lg text-gray-400">
          Our DoD mission specialists are available to discuss your specific mission needs and
          explore how a UDS-deployed application can support your teams operations. Whether you need
          assistance with compliance, setup, or selecting the right tools, our experts are here to
          help you every step of the way.
        </div>
        <hr class="border-[0.0625rem] border-gray-700" />
      </div>
      <div id="left-panel-content" class="flex flex-col gap-8 pt-8">
        <div id="feature" class="flex gap-4">
          <FeatureIcon name="Document Security"><DocumentSecurity class={iconClass} /></FeatureIcon>
          <FeatureContent
            title="Request Security and Compliance Documentation"
            description="We can provide your security team with access to the security controls and compliance documentation for UDS and any application listed."
          />
        </div>

        <div id="feature" class="flex gap-4">
          <FeatureIcon name="License"><License class={iconClass} /></FeatureIcon>
          <FeatureContent
            title="Discuss Contracting and Pricing Options"
            description="We can work directly with you on your software delivery requirements and shape the contract structure to your need."
          />
        </div>

        <div id="feature" class="flex gap-4">
          <FeatureIcon name="Schedule"><Compass class={iconClass} /></FeatureIcon>
          <FeatureContent
            title="Schedule Discover Workshop"
            description="Not sure how UDS fits into your mission? We can help facilitate a discovery session to help you determine what applications will fill your missions capabilities gaps."
          />
        </div>
      </div>
    </div>

    <div id="hubspot-form"></div>
  </div>
</div>
