<!-- <script>
var enterPassWord = prompt("pw");
if (enterPassWord === "994666Wzh") {
} else {
  window.stop();
  location.reload();
}
</script> -->
<script setup>
import { defineComponent, h, ref, watch, onMounted } from "vue";
import { useMessage } from "naive-ui";
import { useRouter } from "vue-router";
import { CashOutline as CashIcon, Reload } from "@vicons/ionicons5";
import axios from "axios";
// import HomeView from "./views/HomeView.vue";
// //在全局配置中引入vue-wechat-title
// import VueWechatTitle from "vue-wechat-title";
// createApp(App).use(store).use(router).use(VueWechatTitle).mount("#app");

const router = useRouter();
let thisRouter = JSON.parse(JSON.stringify(router.options.history.location));
thisRouter = thisRouter.replace("/", "");
if (thisRouter == "") {
  router.push({ path: "/home" });
}
console.log("router:" + thisRouter);
console.log(window);
let headBoxRef = ref(null);
let boxMaxHeight = ref(0);
let headTatle = ref("寧々の工具箱");
// ...

// ...
// if (thisRouter == "testPage") {
//   headTatle.value = "THIS IS TEST PAGE";
// }
onMounted(() => {
  let pageHeight = document.documentElement.clientHeight;
  boxMaxHeight.value = pageHeight - headBoxRef._rawValue.clientHeight - 5;
});
// console.log(menu)
</script>
<template>
  <div class="app">
    <div ref="headBoxRef" class="headBox">
      <n-grid cols="12" item-responsive="ture">
        <n-grid-item span="12 400:12 600:12 800:12">
          <div class="interval titleBox">
            <span class="PlayeType"> {{ headTatle }} </span>
          </div>
        </n-grid-item>
        <n-grid-item span="0 400:0 600:0 800:0" class="menuBox"> </n-grid-item>
      </n-grid>
    </div>
    <div class="Anchor">
      <n-grid cols="24" item-responsive="ture">
        <n-grid-item span="0 400:0 600:0 800:0" class="navigationBar">
        </n-grid-item>
        <n-grid-item span="24 400:24 600:24 800:24">
          <n-scrollbar
            trigger="hover"
            :style="{ 'max-height': boxMaxHeight + 'px' }"
          >
            <n-space vertical size="large">
              <router-view></router-view>
            </n-space>
          </n-scrollbar>
        </n-grid-item>
      </n-grid>
    </div>
  </div>
</template>

<style scoped></style>
