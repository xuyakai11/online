<template>
  <div class="loading" v-show="loading">
    <img src="./loading.gif">
  </div>
</template>
<script>
	export default {
  name: 'loading',
  data (){
    return {
      loading:false
    }
  },
  created () {
    this.bus.$on('loading',(data)=> {
    	this.loading = !!data;
    })
  }
}
</script>
<style scoped lang="scss">
.loading{
	display: flex;
	justify-content: center;
  flex-direction: column;
	align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  color: #fff;
  background-color: rgba(0,0,0,0.8);
  p {
    padding: .15rem .15rem .2rem;
    color: #fff;
    font-size: .16rem;
  }
  img {
    width: .3rem;
    height: .3rem;
  }
}
</style>