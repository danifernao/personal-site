<template>
  <main id="home">
    <SectionHeader :header="viewData.header" />
    <p v-html="viewData.description"></p>
    <ul v-if="list">
      <ListItem v-for="(link, index) in list" :key="index" :link="link" :iconSet="viewData.iconSet" />
    </ul>
  </main>
</template>

<script>
  import SectionHeader from '../components/SectionHeader.vue'
  import ListItem from '../components/ListItem.vue'
  import orderObj from '@/assets/js/commons.js'

  export default {
    name: 'Home',
    data () {
      return {
        list: null
      }
    },
    props: {
      viewData: Object
    },
    components: {
      SectionHeader,
      ListItem
    },
    created () {
      this.list = orderObj(this.viewData.links, this.viewData.linksOrder)
    }
  }
</script>

<style scoped>
  ul {
    padding: 0;
    list-style: none;
  }
</style>