<template>
  <v-dialog
    v-model="showDialog"
    transition="dialog-top-transition"
    persistent
    max-width="350"
  >
    <v-card rounded="xl">
      <v-card-text class="text-center">
        <img
          src="@/assets/images/illustrations/unsubscribed.png"
          alt="Logout"
          width="100%"
        />
        <h1 class="my-3 red--text">Atenção!</h1>
        Você deseja sair da aplicação?
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="grey" text @click="showDialog = false"> Cancelar </v-btn>
        <v-btn color="red" @click="logout()">
          <v-icon>mdi-logout</v-icon> Sair
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";
export default Vue.extend({
  name: "BaseDialogLogout",
  data() {
    return {
      showDialog: false,
    };
  },
  created() {
    this.$root.$on("show-base-dialog-logout", () => {
      this.showDialog = true;
    });
    this.$root.$on("hide-base-dialog-logout", () => {
      this.showDialog = false;
    });
  },
  methods: {
    ...mapActions("auth", ["ActionLogout"]),
    async logout() {
      try {
        await this.ActionLogout();
        this.$router.push("/login");
      } catch (error) {
        alert(error);
      }
    },
  },
});
</script>
