<template>
  <view class="play-container">
    <!-- 视频 -->
    <view class="cover_image">
      <video id="videoId" controls :src="videoUrl"></video>
    </view>
    <!-- 标题 -->
    <view class="introduction">
      <view class="title-and-info">
        <text class="title">{{course.title}}</text>
        <view class="info">
          <text>{{course.study_count}}人学过</text>
          <text>难度:{{(course.level==1? '初级':(course.level==2? '中级':'高级'))}}</text>
          <text>时长:{{course.course_duration}}</text>
        </view>
      </view>
      <view class="comment">
        <image src="../../static/images/evaluate@2x.png" mode />
      </view>
    </view>

    <!-- 课程进度 -->
    <view class="course-progress">
      <text class="title">课程进度</text>

      <view class="catelog-container">
        <view class="course-item" v-for="(item, index) in videos" :key="index">
          <text @click="goVideo(index,item)" :class="{active:num==index}">{{index+1}}.{{item.name}}</text>
          <text
            :class="[item.is_study==1? 'studied':'time']"
          >{{item.is_study==1? '已学习':item.duration}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import query from "../../utils/query";
export default {
  data() {
    return {
      videoUrl: null,
      id: null,
      isok: true,
      // 课程信息
      course: null,
      // 视频列表
      videos: [],
      num: 0
    };
  },
  async onLoad(e) {
    // console.log(e);
    this.id = e.id;
    let res = await query({ url: `course/play/${e.id}` });
    // console.log(res);
    this.course = res.data.message.course;
    this.videos = res.data.message.videos;
  },
  methods: {
    // 点击切换视频
    async goVideo(index, item) {
      let res = await this.iszhifu();
      // console.log(res);
      if (!res) {
        // console.log('未支付')
        uni.showModal({
          title: "提示",
          content: "您还没有支付,请先支付后,再来观看哦~",
          confirmText: "去支付",
          confirmColor: "#f6986c",
          success: res => {
            const { cover_image_url, price, title } = this.course;
            let url = `../play/index?id=${this.id}&imgUrl=${cover_image_url}&price=${price}&title=${title}`;
            if (res.confirm) {
              uni.navigateTo({
                url
              });
            } else if (res.cancel) {
              console.log("用户点击取消");
            }
          }
        });
        return;
      }

      this.num = index;
      this.videoUrl = this.videos[index].video_url;

      let videoId = uni.createVideoContext("videoId", this);
      setTimeout(() => {
        videoId.play();
      }, 300);

      let res2 = await query({
        url: "study/video",
        data: { course_id: this.id, video_id: item.id },
        method: "POST"
      });
      // console.log(res2)
      if (res2.data.status === 0) {
        item.is_study = 1;
      }
    },
    // 判断是否支过
    iszhifu() {
      return new Promise(async (resolve, reject) => {
        let res = await query({
          url: "order/paystatus",
          data: { course_id: this.id }
        });
        // console.log(res)
        if (res.data.status == 0) {
          if (res.data.pay_status == 1) {
            // console.log("支付了");
            resolve(true);
          } else {
            // console.log("未支付");
            resolve(false);
          }
        } else {
          resolve(false);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.play-container {
  background-color: #efefef;
  position: relative;
  .cover_image {
    width: 750rpx;
    height: 434rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    image {
      width: 750rpx;
      height: 434rpx;
    }
    video {
      width: 750rpx;
      height: 434rpx;
    }
  }
  .introduction {
    z-index: 3;
    position: absolute;
    margin-top: -10rpx;
    border-radius: 16px 16px 0px 0px;
    border-bottom: 1px solid #f5f5f5;
    left: 0;
    right: 0;
    height: 192rpx;
    background-color: #ffffff;
    padding: 38rpx 32rpx;
    display: flex;
    align-items: center;
    .title-and-info {
      flex: 1;
      .title {
        color: #343434;
        font-size: 24px;
        font-weight: bold;
      }
      .info {
        margin-top: 12rpx;
        height: 34rpx;
        line-height: 34rpx;
        color: #818181;
        font-size: 12px;
        display: block;
        text {
          padding-right: 15rpx;
        }
        text:nth-child(2),
        text:nth-child(3) {
          padding-left: 15rpx;
        }
        text:nth-child(2) {
          position: relative;
          &::before {
            position: absolute;
            content: "";
            background-color: #ebebeb;
            left: 0rpx;
            width: 1px;
            top: 8rpx;
            height: 20rpx;
          }
          &::after {
            position: absolute;
            content: "";
            background-color: #ebebeb;
            right: 0rpx;
            width: 1px;
            top: 8rpx;
            height: 20rpx;
          }
        }
      }
    }
    .comment {
      margin-top: 32rpx;
      image {
        width: 198rpx;
        height: 80rpx;
      }
    }
  }
  .course-progress {
    margin-top: 222rpx;
    padding: 44rpx 32rpx;
    background-color: #fff;
    .title {
      color: #343434;
      font-size: 30rpx;
      font-family: PingFang SC;
      font-weight: 800;
    }
    .catelog-container {
      .course-item {
        display: flex;
        justify-content: space-between;
      }
      text {
        color: #636363;
        font-size: 30rpx;
        height: 80rpx;
        line-height: 80rpx;
      }
      .studied {
        float: right;
        margin-top: 16rpx;
        font-size: 10px;
        text-align: center;
        color: #aaaaaa;
        background-color: #f5f5f5;
        border-radius: 12rpx;
        width: 98rpx;
        height: 48rpx;
        line-height: 48rpx;
      }
      .time {
        float: right;
      }
      .active {
        color: #ff5e00;
      }
    }
  }
}
.comment-content {
  label {
    width: 100rpx;
  }
  textarea {
    width: 100%;
    height: 200rpx;
  }
}
</style>