<template>
  <!-- Transition -->
  <!-- <Transition name="slide">
    <div v-if="show" class="app-alert alert" :class="typeStyle" role="alert">
      {{ message }}
    </div>
  </Transition> -->
  <div class="app-alert">
    <TransitionGroup name="slide">
      <div
        v-for="({ message, type }, index) in alerts"
        :key="index"
        class="alert"
        :class="typeStyle(type)"
        role="alert"
      >
        {{ message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { useAlert } from "../../composables/useAlert";

// TranstionGroup
// const props = defineProps({
//   items: {
//     type: Array,
//   },
// });

const { alerts } = useAlert();

const typeStyle = (type) =>
  type === "error" ? "alert-danger" : "alert-success";

// Transition
// const props = defineProps({
//   show: {
//     type: Boolean,
//     default: false,
//   },
//   message: {
//     type: String,
//     default: "",
//   },
//   type: {
//     type: String,
//     default: "error",
//     // validator: (value) => ["success", "error"].includes(value),
//   },
// });
// const typeStyle = computed(() =>
//   props.type === "error" ? "alert-danger" : "alert-success",
// );
</script>

<style scoped>
.app-alert {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* .v-enter-from,
.v-leave-to {
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  transition: 0.5s ease;
}
.v-enter-to,
.v-leave-from {
  opacity: 1;
} */

.slide-enter-from,
.slide-leave-to {
  transform: translate(-50%, -80%);
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease-out;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateY(-50%, -50%);
  opacity: 1;
}
</style>
