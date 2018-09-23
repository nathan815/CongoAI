<script>
  export default {
    data() {
      return {
        types: {
          0: 'Select one...', 
          turiCreate: 'Turi Create', 
          tensorflow: 'Tensorflow', 
          keras: 'Keras'
        },
        form: {
          type: 0
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
  </div>
</template>
