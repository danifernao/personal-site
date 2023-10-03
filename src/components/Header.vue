<template>
  <div id="header">    
    <div id="cover" v-if="header.coverFilePath">
      <router-link to="/" :class="{loaded: coverLoaded}" :style="coverStyle" title="Ir a la página principal" />
    </div>
    
    <div id="avatar" v-if="header.avatarFilePath">
      <a href="/" @click.prevent="zoomAvatar = !zoomAvatar" title="Ampliar imagen">
        <img alt="Fotografía de perfil" v-onload="header.avatarFilePath" />
      </a>
      <FsLightbox :toggler="zoomAvatar" :sources="[header.avatarFilePathFullSize]" />
    </div>
    
    <header v-if="header.title">
      <h1>
        <router-link to="/" title="Ir a la página principal">{{ header.title }}</router-link>
      </h1>
      <p v-html="header.description"></p>
    </header>
  </div>
</template>

<script>
  import FsLightbox from 'fslightbox-vue'
  
  export default {
    name: 'Header',
    data () {
      return {
        coverLoaded: false,
        zoomAvatar: false
      }
    },
    props: {
      header: Object
    },
    components: {
      FsLightbox
    },
    computed: {
      coverStyle () {
        return this.coverLoaded ? `background-image: url("${ this.header.coverFilePath }");` : ''
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.$images.preload(
          [this.header.coverFilePath],
          () => {
            this.coverLoaded = true
          }
        )
      })
    }
  }
</script>

<style scoped>
  #cover {
    background-color: rgb(var(--color-app-link-light));
  }
  
  #cover, #cover a {
    border-top-left-radius: 0.7rem;
    border-top-right-radius: 0.7rem;
  }
  
  #cover a {
    display: block;
    height: 10rem;
    background-size: cover;
    opacity: 1;
    transition: opacity 0.3s ease-out;
  }
  
  #cover a:not(.loaded) {
    opacity: 0;
  }
  
  #avatar {
    height: 4.4rem;
    text-align: center;
  }
  
  #avatar a {
    display: inline-block;
    width: 9rem;
    height: 9rem;
    background-color: rgb(var(--color-app-link-light));
    border: 0.19rem solid rgb(var(--color-app-background));
    text-decoration: none;
    transform: translateY(-50%);
  }
  
  #avatar a, #avatar img {
    border-radius: 50%;
  }

  #avatar img {
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
    object-fit: cover;
    opacity: 1;
    transition: opacity 0.3s ease-out;
  }
  
  #avatar img[data-src] {
    opacity: 0;
  }
  
  header {
    margin-bottom: 1rem;
    text-align: center;
    color: rgb(var(--color-app-text));
  }
  
  header > * {
    margin: 0;
  }
  
  header h1 a {
    color: rgb(var(--color-app-text));
    text-decoration: none;
  }
  
  header p {
    padding: 0 1rem;
  }

  header p ::v-deep a {
    text-decoration: none;
  }

  header p ::v-deep a:hover {
    text-decoration: underline;
  }
</style>