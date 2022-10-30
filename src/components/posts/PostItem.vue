<template>
  <AppCard>
    <h5 class="card-title">{{ title }}</h5>
    <p class="card-text">{{ content }}</p>
    <p class="text-muted">{{ createdDate }}</p>
    <template #footer>
      <div class="d-flex flex-row-reverse">
        <button class="btn p-1" @click.stop="$emit('modal')">
          <i class="bi bi-emoji-sunglasses" />
        </button>
        <button class="btn p-1 me-2" @click.stop="$emit('preview')">
          <i class="bi bi-asterisk" />
        </button>
      </div>
    </template>
  </AppCard>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { defineProps, defineEmits, inject } from "vue";
// import AppCard from "../app/AppCard.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: [String, Date, Number],
  },
});

const emits = defineEmits(["modal", "preview"]);
const dayjs = inject("dayjs");
const createdDate = computed(() =>
  dayjs(props.createdAt).format("YYYY년 MM월 DD일 HH시 mm분 ss초"),
);
</script>

<style lang="scss" scoped></style>
