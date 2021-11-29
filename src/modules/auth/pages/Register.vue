<template>
  <v-form ref="form" v-model="isFormValid" lazy-validation>
    <base-logo class="mb-3" width="80" />

    <div class="text-center mb-3">
      <h2 class="mb-2 primary--text">Cadastro</h2>
      <p>Faça o seu cadastro no Products Checklist</p>
    </div>

    <base-text-field
      v-model="user.name"
      label="Nome"
      prepend-inner-icon="mdi-account"
      validation-type="simple"
    />

    <base-text-field
      v-model="user.email"
      label="E-mail"
      prepend-inner-icon="mdi-email"
      validation-type="email"
    />

    <base-text-field-password v-model="user.password" label="Senha" />

    <v-btn
      :disabled="!isFormValid"
      :loading="isBtnLoading"
      light
      block
      large
      color="yellow"
      @click="validateForm() ? register() : validateForm()"
    >
      Criar conta
    </v-btn>

    <div class="text-center mt-3">
      Já possui conta ? <router-link to="/auth/login">Entrar</router-link>
    </div>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import BaseLogo from "@/shared/BaseLogo.vue";
import BaseTextField from "@/shared/Inputs/BaseTextField.vue";
import BaseTextFieldPassword from "@/shared/Inputs/BaseTextFieldPassword.vue";
import { mapActions } from "vuex";
import { validate } from "@/helpers/formHandlers";
export default Vue.extend({
  name: "Register",
  components: { BaseLogo, BaseTextField, BaseTextFieldPassword },
  data() {
    return {
      isFormValid: true,
      user: {
        name: "",
        email: "",
        password: "",
      },
      isBtnLoading: false,
    };
  },
  methods: {
    ...mapActions("auth", ["ActionRegister"]),
    validateForm() {
      return validate({ context: this.$refs.form });
    },
    async register() {
      await this.ActionRegister({ vm: this, payload: this.user });
    },
  },
});
</script>
