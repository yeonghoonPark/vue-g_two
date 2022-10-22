import axios from "axios";
import { isRef, ref, unref, watchEffect } from "vue";

// axios의 defaults속성을 이용하면 전체적으로 적용이 된다.
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

const defaultConfig = {
  method: "get",
};

export const useAxios = (url, config = {}) => {
  const response = ref(null);
  const data = ref(null);
  const errorMessage = ref(null);
  const isLoading = ref(false);

  const { params } = config;

  const execute = () => {
    data.value = null;
    errorMessage.value = null;
    isLoading.value = true;
    axios(url, {
      ...defaultConfig,
      ...config,
      params: unref(params),
    })
      .then((res) => {
        response.value = res;
        data.value = res.data;
      })
      .catch((error) => {
        errorMessage.value = error;
      })
      .finally(() => {
        isLoading.value = false;
      });
  };

  if (isRef(params)) {
    watchEffect(execute);
  } else {
    execute();
  }

  return {
    response,
    data,
    errorMessage,
    isLoading,
  };
};
