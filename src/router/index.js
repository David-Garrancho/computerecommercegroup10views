import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Login.vue')
  },
  {
    path: '/customer',
    name: 'customer',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Customer.vue')
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/CustomerRegistration.vue')
  },
  {
    path: '/customeraccount',
    name: 'customeraccount',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/CustomerAccount.vue')
  },
  {
    path: '/customerdashboard',
    name: 'CustomerDashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/CustomerDashboard.vue'),
    meta: { requiresAuth: true }, // Add a meta field to specify that this route requires authentication
  },
  {
    path: '/product',
    name: 'product',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Product.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Cart.vue'),
    props: (route) => ({ cartItems: route.query.cartItems }),
  },
  {
    path: '/checkout',
    name: 'Checkout',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Checkout.vue'),
    meta: { requiresAuth: true },
    props: (route) => ({
      cartItems: route.query.cartItems,
    }),
  },
  {
    path: '/invoice-view/:invoiceId', // You can pass the invoice ID as a parameter
    name: 'InvoiceView',
    component: () => import(/* webpackChunkName: "about" */ '../components/Invoice.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/purchaseHistory',
    name: 'PurchaseHistory',
    component: () => import(/* webpackChunkName: "about" */ '../components/PurchaseHistory.vue'),
    meta: { requiresAuth: true },
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default router
