<template>
  <view class="study-container">
    <view class="no-study-tip" v-if="studyList.length==0">你还没有学习!快点去学习哦</view>

    <view class="study-item" v-else v-for="(item, index) in studyList" :key="index">
      <img :src="item.icon" alt />
      <view class="meta">
        <view class="title">{{item.title}}</view>
        <view class="progress">已学习{{item.study_hour}}/{{item.total_hour}}课时</view>
      </view>
      <view class="circle">
        <circle :canvas_id="item.sid" :study_progress="item.study_progress" :width="55" :height="55" />
      </view>
    </view>
  </view>
</template>

<script>
import query from "../../utils/query";
import circle from "../../components/circle"
export default {
  components:{
    circle
  },
  data() {
    return {
      studyList: []
    };
  },
  async onShow() {
    // console.log(11);
    let res = await query({ url: "study/progress" });
    if (res.data.status === 0) {
      // console.log(res);
      this.studyList=res.data.message
    }
  }
};
</script>

<style lang="less" scoped>
.study-container {
  display: flex;
  flex-direction: column;
  padding-bottom: 32rpx;
  align-items: center;
  position: relative;
}
.study-item {
  margin-top: 32rpx;
  background-color: #fff;
  border-radius: 12rpx;
  width: 686rpx;
  height: 220rpx;
  display: flex;
  align-items: center;
  img {
    width: 108rpx;
    height: 108rpx;
    margin-left: 50rpx;
  }
  .meta {
    flex: 1;
    margin-left: 50rpx;
    .title {
      font-size: 30rpx;
      color: #333333;
    }
    .progress {
      margin-top: 10rpx;
      font-size: 22rpx;
      color: #a8a8a8;
    }
  }
  .circle {
    width: 109rpx;
    height: 109rpx;
    margin-right: 56rpx;
  }
}
.no-study-tip {
  margin-top: 500rpx;
  font-size: 15px;
}
</style>