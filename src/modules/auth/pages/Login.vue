<template>
  <v-form ref="form" v-model="isFormValid" lazy-validation>
    <base-logo class="mb-3" width="80" />

    <div class="text-center mb-3">
      <h2 class="mb-2 primary--text">Login</h2>
      <p>Faça o seu login no Products Checklist</p>
    </div>

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
      block
      large
      light
      color="yellow"
      @click="validateForm() ? login() : validateForm()"
    >
      <v-icon class="mr-2" small>mdi-login</v-icon>
      Entrar
    </v-btn>

    <div class="text-center mt-3">
      Ainda não possui conta ?
      <router-link to="/auth/register">Cadastre-se</router-link>
    </div>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import BaseLogo from "@/shared/BaseLogo.vue";
import BaseTextField from "@/shared/Inputs/BaseTextField.vue";
import BaseTextFieldPassword from "@/shared/Inputs/BaseTextFieldPassword.vue";
import { mapActions, mapState } from "vuex";
import { validate } from "@/helpers/formHandlers";
export default Vue.extend({
  name: "Login",
  components: { BaseLogo, BaseTextField, BaseTextFieldPassword },
  data() {
    return {
      isFormValid: true,
      user: {
        email: "",
        password: "",
      },
      isBtnLoading: false,
    };
  },
  computed: {
    ...mapState("auth", ["token"]),
  },
  methods: {
    ...mapActions("auth", ["ActionLogin"]),
    validateForm() {
      return validate({ context: this.$refs.form });
    },
    async login() {
      await this.ActionLogin({ vm: this, payload: this.user });
    },
  },
});
</script>
