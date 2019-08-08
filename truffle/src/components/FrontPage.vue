<template>
  <div class="bassmarket">
    <h1>{{ msg }}</h1>
    <router-link to="/bassmarket">Come On! Bass Marketplace</router-link>
  </div>
</template>

<script>
export default {
  name: 'BassMarket',
  props: {
    msg: String
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
