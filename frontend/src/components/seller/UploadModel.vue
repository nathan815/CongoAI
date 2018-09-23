<script>
  export default {
    data() {
      return {
        error: null,
        types: {
          0: 'Select one...', 
          turiCreate: 'Turi Create', 
          tensorflow: 'Tensorflow', 
          keras: 'Keras'
        },
        categories: ['test','test2'],
        form: {
          type: 0,
          category: 'test',
          price: null,
          file: null,
        }
      }
    },
    methods: {
      onSubmit() {
        if(this.form.type === 0) {
          this.error = 'Please select a type';
        }
      },
    }
  }
</script>
<template>
  <div>
    <h2>Upload a Model</h2>
    <b-alert :show="error" variant="danger">{{ error }}</b-alert>
    <b-form @submit.prevent="onSubmit">
        <b-form-group label="Model Name:"
                      label-for="modelName">
          <b-form-input id="modelName"
                        type="text"
                        v-model="form.name"
                        required
                        placeholder="Give your model a name">
          </b-form-input>
        </b-form-group>

        <b-form-group label="Model Type:"
                      label-for="modelType">
          <b-form-select id="modelType"
                        :options="types"
                        required
                        v-model="form.type" />
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
          </b-form-input>
        </b-form-group>

        <b-form-group label="Model Zip File"
                      label-for="modelDesc"
                      description="Choose the zip file containing the files of data for your model. This is the model training data that you're selling.">
          <b-form-file v-model="form.file" :state="form.file || null" accept="application/zip"
                       required placeholder="Choose a .zip file..." />
        </b-form-group>

        <!--<b-form-group label="List Price"
                      label-for="listPrice">
          <b-input-group size="lg" prepend="$">
            <b-form-input id="listPrice"
                          type="number"
                          step="0.01"
                          v-model="form.price"
                          required
                          placeholder="0.00" />
          </b-input-group>
        </b-form-group>-->

        <b-alert variant="dark" show class="mb-3">
          <i class="fa fa-info-circle"></i>
          You'll be able to add pricing information and publish your model to the public after this step.
        </b-alert>

        <b-button type="submit" variant="primary" size="lg">Upload Model</b-button>
      </b-form>
  </div>
</template>
