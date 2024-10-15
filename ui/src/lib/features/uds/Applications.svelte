<script lang="ts">
  import { Rocket, Security, Unlocked } from 'carbon-icons-svelte';
  import FeatureIcon from '$lib/features/uds/FeatureIcon.svelte';
  import FeatureContent from '$lib/features/uds/FeatureContent.svelte';
  import { Button } from '$lib/components';
  import UDSApplications from '$lib/features/uds/UDSApplications.svelte';

  const iconClass = 'h-6 w-6 text-gray-500 dark:text-gray-400';
</script>

<div id="container" class="flex w-full justify-center p-4 md:w-[90rem] md:p-0">
  <div id="grid" class="grid grid-cols-1 gap-16 pb-12 md:pb-24 2xl:grid-cols-2">
    <div id="left-panel" class="w-full md:w-[38rem]">
      <div id="left-panel-header" class="flex flex-col gap-4 pb-4">
        <div class="text-4xl font-extrabold leading-tight">
          All Applications come<br /> pre-integrated into UDS
        </div>
        <div class="text-lg text-gray-400">
          UDS is a software delivery platform that makes software delivery easy for DoD systems.
        </div>
      </div>
      <div id="left-panel-content" class="flex flex-col gap-8 pt-8">
        <div id="feature" class="flex gap-4">
          <FeatureIcon name="Security"><Security class={iconClass} /></FeatureIcon>
          <FeatureContent
            title="Security & Compliance Built in"
            description="UDS is committed to a 0 CVE posture with continuous monitoring, logging, and alerting.
              It ensures secure runtime within DoD environments by verifying software components and
              mitigating vulnerabilities in real-time."
          />
        </div>

        <div id="feature" class="flex gap-4">
          <FeatureIcon name="Security"><Rocket class={iconClass} /></FeatureIcon>
          <FeatureContent
            title="Portable to Any Mission Environment"
            description="UDS is portable, supporting multiple cloud providers, on-prem infrastructure, and tactical edge solutions. With UDS, deploy the same software baseline  across contractor environments, on government systems, unclassified, classified, or even SAP environments."
          />
        </div>

        <div id="feature" class="flex gap-4">
          <FeatureIcon name="Security"><Unlocked class={iconClass} /></FeatureIcon>
          <FeatureContent
            title="Free of Vendor Lock"
            description="Own your baseline free of vendor lock. Built entirely on open-source capabilities, UDS uses flexible software licenses, allowing continued use of the solution even without a Defense Unicorns contract."
          />
        </div>
      </div>
    </div>

    <div id="right-panel" class="flex items-center">
      <div
        id="right-panel-inner-container"
        class="flex w-full flex-col gap-10 rounded-lg bg-gray-800 px-8 py-10 shadow md:w-[40.6875rem]"
      >
        <div id="right-panel-header" class="text-2xl font-bold">
          Applications & Services<br /> Included with all UDS deployments
        </div>

        <UDSApplications />

        <Button>Talk to a Mission Expert</Button>
      </div>
    </div>
  </div>
</div>
