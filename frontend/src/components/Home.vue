<script>
  import ModelCard from './model/ModelCard';

  export default {
    components: { ModelCard },
    data() {
      return {
        models: [
          {
            id: 1,
            name: 'Model 1',
            description: 'Some cool model',
          }
        ]
      }
    }
  }
</script>
<template>
  <div>
      <div class="jumbotron text-center">
      <div class="container">
        <h1 class="display-3">Welcome to <b>Congo AI</b></h1>
        <p class="lead">Your one-stop place to buy and sell pre-trained machine learning models.</p>
        <div class="buttons">
          <b-button variant="light" size="lg" to="/browse"><i class="fas fa-search"></i> Find a Model</b-button> &nbsp;
          <b-button variant="light" size="lg" to="/sell"><i class="fas fa-dollar-sign"></i> Sell a Model</b-button>
        </div>
      </div>
    </div>
    <div class="container">
      <h3>Popular Models</h3>
      <ModelCard v-for="model in models" :model="model" />
    </div>
  </div>
</template>
<style lang="scss">
@import "../assets/scss/variables";
.jumbotron {
    background: $navbar-background;
    color: #fff;
    border-radius: 0;
    .buttons {
      margin-top: 50px;
    }
}
</style>
