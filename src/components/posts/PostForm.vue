<template>
  <form>
    <div class="mb-3">
      <label for="title" class="form-label">Title</label>
      <!-- v-model="savedList.title" -->
      <input
        v-focus
        v-color="'blue'"
        :value="title"
        @input="$emit('update:title', $event.target.value)"
        type="text"
        class="form-control"
        id="title"
      />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">Content</label>
      <!-- v-model="savedList.content" -->
      <textarea
        :value="content"
        @input="$emit('update:content', $event.target.value)"
        class="form-control"
        id="content"
        rows="3"
      ></textarea>
    </div>
    <slot name="actions">
      <div class="d-flex gap-2 mt-4"></div>
    </slot>
  </form>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

// const vFocus = {
//   mounted: (el) => el.focus(),
// };

const props = defineProps({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
});

const emits = defineEmits(["update:title", "update:content"]);
</script>

<style lang="scss" scoped></style>
