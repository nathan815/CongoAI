<script>
  import Navbar from './Navbar';
  export default {
    components: { Navbar }
  }
</script>

<template>
  <div class="App">
    <Navbar />
    <div class="App-content">
      <router-view />
    </div>
    <footer>
      &copy; {{ new Date().getFullYear() }} Congo AI 
      &nbsp; &bull; &nbsp;
      GrizzHacks 3
    </footer>
  </div>
</template>

<style lang="scss">
    @import "assets/scss/app";
</style>
