<script>
  export default {
    data() {
      return {
        form: {
          email: "",
          password: "",
        },
      }
    },
    methods: {
      onSubmit() {

      }
    }
  }
</script>
<template>
  <div>
    <header class="page-header">
      <div class="container">
        <h1>Register</h1>
      </div>
    </header>
    <div class="container">
      <b-form @submit="onSubmit">
        <b-form-group label="Email Address"
                      label-for="email"
                      description="We'll never share your email with anyone else.">
          <b-form-input id="email"
                        type="email"
                        v-model="form.email"
                        required
                        placeholder="Enter your email address">
          </b-form-input>
        </b-form-group>
        <b-form-group label="Password"
                      label-for="password">
          <b-form-input type="password"
                        id="password"
                        v-model="form.password"
                        required
                        placeholder="Enter a password">
          </b-form-input>
        </b-form-group>
        <b-form-group label="Confirm Password"
                      label-for="password2">
          <b-form-input type="password"
                        id="password2"
                        v-model="form.confirmPassword"
                        required
                        placeholder="Re-enter your password">
          </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Register</b-button>
      </b-form>
    </div>
  </div>
</template>
