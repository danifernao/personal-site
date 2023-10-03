<template>
  <main id="contact">
    <SectionHeader :header="viewData.header" />
    <p v-if="viewData.description" v-html="viewData.description"></p>
    <ContactForm :form="viewData.form" />
  </main>
</template>

<script>
  import SectionHeader from '../components/SectionHeader.vue'
  import ContactForm from '../components/ContactForm.vue'
  
  export default {
    name: 'Contact',
    props: {
      viewData: Object
    },
    components: {
      SectionHeader,
      ContactForm
    }
  }
</script>