<template>
  <v-text-field
    :id="id"
    :value="value"
    :label="label"
    :placeholder="placeholder"
    :validation-type="validationType"
    :rules="
      validationType === 'default'
        ? defaultValidation
        : validationType === 'email'
        ? emailValidation
        : validationType === 'phone'
        ? phoneValidation
        : validationType === 'simple'
        ? simpleValidation
        : validationType === 'url'
        ? urlValidation
        : validationType === 'noValidation'
        ? noValidation
        : defaultValidation
    "
    :prepend-inner-icon="prependInnerIcon"
    outlined
    @input="$emit('input', $event)"
  ></v-text-field>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "BaseTextField",
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
    placeholder: {
      type: String,
    },
    validationType: {
      type: String,
      default: "password",
    },
    prependInnerIcon: {
      type: String,
    },
  },
  data() {
    return {
      noValidation: [],
      defaultValidation: [(v: string) => !!v || "Campo obrigatório"],
      // Validação simples
      simpleValidation: [
        (v: string) => !!v || "Campo obrigatório",
        (v: string | string[]) =>
          (v && v.length >= 3) || "O campo deve conter no mínimo 3 caracteres",
      ],
      // Validação para telefone
      phoneValidation: [
        (v: string) => !!v || "Campo obrigatório",
        (v: string | string[]) =>
          (v && v.length >= 15) || "Informe um número válido",
      ],
      // Validação para e-mails
      emailValidation: [
        (v: string) => !!v || "O e-mail é obrigatório",
        (v: string) => /.+@.+\..+/.test(v) || "Informe um e-mail válido",
      ],
    };
  },
});
</script>
