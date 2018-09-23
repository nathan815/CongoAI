<script>
  export default {
    mounted() {
      this.loadData();
    },
    loadData() {
      this.$store.dispatch('product/viewproduct');
    },
  }
</script>
<template>
  <div class="container">
    <header>
      <div class="row">
        <div class="col col-md-3">
          <img src="https://via.placeholder.com/250x300" />
        </div>
        <div class="col col-md-9">
          <h1>Model: {{ $route.params.id }}</h1>
          <p>Model description here...</p>
          <b-button variant="primary">Add to Cart</b-button>
        </div>
      </div>

    </header>
  </div>
</template>
