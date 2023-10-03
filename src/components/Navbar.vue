<template>
  <nav>
    <ul role="tablist">
      <NavbarItem path="/" name="home" :title="views.home.title" :icon="views.home.icon" controls="home" />
      <NavbarItem path="/about" name="about" :title="views.about.title" :icon="views.about.icon" controls="about" />
      <NavbarItem path="/quotes" name="quotes" :title="views.quotes.title" :icon="views.quotes.icon" controls="quotes" />
      <NavbarItem path="/contact" name="contact" :title="views.contact.title" :icon="views.contact.icon" controls="contact" />
    </ul>
  </nav>
</template>

<script>
  import NavbarItem from './NavbarItem.vue'
  
  export default {
    name: 'Navbar',
    props: {
      views: Object
    },
    components: {
      NavbarItem
    }
  }
</script>

<style scoped>
  nav {
    text-align: center;
  }
  
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>