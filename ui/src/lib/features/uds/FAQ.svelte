<script lang="ts">
  import Accordion from '$lib/components/Accordion/Accordion.svelte';
  import CustomAccordionItem from '$lib/features/uds/CustomAccordionItem.svelte';

  const faqItems: { question: string; answer: string }[] = [
    {
      question: 'What does it mean that applications are pre-integrated into UDS?',
      answer:
        'Pre-integrated applications within UDS are those that have been fully configured, tested\n' +
        '          and validated to work seamlessly on the UDS software delivery platform. These applications\n' +
        "          are configured to take advantage of UDS's built-in capabilities, such as automated\n" +
        '          security policies, monitoring, and container management, reducing the time and effort\n' +
        '          required for deployment. The goal is to minimize the need for customization and ensure\n' +
        '          that mission-critical applications can be deployed quickly and securely, to any\n' +
        '          infrastructure.'
    },
    {
      question: 'Do UDS applications require additional work to configure for deployment?',
      answer:
        'UDS applications are pre-integrated, the platform may still require some configuration to\n' +
        '          tailor them to specific mission environments. This is especially true for networking\n' +
        '          settings, access policies, and any environment-specific customizations. However, the UDS\n' +
        '          platform simplifies most of the deployment tasks by automating much of the configuration\n' +
        '          process and streamlining operations.'
    },
    {
      question: 'Can UDS be deployed into any mission environment?',
      answer:
        'Yes! UDS is highly flexible and can be deployed across a wide range of mission\n' +
        '          environments, from major Cloud Service Providers (CSPs) to edge and on-premise\n' +
        '          environments. The platform is specifically built for the DoD, supporting deployment in\n' +
        '          environments that require both high security and operational agility. Already have a\n' +
        '          specific cloud environment? We can deploy to AWS Gov Cloud (US) and Azure Government\n' +
        '          Cloud. Need to deploy at a higher classification level or to an edge device? We can deploy\n' +
        '          there too!'
    },
    {
      question: 'Does UDS follow the DoD DevSecOps Reference Design?',
      answer:
        ' Yes, UDS adheres to the DoD DevSecOps Reference Design. It follows the DevSecOps\n' +
        '          principles of integrating security into the entire software lifecycle, automating testing,\n' +
        '          and ensuring continuous monitoring. UDS incorporates security into development,\n' +
        '          deployment, and operational processes to align with the DoD’s cybersecurity and software\n' +
        '          modernization initiatives.'
    },
    {
      question: 'How does deploying applications with UDS accelerate the ATO process?',
      answer:
        'UDS accelerates the Authorization to Operate (ATO) process by utilizing automated security\n' +
        '          checks, pre-configured compliance with NIST SP 800-53 controls, and a continuous\n' +
        '          monitoring approach. This reduces the manual documentation and validation steps typically\n' +
        '          involved in ATO, significantly cutting down the time to deployment while ensuring security\n' +
        '          compliance. We accelerate not only your initial ATO but also ensure continuous deployment\n' +
        '          by automating security validations as part of the delivery process.'
    },
    {
      question: 'How would deploying an application with UDS impact security posture?',
      answer:
        'Deploying an application with UDS enhances security posture by implementing security\n' +
        '          controls within every runtime environment. The platform continuously monitors\n' +
        '          applications, automatically enforces security policies, and integrates tools for\n' +
        '          vulnerability scanning, ensuring that security risks are mitigated early and throughout\n' +
        '          the application’s lifecycle.'
    },
    {
      question: 'Is SLA support for UDS available?',
      answer:
        '          Yes, Defense Unicorns provides paid support to DoD missions with an SLA (Service Level\n' +
        '          Agreement) that meets mission requirements, ensuring that users can receive the necessary\n' +
        '          technical and operational support to maintain their mission capabilities running on UDS.\n' +
        '          Our services provide continuous monitoring, technical support, vulnerability management,\n' +
        '          and education, including:\n' +
        '        </p>\n' +
        '        <ul class="ml-8 list-disc">\n' +
        '          <li class="text-gray-500 dark:text-gray-400">\n' +
        '            <strong>24/7 support for critical issues</strong> to ensure rapid resolution of any high-priority\n' +
        '            issues.\n' +
        '          </li>\n' +
        '          <li class="text-gray-500 dark:text-gray-400">\n' +
        '            <strong>Live training sessions</strong> to assist users in effectively operating UDS, helping\n' +
        '            to reduce downtime and operational risks.\n' +
        '          </li>\n' +
        '          <li class="text-gray-500 dark:text-gray-400">\n' +
        '            <strong>Dedicated account management</strong> to provide personalized assistance and ensure\n' +
        '            the deployment aligns with mission requirements.\n' +
        '          </li>\n' +
        '          <li class="text-gray-500 dark:text-gray-400">\n' +
        '            <strong>CVE scans, industry leading secure images and risk mitigation</strong> which proactively\n' +
        '            address security vulnerabilities.\n' +
        '          </li>\n' +
        '          <li class="text-gray-500 dark:text-gray-400">\n' +
        '            <strong>Online or onsite installation and deployment support</strong> to guarantee seamless\n' +
        '            integration and setup in any environment.\n' +
        '          </li>\n' +
        '        </ul>\n' +
        '        <a href="/contact" style="color: #76a9fa;">Speak to one of our Mission Experts</a> about how to access an SLA which suits\n' +
        '        your mission parameters.'
    },
    {
      question: 'Do the applications & services that are included with UDS cost extra?',
      answer:
        'The UDS platform itself includes many core services and capabilities out of the box.\n' +
        '          However, infrastructure as code, last mile configuration, training and secure images\n' +
        '          involve additional support. Additionally, third-party software vendors may require\n' +
        '          licenses depending on the feature set your mission needs. <a href="/contact" style="color: #76a9fa;">Our mission experts are available to support with pricing and contracting</a>.'
    },
    {
      question: 'Can I deploy an app on UDS that is not currently in the app store?',
      answer:
        ' Yes, you can deploy an application that is not in the UDS app store. UDS supports custom\n' +
        '          deployments, allowing users to integrate their own applications into the platform,\n' +
        '          provided they follow the UDS packaging guidelines and are compatible with the underlying\n' +
        '          Kubernetes environment. If you need help or want to request an application please reach\n' +
        '          out <a href="/contact" style="color: #76a9fa;">here</a>.'
    },
    {
      question: 'Is UDS an extension of Platform One’s Big Bang?',
      answer:
        ' Yes, UDS is an extension of Big Bang. UDS builds upon the security posture established by\n' +
        '          Platform One’s Big Bang, by adding enhanced automation features through the UDS Operator\n' +
        '          and UDS Policy Engine. While Big Bang focuses on deploying secure, compliant\n' +
        '          infrastructure, UDS strengthens and extends Big Bang’s functionality, providing more\n' +
        '          automation and security features specifically tailored for application deployment and\n' +
        '          policy management. UDS can be found in <a target="_blank" href="https://repo1.dso.mil/platform-one/distros/defense-unicorns/uds-core" style="color: #76a9fa;">Platform One’s Repo1.</a>'
    }
  ];
</script>

<div class="flex w-full flex-col items-center gap-12 bg-gray-800 px-6 py-12 md:w-[90rem] md:py-24">
  <div id="faq-title" class=" text-4xl font-extrabold leading-tight">
    Frequently asked questions
  </div>

  <Accordion flush class="w-full  md:w-[43.4375rem]">
    {#each faqItems as faqItem}
      <CustomAccordionItem question={faqItem.question} answer={faqItem.answer} />
    {/each}
  </Accordion>

  <a
    type="button"
    class="mb-2 me-2 rounded-lg border border-gray-800 px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-800"
    target="_blank"
    href="https://uds.defenseunicorns.com/">View UDS Documentation</a
  >
</div>
