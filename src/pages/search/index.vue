<template>
  <view class="search-container">
      <uni-search-bar  :radius="100" @confirm="search"></uni-search-bar>
    <view class="search-body">
      <view class="empty" v-if="courses.length === 0">
        <text class="title">暂无内容哦~</text>
      </view>
      <courseList v-else :courses="courses" />
    </view>
  </view>
</template>

<script>
import { uniSearchBar } from "@dcloudio/uni-ui/lib/uni-search-bar/uni-search-bar.vue";
import query from "../../utils/query";
import courseList from "../../components/course-list";
export default {
  components: { uniSearchBar, courseList },
  data() {
    return {
      courses: []
    };
  },
  methods: {
    async search(e) {
      // console.log(e);
      let res = await query({ url: "course/search", data: { name: e.value } });
      // console.log(res)
      if (res.data.status === 0) {
        // console.log(111)
        this.courses = res.data.message;
        // console.log(this.courses)
      }
    }
  }
};
</script>

<style lang="less" scoped>
.search-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.search-bar{
  background-color: #f8f8f8;
}
.search-body {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 32rpx;
  width: 100%;
  height: 100%;
}
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 600rpx;
}
.empty .title {
  font-size: 14px;
  color: gray;
}
</style>