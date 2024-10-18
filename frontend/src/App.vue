<script setup lang="ts">
import ViewTitle from '@/components/ViewTitle.vue';
import NavigationBar from '@/components/NavigationBar.vue';
</script>

<template>
  <ViewTitle />
  <NavigationBar />
  <RouterView />
</template>
