<script>
  import productApi from '../../api/product';
  import transactionApi from '../../api/transaction';

  export default {
    data() {
      return {
        model: {},
        purchaseError: null,
        purchasing: false
      }
    },
    mounted() {
      this.loadData();
    },
    computed: {
      isOwner() {
        console.log(this.$store.state.auth,this.model);
        return this.$store.state.auth.user && this.model.user && (this.$store.state.auth.user.id == this.model.user.id);
      }
    },
    methods: {
      async loadData() {
        const response = await productApi.getInfo(this.$route.params.id);
        this.model = response.data;
        // console.log(response.data);
      },
      async purchase() {
        try {
          this.purchasing = true;
          const response = await transactionApi.create(this.$route.params.id);
          if(response.status == 201) {
            this.loadData();
            hideModal();
          }
        } catch(err) {
          this.purchaseError = "Unable to process purchase.";
        }  finally {
          this.purchasing = false;
        }
      },
      hideModal () {
        this.$refs.myModalRef.hide()
      }
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
          <p>Type: {{ model.producttype }}</p>
          <p>Category: {{ model.category }}</p>
          <div v-if="!isOwner">
            <b-button variant="primary"><i class="fa fa-upload"></i> Upload Data</b-button> &nbsp;
            <b-button variant="dark"><i class="fa fa-edit"></i> Edit</b-button> &nbsp;
            <b-button variant="danger"><i class="fa fa-trash"></i> Delete</b-button>
          </div>
          <div v-else>
            <b-button variant="primary" v-b-modal.purchase>Buy Now</b-button>
          </div>
          <b-modal ref="myModalRef" id="purchase" hide-footer title="Purchase Model">
            <b-alert variant="danger" :show="purchaseError" dismissible>{{ purchaseError }}</b-alert>
            <p>Do you want to purchase this model for <b>${{ model.price }}</b>?</p>
            <b-btn class="mt-3" variant="outline-dark" @click="hideModal">Cancel</b-btn> &nbsp;
            <b-btn class="mt-3" variant="outline-primary" @click="purchase" :disabled="purchasing">
              {{ purchasing ? 'Please wait...' : 'Purchase' }}
            </b-btn>
          </b-modal>
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
