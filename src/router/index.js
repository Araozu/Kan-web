import {createRouter, createWebHashHistory} from 'vue-router';
import Inicio from "../views/Inicio.vue"
import Docs from "../views/Docs.vue"
import Docs_ from "../views/Docs/_.vue"

const routes = [
    {
        path: '/',
        name: 'Inicio',
        component: Inicio
    },
    {
        path: "/docs/:version/",
        name: "Docs",
        component: Docs,
        children: [
            {
                path: "",
                name: "DocsInicio",
                component: () => import("../views/Docs/index.vue")
            },
            {
                path: ":catchAll(.*)",
                name: "Docs_",
                component: () => import("../views/Docs/_.vue")
            }
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
});

export default router;
