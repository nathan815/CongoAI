<script>
  export default {
    props: ['model'],
  }
</script>
<template>
  <div class="card" style="width: 18rem;">
      <img class="card-img-top" :src="model.image || 'https://via.placeholder.com/300x200'" :alt="'Image for model ' + name">
      <div class="card-body">
        <h5 class="card-title">{{ model.name }}</h5>
        <p class="card-text">{{ model.description }}</p>
        <b-button :to="'/models/' + model.id" variant="primary">View Model</b-button>
      </div>
    </div>
</template>
