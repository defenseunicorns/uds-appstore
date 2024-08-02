<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- SPDX-FileCopyrightText: 2024-Present The UDS Authors -->

<script lang="ts">
  import { NotificationFilled } from 'carbon-icons-svelte';
  import { Button, DarkMode, Dropdown, DropdownHeader, Navbar, NavBrand, NavHamburger } from 'flowbite-svelte';

  export let sidebarHidden = false;
</script>

<Navbar fluid={true}>
  <NavHamburger onClick={() => (sidebarHidden = !sidebarHidden)} class="m-0 me-3 md:block lg:hidden" />
  <NavBrand href="/">
    <img src="/images/doug.svg" class="me-2.5 h-6 sm:h-8" alt="UDS Marketplace Logo" />
    <span class="ml-px self-center whitespace-nowrap text-xl font-semibold sm:text-2xl dark:text-white"
      >UDS Marketplace</span
    >
  </NavBrand>
  <div class="ms-auto flex items-center text-gray-500 sm:order-2 dark:text-gray-400">
    <DarkMode />
    <Button id="notification-dropdown">
      <NotificationFilled class="h-f6 w-6" />
    </Button>
    <Dropdown placement="bottom" triggeredBy="#notification-dropdown">
      <DropdownHeader>
        <span class="block text-sm">Notifications</span>
      </DropdownHeader>
    </Dropdown>
  </div>
</Navbar>
