<template>
  <AppModal v-model="show">
    <template #default>
      <div class="row g-3">
        <div class="col-3 text-muted">Title</div>
        <div class="col-9">{{ title }}</div>
        <div class="col-3 text-muted">Content</div>
        <div class="col-9">{{ content }}</div>
        <div class="col-3 text-muted">CreatedAt</div>
        <div class="col-9">
          {{ $dayjs(createdAt).format("YYYY년 MM월 DD일 HH시 mm분 ss초") }}
        </div>
      </div>
    </template>
    <template #actions>
      <button type="button" class="btn btn-secondary" @click="closeModal">
        Close
      </button>
    </template>
  </AppModal>
</template>

<script setup>
import { computed } from "vue";
// import AppModal from "../app/AppModal.vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: [String, Number],
  },
});

const emits = defineEmits(["update:modelValue"]);

const show = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});

const closeModal = () => {
  show.value = false;
};
</script>

<style scoped></style>
