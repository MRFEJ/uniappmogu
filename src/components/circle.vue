<template>
  <canvas :canvas-id="canvas_id" :style="{width:width+'px',height:height+'px'}"></canvas>
</template>

<script>
export default {
  data() {
    return {
      myforbgc: "#B4D66E"
    };
  },
  props: {
    canvas_id: {
      type: Number
    },
    study_progress: {
      type: Number,
      default: 100
    },
    bgc: {
      type: String,
      default: "#ccc"
    },
    forbgc: {
      type: String,
      default: "#B4D66E"
    },
    lineWidth: {
      type: Number,
      default: 5
    },
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    }
  },
  created() {
    console.log(this);
  },
  mounted() {
    this.myforbgc = this.forbgc;

    this.draw();
  },
  watch: {
    study_progress() {
       this.draw();
    }
  },
  methods: {
    draw() {
      let ctx = uni.createCanvasContext(this.canvas_id, this);
      // console.log(this.study_progress
      // console.log(ctx)
      if (this.study_progress <= 30) {
        this.myforbgc = "#ff0000";
      } else if (this.study_progress > 30 && this.study_progress <= 70) {
        this.myforbgc = "#ff9825";
      } else {
        this.myforbgc = "#b6d772";
      }
      // 第一笔画背景
      ctx.beginPath();
      ctx.strokeStyle = this.bgc;
      ctx.lineWidth = this.lineWidth;
      ctx.arc(
        this.width / 2,
        this.height / 2,
        this.width / 2 - this.lineWidth,
        -(Math.PI / 2),
        2 * Math.PI - Math.PI / 2
      );
      ctx.stroke();

      // 第二笔画比例
      ctx.beginPath();
      ctx.strokeStyle = this.myforbgc;
      ctx.lineWidth = this.lineWidth;
      ctx.arc(
        this.width / 2,
        this.height / 2,
        this.width / 2 - this.lineWidth,
        -(Math.PI / 2),
        (this.study_progress / 100) * 2 * Math.PI - Math.PI / 2
      );
      ctx.stroke();

      // 第三笔写内容
      ctx.beginPath();
      ctx.font = "15px Arial";
      ctx.fillStyle = this.myforbgc;
      let x = null;
      let y = null;
      if (this.study_progress == 100) {
        x = this.width / 2 - 20;
        y = this.height / 2 + 5;
      } else {
        x = this.width / 2 - 15;
        y = this.height / 2 + 5;
      }
      ctx.fillText(this.study_progress + "%", x, y);

      ctx.draw();
    }
  }
};
</script>

<style>
</style>