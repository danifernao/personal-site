<template>
  <div class="loading-icon">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
  export default {
    name: 'LoadingIcon'
  }
</script>

<style scoped>
  .loading-icon {
    position: relative;
    display: inline-block;
    padding: 1rem;
    width: 4rem;
    height: 4rem;
  }
  
  .loading-icon div {
    display: inline-block;
    position: absolute;
    left: 0.4rem;
    width: 0.8rem;
    background-color: rgb(var(--color-content-text));
    border-radius: 0.3rem;
    animation: loading 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }
  
  .loading-icon div:nth-child(1) {
    left: 0.4rem;
    animation-delay: -0.24s;
  }
  
  .loading-icon div:nth-child(2) {
    left: 1.6rem;
    animation-delay: -0.12s;
  }
  
  .loading-icon div:nth-child(3) {
    left: 2.8rem;
    animation-delay: 0s;
  }
  
  @keyframes loading {
    0% {
      top: 0.4rem;
      height: 3.2rem;
    }
    
    50%, 100% {
      top: 1.2rem;
      height: 1.6rem;
    }
  }
</style>