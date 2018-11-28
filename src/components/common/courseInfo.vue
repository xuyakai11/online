<template>
	<div>
		<p class="student-info">学员信息：{{phone}}</p>
		<div class="course-info">
			<img :src="courseInfo[index].img" alt="">
			<div>
				<h3>{{courseInfo[index].className}}</h3>
				<p>{{courseInfo[index].teacherName}}老师</p>
				<strong>¥{{courseInfo[index].price}}</strong>
				<button class="btn">{{courseInfo[index].issue[issueIndex].time}} </button>
			</div>
		</div>
		<div class="real-pay">
			实付款<strong>¥{{courseInfo[index].price}}</strong>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'courseInfo',
		data () {
			return {
				phone:'',
				index:0,
				issueIndex:0,
				courseInfo:[{
					className:'',
					teacherName:'',
					price:'',
					img:'',
					issue:[
						{
							classId:1,
							time:'一期 2018.7.22-2018.7.31'
						},
						{
							classId:2,
							time:'二期 2018.8.6-2018.8.15'
						}
					]
				}]
			}
		},
		mounted () {	
			this.index = +sessionStorage.getItem('classIndex')||0;
			this.issueIndex = +sessionStorage.getItem('issueIndex')||0,
			this.phone = sessionStorage.getItem('phone');
			this.courseInfo = JSON.parse(sessionStorage.getItem('courseInfo'))
		}
	}
</script>
<style scoped lang="scss">
	$red: #e92800;
	.bb1{
		border-bottom: 1px solid #e2e1e1;
	}
	.student-info{
		padding-top: .2rem;
		padding-bottom: .2rem;
		font-size: .15rem;
		line-height: .2rem;
		@extend .bb1;
	}
	.course-info{
		padding-top: .2rem;
		padding-bottom: .2rem;
		overflow: hidden;
		@extend .bb1;
		img{
			height: 1rem;
			width: 1rem;
			float: left;
		}
		&>div{
			float: left;
			margin-left: .1rem;
			width: calc(100% - 1.1rem)
		}
		h3{
			font-size: .18rem;
			line-height: .24rem;
		}
		p{
			font-size: .15rem;
			line-height: .2rem;
		}
		strong{
			display: block;
			padding-top: .02rem;
			padding-bottom: .05rem;
			font-size: .18rem;
			line-height: .24rem;
			font-weight: normal;
			color: $red;
		}
		.btn{
			display: inline-block;
			height: .25rem;
			width: auto;
			padding: 0 .1rem;
			line-height: .25rem;
			font-size: .12rem;
			border-radius: .2rem;
		}
	}
	.real-pay{
		overflow: hidden;
		padding-top: .22rem;
		padding-right: .08rem;
		line-height: .24rem;
		font-size:.15rem;
		strong{
			float: right;
			font-size: .18rem;
			font-weight: normal;
			color: $red;
		}
	}
</style>