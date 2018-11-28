<template>
  <!-- 提示弹层 -->
  <div class="tips" v-show="tips.show">
	  <h3>{{tips.title}}</h3> 
  </div>
</template>
<script>
	export default {
  name: 'tips',
  data (){
    return {
      tips:{
      	show:false,
      	title:''
      }
    }
  },
  created () {
    this.bus.$on('tips',(data)=>{
    	this.tips = data;
    })
  },
  watch:{
  	tips:function(){
  		if(this.tips.show){
  			setTimeout( ()=>{
  				this.tips.show = false;
  			},1500)
  		}
  	}
  }
}
</script>
<style scoped lang="scss">
.tips{
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
  h3{
  	padding: .1rem .2rem;
  	font-size: 12px;
  	line-height: 12px;
	  background-color: rgba(0,0,0,0.8);
  	border-radius: 4px;
  }
}
</style>