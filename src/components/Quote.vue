<template>
  <blockquote>
    <p>{{ quote.content }}</p>
    <footer>{{ quote.footer }}</footer>
  </blockquote>
</template>

<script>
  export default {
    name: 'Quote',
    props: {
      quote: Object
    }
  }
</script>