<!--
 * @Author: 黄灿民
 * @Date: 2021-02-08 10:31:20
 * @LastEditTime: 2021-02-09 09:46:52
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \cnode\src\views\home\home.vue
-->
<template>
  <el-container>
    <c-node-header />

    <home-main />
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CNodeHeader from "@/components/header/CNodeHeader.vue";
import HomeMain from "./HomeMain.vue";

export default defineComponent({
  components: {
    CNodeHeader,HomeMain,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang='scss'>
</style>