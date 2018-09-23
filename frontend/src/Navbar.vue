<script>
  import { mapState } from 'vuex';
  export default {
    computed: {
      ...mapState({
        isLoggedIn: state => state.auth.isLoggedIn,
        user: state => state.auth.user,
      }),
    },
    methods: {
      logout() {
        this.$store.dispatch('auth/logout');
        this.$router.push('/');
      }
    }
  }
</script>
<template>
  <b-navbar toggleable="md" type="dark" class="navbar">

    <b-container>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand to="/">Congo AI</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        
        <b-navbar-nav>
          <b-nav-item to="/browse">Browse</b-nav-item>
          <b-nav-item to="/sell">Sell</b-nav-item>
        </b-navbar-nav>

        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search models..." />
        </b-nav-form>

        <b-navbar-nav class="mx-auto">
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-navbar-nav v-if="isLoggedIn">
            <!-- <b-nav-item to="/cart">My Cart <b-badge variant="light">0</b-badge></b-nav-item> -->
          </b-navbar-nav>

          <b-navbar-nav v-else>
            <b-nav-item to="/signin">Sign In</b-nav-item>
            <b-nav-item to="/register">Register</b-nav-item>
          </b-navbar-nav>

          <b-nav-item-dropdown right v-if="isLoggedIn">
            <!-- Using button-content slot -->
            <template slot="button-content">
              Hello, <b>{{ user.name }}</b>
            </template>
            <b-dropdown-item to="/purchases">Purchase History</b-dropdown-item>
            <b-dropdown-item :to="`/users/${user.id}`">Profile</b-dropdown-item>
            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>

        </b-navbar-nav>

      </b-collapse>
    </b-container>

  </b-navbar>
</template>

<style lang="scss">
@import "assets/scss/variables";
.navbar {
  background: $navbar-background;
  form input.form-control {
    border-radius: 30px;
    border: 0;
    padding-left: 15px;
    margin-left: 20px;
    width: 300px;
    max-width: 100%;
  }
}
</style>
