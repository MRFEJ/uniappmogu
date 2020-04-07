<template>
  <view class="home-container">
    <!-- 子组件搜索框 -->
    <search :placeholder="text" />

    <!-- 轮播图 -->
    <view>
      <swiper
      circular
        class="swiper"
        :indicator-dots="true"
        :autoplay="true"
        :interval="3000"
        :duration="1000"
      >
        <swiper-item v-for="(item, index) in lunbo" :key="index">
          <image :src="item.img_url" mode="" />
        </swiper-item>
      </swiper>
    </view>

        <!-- 推荐课程 -->
    <view>
    <view class="tips">
      <text>推荐课程</text>
      <image @click="goCourse" src="../../static/images/arrow@2x.png"></image>
    </view>

    <view>
<scroll-view class="course-container" scroll-x="true">
<view class="course-item" v-for="(item, index) in tuijian" :key="index">
  <image :src="item.icon"></image>
</view>
</scroll-view>
    </view>
    </view>


    <!-- 热门课程 -->
    <view>
    <view class="tips">
      <text>热门课程</text>
      <image src="../../static/images/arrow@2x.png"></image>
    </view>

    <view class="hot-video">
      <view class="video-item" v-for="(item, index) in hotVideo" :key="index">
        <image :src="item.cover_photo_url" mode="" />
        <view class="title">{{item.name}}</view>
        <view class="subtitle">{{item.view_count}}}人已观看</view>
      </view>
    </view>

    </view>

  </view>
</template>

<script>
import Vue from "vue";
import query from "../../utils/query";
import search from "../../components/search"
export default Vue.extend({
  components:{
search
  },
  data() {
    return {
      // 轮播图
      lunbo: [],
      tuijian: [],
      hotVideo: [],
      text:"请输入要搜索的内容"
    };
  },
  async onLoad() {
    // console.log(111);\
    // 请求轮播图
    let res = await query({ url: "home/swipers" });
    // console.log(res);
    this.lunbo = res.data.message;

   // 请求推荐课程
 let res2 = await query({ url: "home/course" });
    // console.log(res2);
    this.tuijian = res2.data.message;

   // 请求热门视频
   let res3 = await query({ url: "home/video" });
    // console.log(res3);
    this.hotVideo = res3.data.message;

  },
  methods:{
    goCourse(){
      uni.switchTab({url:"pages/course/index"})
      console.log(11)
    }
  }
});
</script>
<style lang="less" scoped>
.home-container {
  padding: 20rpx;
  background-color: #fff;
}
swiper {
  width: 100%;
  height: 342rpx;
  swiper-item {
    width: 100%;
    height: 100%;
  }
  image {
    width: 100%;
    height: 100%;
  }
}
.tips {
  height: 120rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text {
    font-size: 36rpx;
    font-weight: 700;
    color: #212121;
  }
  image {
    width: 48rpx;
    height: 48rpx;
  }
}
.course-container {
  height: 170rpx;
  white-space: nowrap;
  .course-item {
    width: 296rpx;
    height: 168rpx;
    display: inline-block;
    margin-right: 32rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
}
.hot-video {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  .video-item {
    width: 340prx;
    image {
      width: 340rpx;
      height: 210rpx;
      border-radius: 12rpx;
    }
    .title {
      margin-top: 15rpx;
      color: #262626;
      font-size: 26rpx;
    }
    .subtitle {
      margin-top: 15rpx;
      margin-bottom: 15rpx;
      color: #959595;
      font-size: 18rpx;
    }
  }
}
</style>
