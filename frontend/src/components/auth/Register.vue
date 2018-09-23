<script>
  import { mapState } from 'vuex';

  export default {
    data() {
      return {
        form: {
          name: "",
          email: "",
          password: "",
        },
      }
    },
    computed: {
      ...mapState({
        error: state => state.register.error,
      }),
    },
    methods: {
      async onSubmit() {
        await this.$store.dispatch('register/createAccount', {
          email: this.form.email,
          password: this.form.password,
          name: this.form.name,
        });
        this.$toasted.show('Welcome to Congo AI! You may now sign in.', {
          duration: 4000,
          position: 'bottom-right'
        });
        this.$router.push('/');
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
      <b-alert variant="warning" dismissible :show="error">{{ error }}</b-alert>
      <b-form @submit.prevent="onSubmit">
        <b-form-group label="Name"
                      label-for="name">
          <b-form-input id="name"
                        type="text"
                        v-model="form.name"
                        required
                        placeholder="Enter your name">
          </b-form-input>
        </b-form-group>
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
