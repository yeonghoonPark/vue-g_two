import axios from "axios";
import { isRef, ref, unref, watchEffect } from "vue";

// axios의 defaults속성을 이용하면 전체적으로 적용이 된다.
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

const defaultConfig = {
  method: "get",
};

const defaultOptions = {
  immediate: true,
};

export const useAxios = (url, config = {}, options = {}) => {
  const response = ref(null);
  const data = ref(null);
  const errorMessage = ref(null);
  const isLoading = ref(false);

  const { onSuccess, onError, immediate } = { ...defaultOptions, ...options };

  const { params } = config;

  const execute = (body) => {
    data.value = null;
    errorMessage.value = null;
    isLoading.value = true;
    axios(unref(url), {
      ...defaultConfig,
      ...config,
      params: unref(params),
      data: typeof body === "object" ? body : {},
    })
      .then((res) => {
        response.value = res;
        data.value = res.data;
        if (onSuccess) onSuccess(res);
      })
      .catch((error) => {
        errorMessage.value = error;
        if (onError) onError(error);
      })
      .finally(() => {
        isLoading.value = false;
      });
  };

  if (isRef(params) || isRef(url)) {
    watchEffect(execute);
  } else {
    if (immediate) execute();
  }

  return {
    response,
    data,
    errorMessage,
    isLoading,
    execute,
  };
};
