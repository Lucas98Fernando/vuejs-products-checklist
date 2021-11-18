<template>
  <v-app>
    <base-snackbar />
    <base-dialog />
    <router-view :key="$route.fullPath" />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import BaseSnackbar from "@/shared/Snackbar/BaseSnackbar.vue";
import interceptors from "@/services/interceptors";
import BaseDialog from "./shared/Dialogs/BaseDialog.vue";
export default Vue.extend({
  name: "App",
  components: { BaseSnackbar, BaseDialog },
  mounted() {
    interceptors(this);
  },
});
</script>
