<template>
  <div id="app">
    <router-view/>

  </div>
</template>

<script>
import Vue from './App'

export default {
  name: 'App',
  data () {
    return{
      username : "tes"
    }
  },
}
</script>

<style>
#app {
  font-family: monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
