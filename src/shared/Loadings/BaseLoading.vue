<template>
  <v-sheet v-if="isVisible" class="base-loading">
    <base-logo width="80" />
    <v-progress-circular
      class="mt-5"
      size="50"
      indeterminate
      color="primary"
    ></v-progress-circular>
  </v-sheet>
</template>

<script lang="ts">
import Vue from "vue";
import BaseLogo from "@/shared/BaseLogo.vue";
export default Vue.extend({
  name: "BaseLoading",
  components: { BaseLogo },
  data() {
    return {
      isVisible: false,
    };
  },
  created() {
    this.$root.$on("show-base-loading", () => {
      this.isVisible = true;
    });
    this.$root.$on("hide-base-loading", () => {
      this.isVisible = false;
    });
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/theme/mixins/flex-center";
.base-loading {
  @include flex-center(true);
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: 999;
  margin: 0 auto;
  padding: 1rem;
  .progress-middle {
    @include flex-center(true);
    img {
      margin: 0 0 1rem;
      width: 120px;
    }
  }
}
</style>
