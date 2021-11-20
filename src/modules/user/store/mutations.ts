import { MutationTree } from "vuex";
import { IUserState } from "./state";

const mutations: MutationTree<IUserState> = {
  "USER/GET_PRODUCTS"(state: IUserState, payload) {
    state.productsApi = payload;
  },
};

export default mutations;
