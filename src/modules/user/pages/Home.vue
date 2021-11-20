<template>
  <base-data-table />
</template>

<script lang="ts">
import BaseDataTable from "@/shared/DataTable/BaseDataTable.vue";
import Vue from "vue";
export default Vue.extend({
  components: { BaseDataTable },
  name: "Home",
});
</script>
