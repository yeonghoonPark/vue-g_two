<template>
  <div class="text-center text-danger py-4">
    {{ message }}
  </div>
</template>

<script setup>
const props = defineProps({
  message: {
    type: String,
  },
});
</script>
