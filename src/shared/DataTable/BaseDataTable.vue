<template>
  <div>
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
          <v-spacer></v-spacer>
          <h3>
            O quanto será gasto:
            <span class="primary--text"> R$ {{ total }}</span>
          </h3>
        </v-toolbar>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <v-simple-checkbox
          v-model="item.status"
          color="primary"
          :ripple="false"
        ></v-simple-checkbox>
      </template>
    </v-data-table>
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      max-width="600"
    >
      <v-card>
        <v-toolbar color="primary" light>Criar novo produto</v-toolbar>
        <v-card-text>
          <div class="text-h2 pa-12">Hello world!</div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn
      color="primary"
      fab
      absolute
      bottom
      right
      class="mb-9"
      x-large
      @click="dialog = true"
    >
      <v-icon color="black">mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";
export default Vue.extend({
  name: "BaseDataTable",
  data() {
    return {
      dialog: false,
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Preço", value: "price" },
        { text: "Quantidade", value: "qtd" },
        { text: "Status", value: "status" },
      ],
      products: [],
    };
  },
  async created() {
    await this.getProducts();
  },
  computed: {
    ...mapState("user", ["productsApi"]),
    total(): number {
      const productsArray = this.productsApi;
      const getPrice = (el: any) => el.price * el.qtd;
      const sum = (el: any) => (el += el);
      const result = productsArray.map(getPrice).reduce(sum);
      return result;
    },
  },
  methods: {
    ...mapActions("user", ["ActionGetProducts"]),
    async getProducts() {
      try {
        await this.ActionGetProducts();
        this.productsApi.forEach((product: any) => {
          this.$data.products.push({
            name: product.name,
            price: product.price,
            qtd: product.qtd,
          });
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>
