<template>
  <div class="container">
    <div class="row-center title">
      表单检索
    </div>
    <div class="form">
      <el-form size="small" label-position="right" label-width="140px" class="demo-form-inline">
        <el-row :gutter="20">
          <el-col v-for="field in fields" :key="field" :span="12">
            <el-form-item>
              <div slot="label" style="font-size: 10px!important;">{{ field }}</div>
              <el-input :placeholder="'请输入'+field" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="row-center" style="margin-top: 50px">
      <el-button>清空</el-button>
      <el-button type="primary">检索</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AdvancedSearch',
  data() {
    return {
      fields: ['申请(专利)号', '申请日', '公开(公告)号', '公开(公告)日', '名称摘要权利要求书', '名称摘要', '名称', '摘要', '权利要求书', '说明书', '申请人，当前专利权人', '地址']
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
<style scoped>
.container {
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form {
  width: 80%;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
}

.row-center {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.title {
  color: #17233d;
  font-weight: bold;
  text-shadow: 3px 3px 3px #ccc;
  margin: 20px 0;
  font-size: 25px;
  cursor: pointer;
}
</style>
