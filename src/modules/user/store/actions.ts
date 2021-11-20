import { ActionTree } from "vuex";
import { IState } from "@/store";
import { IUserState } from "./state";
import api from "@/services/api";
import { getLocalToken } from "@/helpers/storage";

const actions: ActionTree<IUserState, IState> = {
  async ActionCreateOrUpdate(
    _,
    { vm, method, url, body, snackbarOptions, forceRerender }
  ) {
    try {
      vm.isBtnLoading = true;
      const apiResponse = await api({
        method: method,
        url: url,
        data: body,
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
    } catch (error) {
      console.log(error);
    } finally {
      vm.isBtnLoading = false;
    }
  },
  async ActionGetProducts({ commit }) {
    return await api({
      method: "GET",
      url: "/products/",
      headers: {
        Authorization: `Bearer ${getLocalToken()?.toString()}`,
      },
    }).then((products) => {
      commit("USER/GET_PRODUCTS", products.data);
    });
  },
};

export default actions;
