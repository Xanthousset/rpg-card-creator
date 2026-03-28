<template>
  <UDashboardGroup>
    <UDashboardSidebar class="bg-shark-800" >
      <SidebarNav/>
      <Settings/>
    </UDashboardSidebar>
    <UDashboardPanel class="bg-shark-950">
      <slot />
    </UDashboardPanel>
  </UDashboardGroup>
</template>

<script setup lang="ts">
import SidebarNav from "~/components/Nav/SidebarNav.vue";
import Settings from "~/components/Settings/Settings.vue";
</script>


<style scoped>

</style>
