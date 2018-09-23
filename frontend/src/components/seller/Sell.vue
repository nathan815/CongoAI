<script>
  export default {
    data() {
      return {
        types: ['Turi Create', 'Tensorflow', 'Keras'],
        form: {
          
        }
      }
    },
    methods: {
      onSubmit() {

      },
    }
  }
</script>
<template>
  <div>
    <header class="page-header">
      <div class="container">
        <h1>Sell Models</h1>
      </div>
    </header>
    <div class="container">
      <b-row>
        <b-col>
          <h2>Your Models</h2>
          <b-alert variant="dark" show>You haven't added any models yet. Upload a model to the right and start selling today!</b-alert>
        </b-col>
        <b-col>
          <h2>Upload a Model</h2>
          <b-form @submit="onSubmit">
              <b-form-group label="Model Name:"
                            label-for="modelName">
                <b-form-input id="modelName"
                              type="text"
                              v-model="form.name"
                              required
                              placeholder="Give your model a name">
                </b-form-input>
              </b-form-group>
              <b-form-group label="Model Description:"
                            label-for="modelDesc">
                <b-form-textarea id="textarea1"
                                 v-model="form.desc"
                                 placeholder="Describe what your model does, how it was trained, etc."
                                 :rows="3"
                                 :max-rows="6" />
                </b-form-input>
              </b-form-group>
              <b-form-group label="Model Type:"
                            label-for="modelType">
                <b-form-select id="modelType"
                              :options="types"
                              required
                              v-model="form.type">
                </b-form-select>
              </b-form-group>
              <b-button type="submit" variant="primary">Submit</b-button>
            </b-form>
          </b-col>
      </b-row>
    </div>
  </div>
</template>
