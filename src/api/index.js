import axios from "axios";

const create = (baseURL, options) => {
  // 1번 방식과 2번 방식은 동일하다.
  // 1
  // const instance = axios.create({
  //   baseURL: baseURL,
  //   ...options,
  // });
  // 2
  const instance = axios.create(Object.assign({ baseURL }, options));
  return instance;
};

// development : http://localhost:5000/posts
export const posts = create(`${import.meta.env.VITE_APP_API_URL}posts`);

// production : http://localhost:6000/posts
