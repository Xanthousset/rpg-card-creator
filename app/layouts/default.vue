<template>
  <UDashboardGroup>
    <UDashboardSidebar  class="hidden md:block bg-shark-800" >
      <SidebarNav/>
      <Settings/>
    </UDashboardSidebar>

    <MobileSideBar />

    <UDashboardPanel class="bg-shark-950">
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
