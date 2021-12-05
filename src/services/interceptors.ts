import api from "./api";
import { removeAllStorageData } from "@/helpers/storage";

const interceptors = (vm: any) =>
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      switch (error.response.status) {
        case 400:
          vm.$root.$emit("show-base-dialog", {
            srcImg: require("@/assets/images/illustrations/waiting.png"),
            titleMessage: "Atenção!",
            bodyMessage: error.response.data.message,
            colorText: "red",
          });
          break;
        case 401:
          removeAllStorageData();
          vm.$router.replace("/auth/login");
          vm.$root.$emit("show-base-dialog", {
            srcImg: require("@/assets/images/illustrations/comeback.png"),
            titleMessage: "Credenciais inválidas",
            bodyMessage: error.response.data.message,
            colorText: "red",
          });
          break;
        case 403:
          vm.$root.$emit("show-base-dialog", {
            srcImg: require("@/assets/images/illustrations/waiting.png"),
            titleMessage: "Não autorizado!",
            bodyMessage: error.response.data.error,
            colorText: "red",
          });
          break;
        case 404:
          vm.$root.$emit("show-base-dialog", {
            srcImg: require("@/assets/images/illustrations/page-not-found.png"),
            titleMessage: "O recurso solicitado não foi encontrado!",
            bodyMessage: error.response.data.error,
            colorText: "red",
          });
          break;
        default:
          removeAllStorageData();
          vm.$router.replace("/auth/login");
          vm.$root.$emit("show-base-dialog", {
            srcImg: require("@/assets/images/illustrations/waiting.png"),
            titleMessage: "Ocorreu um erro",
            bodyMessage: error.response.data.error,
            colorText: "red",
          });
          break;
      }
      return Promise.reject(error);
    }
  );

export default interceptors;
