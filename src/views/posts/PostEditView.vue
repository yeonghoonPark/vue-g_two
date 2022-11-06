<template>
  <AppLoading v-if="isLoading" />

  <AppError v-else-if="errorMessage" :message="errorMessage" />

  <div v-else>
    <h2>Edit</h2>
    <hr class="my-4" />
    <AppError v-if="editErrorMessage" :message="editErrorMessage" />
    <PostForm
      v-model:title="selectedPostById.title"
      v-model:content="selectedPostById.content"
      @submit.prevent="editPostsById"
    >
      <template #actions>
        <button
          type="button"
          class="btn btn-outline-danger me-2"
          @click="goDetailPage()"
        >
          Cancel
        </button>
        <button class="btn btn-primary" :disabled="editIsLoading">
          <template v-if="editIsLoading">
            <span
              class="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Loading...</span>
          </template>
          <template v-else> Edit </template>
        </button>
      </template>
    </PostForm>
  </div>
  <!-- Transition -->
  <!-- <AppAlert :show="showAlert" :message="alertMessage" :type="alertType" /> -->
</template>

<script setup>
/* vue */
import { ref } from "vue";

/* router */
import { useRouter } from "vue-router";

/* api */
import { getPostsById, updatePost } from "../../api/posts";

/* components */
import PostForm from "../../components/posts/PostForm.vue";

/* composables */
import { useAlert } from "../../composables/useAlert";
import { useAxios } from "../../composables/useAxios";

/* alert Transition */
// const showAlert = ref(false);
// const alertMessage = ref("");
// const alertType = ref("");
// const vAlert = (message, type = "error") => {
//   showAlert.value = true;
//   alertMessage.value = message;
//   alertType.value = type;
//   setTimeout(() => {
//     showAlert.value = false;
//   }, 2000);
// };

// appLoading, appError
// const errorMessage = ref(null);
// const isLoading = ref(false);

const { vAlert, vSuccess } = useAlert();

const router = useRouter();

const props = defineProps({
  id: {
    type: Number,
  },
});

// const selectedPostById = ref({
//   title: null,
//   content: null,
// });

const setPostById = ({ title, content }) => {
  selectedPostById.value.title = title;
  selectedPostById.value.content = content;
};

const {
  errorMessage,
  isLoading,
  data: selectedPostById,
} = useAxios(`/posts/${props.id}`);

const {
  errorMessage: editErrorMessage,
  isLoading: editIsLoading,
  execute,
} = useAxios(
  `/posts/${props.id}`,
  { method: "patch" },
  {
    immediate: false,
    onSuccess: () => {
      vSuccess("Modification is complete");
      goDetailPage();
    },
    onError: (error) => {
      console.error(error);
      vAlert("Network Error");
    },
  },
);

// const printPostsById = async () => {
//   try {
//     isLoading.value = true;
//     const { data } = await getPostsById(props.id);
//     setPostById(data);
//     // ({ data: selectedPost.value } = await getPostsById(props.id));
//   } catch (error) {
//     console.error(error);
//     vAlert("Network Error");
//     errorMessage.value = error;
//   } finally {
//     isLoading.value = false;
//   }
// };
// printPostsById();

// editAppLoading, editAppError
// const editErrorMessage = ref(null);
// const editIsLoading = ref(false);
const editPostsById = async () => {
  execute({ ...selectedPostById.value });
};

// const editPostsById = async () => {
//   try {
//     editIsLoading.value = true;
//     await updatePost(props.id, { ...selectedPostById.value });
//     vSuccess("Modification is complete");
//     goDetailPage();
//   } catch (error) {
//     console.error(error);
//     vAlert("Network Error");
//     editErrorMessage.value = error;
//   } finally {
//     editIsLoading.value = false;
//   }
// };

const goDetailPage = () =>
  router.push({ name: "PostDetail", params: { id: props.id } });
</script>

<style lang="scss" scoped></style>
