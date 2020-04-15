<template>
  <view class="container">
      <view class="star-bg">
          <image @click="changeNum(item+1)" v-for="item in 5" :key="item" src="../static/images/star_empty@2x.png">
          </image>
      </view>
    <view class="star">
        <image  @click="changeNum(item+1)" v-for="item in num" :key="item" src="../static/images/star_fill@2x.png">
        </image>
    </view>
  </view>
</template>

<script>
export default {
    data() {
        return {
            num:this.score
        }
    },
    props:{
    score:{
        type:Number,
        default:5
    },
    isok:{
        type:Boolean,
        default:false
    }
},
    methods:{
        changeNum(item){
            if(this.isok){
                this.num=item
                this.$emit('math',item)
            }
            console.log(item)
        }
    }

}
</script>

<style lang="less" scoped>
.container {
  position: relative;
}
.star,
.star-bg {
  float: left;
  display: flex;
  height: 50rpx;
  align-items: center;
  image {
    width: 38rpx;
    height: 36rpx;
  }
}
.star {
  position: absolute;
  top: 0;
  left: 0;
}
</style>