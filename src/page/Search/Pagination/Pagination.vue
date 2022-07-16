<template>
  <div class="page">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page="pageNo"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total"],
  data() {
    return {
      currentpage: 1,
    };
  },
  methods: {
    handleCurrentChange(pageNo) {
      this.$bus.$emit("getdata", pageNo);
    },
  },
};
</script>

<style>
</style>