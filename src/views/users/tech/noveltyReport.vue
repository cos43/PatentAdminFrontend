<template>
  <div class="container1">
    <el-row :gutter="10">
      <el-col v-for="(o,index) in 8" :key="o" :span="6" :xs="8" :sm="6">
        <el-card :style="{ padding: '0px',margin:'10px' }">
          <img src="https://s3.bmp.ovh/imgs/2022/09/21/558b182b318f2beb.png" class="image" alt="">
          <div style="padding-top: 14px;">
            <div style="margin: 5px 0;font-size: 0.8rem">
              查新报告 {{ index }}
            </div>
            <el-row type="flex" justify="space-between">
              <el-button size="mini" type="text" />
              <el-button-group>
                <el-button size="mini" type="primary">查看</el-button>
                <el-button size="mini" type="primary">导出</el-button>
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
<style scoped>
.image {
  width: 80%;
  margin: auto;
  display: block;
}
</style>
