<template>
  <div class="text-center">
    <img
      src="@/assets/images/logo.png"
      alt="Logo do Products Checklist"
      :width="width"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "BaseLogo",
  props: {
    width: {
      type: String,
      default: "100",
    },
  },
});
</script>
