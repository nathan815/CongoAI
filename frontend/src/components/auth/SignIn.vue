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
        this.$store.dispatch('auth/login', { 
          email: this.form.email, 
          password: this.form.password 
        });
      }
    }
  }
</script>
<template>
  <div>
    <header class="page-header">
      <div class="container">
        <h1>Sign In</h1>
      </div>
    </header>
    <div class="container">
      <b-form @submit.prevent="onSubmit">
        <b-form-group label="Email Address"
                      label-for="email">
          <b-form-input id="email"
                        type="email"
                        v-model="form.email"
                        required
                        placeholder="Enter your email address" />
        </b-form-group>
        <b-form-group label="Password"
                      label-for="password">
          <b-form-input type="password"
                        id="password"
                        v-model="form.password"
                        required
                        placeholder="Enter your password" />
        </b-form-group>
        <b-button type="submit" variant="primary" size="lg">Sign In</b-button>
      </b-form>
    </div>
  </div>
</template>
