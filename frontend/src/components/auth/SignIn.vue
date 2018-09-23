<script>
  import { mapState } from 'vuex';

  export default {
    data() {
      return {
        form: {
          email: "",
          password: "",
        },
      }
    },
    computed: {
      ...mapState({
        error: state => state.auth.error,
      }),
    },
    methods: {
      async onSubmit() {
        try {
          await this.$store.dispatch('auth/login', { 
            email: this.form.email, 
            password: this.form.password
          });
          this.$toasted.show('You are now signed in.', {
            duration: 2000,
            position: 'bottom-right'
          });
          this.$router.push('/');
        } catch(err) {

        }
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
      <b-alert variant="warning" dismissible :show="error">{{ error }}</b-alert>
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
