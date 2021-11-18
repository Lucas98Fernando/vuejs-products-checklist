<template>
  <v-app>
    <v-main>
      <div class="main-auth-container">
        <v-card rounded="xl" width="400">
          <v-card-text>
            <router-view :key="$route.fullPath" />
          </v-card-text>
        </v-card>
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "AuthLayout",
});
</script>

<style lang="scss" scoped>
.main-auth-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
}
</style>
