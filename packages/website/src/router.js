import { createRouter, createWebHistory } from "vue-router";
import Experience from "./components/Experience.vue";
import Stage from "./components/Stage.vue";
import VarShow from "./components/VarShow.vue";
import Daily from "./components/Daily.vue";
import MesBoard from "./components/MesBoard.vue";
import NotFound from "./components/NotFound.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import Profile from "@/components/Profile.vue";
import MyPosts from "@/components/MyPosts.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: Experience, meta: {title: "贺峻霖"} },
        { path: "/stage", component: Stage, meta: {title: "绝美舞台-贺峻霖"} },
        { path: "/var-show", component: VarShow, meta: {title: "综艺影视-贺峻霖"} },
        { path: "/daily", component: Daily, meta: {title: "小贺日常-贺峻霖"} },
        { path: "/mes-board", component: MesBoard, meta: {title: "深海自留地-贺峻霖"} },
        { path: "/login", component: Login, meta: {title: "登录-贺峻霖"} },
        { path: "/register", component: Register, meta: {title: "注册-贺峻霖"} },
        { path: "/profile", component: Profile, meta: {title: "个人中心-贺峻霖"} },
        { path: "/my-posts", component: MyPosts, meta: {title: "我的帖子-贺峻霖"} },
        { path: '/:pathMatch(.*)', component: NotFound, meta: {title: "找不到页面-贺峻霖"} },
    ],
});

router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title
    next()
})

export default router;