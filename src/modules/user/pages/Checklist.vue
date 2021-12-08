<template>
  <base-data-table
    :headers="headers"
    :products="products"
    :update-product="updateProduct"
    :delete-product="deleteProduct"
    :toggle-status="toggleStatus"
    :total="total"
    :is-data-table-loading="isDataTableLoading"
  >
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      width="350"
      max-width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-if="$vuetify.breakpoint.mobile"
          class="black--text"
          color="primary"
          v-bind="attrs"
          v-on="on"
          block
        >
          <v-icon color="black">mdi-plus</v-icon>
          Adicionar
        </v-btn>
        <v-btn
          v-else
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
          <v-toolbar-title>Adicionar produto</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn color="white" icon @click="closeDialog()">
            <v-icon color="red">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-5">
          <v-form v-model="isFormValid" ref="form" lazy-validation>
            <base-text-field
              v-model="formProduct.name"
              label="Nome"
              placeholder="Informe o nome do produto"
              prepend-inner-icon="mdi-format-text"
              validation-type="simple"
            />
            <base-text-field
              v-model="formProduct.price"
              label="Preço"
              placeholder="Ex: 5.20"
              validation-type="default"
              prepend-inner-icon="mdi-currency-brl"
              :onlyNumbers="true"
            />
            <base-text-field
              v-model="formProduct.qtd"
              label="Quantidade"
              placeholder="Informe a quantidade do produto"
              validation-type="default"
              prepend-inner-icon="mdi-format-list-numbered"
              :onlyNumbers="true"
            />
            <v-btn
              :disabled="!isFormValid"
              :loading="isBtnLoading"
              block
              large
              light
              color="yellow"
              @click="validateForm() ? createProduct() : validateForm()"
            >
              <v-icon class="mr-2">
                mdi-checkbox-marked-circle-plus-outline
              </v-icon>
              Adicionar
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </base-data-table>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import BaseDataTable from "@/shared/DataTable/BaseDataTable.vue";
import BaseTextField from "@/shared/Inputs/BaseTextField.vue";
import { IProducts } from "@/modules/user/interfaces/dto";
import { reset, resetValidation, validate } from "@/helpers/formHandlers";
import calculateTotal from "@/helpers/calculateTotal";
export default Vue.extend({
  components: { BaseDataTable, BaseTextField },
  name: "Home",
  data() {
    return {
      dialog: false,
      isFormValid: true,
      isBtnLoading: false,
      isDataTableLoading: true,
      headers: [
        {
          text: "Nome",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Preço", value: "price" },
        { text: "Quantidade", value: "qtd" },
        { text: "Status", value: "status" },
        { text: "Ações", value: "actions" },
      ],
      products: [],
      formProduct: {
        name: "",
        price: 0,
        qtd: 0,
      },
    };
  },
  async created() {
    await this.getProducts();
  },
  watch: {
    dialog(val) {
      val || this.closeDialog();
    },
  },
  computed: {
    ...mapState("user", ["productsApi"]),
    total(): number {
      return calculateTotal(this.productsApi);
    },
  },
  methods: {
    ...mapActions("user", ["ActionGetProducts", "ActionCrud"]),
    validateForm() {
      return validate({ context: this.$refs.form });
    },
    async getProducts() {
      try {
        this.products = [];
        this.isDataTableLoading = true;
        await this.ActionGetProducts();
        this.productsApi.forEach((product: IProducts) => {
          this.$data.products.push({
            id: product.id,
            name: product.name,
            price: product.price,
            qtd: product.qtd,
            status: product.status === 1 ? true : false,
          });
        });
      } finally {
        this.isDataTableLoading = false;
      }
    },
    async createProduct() {
      await this.ActionCrud({
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
    async updateProduct(data: IProducts) {
      await this.ActionCrud({
        vm: this,
        method: "PATCH",
        url: `/products/${data.item.id}`,
        body: {
          name: data.item.name,
          price: +data.item.price,
          qtd: +data.item.qtd,
        },
        snackbarOptions: {
          message: "O produto foi atualizado com sucesso!",
        },
        forceRerender: this.getProducts,
      });
    },
    async deleteProduct(data: IProducts) {
      await this.ActionCrud({
        vm: this,
        method: "DELETE",
        url: `/products/${data.id}`,
        snackbarOptions: {
          message: "O produto foi removido com sucesso!",
        },
        forceRerender: this.getProducts,
      });
    },
    async toggleStatus(data: IProducts) {
      await this.ActionCrud({
        vm: this,
        method: "PATCH",
        url: `/products/${data.id}`,
        body: {
          name: data.name,
          price: +data.price,
          qtd: +data.qtd,
          status: data.status === true ? 1 : 0,
        },
        snackbarOptions: {
          message: "Status atualizado!",
        },
        forceRerender: this.getProducts,
      });
    },
    closeDialog() {
      this.dialog = false;
      resetValidation({ context: this.$refs.form });
      reset({ context: this.$refs.form });
    },
  },
});
</script>
