<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- SPDX-FileCopyrightText: 2024-Present The UDS Authors -->
<script lang="ts">
	export let key: string;
	export let value: string;
</script>

<dl class="flex items-center justify-between gap-4 py-2">
	<dt class="text-sm font-medium text-gray-900 dark:text-white">{key}</dt>
	<dd class="text-sm font-normal text-gray-500 dark:text-gray-400">{value || '-'}</dd>
</dl>
