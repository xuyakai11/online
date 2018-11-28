import axios from 'axios'
export default {
  wxShowMenu : function() {
    var url = 'http://zhibo.pxjy.com/';
    if(location.host.indexOf('zhibo.pxjy.com')===-1){
        url = 'http://test.wangxiao.pxjy.com/'
    }
    axios.post(url+'pxwx/share/getShareParams').then(function(res){
      var getMsg = res.data.data;
      // 非正常情况打开页面，重定向去登录获取openId
      if(res.data.status == '2'){return location.href = getMsg.url}

      wx.config({
        debug: false,        //生产环境需要关闭debug模式
        appId: getMsg.appId, //appId通过微信服务号后台查看
        timestamp: getMsg.timestamp, //生成签名的时间戳
        nonceStr: getMsg.noncestr,   //生成签名的随机字符串
        signature: getMsg.signature, //签名
        jsApiList: [ //需要调用的JS接口列表
            'onMenuShareTimeline',   //分享给好友
            'onMenuShareAppMessage', //分享到朋友圈
            'showMenuItems',
            'hideMenuItems'
        ]
      });
      
      wx.ready(function() {
        wx.checkJsApi({
            jsApiList: ["showMenuItems"],
            success: function(res) {
                wx.showMenuItems({
                    menuList: [
                        'menuItem:share:appMessage', //发送给朋友
                        'menuItem:share:timeline'    //分享到朋友圈
                    ]
                });
            }
        });
        //分享到朋友圈
        wx.onMenuShareTimeline({
            title: "朴新双师直播目标班", // 分享标题
            desc: "直播授课,学期家长会,考试检测,及时答疑,随堂测1对1批改,无限回放",//分享描述
            link: getMsg.shareLink,// 分享链接
            imgUrl: getMsg.imgUrl  // 分享图标
        });

        //分享给朋友
        wx.onMenuShareAppMessage({
            title: "朴新双师直播目标班", // 分享标题
            desc: "直播授课,学期家长会,考试检测,及时答疑,随堂测1对1批改,无限回放", // 分享描述
            link: getMsg.shareLink, // 分享链接
            imgUrl: getMsg.imgUrl   // 分享图标
        });
      });
    })
  }
}