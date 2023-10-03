<template>
  <li class="item">
    <a :href="link.url" v-on="link.groupId ? { click: (e) => toggle(e) } : {}" :aria-controls="link.groupId" :class="(link.groupId && isVisible) && 'active'" :title="link.title" target="_blank" rel="noreferrer">
      <span><Icon :icon="link.icon" /></span>
      <h3>{{ link.title }}</h3>
      <p>{{ link.description }}</p>
      <span v-if="link.groupItems" class="arrow"><Icon :icon="iconSet.downArrow" /></span>
    </a>
    <ul v-if="sublist" :id="link.groupId">
      <li v-for="(item, index) in sublist" :key="index" class="sub-item">
        <a :href="item.url" :title="item.title" target="_blank" rel="noreferrer">
          <span><Icon :icon="item.icon" /></span>
          <h4>{{ item.title }}</h4>
        </a>
      </li>
    </ul>
  </li>
</template>

<script>
  import Icon from './Icon.vue'
  import orderObj from '@/assets/js/commons.js'
  
  export default {
    name: 'SocialLink',
    data () {
      return {
        sublist: null,
        isVisible: false
      }
    },
    props: {
      link: Object,
      iconSet: Object
    },
    components: {
      Icon
    },
    methods: {
      toggle (event) {
        this.isVisible = !this.isVisible
        if (this.isVisible) {
          setTimeout(() => {
            event.target.scrollIntoView({behavior: "smooth"})
          }, 300)
        }
        event.preventDefault()
      }
    },
    created () {
      if ('groupItems' in this.link) {
        this.sublist = orderObj(this.link.groupItems, this.link.groupItemsOrder)
      }
    }
  }
</script>

<style scoped>
  a {
    display: grid;
    grid-template-columns: 2.5rem 1fr 1.5rem;
    grid-template-rows: auto auto;
    grid-template-areas: "icon title arrow" "icon description arrow";
    align-items: center;
    padding: 0.7rem;
    border-radius: 0.4rem;
    color: rgb(var(--color-app-text));
    text-decoration: none;
    transition: none;
  }
  
  a.active {
    background-color: rgba(var(--color-nav-icon), 0.15);
  }
  
  span {
    grid-area: icon;
    text-align: center;
    color: rgb(var(--color-app-foreground));
    font-size: 2.5rem;
  }
  
  h3, h4 {
    grid-area: title;
  }
  
  h3, h4, p {
    margin: 0;
    padding: 0 1rem;
  }
  
  p {
    grid-area: description;
    font-size: 0.9rem;
  }
  
  .arrow {
    grid-area: arrow;
    font-size: 1.5rem;
    transition: transform 0.4s ease;
    color: rgb(var(--color-nav-icon));
  }
  
  a:not(.active) .arrow {
    transform: rotate(-90deg);
    visibility: hidden;
  }
  
  a:not(.active):hover .arrow {
    visibility: visible;
  }
  
  li {
    margin-bottom: 0.3rem;
  }
  
  li ul {
    padding: 0 1rem;
    list-style: none;
    max-height: 0;
    overflow: hidden;
    z-index: -99;
    transition: max-height 0.4s ease-in-out;
  }
  
  a.active ~ ul {
    max-height: 1000vh;
    z-index: 99;
    opacity: 1;
  }
  
  li ul li:first-of-type {
    margin-top: 0.3rem;
  }
  
  li ul li:after {
    content: "";
    display: block;
    margin-top: 0.3rem;
    border-bottom: 0.06rem solid rgb(var(--color-app-border));
  }
  
  li ul a {
    grid-template-columns: 1.6rem 1fr;
    grid-template-rows: auto;
    grid-template-areas: "icon title";
    padding: 0.5rem;
  }
  
  li ul span {
    font-size: 1.6rem;
  }
  
  @media only screen and (min-width: 760px) {
    a:not(.active):hover {
      background-color: rgba(var(--color-nav-icon), 0.1);
    }
  }
</style>