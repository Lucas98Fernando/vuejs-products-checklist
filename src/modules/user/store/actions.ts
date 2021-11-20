import { ActionTree } from "vuex";
import { IState } from "@/store";
import { IUserState } from "./state";
import { getLocalToken, removeLocalToken, setLocalToken } from "@/helpers/storage";
import api from "@/services/api";

const actions: ActionTree<IUserState, IState> = {
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
