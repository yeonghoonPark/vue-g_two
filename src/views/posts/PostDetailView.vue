<template>
  <AppLoading v-if="isLoading" />

  <AppError v-else-if="errorMessage" :message="errorMessage" />

  <div v-else>
    <h2>{{ selectedPost.title }}</h2>
    <p>{{ selectedPost.content }}</p>
    <p class="text-muted">
      {{
        $dayjs(selectedPost.createdAt).format("YYYY년 MM월 DD일 HH시 mm분 ss초")
      }}
    </p>
    <hr class="my-4" />
    <AppError v-if="deleteErrorMessage" :message="deleteErrorMessage" />
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-dark">Previous</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark">Next</button>
      </div>
      <div class="col-auto me-auto"></div>
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="goListPage">List</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-primary" @click="goEditPage">
          Edit
        </button>
      </div>
      <div class="col-auto">
        <button
          class="btn btn-outline-danger"
          @click="deletePostById"
          :disabled="deleteIsLoading"
        >
          <template v-if="deleteIsLoading">
            <span
              class="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Loading...</span>
          </template>
          <template v-else> Delete </template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
/* vue */
import { ref } from "vue";

/* router */
import { useRoute, useRouter } from "vue-router";

/* api */
import { getPostsById, deletePost } from "../../api/posts";
import { useAxios } from "../../composables/useAxios";

// appLoading, appError
// const errorMessage = ref(null);
// const isLoading = ref(false);

const props = defineProps({
  id: [Number, String],
});

const router = useRouter();
// const route = useRoute();
// const id = route.params.id;
// const selectedPost = ref({
//   title: null,
//   content: null,
//   createdAt: null,
// });

const setPost = ({ title, content, createdAt }) => {
  selectedPost.value.title = title;
  selectedPost.value.content = content;
  selectedPost.value.createdAt = createdAt;
};

const {
  errorMessage,
  isLoading,
  data: selectedPost,
} = useAxios(`/posts/${props.id}`);

// const findPost = async () => {
//   try {
//     isLoading.value = true;
//     const { data } = await getPostsById(props.id);
//     setPost(data);
//     // ({ data: selectedPost.value } = await getPostsById(props.id));
//   } catch (error) {
//     console.error(error);
//     errorMessage.value = error;
//   } finally {
//     isLoading.value = false;
//   }
// };
// findPost();

// deleteAppLoading, deleteAppError
const deleteErrorMessage = ref(null);
const deleteIsLoading = ref(false);
const deletePostById = async () => {
  try {
    if (confirm("Are you sure you want to delete it?") === false) {
      return;
    }
    deleteIsLoading.value = true;
    await deletePost(props.id);
    goListPage();
  } catch (error) {
    console.error(error);
    deleteErrorMessage.value = error;
  } finally {
    deleteIsLoading.value = false;
  }
};

const goListPage = () => router.push({ name: "PostList" });
const goEditPage = () =>
  router.push({ name: "PostEdit", params: { id: props.id } });
</script>

<style lang="scss" scoped></style>
