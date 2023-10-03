<template>
  <li role="presentation">
    <router-link :to="path" v-slot="{ href, route, navigate }">
      <a :href="href" @click="navigate" :class="currentTab && 'active'" :title="title" role="tab" :aria-controls="currentTab && controls" :aria-selected="currentTab.toString()" v-tooltip.top="title">
        <Icon :icon="icon" />
      </a>
    </router-link>
  </li>
</template>

<script>
  import Icon from './Icon.vue'
  
  export default {
    name: 'NavbarItem',
    data () {
      return {
        currentTab: false
      }
    },
    props: {
      path: String,
      name: String,
      title: String,
      controls: String,
      icon: String
    },
    components: {
      Icon
    },
    methods: {
      isCurrentTab () {
        this.currentTab = this.name === this.$route.name || (this.name === 'home' && this.$route.name === 'error')
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.isCurrentTab()
      })
      
      this.$router.afterEach(() => {
        this.$nextTick(() => {
          this.isCurrentTab()
        })
      })
    }
  }
</script>

<style scoped>
  a {
    display: inline-flex;
    font-size: 1.5rem;
    color: rgba(var(--color-nav-icon), 0.6);
  }

  .active {
    color: rgba(var(--color-nav-icon), 1);
  }
  
  li {
    display: inline-flex;
    padding: 0.2rem 0.9rem;
  }
  
  @media only screen and (min-width: 760px) {
    a:hover {
      color: rgba(var(--color-nav-icon), 1);
    }
  }
</style>