<template>
  <b-navbar toggleable="md" type="dark" variant="dark">

    <b-container>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand to="/">Congo AI</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search models" />
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <b-nav-item href="#">Buy</b-nav-item>
            <b-nav-item href="#">Sell</b-nav-item>
            <b-nav-item href="#">My Cart <b-badge>0</b-badge></b-nav-item>
          </b-navbar-nav>

          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              Hello, <b>Test</b>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-container>

  </b-navbar>
</template>
