<template>
<view class="login-container">
    <image class="logo" src="../../static/images/logo@2x.png"></image>
    <text class="title">蘑菇在线</text>
    <image class="login-tips" src="../../static/images/login_tips@2x.png"></image>
    <button plain open-type="getUserInfo" @getuserinfo="wxLogi" class="wx-login-button"> 
           <image class="wx-login-img" src="../../static/images/wx_login@2x.png"> </image>
    </button>
   
    <text @click="goPhone" class="phone-login">手机号登录</text>
    <text class="bottom-tip">Copyright © 2019 蘑菇在线</text>
</view>
</template>

<script>
import Vue from "vue";
import query from "../../utils/query.js"
export default Vue.extend({
  data() {
    return {};
  },
  methods:{
    wxLogi:(e)=>{
      // console.log(e.detail.userInfo)
      // if(e.detail.errMsg=="getUserInfo:fail auth deny") return
      const {avatarUrl:avatar,nickName:nickname}=e.detail.userInfo
      uni.login({
         success:async ({code})=>{
          // console.log(code)
          // 发请求

          let res=await query({url:"user/wxlogin",method:"POST",data:{
            code,
            nickname,
            avatar
          }})
          // console.log(res)
          const {status,message,token}=res.data
          // 请求成功

          if(status===0){
            uni.showToast({
              title:message,
            })
            uni.setStorageSync("my_token",token)
            uni.reLaunch({
              url:'/pages/home/index'
            })
          // 请求失败
          }else{
             uni.showToast({
              title:message,
              icon:"none"
            })
          }
        }
      })

    },
    goPhone(){
      uni.reLaunch({url:'/pages/login_phone/index'})
    }
  }
});
</script>

<style lang="less" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .logo {
    margin-top: 180rpx;
    width: 212rpx;
    height: 212rpx;
  }
  .title {
    color: #333333;
    font-size: 24px;
    margin-top: 20rpx;
  }
  .login-tips {
    margin-top: 30rpx;
    height: 34rpx;
    width: 292rpx;
    position: relative;
  }
  .wx-login-button {
    margin-top: 200rpx;
    width: 568rpx;
    height: 98rpx;
    padding: 0;
    border: none;
  }
  .wx-login-img {
    // margin-top:200rpx;
    width: 568rpx;
    height: 98rpx;
  }
  .phone-login {
    margin-top: 40rpx;
    color: #333333;
    font-size: 15px;
  }
  .bottom-tip {
    color: #a8a8a8;
    font-size: 10px;
    position: absolute;
    bottom: 40rpx;
  }
}
.wx-login-container {
  position: relative;
  .wx-login-tip1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 450rpx;
    padding-top: 50rpx;
    img {
      width: 198rpx;
      height: 198rpx;
    }
    p {
      color: #bebebe;
      margin-top: 50rpx;
      font-size: 13px;
    }
  }
  .wx-login-tip1-cover {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 500rpx;
    background: rgba(0, 0, 0, 1);
    opacity: 0.16;
  }
}
</style>