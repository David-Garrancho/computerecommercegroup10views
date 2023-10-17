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
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../components/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../components/CustomerRegistration.vue'),
  },
  {
    path: '/customer',
    name: 'Customer',
    component: () => import(/* webpackChunkName: "about" */ '../components/Customer.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/customeraccount',
    name: 'customeraccount',
    component: () => import(/* webpackChunkName: "about" */ '../components/CustomerAccount.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/customerdashboard',
    name: 'CustomerDashboard',
    component: () => import(/* webpackChunkName: "about" */ '../components/CustomerDashboard.vue'),
    meta: { requiresAuth: true }, 
  },
  {
    path: '/product',
    name: 'product',
    component: () => import(/* webpackChunkName: "about" */ '../components/Product.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "about" */ '../components/Cart.vue'),
    props: (route) => ({ cartItems: route.query.cartItems }),
  },
  {
    path: '/checkout',
    name: 'Checkout',    
    component: () => import(/* webpackChunkName: "about" */ '../components/Checkout.vue'),
    meta: { requiresAuth: true },
    props: (route) => ({
      cartItems: route.query.cartItems,
    }),
  },
  {
    path: '/invoice-view/:invoiceId',
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
  {
    path: '/enquiry',
    name: 'Enquiry',
    component: () => import(/* webpackChunkName: "about" */ '../components/Enquiry.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/product/reviews/:productId',
    name: 'ProductReviews',
    component: () => import(/* webpackChunkName: "about" */ '../components/Reviews.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/StockManagement',
    name: 'StockManagement',
    component: () => import(/* webpackChunkName: "about" */ '../components/StockManagement.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/EnquiriesList',
    name: 'EnquiriesList',
    component: () => import(/* webpackChunkName: "about" */ '../components/EnquiriesList.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/OrderList',
    name: 'Order',
    component: () => import(/* webpackChunkName: "about" */ '../components/Order.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/StoreCreation',
    name: 'StoreCreation',
    component: () => import(/* webpackChunkName: "about" */ '../components/StoreCreation.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});



export default router;

