import { createRouter, createWebHistory } from "vue-router";
import Experience from "./components/Experience.vue";
import Stage from "./components/Stage.vue";
import VarShow from "./components/VarShow.vue";
import Daily from "./components/Daily.vue";
import MesBoard from "./components/MesBoard.vue";
import NotFound from "./components/NotFound.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: Experience },
        { path: "/stage", component: Stage },
        { path: "/var-show", component: VarShow },
        { path: "/daily", component: Daily },
        { path: "/mes-board", component: MesBoard },
        { path: "/login", component: Login },
        { path: "/register", component: Register },
        { path: '/:pathMatch(.*)', component: NotFound },
    ],
});

export default router;