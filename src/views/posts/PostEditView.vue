<template>
  <div>
    <h2>Edit</h2>
    <hr class="my-4" />
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
        <button class="btn btn-primary">Edit</button>
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
// import AppAlert from "../../components/app/AppAlert.vue";

/* composables */
import { useAlert } from "../../composables/alert";

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

const { vAlert, vSuccess } = useAlert();

const router = useRouter();

const props = defineProps({
  id: {
    type: Number,
  },
});

const selectedPostById = ref({
  title: null,
  content: null,
});

const setPostById = ({ title, content }) => {
  selectedPostById.value.title = title;
  selectedPostById.value.content = content;
};

const printPostsById = async () => {
  try {
    const { data } = await getPostsById(props.id);
    setPostById(data);
    // ({ data: selectedPost.value } = await getPostsById(props.id));
  } catch (error) {
    console.error(error);
    vAlert("Network Error");
  }
};
printPostsById();

const editPostsById = async () => {
  try {
    await updatePost(props.id, { ...selectedPostById.value });
    vSuccess("Modification is complete");
    goDetailPage();
  } catch (error) {
    console.error(error);
    vAlert("Network Error");
  }
};

const goDetailPage = () =>
  router.push({ name: "PostDetail", params: { id: props.id } });
</script>

<style lang="scss" scoped></style>
