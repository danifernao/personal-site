<template>
  <footer>    
    <p v-html="footer.description"></p>
  </footer>
</template>

<script>
  export default {
    name: 'Footer',
    props: {
      footer: Object
    }
  }
</script>

<style scoped>
  footer p {
    margin: 0.5rem 0 0;
    padding: 0 1rem;
    font-size: 0.8rem;
  }

  footer p ::v-deep a {
    color: rgb(var(--color-app-link-light));
    text-decoration: underline;
  }
</style>