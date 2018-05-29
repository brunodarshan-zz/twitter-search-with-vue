<template>
  <div id="app">
  <Search />
  </div>
</template>

<script>
import Search from './components/Search.vue'

export default {
  name: 'app',
  components: {
    Search
  }
}
</script>

<style scoped>
  #app {
    display: flex;
    width: 100%;
    max-width: 400px;
    height: auto;
    padding: 0.5em;
    border: 1px solid #ddd;
    background: #76d1f2;
  }
</style>
