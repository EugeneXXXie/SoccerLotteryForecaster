import { createRouter, createWebHistory } from 'vue-router'
// import App from '../App.vue'
// import testPage from "../views/testPage.vue";
import HomeView from "../views/HomeView.vue";
// import pwtest from "../views/PWtest.vue";
// import erroPage from "../views/erroPage.vue";
// nogisg ==>单场进球数缩写

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: {
        title: '宁宁の足彩预测'
      }
    }
  ]
})

// 在每次路由切换之前更新页面标题
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '默认标题';
  next();
});
export default router
