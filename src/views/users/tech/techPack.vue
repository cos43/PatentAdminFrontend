<template>
  <div class="container1">
    <el-row :gutter="10">
      <el-col v-for="(o,index) in 8" :key="o" :span="6" :xs="8" :sm="6">
        <el-card :style="{ padding: '0px',margin:'10px' }">
          <img src="https://i.pinimg.com/originals/4e/b3/9e/4eb39e8616a353272d771b6f3271427f.png" class="image" alt="">
          <div style="padding-top: 14px;">
            <div style="margin: 5px 0;font-size: 0.8rem">
              技术包{{ index }}
            </div>
            <el-row type="flex" justify="space-between">
              <el-button size="mini" type="text" />
              <el-button-group>
                <el-button size="mini" type="primary">查看</el-button>
                <el-button size="mini" type="primary">编辑</el-button>
              </el-button-group>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'TechPack'
}
</script>
<style>
.image {
  width: 100%;
  display: block;
}
</style>
