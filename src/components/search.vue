<template>
  <view class="weui-search-bar__box">
    <icon class="weui-icon-search_in-box" type="search" color="#ff8d44" size="14"></icon>
    <view class="weui-search-bar__input" @click="search">
      <text>{{placeholder}}</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "搜索"
    }
  },
  methods: {
    search() {
      uni.navigateTo({
        url: "/pages/search/index"
      });
    }
  }
};
</script>

<style lang="less" scoped>
@weuiSearchBarHeight: 28px;
.weui-search-bar__box {
  position: relative;
  padding-left: 30px;
  padding-right: 30px;
  width: 100%;
  box-sizing: border-box;
  z-index: 1;
  margin-bottom: 8px;
  background-color: #ccc;
  border-radius:8px;
  .weui-icon-search_in-box {
    position: absolute;
    left: 8px;
    top: 7px;
  }
  .weui-search-bar__input {
    height: @weuiSearchBarHeight;
    line-height: @weuiSearchBarHeight;
    font-size: 14px;
    color: #fff;
  }
}
</style>