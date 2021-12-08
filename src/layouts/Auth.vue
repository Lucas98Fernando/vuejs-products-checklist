<template>
  <v-app>
    <v-main>
      <div class="main-auth-container">
        <v-card class="card-auth" rounded="xl" width="400">
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
@import "@/assets/css/theme/mixins/flex-center.scss";
@import "@/assets/css/theme/mixins/bg-overlay.scss";
.main-auth-container {
  @include flex-center(true);
  @include bg-overlay(rgba(0, 0, 0, 0.85));
  width: 100%;
  height: 100%;
  background-image: url("../assets/images/bg.jpg");
  background-position: center;
  background-size: cover;
  padding: 0 1rem;
  .card-auth {
    z-index: 999;
    box-shadow: rgba(255, 235, 59, 0.15) 0px 48px 100px 0px;
  }
}
</style>
