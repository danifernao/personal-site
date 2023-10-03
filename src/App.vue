<template>
  <div id="app">
    <div id="content" v-if="!isEmpty(data.views)">
      <Header v-if="!isEmpty(data.header)" :header="data.header" />
      <Navbar v-if="!isEmpty(data.views)" :views="data.views" />
      <router-view :viewData="currentViewData" />
    </div>
    <Footer v-if="!isEmpty(data.footer)" :footer="data.footer" />
    <FirebaseError v-if="error" />
    <LoadingIcon v-if="!error && isEmpty(data.views)" />
    <vue-progress-bar />
  </div>
</template>

<script>
  import Header from './components/Header.vue'
  import Navbar from './components/Navbar.vue'
  import Footer from './components/Footer.vue'
  import FirebaseError from './components/FirebaseError.vue'
  import LoadingIcon from './components/LoadingIcon.vue'
  import { db } from './db'
  
  export default {
    name: 'App',
    data () {
      return {
        data: {
          header: {},
          views: {},
          footer: {}
        },
        currentViewData: null,
        urlParams: new URLSearchParams(location.search),
        error: false
      }
    },
    components: {
      Header,
      Navbar,
      Footer,
      FirebaseError,
      LoadingIcon
    },
    methods: {
      isEmpty (obj) {
        return (Object.keys(obj).length === 0)
      },
      setCurrentView (viewName = this.$route.name) {
        if (this.data.views) {
          this.currentViewData = viewName === 'error' ? this.data.views.home : this.data.views[viewName]
          document.title = `${this.currentViewData.title} | ${this.data.header.title}`
        }
      }
    },
    created () {
      this.$Progress.start()
      
      db.collection('app')
        .get()
        .then(snap => {
          snap.forEach(doc => {
            this.data[doc.id] = doc.data()
          })
          this.setCurrentView()
        })
        .catch (() =>
          this.error = true
        )
        .finally(() => {
          this.$Progress.finish()
        })
        
      this.$router.beforeEach((to, from, next) => {
        this.setCurrentView(to.name)
        this.$Progress.start()
        next()
      })
      
      this.$router.afterEach(() => {
        if (this.data.views) {
          this.$Progress.finish()
        }
      })
      
      if (location.search) {
        window.history.replaceState(null, null, window.location.pathname)
      }
    }
  }
</script>

<style>
  #app {
    align-items: center;
  }
  
  #app,
  #content  {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  
  #content {
    max-width: 30rem;
    background-color: rgb(var(--color-app-background));
    border-radius: 0.7rem;
    color: rgb(var(--color-app-text));
  }
  
  main {
    padding: 0 2rem 2rem;
    text-align: left;
  }
  
  #home > ul,
  #home > ul > li:last-of-type,
  #about > div > *:last-child,
  #quotes > *:last-of-type {
    margin-bottom: 0;
  }
  
  .tooltip .tooltip-inner {
    padding: 0.3rem 0.5rem;
    background: rgba(var(--color-content-background), 0.95);
    border-radius: 0.3rem;
    font-size: 0.8rem;
    color: rgb(var(--color-content-text));
  }
  
  .tooltip .tooltip-arrow {
    position: absolute;
    margin: 5px;
    width: 0;
    height: 0;
    border-style: solid;
    border-color: rgba(var(--color-content-background), 0.95);
    z-index: 1;
  }
  
  .tooltip[x-placement^="top"] {
    margin-bottom: 8px;
  }
  
  .tooltip[x-placement^="top"] .tooltip-arrow {
    bottom: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
    border-width: 5px 5px 0 5px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
  }
  
  .tooltip[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.15s, visibility 0.15s;
  }
  
  .tooltip[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.15s;
  }
</style>