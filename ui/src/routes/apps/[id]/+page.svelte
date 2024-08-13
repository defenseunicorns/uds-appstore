<script lang="ts">
  import type { PageData } from './$types';
  import { Tabs, TabItem } from 'flowbite-svelte';

  export let data: PageData;
</script>

<h1>{data.app.metadata.name}</h1>

<Tabs tabStyle="underline" contentClass="p-4 mt-4">
  <TabItem open title="Product Overview">
    <div class="grid grid-cols-5">
      <p class="col-span-3">
        {data.app.spec.description}
      </p>
      <div class="col-span-2">
        <div class="max-h-full rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:p-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Contracting Details</h2>

          <div class="mt-2 divide-y divide-gray-200 dark:divide-gray-700 dark:border-gray-800">
            <dl class="flex items-center justify-between gap-4 py-2">
              <dt class="text-sm font-medium text-gray-900 dark:text-white">Contracting Number</dt>
              <dd class="text-sm font-normal text-gray-500 dark:text-gray-400">-</dd>
            </dl>

            <dl class="flex items-center justify-between gap-4 py-2">
              <dt class="text-sm font-medium text-gray-900 dark:text-white">Pricing Model</dt>
              <dd class="text-sm font-normal text-gray-500 dark:text-gray-400">-</dd>
            </dl>

            <dl class="flex items-center justify-between gap-4 py-2">
              <dt class="text-sm font-medium text-gray-900 dark:text-white">License</dt>
              <dd class="text-sm font-normal text-gray-500 dark:text-gray-400">-</dd>
            </dl>

            <dl class="flex items-center justify-between gap-4 py-2">
              <dt class="text-sm font-medium text-gray-900 dark:text-white">Small Business Status</dt>
              <dd class="text-sm font-normal text-gray-500 dark:text-gray-400">-</dd>
            </dl>

            <dl class="flex items-center justify-between gap-4 py-2">
              <dt class="text-sm font-medium text-gray-900 dark:text-white">Delivery Timeline</dt>
              <dd class="text-sm font-normal text-gray-500 dark:text-gray-400">-</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </TabItem>
  <TabItem title="Security & Compliance">
  </TabItem>
  <TabItem title="Package Config">
  </TabItem>
  <TabItem title="Contracting Info">
  </TabItem>
</Tabs>

