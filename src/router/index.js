import Vue from 'vue'
import VueRouter from 'vue-router'
import TableOfContents from "../components/TableOfContents";
import PageNotFound from "../views/PageNotFound";
import Auth from '@okta/okta-vue'
import {OAUTH_ISSUER, CLIENT_ID} from '../shared/config';

Vue.use(VueRouter);

Vue.use(Auth, {
  issuer: `${OAUTH_ISSUER}`,
  clientId: `${CLIENT_ID}`,
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
});

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
    meta: {
      requiresAuth: true
    },
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
    path: '/login/callback',
    component: Auth.handleCallback()
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

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
