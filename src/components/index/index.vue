<template>
	<div class="main">
		<ul class="subject-list">
			<li v-for="(item,index) in subject" @click="selectSubject(index)">{{item}}</li>
		</ul>
		<img :src="courseInfo[index].imgtop">
		<div class="swiper-container">
		  <div class="swiper-wrapper">
		    <div class="swiper-slide">
		    	<img src="./images/englishTeacher.png" alt="">
		    </div>
		    <div class="swiper-slide">
		    	<img src="./images/mathTeacher.png" alt="">
		    </div>
		    <div class="swiper-slide">
		    	<img src="./images/physicsTeacher.png" alt="">
		    </div>
		    <div class="swiper-slide">
		    	<img src="./images/chemistryTeacher.png" alt="">
		    </div>
		  </div>
			<div class="swiper-pagination"></div>
		</div>
		<img :src="courseInfo[index].imgmiddle">

		<img src="./images/bottom.png" alt="">
		<img src="./images/after-manage.png">
		<img src="./images/study-step.png">
		<img class="erweima" src="./images/erweima.png">
		<p class="intro">
			朴新教育以中小学课外辅导为中心，由一群平均行业经验15年以上的教育培训行业自身高管共同创立。
		</p>
		<p class="intro">
			朴新福布斯成立于2002年，业务体系全面覆盖小学、初中、高中，提供全科课程辅导服务。
		</p>
		<p class="intro">
			坚持以教学质量为根本，提供优质学习体验和教学服务。
		</p>
		<div class="footer">
			<button class="btn" @click="tobuy">{{showCourse?'立即购买':'选择班级'}}</button>
			<p><strong>¥{{courseInfo[index].price}}</strong><!-- <span>{{hasBuy}}人已买</span> --></p>
		</div>
		<div class="full" v-show="showCourse" @click="closeCourse($event)">
			<div class="course-info">
				<ul class="subject-list-fixed">
					<li :class="{activeFixed:index===i}" v-for="(item,i) in subject" @click="selectSubject(i)">{{item.slice(2,4)}}</li>
				</ul>
				<img class="close" @click="showCourse=false" src="./images/close.png">
				<img class="course-img" :src="courseInfo[index].img" alt="">
				<div>
					<h3>{{courseInfo[index].className}}</h3>
					<p class="teacher-name">{{courseInfo[index].teacherName}}老师</p>
					<p>请选择班级</p>
					<!-- <strong>¥{{courseInfo[index].price}}</strong> -->
					<button class="btn" :class="{active:issueIndex===i}" @click="selectIssue(i)" v-for="(item,i) in courseInfo[index].issue" :disabled="item.full=='已满'">{{item.time}} {{item.full}}</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'index',
		data (){
			return {
				index:0,
				issueIndex:'',
				hasBuy:520,
				showCourse:false,
				subject:['初一英语','初一数学','初二物理','初三化学'],
				courseInfo:[
					{
						className:'初一英语双师直播目标班',
						teacherName:'李伟娜',
						price:'50',
						img:'./static/images/english/course.png',
						imgtop:'./static/images/english/top.png',
						imgmiddle:'./static/images/english/middle.png',
						issue:[
							{
								classId:11,
								full:'已满',
								time:'一期 2018.07.22-2018.07.31'
							},
							{
								classId:12,
								time:'二期 2018.08.06-2018.08.15'
							}
						]
					},
					{
						className:'初一数学双师直播目标班',
						teacherName:'张吉燕',
						price:'50',
						img:'./static/images/math/course.png',
						imgtop:'./static/images/math/top.png',
						imgmiddle:'./static/images/math/middle.png',
						issue:[
							{
								classId:5,
								time:'一期 2018.07.22-2018.07.31'
							},
							{
								classId:8,
								full:'已满',
								time:'二期 2018.08.06-2018.08.15'
							}
						]
					},
					{
						className:'初二物理双师直播目标班',
						teacherName:'高京',
						price:'50',
						img:'./static/images/physics/course.png',
						imgtop:'./static/images/physics/top.png',
						imgmiddle:'./static/images/physics/middle.png',
						issue:[
							{
								classId:6,
								time:'一期 2018.07.22-2018.07.31'
							},
							{
								classId:9,
								full:'已满',
								time:'二期 2018.08.06-2018.08.15'
							}
						]
					},
					{
						className:'初三化学双师直播目标班',
						teacherName:'李浩雯',
						price:'50',
						img:'./static/images/chemistry/course.png',
						imgtop:'./static/images/chemistry/top.png',
						imgmiddle:'./static/images/chemistry/middle.png',
						issue:[
							{
								classId:7,
								time:'一期 2018.07.22-2018.07.31'
							},
							{
								classId:10,
								full:'已满',
								time:'二期 2018.08.06-2018.08.15'
							}
						]
					}
				]
			}
		},
		mounted () {
			this.WXConfig.wxShowMenu();
			sessionStorage.setItem('courseInfo',JSON.stringify(this.courseInfo))
			var mySwiper = new Swiper('.swiper-container',{
			    autoplay:5000,
			    pagination:'.swiper-pagination',
			    paginationClickable:true
				});

		},
		methods:{
			selectSubject (index) {
				this.index = index;
				this.issueIndex = '';
			},
			selectIssue (i) {
				this.issueIndex = i
			},
			tobuy () {
				if(!this.showCourse){return this.showCourse = !this.showCourse};
				if(this.issueIndex!==''){
					sessionStorage.setItem('classIndex',this.index); // 缓存当前选择的班级索引，之后页面用到
					sessionStorage.setItem('issueIndex',this.issueIndex); // 缓存当前选择的班级的期次

					this.$router.push('/studentInfo');
				}else{
					this.bus.$emit('tips',{
					  show:true,
					  title:'请选择班级'
					})
				}
			},
			closeCourse (e){
				if(e.target.className === 'full'){
					this.showCourse = false;
				}
			}
		}

	}
</script>
<style lang="scss">
	.swiper-container{
		background: url(./images/teacher-bg.jpg) top center no-repeat;
		background-size:  100% 100%;
		div.swiper-pagination{
			bottom: .25rem;
		}
	}
	.swiper-slide{
		img{
			display: block;
			width: 100%;
			height: auto;
		}
	}

	span.swiper-pagination-bullet{
		height: .12rem;
		width: .12rem;
		background-color: rgba(149,85,238,1);
	}
</style>
<style scoped lang="scss">
	.main{
		padding: 0 0 1rem;
		&>img{
			display: block;
			width: 100%;
			height: auto;
			margin-bottom: -1px;
		}
		.erweima{
			width: 2.2rem;
			height: auto;
			margin: .5rem auto;
		}
		.intro{
			padding: 0 .3rem;
			margin-bottom: .1rem;
			font-size: .14rem;
			line-height: .2rem;
			color: #1ecec3;
		}
	}
	.subject-list{
		overflow: hidden;
		padding: .2rem .25rem 0;
		margin-bottom: .06rem;
		li{
			float: left;
			width: 31%;
			height: .34rem;
			margin-bottom: .24rem;
			line-height: .36rem;
			font-size: .16rem;
			text-align: center;
			color: #fff;
			border-radius: 20px;
			&:nth-child(3n - 1){
				margin-left: 3.5%;
				margin-right: 3.5%;
				background: #d898fc;
				box-shadow: 0 2px 4px 0 rgba(203,203,253,0.60);
			};
			&:first-child{
				background: #9bd2ff; 
				box-shadow: 0 2px 4px 0 rgba(203,203,253,0.60);
			}
			&:nth-child(3){
				background: #f892b8; 
				box-shadow: 0 2px 4px 0 rgba(255,165,176,0.60);
			}
			&:nth-child(4){
				background: #ffc382; 
				box-shadow: 0 2px 4px 0 rgba(255,195,130,0.60);
			}
		}
	}
	.full{
		position: fixed;
		z-index: 2;
		left: 0;
		bottom: .55rem;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.5);
	}
	.course-info{
		position: absolute;
		left:0;
		bottom:0;
		width: 100%;
		padding: .2rem;
		background-color: #fff;
		.course-img{
			height: 1rem;
			width: 1rem;
			float: left;
		}
		.close{
			position: absolute;
			right: .04rem;
			top:.06rem;
			width: .14rem;

		}
		&>div{
			float: left;
			overflow: hidden;
			margin-left: .1rem;
			width: calc(100% - 1.1rem)
		}
		h3{
			font-size: .18rem;
			line-height: .18rem;
		}
		.teacher-name{
			font-size: .16rem;
		}
		p{
			padding: .05rem 0;
			font-size: .15rem;
			line-height: .16rem;
		}
		strong{
			display: block;
			padding-top: .02rem;
			padding-bottom: .05rem;
			font-size: .18rem;
			line-height: .24rem;
			font-weight: normal;
			color: #e92800;
		}
		.btn{
			display: inline-block;
			height: .25rem;
			width: auto;
			padding: 0 .12rem;
			margin-bottom: 5px;
			line-height: .25rem;
			font-size: .12rem;
			color: #f6696d;
			background: #fff;
			border-radius: .2rem;
			border: 1px solid #f6696d;
			white-space: nowrap;
			&[disabled]{
				color: #999;
				background-color: #ededed;
				border-color: #ededed;
		}
		}
		.active{
			color: #fff;
			background-image: linear-gradient(138deg, #f5656c 0%, #ffa772 100%);
			border-width: 0;
		}
	}
	.subject-list-fixed{
		overflow: hidden;
		li{
			float: left;
			width: 24%;
			height: .25rem;
			margin-right: 1.3%;
			margin-bottom: .15rem;
			line-height: .25rem;
			font-size: .16rem;
			text-align: center;
			color: #fff;
			border:1px solid #9bd2ff;
			border-radius: 8px;
			background-color: #fff;
			&:first-child{
				color:#9bd2ff;
				box-shadow: 0 2px 4px 0 rgba(203,203,253,0.60);
			}
			&:nth-child(2){
				color: #d898fc;
				border-color:#d898fc;
				box-shadow: 0 2px 4px 0 rgba(203,203,253,0.60);
			}
			&:nth-child(3){
				color: #f892b8; 
				border-color:#f892b8;
				box-shadow: 0 2px 4px 0 rgba(255,165,176,0.60);
			}
			&:nth-child(4){
				margin-right: 0;
				color: #ffc382; 
				border-color:#ffc382;
				box-shadow: 0 2px 4px 0 rgba(255,195,130,0.60);
			}
			&.activeFixed{
				color: #fff!important;
				&:first-child{
					background: #9bd2ff; 
				}
				&:nth-child(2){
					background: #d898fc;
				}
				&:nth-child(3){
					background: #f892b8;
				}
				&:nth-child(4){
					background: #ffc382;
				}
			}
		}
	}
	.footer{
		position: fixed;
		z-index: 2;
		bottom: 0;
		left: 0;
		height: .55rem;
		width: 100%;
		padding: .08rem .2rem;
		font-size: .18rem;
		color: #e92800;
		line-height: .24rem;
		border-top: 1px solid #eee;
		background-color: #fff;
		p{
			position: relative;
			width: 50%;
			height: .39rem;
			span{
				position: absolute;
				left: 0;
				bottom: 0;
				font-size: .12rem;
				line-height: .16rem;
			}
			strong{
				/*position: absolute;*/
				left: 0;
				top: -.07rem;
				line-height: .38rem;
				font-size: .28rem;
				vertical-align: top;
				font-weight: 400;
			}
		}

		.btn{
			float:right;
			width: auto;
		}
	}
</style>