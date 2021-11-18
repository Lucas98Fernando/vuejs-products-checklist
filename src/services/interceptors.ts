import api from "./api";
import { removeLocalToken } from "@/helpers/storage";

const interceptors = (vm: any) =>
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 400) {
        vm.$root.$emit("show-base-dialog", {
          srcImg: require("@/assets/images/illustrations/waiting.png"),
          titleMessage: "Atenção!",
          bodyMessage: error.response.data.message,
          colorText: "red",
        });
      } else if (error.response.status === 403) {
        vm.$root.$emit("show-base-dialog", {
          srcImg: require("@/assets/images/illustrations/waiting.png"),
          titleMessage: "Não autorizado!",
          bodyMessage: error.response.data.error,
          colorText: "red",
        });
      } else if (error.response.status === 404) {
        vm.$root.$emit("show-base-dialog", {
          srcImg: require("@/assets/images/illustrations/page-not-found.png"),
          titleMessage: "O recurso solicitado não foi encontrado!",
          bodyMessage: error.response.data.error,
          colorText: "red",
        });
      } else {
        removeLocalToken();
        vm.$router.replace("/login");
        vm.$root.$emit("show-base-dialog", {
          srcImg: require("@/assets/images/illustrations/waiting.png"),
          titleMessage: "Ocorreu um erro",
          bodyMessage: error.response.data.error,
          colorText: "red",
        });
      }
      return Promise.reject(error);
    }
  );

export default interceptors;
