<template>
  <TheHeader />
  <TheView />
  <!-- TransitionGroup -->
  <AppAlert :items="alerts" />
</template>

<script setup>
import TheHeader from "@/layouts/TheHeader.vue";
import TheView from "@/layouts/TheView.vue";
import { useAlert } from "@/composables/useAlert";

const { alerts } = useAlert();
</script>

<style scoped></style>
