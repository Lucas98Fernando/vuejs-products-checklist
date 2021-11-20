<template>
  <base-data-table :headers="headers" :products="products">
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      max-width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          v-bind="attrs"
          v-on="on"
          fab
          absolute
          bottom
          right
          class="mb-9"
        >
          <v-icon color="black">mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <v-toolbar-title>Criar produto</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn color="white" icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-5">
          <v-form v-model="isFormValid" ref="form" lazy-validation>
            <base-text-field
              v-model="formProduct.name"
              label="Nome"
              placeholder="Informe o nome do produto"
              validation-type="simple"
            />
            <base-text-field
              v-model="formProduct.price"
              label="Preço"
              placeholder="Ex: 5.20"
              validation-type="default"
              :onlyNumbers="true"
            />
            <base-text-field
              v-model="formProduct.qtd"
              label="Quantidade"
              :onlyNumbers="true"
              placeholder="Informe a quantidade do produto"
              validation-type="default"
            />
            <v-btn
              :disabled="!isFormValid"
              :loading="isBtnLoading"
              block
              large
              light
              color="yellow"
              @click="validate(), createProduct()"
            >
              Cadastrar
            </v-btn>
          </v-form>
        </v-card-text>
        <!-- <v-card-actions class="justify-end">
          <v-btn text @click="dialog = false">Fechar</v-btn>
        </v-card-actions> -->
      </v-card>
    </v-dialog>
  </base-data-table>
</template>

<script lang="ts">
import Vue from "vue";
import BaseDataTable from "@/shared/DataTable/BaseDataTable.vue";
import BaseTextField from "@/shared/Inputs/BaseTextField.vue";
import { mapActions, mapState } from "vuex";
export default Vue.extend({
  components: { BaseDataTable, BaseTextField },
  name: "Home",
  data() {
    return {
      dialog: false,
      isFormValid: true,
      isBtnLoading: false,
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
      formProduct: {
        name: "",
        price: 0,
        qtd: 0,
      },
    };
  },
  async mounted() {
    await this.getProducts();
  },
  computed: {
    ...mapState("user", ["productsApi"]),
    // total(): number {
    //   const productsArray = this.productsApi;
    //   const getPrice = (el: any) => el.price * el.qtd;
    //   const sum = (el: any) => (el += el);
    //   const result = productsArray.map(getPrice).reduce(sum);
    //   return result;
    // },
  },
  methods: {
    ...mapActions("user", ["ActionGetProducts", "ActionCreateOrUpdate"]),
    validate() {
      (this.$refs.form as Vue & { validate: () => boolean }).validate();
    },
    async getProducts() {
      try {
        this.products = [];
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
    async createProduct() {
      await this.ActionCreateOrUpdate({
        vm: this,
        method: "POST",
        url: "/products",
        body: this.formProduct,
        snackbarOptions: {
          message: "O produto foi adicionado com sucesso!",
        },
        forceRerender: this.getProducts,
      });
    },
  },
});
</script>
