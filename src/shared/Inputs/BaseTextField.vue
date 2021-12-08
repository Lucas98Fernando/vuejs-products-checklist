<template>
  <v-text-field
    :id="id"
    :value="value"
    :label="label"
    :placeholder="placeholder"
    :type="type"
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
    :dense="small"
    outlined
    @input="$emit('input', $event)"
    @keypress="onlyNumbers === true ? isNumber($event) : false"
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
      type: [String, Number],
    },
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
    },
    type: {
      type: String,
    },
    validationType: {
      type: String,
    },
    prependInnerIcon: {
      type: String,
    },
    onlyNumbers: {
      type: Boolean,
    },
    small: {
      type: Boolean,
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
  methods: {
    // Método que faz com que os campos só aceitem valores numéricos
    isNumber(evt: KeyboardEvent): void {
      const keysAllowed: string[] = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        ".",
      ];
      const keyPressed: string = evt.key;
      if (!keysAllowed.includes(keyPressed)) {
        evt.preventDefault();
      }
    },
  },
});
</script>
