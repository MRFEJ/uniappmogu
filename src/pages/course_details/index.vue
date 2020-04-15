<template>
  <view class="course-detail-container" v-if="details">
    <!-- 图片 -->
    <view v-if="isok" class="cover_image">
      <image :src="details.cover_image_url" mode />
      <view class="play">
        <image @click="isok=false" src="../../static/images/play@2x.png" alt />
        <text>播放课程简介</text>
      </view>
    </view>

    <!-- 视频 -->
    <view v-else class="course_video">
      <video
        :src="details.course_video_url"
        enable-play-gesture
        vslide-gesture
        show-play-btn
        controls
        autoplay
      ></video>
    </view>

    <view class="introduction">
      <!-- 标题 -->
      <view class="title-price">
        <text>{{details.title}}</text>
        <text>¥{{details.price}}.00</text>
      </view>

      <!-- 副标题 -->
      <view class="introduce">{{details.introduction}}</view>

      <!-- 星星 -->
      <view class="star">
        <star :score="details.score" />
        <text>{{details.study_count}}人在学</text>
      </view>

      <!-- 开始学习按钮 -->
      <view class="study-share">
        <image @click="goStudy(details.id)" src="../../static/images/start_study@2x.png" mode />
        <button open-type="share" plain class="share-button"></button>
      </view>
    </view>

    <!-- 目录 讲师介绍  评价 -->
    <view class="catalog">
      <!-- 头部 -->
      <view class="head">
        <text
          @click="catalog(index)"
          :class="{active:muenIndex===index}"
          v-for="(item, index) in muen"
          :key="index"
        >{{item}}</text>
      </view>

      <!-- 目录 -->
      <view v-if="muenIndex===0">
        <view class="catelog-container">
          <text v-for="(item, index) in videos" :key="index">{{index+1}}.{{item.name}}</text>
        </view>
      </view>

      <!-- 讲师介绍 -->
      <view v-else-if="muenIndex===1">
        <view class="lecturer-container">
          <!-- 头部 -->
          <view class="info">
            <!-- 头像 -->
            <image :src="lecturer.avatar" mode />

            <!-- 名字 -->
            <view class="name-follow">
              <text>{{lecturer.name}}</text>
              <text>关注人数{{lecturer.follow_count}}</text>
            </view>

            <!-- 关注 -->
            <view
              @click="goGz(lecturer.id)"
              :class="[lecturer.status? 'follow':'unfollow']"
            >{{lecturer.status? "已关注":"关注"}}</view>
          </view>

          <!-- 尾部 -->
          <view class="introduce">
            <text>{{lecturer.introduction}}</text>
          </view>
        </view>
      </view>

      <!-- 评价 -->
      <view v-else>
        <view class="comment-item" v-for="(item, index) in comments" :key="index">
          <view class="info">
            <!-- 头像 -->
            <image :src="item.avatar" mode />
            <!-- 名称 -->
            <view class="nickname-content">
              <view class="nickname">
                <view>{{item.nickname}}</view>
                <star style="margin-left:10px" :score="item.score" />
              </view>

              <view>{{item.content}}</view>
            </view>

            <text class="time">{{item.comment_time}}</text>
          </view>

          <view class="star">
            <image
              @click="goDz(item)"
              :src="item.is_like==1? '../../static/images/like_highlight@2x.png':'../../static/images/like_normal@2x.png'"
              mode
            />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import query from "../../utils/query";
import star from "../../components/star";
export default {
  components: {
    star
  },
  data() {
    return {
      id:null,
      details: null,
      isok: true,
      muen: ["目录", "讲师介绍", "评价"],
      muenIndex: 0,
      videos: [],
      // 老师介绍
      lecturer: null,
      // 评价
      comments: []
    };
  },
  onLoad(option) {
    // console.log(option)
    this.id=option.id
  },
  async onShow(){
    let res = await query({ url: `course/${this.id}` });
    // console.log(res);
    this.details = res.data.message.course;
    this.muen[2] = `评价(${res.data.message.commentTotal})`;
    // 目录
    this.videos = res.data.message.videos;
    // 教师简介
    this.lecturer = res.data.message.lecturer;
    // 评价
    this.comments = res.data.message.comments;
  },
  onShareAppMessage(e) {
    //  console.log(e);
    return {
      title: "美女总动员",
      imageUrl:
        "https://pic3.zhimg.com/80/v2-7809f00328bb5b59888560efdab1c192_720w.jpg"
    };
  },
  methods: {
    // 点击查看目录  讲师介绍 评价
    catalog(index) {
      this.muenIndex = index;
    },
    // 点击关注/取消关注
    async goGz(lecturer_id) {
      switch (this.lecturer.status) {
        // 0等于未关注 就关注
        case 0: {
          let res = await query({
            url: "lecturer/follow",
            data: { lecturer_id },
            method: "POST"
          });
          if (res.data.status === 0) {
            this.lecturer.status = 1;
            uni.showToast({
              title: res.data.message,
              duration: 500
            });
          }
          break;
        }
        case 1: {
          let res = await query({
            url: "lecturer/unfollow",
            data: { lecturer_id },
            method: "POST"
          });
          if (res.data.status === 0) {
            this.lecturer.status = 0;
            uni.showToast({
              title: res.data.message,
              duration: 500
            });
          }
          break;
        }
      }
    },
    // 点赞
    async goDz(item) {
      switch (item.is_like) {
        case 1: {
          let res = await query({
            url: "comment/like",
            method: "POST",
            data: { comment_id: item.id, is_like: 2 }
          });
          item.is_like = 2;
          break;
        }
        case 2: {
          let res = await query({
            url: "comment/like",
            method: "POST",
            data: { comment_id: item.id, is_like: 1 }
          });
          item.is_like = 1;
          break;
        }
      }
    },
    // 去学习
    goStudy(id) {
      wx.navigateTo({ url: "../starStudy/index?id=" + id });
    }
  }
};
</script>

<style lang="less" scoped>
.course-detail-container {
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
    position: relative;
    .play {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position: absolute;
      image {
        width: 164rpx;
        height: 164rpx;
      }
      text {
        margin-top: 10rpx;
        color: #e9e9e9;
        font-size: 30rpx;
      }
    }
  }
  .course_video {
    width: 750rpx;
    height: 434rpx;
    video {
      width: 750rpx;
      height: 434rpx;
    }
  }
  .introduction {
    z-index: 3;
    position: absolute;
    margin-top: 0rpx;
    border-radius: 16px 16px 0px 0px;
    left: 0;
    right: 0;
    height: 452rpx;
    background-color: #ffffff;
    padding: 20rpx 30rpx;
    .title-price {
      margin-top: 20rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      text:nth-child(1) {
        font-size: 24px;
        color: #343434;
        font-weight: Bold;
      }
      text:nth-child(2) {
        font-size: 22px;
        color: #ee3939;
      }
    }
    .introduce {
      color: #818181;
      font-size: 12px;
      margin-top: 10rpx;
    }
    .star {
      display: flex;
      margin-top: 20rpx;
      text {
        height: 50rpx;
        line-height: 50rpx;
        margin-left: 20rpx;
        font-size: 12px;
        color: #fe8e38;
      }
    }
    .study-share {
      margin-top: 42rpx;
      margin-bottom: 52rpx;
      image:nth-child(1) {
        width: 568rpx;
        height: 92rpx;
      }
      .share-button {
        border: none;
        width: 92rpx;
        height: 92rpx;
        background-color: #fff;
        border-radius: 10rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        float: right;
        background-image: url(../../static/images/share@2x.png);
        background-repeat: no-repeat;
        background-size: 34rpx 34rpx;
        background-position: 30rpx 30rpx;
      }
    }
  }

  // 介绍
  .catalog {
    margin-top: 520rpx;
    // position: absolute;
    z-index: 5;
    width: 750rpx;
    // height: 582rpx;
    background-color: #ffffff;
    .head {
      height: 120rpx;
      background-color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #f5f5f5;
      text {
        text-align: center;
        color: #a8a8a8;
        font-size: 14px;
        height: 120rpx;
        line-height: 120rpx;
        flex: 1;
        position: relative;
      }
      .active {
        color: #333333;
        font-weight: bold;
        &::after {
          content: "";
          position: absolute;
          left: 88rpx;
          bottom: 0px;
          width: 74rpx;
          height: 3px;
          background-color: #ff8e43;
        }
      }
    }
    .catelog-container {
      padding: 30rpx;
      height: 582rpx;
      text {
        background-color: #ffffff;
        color: #636363;
        font-size: 30rpx;
        height: 80rpx;
        line-height: 80rpx;
        display: block;
      }
    }
    .lecturer-container {
      padding: 30rpx;
      .info {
        height: 200rpx;
        display: flex;
        align-items: center;
        .name-follow {
          margin-left: 30rpx;
          display: flex;
          flex-direction: column;
          flex: 1;
          text:nth-child(1) {
            font-size: 34rpx;
            color: #333333;
          }
          text:nth-child(2) {
            font-size: 28rpx;
            margin-top: 15rpx;
            color: #a8a8a8;
          }
        }
        image {
          margin-left: 12rpx;
          width: 120rpx;
          height: 120rpx;
        }
        .unfollow {
          width: 136rpx;
          height: 52rpx;
          line-height: 52rpx;
          text-align: center;
          border: 1px solid #a8a8a8;
          border-radius: 26rpx;
          color: #a8a8a8;
          font-size: 28rpx;
        }
        .follow {
          width: 136rpx;
          height: 52rpx;
          line-height: 52rpx;
          text-align: center;
          border: 1px solid #a8a8a8;
          border-radius: 26rpx;
          color: #fff;
          background-color: #a8a8a8;
          font-size: 28rpx;
        }
      }
      .introduce {
        background-color: #ffffff;
        text {
          margin-left: 12rpx;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 20px;
          color: rgba(168, 168, 168, 1);
          opacity: 1;
        }
      }
    }
    .comment-item {
      background-color: #ffffff;
      padding: 30rpx;
      height: 180rpx;
      border-bottom: 2px solid #f1f1f1;
      .info {
        height: 120rpx;
        display: flex;
        align-items: center;
        image {
          margin-left: 6rpx;
          width: 96rpx;
          height: 96rpx;
          border-radius: 50%;
        }
        .nickname-content {
          flex: 1;
          margin-left: 30rpx;
          .nickname {
            color: #333333;
            font-size: 30rpx;
            font-weight: bold;
            align-items: center;
            display: flex;
            view {
              height: 100%;
              display: inline-block;
            }
          }
          view:nth-child(2) {
            margin-top: 16rpx;
            color: #a8a8a8;
            font-size: 12px;
            width: 460rpx;
            white-space:normal;
            word-break:break-all
          }
        }
        .time {
          color: #a8a8a8;
          font-size: 11px;
        }
      }
    }
    .star {
      image {
        margin-top: 30rpx;
        width: 44rpx;
        height: 44rpx;
        float: right;
        margin-right: 20rpx;
      }
      image:nth-child(0) {
        margin-right: 20rpx;
      }
    }
  }
}
</style>