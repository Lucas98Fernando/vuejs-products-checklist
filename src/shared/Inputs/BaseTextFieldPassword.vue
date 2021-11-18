<template>
  <v-text-field
    :id="id"
    :value="value"
    :label="label"
    :type="showPassword ? 'text' : 'password'"
    :validation-type="validationType"
    :rules="
      validationType === 'password' ? passwordValidation : passwordValidation
    "
    :disabled="disabled"
    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
    :placeholder="placeholder"
    prepend-inner-icon="mdi-lock"
    outlined
    @input="$emit('input', $event)"
    @click:append="showPassword = !showPassword"
  ></v-text-field>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "BaseTextFieldPassword",
  props: {
    id: {
      type: String,
    },
    value: {
      type: String,
    },
    label: {
      type: String,
      required: true,
    },
    validationType: {
      type: String,
      default: "password",
    },
    disabled: {
      type: Boolean,
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      showPassword: false,
      noValidation: [],
      passwordValidation: [
        (v: string) => !!v || "A senha é obrigatória",
        (v: string) =>
          v.length >= 8 || "A senha deve conter no mínimo 8 caracteres",
      ],
    };
  },
});
</script>
