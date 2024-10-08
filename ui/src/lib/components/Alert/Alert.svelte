<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- SPDX-FileCopyrightText: 2024-Present The UDS Authors -->

<script lang="ts">
  import { getAlertColorClasses } from './alertHelpers';

  export let color: string = 'dark';
  export let title: string = '';
  export let message: string = '';
  export let border: boolean = false;
  export let id: string = 'alert-' + Math.random().toString(36).slice(2, 11);

  let borderClass = border ? 'border' : '';
  let colorClasses: string;

  $: colorClasses = getAlertColorClasses(color);
</script>

<div {id} class="mb-4 rounded-lg {borderClass} p-4 {colorClasses}" role="alert">
  <div class="flex items-center gap-3">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="currentColor"
      preserveAspectRatio="xMidYMid meet"
      width="16"
      height="16"
      aria-hidden="true"
      class="h-5 w-5"
      ><path
        d="M17 22L17 14 13 14 13 16 15 16 15 22 12 22 12 24 20 24 20 22 17 22zM16 8a1.5 1.5 0 101.5 1.5A1.5 1.5 0 0016 8z"
      ></path><path
        d="M16,30A14,14,0,1,1,30,16,14,14,0,0,1,16,30ZM16,4A12,12,0,1,0,28,16,12,12,0,0,0,16,4Z"
      ></path></svg
    >
    <h3 class="text-lg font-medium">{title}</h3>
  </div>
  <div class="mb-4 mt-2 text-sm">
    {message}
  </div>
  <slot />
</div>
