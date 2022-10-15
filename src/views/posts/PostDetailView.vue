<template>
  <div>
    <h2>{{ selectedPost.title }}</h2>
    <p>{{ selectedPost.content }}</p>
    <p class="text-muted">
      {{
        $dayjs(selectedPost.createdAt).format("YYYY년 MM월 DD일 HH시 mm분 ss초")
      }}
    </p>
    <hr class="my-4" />
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
        <button class="btn btn-outline-danger" @click="deletePostById">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getPostsById, deletePost } from "../../api/posts";

const props = defineProps({
  id: [Number, String],
});

const router = useRouter();
// const route = useRoute();
// const id = route.params.id;
const selectedPost = ref({
  title: null,
  content: null,
  createdAt: null,
});

const setPost = ({ title, content, createdAt }) => {
  selectedPost.value.title = title;
  selectedPost.value.content = content;
  selectedPost.value.createdAt = createdAt;
};

const findPost = async () => {
  try {
    const { data } = await getPostsById(props.id);
    setPost(data);
    // ({ data: selectedPost.value } = await getPostsById(props.id));
  } catch (error) {
    console.error(error);
  }
};
findPost();

const deletePostById = async () => {
  try {
    if (confirm("Are you sure you want to delete it?") === false) {
      return;
    }
    await deletePost(props.id);
    goListPage();
  } catch (error) {
    console.error(error);
  }
};

const goListPage = () => router.push({ name: "PostList" });
const goEditPage = () =>
  router.push({ name: "PostEdit", params: { id: props.id } });
</script>

<style lang="scss" scoped></style>
