<template>
  <form @submit.prevent>
    <div class="row g-3">
      <div class="col">
        <input
          :value="inputValue"
          @input="$emit('update:inputValue', $event.target.value)"
          type="text"
          class="form-control"
        />
      </div>
      <div class="col-3">
        <select
          :value="selectValue"
          @input="$emit('update:selectValue', $event.target.value)"
          class="form-select"
        >
          <option value="3">3 Units</option>
          <option value="6">6 Units</option>
          <option value="9">9 Units</option>
        </select>
      </div>
    </div>
  </form>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  inputValue: {
    type: String,
  },
  selectValue: {
    type: String,
  },
});

const emits = defineEmits(["update:inputValue", "update:selectValue"]);
</script>

<style lang="scss" scoped></style>
