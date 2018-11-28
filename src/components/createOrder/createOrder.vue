<template>
	<div class="main">
		<img class="status-pay" src="./images/sign-fail.png" alt="" v-if="payResult==='fail'">
		<h3 class="fail-text" v-if="payResult==='fail'">支付失败</h3>
		<courseinfo></courseinfo>
		<div class="footer">
			<button class="btn" @click="payMoney" :disabled="disabledSubmit">{{disabledSubmit?'支付中...':payResult==='fail'?'重新支付':'立即支付'}}</button>
			<p>合计金额<strong>¥{{courseInfo[index].price}}</strong></p>
		</div>
	</div>
</template>
<script>
	import courseinfo from '@/components/common/courseInfo'
	export default {
		name: 'createOrder',
		components:{ courseinfo },

		data () {
			return {
				payResult:'success',
				index:0,
				issueIndex:0,
				courseInfo:[{}],
				orderId:'',
				disabledSubmit:false,
				nowTime:new Date().getTime()
			}
		},
		mounted () {	
			this.index = +sessionStorage.getItem('classIndex')||0;
			this.issueIndex = +sessionStorage.getItem('issueIndex')||0,
			this.courseInfo = JSON.parse(sessionStorage.getItem('courseInfo'));
		},
		methods:{
			payMoney () {
				let lastTime = new Date().getTime();
				// 防止重复点击
				if(this.lastTime - this.nowTime<4000){return false;}
				this.nowTime = lastTime;

				let classId = this.courseInfo[this.index].issue[this.issueIndex].classId;
				this.disabledSubmit = true;
				// 重新支付不需要再次生成订单
				if(this.orderId){
					this.onBridgeReady();
					return false;
				}
				this.axios.post('/userorder/GenerateOrder/generateOrder',this.qs.stringify({classId:classId,mobile:sessionStorage.getItem('phone')})).then((r)=>{
					let data = r.data;
					if(data.status == 1){
						// 保存订单id，以备支付失败使用
						this.orderId = data.data.orderId;
						this.onBridgeReady();
					}else{
						this.disabledSubmit = false;
						this.bus.$emit('tips',{
						  show:true,
						  title:data.message
						})
					}
				})
			},

		  onBridgeReady: function () {
		    var that = this;
		    this.axios.post('/userorder/wxpay/pay',this.qs.stringify({orderId:this.orderId})).then((r)=>{

		    	if(r.data.status == 0){
		    		this.disabledSubmit = true;
		    		this.bus.$emit('tips',{
		    		  show:true,
		    		  title:r.data.message
		    		})
		    		return false;
		    	}
		    	let data = r.data.data;
  		    if(WeixinJSBridge){
  			    WeixinJSBridge.invoke(
  			      'getBrandWCPayRequest',
  			      {
  			        "appId": data.appId,         //公众号名称，由商户传入
  			        "timeStamp": data.timeStamp, //时间戳，自1970年以来的秒数
  			        "nonceStr": data.nonceStr,   //随机串
  			        "package": data.package,
  			        "signType": data.signType,   //微信签名方式：
  			        "paySign": data.paySign      //微信签名
  			      },
  			      function (res) {
  			        if (res.err_msg == "get_brand_wcpay_request:ok") { // 支付成功
  			          that.$router.replace('/payResult')

  			        }else if(res.err_msg == 'get_brand_wcpay_request:cancel'){ // 用户取消支付
  			        	that.payResult = 'fail';
  			        	that.disabledSubmit = false;
  			        }else if(res.err_msg == 'get_brand_wcpay_request:fail') { // 用户支付失败
  			        	that.payResult = 'fail';
  			        	that.disabledSubmit = false;
  			        }
  			      }
  			    );
  		    }
		    }).catch(error => {
		    	this.disabledSubmit = false;
		    	this.bus.$emit('tips',{
		    	  show:true,
		    	  title:'支付失败，请检查网络!'
		    	})
	      });
		    
		  }
		}

	}
</script>
<style scoped lang="scss">
	.main{
		padding-top: .2rem;
	}
	.status-pay{
		display: block;
		margin: 0 auto .1rem;
		width: 1.7rem;
		height: auto;
	}
	.fail-text {
		margin-bottom: .1rem;
		font-size: .24rem;
		line-height: .3rem;
		text-align: center;
	}
	.footer{
		position: fixed;
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

		strong{
			padding-left: .1rem;
			line-height: .38rem;
			font-size: .28rem;
			vertical-align: -2px;
			font-weight: 400;
		}
		.btn{
			float:right;
			width: auto;
		}
		.btn[disabled]{
			background: #999;
		}
	}
</style>