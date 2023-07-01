<template>
  <div>
    <div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="商品操作" name="AdminGood">商品操作</el-tab-pane>
        <el-tab-pane label="查看订单" name="AdminTrade">查看订单</el-tab-pane>
      </el-tabs>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: "component_name",
  data() {
    return {
      activeName: "AdminGood",
    };
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name == "AdminGood") {
        this.$router.push("/admin/AdminGood");
      } else {
        this.$router.push("/admin/AdminTrade");
      }
    },
  },
};
</script>
<style lang="less" scoped>

</style>