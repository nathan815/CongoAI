<script>
  import Navbar from './Navbar';

  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'

  export default {
    components: { Navbar: Navbar }
  }
</script>

<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>
