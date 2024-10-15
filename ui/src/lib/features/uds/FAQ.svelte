<script lang="ts">
  import Accordion from '$lib/components/Accordion/Accordion.svelte';
  import AccordionItem from '$lib/components/Accordion/AccordionItem.svelte';
  import QuestionMarkIcon from '$lib/features/uds/QuestionMarkIcon.svelte';
  import { Button } from '$lib/components';
</script>

<div class=" flex w-[90rem] flex-col items-center gap-12 bg-gray-800 py-24">
  <div id="faq-title" class=" text-4xl font-extrabold leading-tight">
    Frequently asked questions
  </div>

  <div class="faq">
    <Accordion flush class="w-[43.4375rem]">
      <AccordionItem>
        <span slot="header" class="text-white">
          <div class="flex items-center gap-2">
            <QuestionMarkIcon />
            What does it mean that applications are pre-integrated into UDS?
          </div></span
        >
        <p class="text-gray-500 dark:text-gray-400">
          Pre-integrated applications within UDS are those that have been fully configured, tested
          and validated to work seamlessly on the UDS software delivery platform. These applications
          are configured to take advantage of UDS's built-in capabilities, such as automated
          security policies, monitoring, and container management, reducing the time and effort
          required for deployment. The goal is to minimize the need for customization and ensure
          that mission-critical applications can be deployed quickly and securely, to any
          infrastructure.
        </p>
      </AccordionItem>
      <AccordionItem>
        <span slot="header" class="text-white">
          <div class="flex items-center gap-2">
            <QuestionMarkIcon />
            Do UDS applications require additional work to configure for deployment?
          </div></span
        >
        <p class="text-gray-500 dark:text-gray-400">
          UDS applications are pre-integrated, the platform may still require some configuration to
          tailor them to specific mission environments. This is especially true for networking
          settings, access policies, and any environment-specific customizations. However, the UDS
          platform simplifies most of the deployment tasks by automating much of the configuration
          process and streamlining operations.
        </p>
      </AccordionItem>
      <AccordionItem>
        <span slot="header" class="text-white">
          <div class="flex items-center gap-2">
            <QuestionMarkIcon />
            Can UDS be deployed into any mission environment?
          </div></span
        >
        <p class="text-gray-500 dark:text-gray-400">
          Yes! UDS is highly flexible and can be deployed across a wide range of mission
          environments, from major Cloud Service Providers (CSPs) to edge and on-premise
          environments. The platform is specifically built for the DoD, supporting deployment in
          environments that require both high security and operational agility. Already have a
          specific cloud environment? We can deploy to AWS Gov Cloud (US) and Azure Government
          Cloud. Need to deploy at a higher classification level or to an edge device? We can deploy
          there too!
        </p>
      </AccordionItem>
      <AccordionItem>
        <span slot="header" class="text-white">
          <div class="flex items-center gap-2">
            <QuestionMarkIcon />
            Does UDS follow the DoD DevSecOps Reference Design?
          </div></span
        >
        <p class="text-gray-500 dark:text-gray-400">
          Yes, UDS adheres to the DoD DevSecOps Reference Design. It follows the DevSecOps
          principles of integrating security into the entire software lifecycle, automating testing,
          and ensuring continuous monitoring. UDS incorporates security into development,
          deployment, and operational processes to align with the DoD’s cybersecurity and software
          modernization initiatives.
        </p>
      </AccordionItem>
      <AccordionItem>
        <span slot="header" class="text-white">
          <div class="flex items-center gap-2">
            <QuestionMarkIcon />
            How would deploying an application with UDS impact security posture?
          </div></span
        >
        <p class="text-gray-500 dark:text-gray-400">
          Deploying an application with UDS enhances security posture by implementing security
          controls within every runtime environment. The platform continuously monitors
          applications, automatically enforces security policies, and integrates tools for
          vulnerability scanning, ensuring that security risks are mitigated early and throughout
          the application’s lifecycle.
        </p>
      </AccordionItem>
      <AccordionItem>
        <span slot="header" class="text-white">
          <div class="flex items-center gap-2">
            <QuestionMarkIcon />
            Is SLA support for UDS available?
          </div></span
        >
        <p class="text-gray-500 dark:text-gray-400">
          Yes, Defense Unicorns provides paid support to DoD missions with an SLA (Service Level
          Agreement) that meets mission requirements, ensuring that users can receive the necessary
          technical and operational support to maintain their mission capabilities running on UDS.
          Our services provide continuous monitoring, technical support, vulnerability management,
          and education, including:
        </p>
        <ul class="ml-8">
          <li class="text-gray-500 dark:text-gray-400">
            <strong>24/7 support for critical issues</strong> to ensure rapid resolution of any high-priority
            issues.
          </li>
          <li class="text-gray-500 dark:text-gray-400">
            <strong>Live training sessions</strong> to assist users in effectively operating UDS, helping
            to reduce downtime and operational risks.
          </li>
          <li class="text-gray-500 dark:text-gray-400">
            <strong>Dedicated account management</strong> to provide personalized assistance and ensure
            the deployment aligns with mission requirements.
          </li>
          <li class="text-gray-500 dark:text-gray-400">
            <strong>CVE scans, industry leading secure images and risk mitigation</strong> which proactively
            address security vulnerabilities.
          </li>
          <li class="text-gray-500 dark:text-gray-400">
            <strong>Online or onsite installation and deployment support</strong> to guarantee seamless
            integration and setup in any environment.
          </li>
        </ul>
        <a href="/contact">Speak to one of our Mission Experts</a> about how to access an SLA which suits
        your mission parameters.
      </AccordionItem>
      <AccordionItem>
        <span slot="header" class="text-white">
          <div class="flex items-center gap-2">
            <QuestionMarkIcon />
            Do the applications & services that are included with UDS cost extra?
          </div></span
        >
        <p class="text-gray-500 dark:text-gray-400">
          The UDS platform itself includes many core services and capabilities out of the box.
          However, infrastructure as code, last mile configuration, training and secure images
          involve additional support. Additionally, third-party software vendors may require
          licenses depending on the feature set your mission needs. <a href="/contact"
            >Our mission experts are available to support with pricing and contracting</a
          >.
        </p>
      </AccordionItem>
      <AccordionItem>
        <span slot="header" class="text-white">
          <div class="flex items-center gap-2">
            <QuestionMarkIcon />
            Can I deploy an app on UDS that is not currently in the app store?
          </div></span
        >
        <p class="text-gray-500 dark:text-gray-400">
          Yes, you can deploy an application that is not in the UDS app store. UDS supports custom
          deployments, allowing users to integrate their own applications into the platform,
          provided they follow the UDS packaging guidelines and are compatible with the underlying
          Kubernetes environment. If you need help or want to request an application please reach
          out <a href="/contact">here</a>.
        </p>
      </AccordionItem>
      <AccordionItem>
        <span slot="header" class="text-white">
          <div class="flex items-center gap-2">
            <QuestionMarkIcon />
            Is UDS an extension of Platform One’s Big Bang?
          </div></span
        >
        <p class="text-gray-500 dark:text-gray-400">
          Yes, UDS is an extension of Big Bang. UDS builds upon the security posture established by
          Platform One’s Big Bang, by adding enhanced automation features through the UDS Operator
          and UDS Policy Engine. While Big Bang focuses on deploying secure, compliant
          infrastructure, UDS strengthens and extends Big Bang’s functionality, providing more
          automation and security features specifically tailored for application deployment and
          policy management. UDS can be found in <a
            target="_blank"
            href="https://repo1.dso.mil/platform-one/distros/defense-unicorns/uds-core"
            >Platform One’s Repo1.</a
          >
        </p>
      </AccordionItem>
    </Accordion>
  </div>
  <a
    type="button"
    class="mb-2 me-2 rounded-lg border border-gray-800 px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-800"
    target="_blank"
    href="https://uds.defenseunicorns.com/">View UDS Documentation</a
  >
</div>

<style>
  .faq ul li {
    list-style: square;
  }
  .faq a {
    color: #76a9fa;
  }
</style>
