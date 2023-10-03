<template>
  <main id="about">
    <SectionHeader :header="viewData.header" />
    <div v-html="viewData.body"></div>
  </main>
</template>

<script>
  import SectionHeader from '../components/SectionHeader.vue'
  
  export default {
    name: 'About',
    props: {
      viewData: Object
    },
    components: {
      SectionHeader
    }
  }
</script>