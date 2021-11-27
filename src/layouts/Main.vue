<template>
  <v-app dark>
    <base-dialog-logout />
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" fixed app>
      <v-list>
        <v-list-item class="justify-center">
          <base-logo :width="miniVariant ? '28' : '55'" />
        </v-list-item>
      </v-list>
      <v-list nav shaped>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            exact
            link
            dark
            exact-active-class="active"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon
        class="primary--text"
        @click.stop="drawer = !drawer"
      />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon color="primary">
          mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}
        </v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <span class="mr-3">Olá, {{ user.name }}!</span>
      <v-btn color="red" fab small @click="logout()">
        <v-icon class="ml-1">mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view :key="$route.fullPath" />
      </v-container>
    </v-main>
    <v-footer absolute inset app>
      <span class="mx-auto">
        &copy; {{ new Date().getFullYear() }} | Desenvolvido com
        <v-icon color="red" small>mdi-heart</v-icon> por Lucas Fernando
      </span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import BaseLogo from "@/shared/BaseLogo.vue";
import BaseDialogLogout from "@/shared/Dialogs/BaseDialogLogout.vue";
import { getLocalUser } from "@/helpers/storage";
export default Vue.extend({
  name: "MainLayout",
  components: {
    BaseLogo,
    BaseDialogLogout,
  },
  data() {
    return {
      user: JSON.parse(getLocalUser() || "{}"),
      selectedItem: "",
      drawer: true,
      items: [
        {
          icon: "mdi-apps",
          title: "Início",
          to: "/",
        },
      ],
      miniVariant: false,
      title: "Products Checklist",
    };
  },
  methods: {
    logout() {
      this.$root.$emit("show-base-dialog-logout");
    },
  },
});
</script>

<style lang="scss" scoped>
.active {
  background-color: var(--v-primary-base);
  color: var(--v-accent-darken4);
}
</style>
