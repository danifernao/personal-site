<template>
  <header v-if="header">
    <h2>{{ header }}</h2>
  </header>
</template>

<script>
  export default {
    name: 'SectionHeader',
    props: {
      header: String
    }
  }
</script>

<style scoped>
  header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
    text-align: center;
  }
  
  header:before,
  header:after {
    content: "";
    flex: 1;
    padding: 0.1rem;
    border: 0.06rem solid #CCCCCC;
    border-left: 0;
    border-right: 0;
  }
  
  h2 {
    margin: 0;
    padding: 0 1rem;
    font-size: 1.3rem;
  }
</style>