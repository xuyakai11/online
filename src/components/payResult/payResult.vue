<template>
	<div class="main">
		<img class="status-pay" src="./images/sign-success.png" alt="">
		<h3 class="fail-text">恭喜您报名成功</h3>
		<img class="step" src="./images/step.png" alt="" @click.prevent>
		<courseinfo></courseinfo>
	</div>
</template>
<script>
	import courseinfo from '@/components/common/courseInfo'
	export default {
		name: 'payResult',
		components:{ courseinfo },
		data () {
			return {
			}
		}
	}
</script>
<style scoped lang="scss">
	.status-pay{
		display: block;
		margin: .2rem auto .1rem;
		width: 1.7rem;
		height: auto;
	}
	.fail-text {
		margin-bottom: .3rem;
		font-size: .24rem;
		line-height: .3rem;
		text-align: center;
		color: #f6696d;
	}
	.step{
		display: block;
		width: 100%;
		height: auto;
		margin-bottom: .1rem;
	}
</style>