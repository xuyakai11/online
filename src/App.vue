<template>
  <div id="app">
    <router-view/>
    <tips></tips>   
    <loading></loading>   
  </div>
</template>
<script>
import tips from '@/components/common/tips'
import loading from '@/components/common/loading'
export default {
  name: 'App',
  components:{tips,loading}
}
</script>
<style>
#app {
	height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #666;
}
</style>
