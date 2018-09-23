<template>
  <div>
    <h2>Your Models</h2>
    <b-alert variant="dark" show class="no-models">
      <i class="fa fa-bolt"></i>
      Looks like you haven't added any models yet. Post a model and start selling today!
    </b-alert>
  </div>  
</template>
<style scoped lang="scss">
.no-models {
  margin-top: 40px;
  text-align: center;
  font-size: 20px;
  .fa {
    font-size: 50px;
    display: block;
    margin: 20px 0;
  }
}
</style>
