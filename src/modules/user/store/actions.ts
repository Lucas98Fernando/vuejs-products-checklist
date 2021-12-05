import { ActionTree } from "vuex";
import { IState } from "@/store";
import { IUserState } from "./state";
import api from "@/services/api";
import { getLocalToken } from "@/helpers/storage";

const actions: ActionTree<IUserState, IState> = {
  async ActionCrud(
    _,
    { vm, method, url, body, snackbarOptions, forceRerender }
  ) {
    try {
      vm.isBtnLoading = true;
      const apiResponse = await api({
        method: method,
        url: url,
        data: body,
        headers: {
          Authorization: `Bearer ${getLocalToken()}`,
        },
      });
      vm.dialog = false;
      if (apiResponse.status === 200 || apiResponse.status === 201) {
        vm.$root.$emit("show-base-snackbar", {
          color: "green",
          icon: "mdi-check-circle",
          message: snackbarOptions.message,
        });
        forceRerender();
      }
    } catch {
      if (method === "PATCH") {
        forceRerender();
      }
    } finally {
      vm.isBtnLoading = false;
    }
  },
  async ActionGetProducts({ commit }) {
    return await api({
      method: "GET",
      url: "/products",
      headers: {
        Authorization: `Bearer ${getLocalToken()}`,
      },
    }).then((products) => {
      commit("USER/GET_PRODUCTS", products.data);
    });
  },
};

export default actions;
