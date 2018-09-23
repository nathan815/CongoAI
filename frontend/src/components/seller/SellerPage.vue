<script>
  import UploadModel from './UploadModel';
  import YourModels from './YourModels';
  import { mapState } from 'vuex';

  export default {
    components: { UploadModel, YourModels },
    computed: {
      ...mapState({
        isLoggedIn: state => state.auth.isLoggedIn
      })
    },
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
          <YourModels />
        </b-col>
        <b-col>
          <UploadModel />  
        </b-col>
      </b-row>
    </div>
  </div>
</template>
