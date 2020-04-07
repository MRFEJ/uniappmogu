<template>
  <courseList :courses="courses" />
</template>

<script>
import Vue from "vue";
import courseList from "../../components/course-list";
import query from "../../utils/query";
export default Vue.extend({
  components:{
    courseList
  },
  data() {
    return {
      courses: []
    };
  },
  async onLoad() {
    let res = await query({ url: "course/list" });
    // console.log(res);
    this.courses=res.data.message
  }
});
</script>
