<template>
  <v-snackbar v-model="snackbar" :timeout="3000" :color="color" right top>
    <v-icon class="mr-2">{{ icon }}</v-icon>
    {{ message }}
    <template #action="{ attrs }">
      <v-btn v-bind="attrs" text @click="snackbar = false"> X </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from "vue";
interface ISnackbar {
  color: string;
  icon: string;
  message: string;
}
export default Vue.extend({
  name: "BaseSnackbar",
  data() {
    return {
      snackbar: false,
      color: "",
      icon: "",
      message: "",
    };
  },
  created() {
    this.$root.$on("show-base-snackbar", (options: ISnackbar) => {
      this.snackbar = true;
      this.color = options.color;
      this.icon = options.icon;
      this.message = options.message;
    });
  },
});
</script>
