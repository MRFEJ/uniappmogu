<template>
  <view class="phone-login-container">
    <p class="phone-validate">手机号验证</p>
    <p class="subtitle">用于即使获取课程最新信息</p>
    <view class="content">
      <input v-model="phone" class="phone" placeholder="请输入您的手机号" type="number" />
      <view
        @click="getVcode"
        class="get_vcode"
        :style="{color: isCountDown ? '#ccc' : 'black'}"
      >{{isCountDown? num:"发送验证码"}}</view>
      <input v-model="vcode" class="vcode" placeholder="请输入验证码" type="number" />
    </view>
    <view class="phone-login">
      <img @click="phoneLogin" src="/static/images/phone_login@2x.png" alt />
    </view>
  </view>
</template>

<script>
import Vue from "vue";
import query from "../../utils/query";
export default Vue.extend({
  data() {
    return {
      num: 5,
      phone: "17704051019",
      vcode: "",
      isCountDown: false
    };
  },
  methods: {
    // 点击登录
    async phoneLogin() {
      let ph = /^1[3-9][0-9]{9}$/;
      if (!ph.test(this.phone)) {
        uni.showToast({
          title: "手机号格式不正确", //提示的内容,
          icon: "none", //图标,
          duration: 500 //延迟时间,
        });
        return;
      }
      if (this.vcode.length != 4) {
        uni.showToast({
          title: "验证码是4位数字", //提示的内容,
          icon: "none", //图标,
          duration: 1000 //延迟时间,
        });
        return;
      }
      let res = await query({
        url: "user/login",
        method: "POST",
        data: {
          phone: this.phone,
          vcode: this.vcode
        }
      });
      const { status, token, message } = res.data;
      if (status === 0) {
        uni.showToast({
          title: message, //提示的内容,
          duration: 1000 //延迟时间,
        });
        uni.setStorageSync("my_token", token);
        uni.reLaunch({
          url: "/pages/home/index"
        });
      }
    },
    // 点击发送验证码
    async getVcode() {
      let ph = /^1[3-9][0-9]{9}$/;
      if (!ph.test(this.phone)) {
        uni.showToast({
          title: "手机号格式不正确", //提示的内容,
          icon: "none", //图标,
          duration: 500 //延迟时间,
        });
        return;
      }
      // 如果是false(显示发送验证码)就可以开启倒计时 ,反之就不开启
      if (this.isCountDown) return;
      this.isCountDown = true;
      let time = setInterval(() => {
        this.num--;
        if (this.num == 0) {
          clearInterval(time);
          this.isCountDown = false;
          this.num = 5;
          return
        }
      }, 1000);
      
      let res = await query({
        url: "user/vcode",
        data: {
          phone: this.phone
        }
      });
      // console.log(res);
      uni.showToast({
        title: "验证码为:" + res.data.vcode, //提示的内容,
        icon: "none", //图标,
        duration: 5000 //延迟时间,
      });
    }
  }
});
</script>

<style lang="less" scoped>
.phone-login-container {
  padding: 0rpx 68rpx;
  .phone-validate {
    margin-top: 100rpx;
    color: #393939;
    font-size: 43px;
  }
  .subtitle {
    margin-top: 20rpx;
    color: #a8a8a8;
    font-size: 30rpx;
  }
  .content {
    margin-top: 150rpx;
    height: 250rpx;
    position: relative;
    .phone {
      height: 100rpx;
      font-size: 15px;
      // background-color: green;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        background-color: #e9e9e9;
        left: 0;
        right: 0;
        height: 1px;
        bottom: 1px;
      }
    }
    .get_vcode {
      position: absolute;
      right: 0;
      top: 20rpx;
      width: 164rpx;
      height: 56rpx;
      text-align: center;
      line-height: 56rpx;
      font-size: 24rpx;
      color: #a8a8a8;
      border: 1px solid rgba(168, 168, 168, 1);
      border-radius: 20px;
      z-index: 2;
    }
    .vcode {
      margin-top: 30px;
      height: 100rpx;
      font-size: 15px;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        background-color: #e9e9e9;
        left: 0;
        right: 0;
        height: 1px;
        bottom: 1px;
      }
    }
  }
  .phone-login {
    margin-top: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 568rpx;
      height: 98rpx;
    }
  }
}
</style>