<template>
  <v-data-table
    :headers="headers"
    :items="products"
    :loading="isDataTableLoading"
    :search="search"
    class="elevation-1 rounded-xl px-3 py-3"
    hide-default-footer
  >
    <template v-slot:top>
      <v-toolbar flat color="transparent" v-if="!$vuetify.breakpoint.mobile">
        <v-toolbar-title class="hidden-sm-and-down">
          <v-icon>mdi-clipboard-text-outline</v-icon> Minha lista
        </v-toolbar-title>
        <v-divider class="mx-4 hidden-sm-and-down" inset vertical></v-divider>
        <v-spacer class="hidden-sm-and-down" />
        <base-text-field
          v-model="search"
          class="mt-5"
          label="Pesquisar"
          :small="true"
          validation-type="noValidation"
          prepend-inner-icon="mdi-magnify"
        />
        <v-spacer class="hidden-sm-and-down" />
        <h3>
          O quanto será gasto:
          <span class="primary--text"> R$ {{ total.toFixed(2) }}</span>
        </h3>
      </v-toolbar>
      <div v-else>
        <base-text-field
          v-model="search"
          class="mt-3"
          label="Pesquisar"
          :small="true"
          validation-type="noValidation"
          prepend-inner-icon="mdi-magnify"
        />
        <h3 class="mb-3">
          O quanto será gasto:
          <span class="primary--text"> R$ {{ total.toFixed(2) }}</span>
        </h3>
      </div>
      <v-spacer />
      <slot />
    </template>
    <template v-slot:[`item.status`]="{ item }">
      <v-simple-checkbox
        v-model="item.status"
        color="primary"
        @click="toggleStatus(item)"
        :ripple="false"
      ></v-simple-checkbox>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small color="red" @click="deleteProduct(item)">mdi-close</v-icon>
    </template>
    <template v-slot:[`item.name`]="props">
      <v-edit-dialog
        :return-value.sync="props.item.name"
        @save="updateProduct(props)"
        save-text="Salvar"
        cancel-text="Cancelar"
        large
      >
        {{ props.item.name }}
        <template v-slot:input>
          <v-text-field
            v-model="props.item.name"
            :maxLength="25"
            label="Nome"
          ></v-text-field>
        </template>
      </v-edit-dialog>
    </template>
    <template v-slot:[`item.price`]="props">
      <v-edit-dialog
        :return-value.sync="props.item.price"
        @save="updateProduct(props)"
        save-text="Salvar"
        cancel-text="Cancelar"
        large
      >
        {{ props.item.price }}
        <template v-slot:input>
          <base-text-field
            class="pt-2"
            v-model="props.item.price"
            label="Preço"
            placeholder="Ex: 5.20"
            validation-type="default"
            :onlyNumbers="true"
          />
        </template>
      </v-edit-dialog>
    </template>
    <template v-slot:[`item.qtd`]="props">
      <v-edit-dialog
        :return-value.sync="props.item.qtd"
        @save="updateProduct(props)"
        save-text="Salvar"
        cancel-text="Cancelar"
        large
      >
        {{ props.item.qtd }}
        <template v-slot:input>
          <base-text-field
            class="pt-2"
            v-model="props.item.qtd"
            label="Quantidade"
            placeholder="Informe a quantidade do produto"
            validation-type="default"
            :onlyNumbers="true"
          />
        </template>
      </v-edit-dialog>
    </template>
    <template v-slot:no-data>
      <div class="my-4">Nenhum produto cadastrado ainda</div>
      <img src="@/assets/images/illustrations/waiting.png" width="300px" />
    </template>
  </v-data-table>
</template>

<script lang="ts">
import Vue from "vue";
import BaseTextField from "@/shared/Inputs/BaseTextField.vue";
export default Vue.extend({
  name: "BaseDataTable",
  components: { BaseTextField },
  props: {
    products: {
      type: Array,
    },
    headers: {
      type: Array,
    },
    isDataTableLoading: {
      type: Boolean,
    },
    total: {
      type: Number,
    },
    updateProduct: {
      type: Function,
    },
    deleteProduct: {
      type: Function,
    },
    toggleStatus: {
      type: Function,
    },
  },
  data() {
    return {
      dialog: false,
      search: "",
    };
  },
  methods: {
    close() {
      console.log("Dialog closed");
    },
  },
});
</script>
