<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-card rounded="xl" class="card-home" min-height="200">
        <v-icon size="30">mdi-playlist-plus</v-icon>
        <v-card-title class="primary--text">
          {{ qtdProducts }}
        </v-card-title>
        <v-btn text to="/checklist">
          Visualizar
          <v-icon small>mdi-arrow-top-right</v-icon>
        </v-btn>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card rounded="xl" class="card-home" min-height="200">
        <v-icon size="30">mdi-currency-usd</v-icon>
        <v-card-title class="primary--text">
          Valor atual a pagar: R$ {{ total.toFixed(2) }}
        </v-card-title>
        <v-btn text to="/checklist">
          Visualizar
          <v-icon small>mdi-arrow-top-right</v-icon>
        </v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import calculateTotal from "@/helpers/calculateTotal";
export default Vue.extend({
  name: "Home",
  async created() {
    await this.ActionGetProducts();
  },
  computed: {
    ...mapState("user", ["productsApi"]),
    qtdProducts() {
      const products = this.productsApi.length;
      if (this.productsApi.length > 1)
        return `${products} produtos adicionados`;
      else return `${products} produto adicionado`;
    },
    total() {
      return calculateTotal(this.productsApi);
    },
  },
  methods: {
    ...mapActions("user", ["ActionGetProducts"]),
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/theme/mixins/flex-center.scss";
.card-home {
  @include flex-center(true);
  box-shadow: rgba(255, 235, 59, 0.15) 0px 2px 8px 0px !important;
}
</style>
