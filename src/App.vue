<template>
  <v-app>
    <base-snackbar />
    <base-dialog />
    <base-loading />
    <router-view :key="$route.fullPath" />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import BaseSnackbar from "@/shared/Snackbar/BaseSnackbar.vue";
import BaseDialog from "./shared/Dialogs/BaseDialog.vue";
import BaseLoading from "./shared/Loadings/BaseLoading.vue";
import interceptors from "@/services/interceptors";
export default Vue.extend({
  name: "App",
  components: { BaseSnackbar, BaseDialog, BaseLoading },
  mounted() {
    interceptors(this);
    this.$root.$emit("show-base-loading");
    document.onreadystatechange = () => {
      if (document.readyState === "complete") {
        this.hideLoading();
      }
    };
  },
  methods: {
    hideLoading() {
      this.$root.$emit("hide-base-loading");
    },
  },
});
</script>
