<template>
  <div>
    <img class="welcome" src="./images/welcome.png">
    <div class="form">
      <div>
        <span>+86 |</span>
        <input class="phone" type='number' placeholder="请输入手机号码" v-model="phone" maxlength="11">
      </div>
      <div>
        <input class="registerCode" type='number' placeholder="请输入验证码" v-model="registerCode" maxlength="6">
        <span v-show="phoneTrue" @click="askForSendingCode">{{codeBtnText}}</span>
      </div>
      <p><input type="checkbox" v-model="agreement">我已阅读并同意 "<span @click="showService=true">用户服务使用协议</span>"</p>
      <button class="btn buy" :disabled="!phoneTrue||!agreement||!registerCode" @click="toBuy">购买</button>
    </div>
    <div class="service" v-show="showService">
      <img class="close" @click="showService=false" src="./images/close.png">
      <h3>朴新在线学员须知</h3>
      <p>朴新教育科技集团由教育培训行业资深人士创办，主营业务包含K12培训、出国留学考试培训、留学申请、在线教育产品开发等领域。朴新在线为朴新教育科技集团新兴业务，现已推出优课、双师课堂和朴新外教三大在线课程产品。朴新在线教育产品及其相关服务由集团控股子公司——天津朴兴教育科技有限公司提供</p>
      <ul>
        <li>
          <h4>一、 朴新优课报名</h4>
          <p>1.1 学员自主报名</p>
          <p>1.2 优课学费将通过 “支付宝”或“微信”向天津朴兴教育科技有限公司进行支付，暂不支持现金及银行卡支付</p>
        </li>
        <li>
          <h4>二、朴新优课上课</h4>
          <p>2.1 优课课程学习可在网校WEB端进行，登录账号只限本人使用，不得转借他人</p>
          <p>2.2 优课的课程形式为“视频课+社群内教学”，其中视频课包含直播和录播两种形式</p>
          <p>2.3 优课会按照报名时上课时间安排进行上课，若因为学员自身原因导致缺课，学校不承担责任</p>
          <p>2.4 优课的视频课在课次开始后即可观看，在课程有效期内可反复观看（直播课结束后24小时将生成可反复观看的回放视频），超期后不能继续观看</p>
        </li>
        <li>
          <h4>三、转班、倒课</h4>
          <p>3.1 优课为线上学习课程，暂不支持转班和倒班</p>
          <p>3.2 转班：调整以后全部的上课时间与班次，并在新班级继续就读至课程结束</p>
          <p>3.3 倒班：需临时到原班课程相同的平行班听课1次，当次课结束后仍回原班就读</p>
        </li>
        <li>
          <h4>四、退费</h4>
          <p>4.1 特价班报名后不支持退费，请斟酌确认</p>
          <p>4.2 正价班第二次课开课前，可退全部学费。正价班第二次课开课后，则不予退费。请斟酌确认后购买</p>
          <p>4.3 退费需向客服老师提出申请，所退费用，将在15个工作日内退回至原付款账户</p>
          <p>4.4 退费申请发起后学员将不能继续优课课程的学习，退费完成后优课课程将不再提供学习服务，并不再显示在学员个人课程列表中</p>
        </li>
        <li>
          <h4>五、知识产权</h4>
          <p>5.1 优课所有知识产权内容为天津朴兴教育科技有限公司所有。学员不得对外出售甲方内部学习资料，不得进行课堂录音录像，不得向第三方提供或透露甲方的授课教材或教学方法</p>
        </li>
        <li>
          <h4>六、其他</h4>
          <p>6.1 学校根据实际情况享有课程时间、任课教师的更改权</p>
          <p>6.2 上述规定在法律允许范围内的解释权归天津朴兴教育科技有限公司所有</p>
        </li>
      </ul>
      <p>本人已阅读并充分理解以上须知</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'studentInfo',
  data() {
    return {
      phone: '',
      phoneTrue:false, // 手机号是否正确
      registerCode:'', // 验证码
      codeBtnText: '发送验证码',
      agreement: false,// 是否同意协议
      nowTime:new Date().getTime(),
      showService:false
    }
  },
  watch: {
    // 监听用户的手机号，若为空，则恢复初始状态
    phone: function() {
      var reg = /^1[3|4|5|6|7|8|9]\d{9}$/;
      if (reg.test(this.phone)) {
        this.phoneTrue = true;
      }else{
        this.phoneTrue = false;
      }
    }
  },
  mounted(){

  },
  methods: {
    // 请求发送验证码
    askForSendingCode () {
      if(this.codeBtnText !== '发送验证码'){return;}

      this.timer(61);
      // 请求发送验证码
      this.axios.post('User/Leaduser/sendCode', this.qs.stringify({
        mobile: this.phone
      })).then((res)=>{
        this.bus.$emit('tips',{
          show:true,
          title:res.data.message||''
        })
      })
    },
    timer (seconds) {
      var that = this;
      seconds--;
      if (seconds === 0) {
        that.codeBtnText = '发送验证码';
      } else {
        this.codeBtnText = seconds + 's';
        setTimeout(()=>{
          this.timer(seconds);
        },1000)
      }
    },
    // 注册信息
    toBuy () {
      var lastTime = new Date().getTime();

      if (!this.phoneTrue||!this.agreement||!this.registerCode) return false;

      // 防止重复点击
      if(this.lastTime - this.nowTime<2000){return}
      this.nowTime = lastTime;
      
      // 等待loading
      this.bus.$emit('loading',true);

      this.axios.post('User/Leaduser/userRegister', this.qs.stringify({
        mobile: this.phone,
        verifycode: this.registerCode
      })).then((res)=> {
        this.bus.$emit('loading',false);
        // 注册成功 或 老用户直接登录
        if (res.data.status == 1||res.data.errCode == '100005') {
          this.$router.push('/createOrder')

          sessionStorage.setItem('phone',this.phone)
        }else{
          this.bus.$emit('tips',{
            show:true,
            title:res.data.message
          })
        }
      })
    }
  }
}

</script>
<style scoped lang="scss">
$red: #f6696d;
.welcome{
  display: block;
  width: 54%;
  height: auto;
  margin: .3rem auto .25rem;
}
.form {
  width: 70%;
  margin: 0 auto;
  .phone,.registerCode{
    height: .4rem;
    padding: .12rem 0;
    font-size: .14rem;
    line-height: .16rem;
    border-radius: .2rem;
    color: #c0c0c0;
    background-color: transparent;
  }
  input::placeholder{
    color: #c0c0c0;
  }
  &>div{
    position: relative;
    margin-bottom: .1rem;
    font-size: .14rem;
    color: #c0c0c0;
    border: 1px solid #e2e1e1;
    border-radius: .2rem;
    background: #fafafa;
    span{
      position: absolute;
      top: 0;
      bottom: 0;
      padding-top: .1rem;
    }
    &:first-child {
      padding-left: .7rem;
      span {
        left: .2rem;
      }
    }
    &:nth-child(2){
      input{
        padding-left: .2rem;
      }
      span {
        right: .2rem;
        color: $red;
      }
    }
  }
  &>p{
    padding-top: .10rem;
    padding-left: .1rem;
    font-size: .12rem;
    line-height: .16rem;
    text-align: left;
    color: #ccc;
    input{
      display: inline-block;
      height: .16rem;
      width: .16rem;
      margin-right: 8px;
      vertical-align: -.04rem;
      border: 1px solid #e2e1e1;
    }
    span {
      color: $red;
    }
  }
  .buy{
    margin-top: .4rem;
    &[disabled]{
      background: #ededed;
    }
  }
}
.service{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow-y:auto;
  padding: .2rem .3rem;
  text-align: left;
  background-color: #fff;
  .close{
    position: absolute;
    right: .08rem;
    top:.08rem;
    width: .15rem;
  }
  &>h3{
    margin-bottom: .1rem;
    font-size: 16px;
    line-height: 20px;
    color: #666666;
  }
  &>p{
    font-size: 14px;
    line-height: 20px;
    color: #666;
  }
  ul{
    margin-top: 20px;
    li{
      margin-bottom: 30px;
    }
    h4{
      margin-bottom: 5px;
      font-size: 14px;
      line-height: 20px;
      color: #666666;
    }
    p{
      font-size: 12px;
      color: #989898;
      line-height: 20px;
    }
  }
}
</style>
