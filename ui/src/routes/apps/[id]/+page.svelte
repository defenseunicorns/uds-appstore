<script lang="ts">
	import { AppDetails } from '$lib/features/views';
	import { page } from '$app/stores';

	const id = $page.data.id;
</script>

<AppDetails {id} />
