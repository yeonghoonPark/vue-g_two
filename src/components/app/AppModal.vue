<template>
  <Transition>
    <div v-if="modelValue">
      <div class="modal-backdrop fade show" />
      <div
        class="modal fade show d-block"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <slot name="header">
                <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  @click="$emit('update:modelValue', false)"
                ></button>
              </slot>
            </div>
            <div class="modal-body">
              <slot name="default" />
            </div>
            <div class="modal-footer">
              <slot name="actions" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const porps = defineProps({
  // show: {
  //   type: Boolean,
  // },
  modelValue: {
    type: Boolean,
  },
  title: {
    type: String,
    default: "Give Me a Title",
  },
});

const emits = defineEmits(["update:modelValue"]);
</script>

<style scoped>
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease-out;
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
}
</style>
