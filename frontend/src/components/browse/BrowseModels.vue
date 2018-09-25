<script>
  import productApi from '../../api/product';

  import ModelCard from '../model/ModelCard';

  export default {
    components: { ModelCard },
    data() {
      return {
        models: []
      }
    },
    mounted() {
      this.loadModels();
    },
    methods: {
      async loadModels() {
        try {
          const response = await productApi.getProducts();
          if(response.status === 200) {
            this.models = response.data;
            console.log(this.models);
          }
        } catch(err) {

        }
      }
    }
  }
</script>
<template>
  <div>
    <header class="page-header">
      <div class="container">
        <h1>Browse Models</h1>
      </div>
    </header>
    <div class="container models">
      <ModelCard v-for="model in models" :model="model" />
      <b-alert variant="dark" :show="!models || models.length === 0">There are no models to display. Create one to sell now!</b-alert>
    </div>
  </div>
</template>
