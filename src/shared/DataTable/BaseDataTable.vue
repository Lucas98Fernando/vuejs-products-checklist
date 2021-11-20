<template>
  <v-data-table
    :headers="headers"
    :items="products"
    :total="total"
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
        :ripple="false"
      ></v-simple-checkbox>
    </template>
    <template v-slot:no-data>
      <div>Nenhum produto cadastrado ainda</div>
    </template>
  </v-data-table>
  <!-- <v-dialog
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
    </v-btn> -->
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
  },
  data() {
    return {
      dialog: false,
    };
  },
});
</script>
