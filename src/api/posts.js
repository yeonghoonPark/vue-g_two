// import axios from "axios";
import { posts } from ".";

// const url = "http://localhost:5000/posts";
export function getPosts(params) {
  // return axios.get(url, { params });
  return posts.get("/", { params });
}

export function getPostsById(id) {
  // return axios.get(`${url}/${id}`);
  return posts.get(`/${id}`);
}

export function createPost(data) {
  // return axios.post(url, data);
  return posts.post("/", data);
}

// export function updatePost(id, data) {
//   // return axios.put(`${url}/${id}`, data);
//   return posts.put(`/${id}`, data);
// }

export function updatePost(id, data) {
  // return axios.put(`${url}/${id}`, data);
  return posts.patch(`/${id}`, data);
}

export function deletePost(id) {
  // return axios.delete(`${url}/${id}`);
  return posts.delete(`/${id}`);
}
