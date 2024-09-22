<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- SPDX-FileCopyrightText: 2024-Present The UDS Authors -->

<script lang="ts">
	import { getButtonClasses, type Size } from './buttonHelpers';

	export let size: Size = 'md';
	export let color: string = 'default';
	export let disabled: boolean = false;

	let classes: string;
	let sizeClasses: string;
	let colorClasses: string;
	let iconSize: string;

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { $$scope: _, $$slots: slots, class: classProp, href, ...restProps } = $$props;

	export function getIconSize(): string {
		return iconSize;
	}

	$: ({ sizeClasses, colorClasses, iconSize } = getButtonClasses(size, color, disabled));
	$: {
		classes = `${sizeClasses} ${colorClasses} font-medium text-center rounded-lg inline-flex items-center justify-center gap-2 ${classProp || ''}`;
	}
</script>

{#if href && !disabled}
	<a
		{...restProps}
		{href}
		aria-disabled={disabled}
		role="button"
		tabindex={disabled ? -1 : 0}
		class={classes}
		on:click
		on:mouseover
		on:mouseenter
		on:mouseleave
		on:focus
		on:blur
	>
		{#if slots.iconLeft}
			<div class={iconSize}>
				<slot name="iconLeft" />
			</div>
		{/if}
		<div>
			<slot />
		</div>
		{#if slots.iconRight}
			<div class={iconSize}>
				<slot name="iconRight" />
			</div>
		{/if}
	</a>
{:else}
	<button
		{...restProps}
		type="button"
		class={classes}
		aria-disabled={disabled}
		{disabled}
		on:click
		on:mouseover
		on:mouseenter
		on:mouseleave
		on:focus
		on:blur
	>
		{#if slots.iconLeft}
			<div class={iconSize}>
				<slot name="iconLeft" />
			</div>
		{/if}
		<div>
			<slot />
		</div>
		{#if slots.iconRight}
			<div class={iconSize}>
				<slot name="iconRight" />
			</div>
		{/if}
	</button>
{/if}
