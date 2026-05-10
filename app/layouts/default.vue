<template>
  <UDashboardGroup>
    <UDashboardSidebar  class="hidden md:block bg-gray" >
      <SidebarNav/>
      <Settings/>
    </UDashboardSidebar>

    <MobileSideBar class="block md:hidden" />

    <UDashboardPanel class="bg-black">
      <slot />
    </UDashboardPanel>
  </UDashboardGroup>
</template>

<script setup lang="ts">
import SidebarNav from "~/components/Nav/SidebarNav.vue";
import MobileSideBar from "~/components/Nav/MobileSideBar.vue";
import Settings from "~/components/Settings/Settings.vue";
</script>


<style scoped>

</style>
