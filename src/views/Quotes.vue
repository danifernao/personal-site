<template>
  <main id="quotes">
    <SectionHeader :header="viewData.header" />
    <p v-if="viewData.description" v-html="viewData.description"></p>
    <Quote v-for="(quote, index) in quotes" :key="index" :quote="quote" />
  </main>
</template>

<script>
  import SectionHeader from '../components/SectionHeader.vue'
  import Quote from '../components/Quote.vue'
  import orderObj from '@/assets/js/commons.js'
  
  export default {
    name: 'Quotes',
    data () {
      return {
        quotes: null
      }
    },
    props: {
      viewData: Object
    },
    components: {
      SectionHeader,
      Quote
    },
    created () {
      this.quotes = orderObj(this.viewData.items, this.viewData.itemsOrder)
    }
  }
</script>