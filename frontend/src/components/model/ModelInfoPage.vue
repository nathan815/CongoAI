<script>
  import productApi from '../../api/product';
  import { mapState } from 'vuex';
  export default {
    data() {
      return {
        model: {}
      }
    },
    mounted() {
      this.loadData();
    },
    computed: {
      isOwner() {
        return this.$store.state.auth.user.id == this.model.user.id;
      }
    },
    methods: {
      async loadData() {
        const response = await productApi.getInfo(this.$route.params.id);
        this.model = response.data;
        console.log(response.data);
      },
    }
  }
</script>
<template>
  <div class="container mt-4">
    <header>
      <div class="row">
        <div class="col col-md-3">
          <img src="https://via.placeholder.com/250x300" />
        </div>
        <div class="col col-md-9">
          <h1>Model: {{ model.title }}</h1>
          <p class="desc"><i>Description:</i> {{ model.desc }} </p>
          <p v-if="model.price">Price: <b>{{ model.price }}</b></p>
          <p>Type: {{ model.type }}</p>
          <p>Category: {{ model.category }}</p>
          <div v-if="isOwner">
            <b-button variant="dark"><i class="fa fa-edit"></i> Edit</b-button> &nbsp;
            <b-button variant="danger"><i class="fa fa-trash"></i> Delete</b-button>
          </div>
          <div v-else>
            <b-button variant="primary">Buy Now</b-button>
          </div>
        </div>
      </div>

    </header>
  </div>
</template>
<style>
.desc {
  font-size: 20px;
}
</style>
