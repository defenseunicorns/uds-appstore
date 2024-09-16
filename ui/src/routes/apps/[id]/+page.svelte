<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- SPDX-FileCopyrightText: 2024-Present The UDS Authors -->

<script lang="ts">
	import { AppDetails } from '$lib/features';
	import { page } from '$app/stores';
	const id = $page.data.id;
</script>

<AppDetails {id} />
