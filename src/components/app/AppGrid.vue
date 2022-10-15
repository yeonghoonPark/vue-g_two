<template>
  <div class="row g-3">
    <div :class="colClass" v-for="(item, index) in items" :key="index">
      <slot :item="item" :index="index" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: [Array, Object],
    required: true,
  },
  colClass: {
    type: String,
    default: "col-4",
  },
});
</script>

<style lang="scss" scoped></style>
