<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
     <p>To get started just sign up on our register page and login</p>
     <p>Go to the about us to find out more about us</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
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
