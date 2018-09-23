<script>
  import productApi from '../../api/product';

  export default {
    data() {
      return {
        error: null,
        types: [ 'Select one...', 'Turi Create', 'Tensorflow', 'Keras' ],
        categories: ['Select one...', 'Classifier', 'Clustering', 'Graph Analytics', 
        'Image Analysis', 'Nearest Neighbor', 'Regression', 'Text Analytics', 'Topic'],
        form: {
          producttype: 'Select one...',
          category: 'Select one...',
          price: null,
          file: null,
        }
      }
    },
    methods: {
      async onSubmit() {
        this.error = null;
        if(this.form.producttype === 'Select one...') {
          this.error = 'Please select a type';
          return;
        }
        else if(this.form.category === 'Select one...') {
          this.error = 'Please select a category';
          return
        }
        try {
          const response = await productApi.create(this.form);
          if(response.status === 201) {
            this.$router.push('/models/' + response.data.id);
          }
        } catch(err) {
          console.log(err);
          if(err.response && err.response.status === 400) {
            this.error = "Please login first";
          }
          else {
            this.error = err.data.message;
          }
        }
      },
    }
  }
</script>
<template>
  <div>
    <h2>Create a Model</h2>
    <b-alert :show="error" variant="danger">{{ error }}</b-alert>
    <b-form @submit.prevent="onSubmit">
        <b-form-group label="Model Name:"
                      label-for="modelName">
          <b-form-input id="modelName"
                        type="text"
                        v-model="form.title"
                        required
                        placeholder="Give your model a name">
          </b-form-input>
        </b-form-group>

        <b-form-group label="Model Type:"
                      label-for="modelType">
          <b-form-select id="modelType"
                        :options="types"
                        required
                        v-model="form.producttype" />
        </b-form-group>

        <b-form-group label="Category:"
                      label-for="category">
          <b-form-select id="category"
                        :options="categories"
                        required
                        v-model="form.category" />
        </b-form-group>

        <b-form-group label="Description:"
                      label-for="modelDesc">
          <b-form-textarea id="textarea1"
                           v-model="form.desc"
                           required
                           placeholder="Describe what your model does, how it was trained, etc."
                           :rows="3"
                           :max-rows="6" />
        </b-form-group>

        <!--<b-form-group label="Model Zip File"
                      label-for="modelDesc"
                      description="Choose the zip file containing the files of data for your model. This is the model training data that you're selling.">
          <b-form-file v-model="form.file" :state="form.file || null" accept="application/zip"
                       required placeholder="Choose a .zip file..." />
        </b-form-group>-->

        <b-form-group label="List Price"
                      label-for="listPrice">
          <b-input-group size="lg" prepend="$">
            <b-form-input id="listPrice"
                          type="number"
                          step="0.01" min="1"
                          v-model="form.price"
                          required
                          placeholder="0.00" />
          </b-input-group>
        </b-form-group>

        <b-alert variant="dark" show class="mb-3">
          <i class="fa fa-info-circle"></i>
          You'll be able to upload the model data and publish your model to the public after this step.
        </b-alert>

        <b-button type="submit" variant="primary" size="lg">Create Model</b-button>
      </b-form>
  </div>
</template>
