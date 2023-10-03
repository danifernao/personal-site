import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Quotes from '../views/Quotes.vue'
import Contact from '../views/Contact.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  { 
    path: '/about',
    name: 'about',
    component: About
  },
  { 
    path: '/quotes',
    name: 'quotes',
    component: Quotes
  },
  { path: '/contact',
    name: 'contact',
    component: Contact
  },
   {
    path: '/*',
    name: 'error',
    component: Home
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router