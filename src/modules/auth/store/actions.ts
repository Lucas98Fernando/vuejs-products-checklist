import { ActionTree } from "vuex";
import { IState } from "@/store";
import { IAuthState } from "./state";
import { removeLocalToken, setLocalToken } from "@/helpers/storage";
import api from "@/services/api";

const actions: ActionTree<IAuthState, IState> = {
  async ActionRegister(_, { vm, payload }) {
    try {
      vm.isBtnLoading = true;
      const response = await api.post("/register", payload);
      if (response.status === 201) {
        vm.$root.$emit("show-base-snackbar", {
          color: "success",
          icon: "mdi-checkbox-marked-circle-outline",
          message: "Cadastro realizado com sucesso!",
        });
        vm.$router.push("/auth/login");
      }
    } catch (error) {
      vm.$root.$emit("show-base-snackbar", {
        color: "error",
        icon: "mdi-alert-circle-outline",
        message: "Não foi possível realizar o cadastro",
      });
    } finally {
      vm.isBtnLoading = false;
    }
  },
  async ActionLogin({ dispatch }, { vm, payload }) {
    try {
      vm.isBtnLoading = true;
      const response = await api.post("/login", payload);

      await dispatch("ActionSetToken", response.data.token);
    } catch (error) {
      vm.$root.$emit("show-base-snackbar", {
        color: "error",
        icon: "mdi-alert-circle-outline",
        message: "Não foi possível realizar o login",
      });
    } finally {
      vm.isBtnLoading = false;
      vm.$router.push("/");
    }
  },
  ActionLogout() {
    removeLocalToken();
  },
  ActionSetToken({ commit }, token) {
    commit("AUTH/SET_TOKEN", token);
    setLocalToken(token);
  },
};

export default actions;
