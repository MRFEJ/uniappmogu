<template>
  <view class="my-container">
    <view class="header">
      <image class="avatar" :src="userInfo.avatar" mode />
      <view class="nickname">{{userInfo.nickname}}</view>
    </view>

    <view class="tips">
      <view class="left">
        <view class="title">{{userInfo.study_hour}}</view>
        <view class="subtitle">累计学习小时</view>
      </view>

      <view class="middle">
        <view class="title">{{userInfo.follow_count}}</view>
        <view class="subtitle">我的关注</view>
      </view>

      <view class="right">
        <view class="title">{{userInfo.course_count}}</view>
        <view class="subtitle">我的课程</view>
      </view>
    </view>

    <view class="cells">
      <view class="cell">
        <p>学习历史</p>
        <img src="../../static/images/arrow@2x.png" alt />
      </view>

      <view class="cell">
        <p>消息提醒</p>
        <img src="../../static/images/arrow@2x.png" alt />
      </view>

      <view class="cell">
        <p>清除缓存</p>
        <img src="../../static/images/arrow@2x.png" alt />
      </view>

      <view class="cell">
        <p>商务合作</p>
        <img src="../../static/images/arrow@2x.png" alt />
      </view>

      <view @click="goPhone" class="cell">
        <p>在线客服</p>
        <img src="../../static/images/arrow@2x.png" alt />
      </view>
    </view>
  </view>
</template>

<script>
import Vue from "vue";
import query from "../../utils/query";
export default Vue.extend({
  data() {
    return {
      userInfo: null
    };
  },
  async onShow() {
    let res = await query({ url: "my/info" });
    // console.log(res)
    if (res.data.status === 0) {
      this.userInfo = res.data.message;
    }
  },
  methods: {
    goPhone() {
      uni.makePhoneCall({
        phoneNumber: "10086" //仅为示例
      });
    }
  }
});
</script>
<style lang="less" scoped>
.my-container {
  position: relative;
}
.header {
  width: 750rpx;
  height: 440rpx;
  background-color: #ff8d43;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .avatar {
    width: 176rpx;
    height: 176rpx;
    border-radius: 50%;
  }
  .nickname {
    margin-top: 30rpx;
    font-size: 21px;
    color: #ffffff;
  }
}
.tips {
  position: absolute;
  top: 400rpx;
  left: 32rpx;
  right: 32rpx;
  border-radius: 12rpx;
  height: 174rpx;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .title {
    text-align: center;
    font-size: 26px;
    color: #333333;
  }
  .subtitle {
    margin-top: 10rpx;
    text-align: center;
    font-size: 12px;
    color: #a8a8a8;
    font-weight: bold;
  }
  .left,
  .middle,
  .right {
    flex: 1;
  }
  .middle {
    position: relative;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 30rpx;
      height: 62rpx;
      width: 3rpx;
      background-color: #ebebeb;
    }
    &::after {
      content: "";
      position: absolute;
      right: 0;
      top: 30rpx;
      height: 62rpx;
      width: 3rpx;
      background-color: #ebebeb;
    }
  }
}
.cells {
  background-color: #fff;
  border-radius: 12rpx;
  margin-top: 160rpx;
  margin-left: 32rpx;
  margin-right: 32rpx;
  height: 600rpx;
  margin-bottom: 32rpx;
  .cell {
    height: 120rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f8f8f8;
    padding: 0rpx 20rpx;
    p {
      font-size: 30rpx;
      color: #333333;
    }
    img {
      width: 48rpx;
      height: 48rpx;
    }
  }
}
</style>
