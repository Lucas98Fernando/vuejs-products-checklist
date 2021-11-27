<template>
  <v-data-table
    :headers="headers"
    :items="products"
    class="elevation-1 rounded-xl px-3 py-3"
    hide-default-footer
  >
    <template v-slot:top>
      <v-toolbar flat color="transparent">
        <v-toolbar-title>Minha lista</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer />
        <h3>
          O quanto será gasto:
          <span class="primary--text"> R$ {{ total }}</span>
        </h3>
      </v-toolbar>
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
            :rules="[max25chars]"
            label="Nome"
            counter
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
          <v-text-field
            v-model="props.item.price"
            :rules="[max25chars]"
            label="Preço"
            counter
          ></v-text-field>
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
          <v-text-field
            v-model="props.item.qtd"
            :rules="[max25chars]"
            label="Quantidade"
            counter
          ></v-text-field>
        </template>
      </v-edit-dialog>
    </template>
    <template v-slot:no-data>
      <div>Nenhum produto cadastrado ainda</div>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "BaseDataTable",
  props: {
    products: {
      type: Array,
    },
    headers: {
      type: Array,
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
      max25chars: (v: string) => v.length <= 25 || "Campo muito longo!",
    };
  },
  methods: {
    // save() {},
    // cancel() {},
    // open() {},
    close() {
      console.log("Dialog closed");
    },
  },
});
</script>
