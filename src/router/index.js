import Vue from 'vue'
import VueRouter from 'vue-router'
import TableOfContents from "../components/TableOfContents";
import PageNotFound from "../views/PageNotFound";

Vue.use(VueRouter);

const parseProps = r => ({ id: parseInt(r.params.id) });

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "core" */ '../views/Home.vue')
  },
  {
    path: '/article/:id',
    name: 'articles',
    props: parseProps,
    component: () => import(/* webpackChunkName: "core" */ '../views/Articles.vue')
  },
  {
    path: '/edit/article/:id',
    name: 'edit-article',
    props: parseProps,
    component: () => import(/* webpackChunkName: "core" */ '../views/EditArticle.vue')
  },
  {
    path: '/articles',
    name: 'toc',
    props: { displayAll: true },
    component: TableOfContents
  },
  {
    path: '/category/:categoryName',
    name: 'category',
    props: true,
    component: () => import(/* webpackChunkName: "core" */ '../views/Category.vue')
  },
  {
    path: '/jeff',
    redirect: { name: 'home' }
  },
  {
    path: '/jeff/article/:id',
    redirect: { name: 'articles' }
  },
  {
    path: '*',
    component: PageNotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
