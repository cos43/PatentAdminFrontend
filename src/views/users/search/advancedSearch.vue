<template>
  <div class="container">
    <div class="row-center title">
      高级检索
    </div>
    <div class="form">
      <el-form size="small" label-position="right" label-width="140px" class="demo-form-inline">
        <el-row :gutter="20">
          <div class="filterRow">
            <div style="width: 100px;margin-right: 10px" />
            <el-input placeholder="请输入内容" class="input-with-select">
              <el-select slot="prepend" placeholder="主题" style="width: 100px">
                <el-option label="主题" value="1" />
                <el-option label="篇关摘" value="2" />
                <el-option label="关键词" value="3" />
                <el-option label="篇名" value="3" />
                <el-option label="全文" value="3" />
                <el-option label="作者" value="3" />
              </el-select>
              <el-select slot="append" placeholder="精确" style="width: 80px">
                <el-option label="精确" value="1" />
                <el-option label="模糊" value="2" />
              </el-select>
            </el-input>
            <div class="operation" />
          </div>
          <div class="filterRow">
            <div style="width: 100px;margin-right: 10px">
              <el-select slot="append" placeholder="AND" style="width: 80px">
                <el-option label="AND" value="1" />
                <el-option label="OR" value="2" />
                <el-option label="NOT" value="2" />
              </el-select>
            </div>
            <el-input placeholder="请输入内容" class="input-with-select">
              <el-select slot="prepend" placeholder="主题" style="width: 100px">
                <el-option label="主题" value="1" />
                <el-option label="篇关摘" value="2" />
                <el-option label="关键词" value="3" />
                <el-option label="篇名" value="3" />
                <el-option label="全文" value="3" />
                <el-option label="作者" value="3" />
              </el-select>
              <el-select slot="append" placeholder="精确" style="width: 80px">
                <el-option label="精确" value="1" />
                <el-option label="模糊" value="2" />
              </el-select>
            </el-input>
            <div class="operation">
              <el-button type="info" plain size="mini" icon="el-icon-minus" />
            </div>
          </div>
          <div class="filterRow">
            <div style="width: 100px;margin-right: 10px">
              <el-select slot="append" placeholder="AND" style="width: 80px">
                <el-option label="AND" value="1" />
                <el-option label="OR" value="2" />
                <el-option label="NOT" value="2" />
              </el-select>
            </div>
            <el-input placeholder="请输入内容" class="input-with-select">
              <el-select slot="prepend" placeholder="主题" style="width: 100px">
                <el-option label="主题" value="1" />
                <el-option label="篇关摘" value="2" />
                <el-option label="关键词" value="3" />
                <el-option label="篇名" value="3" />
                <el-option label="全文" value="3" />
                <el-option label="作者" value="3" />
              </el-select>
              <el-select slot="append" placeholder="精确" style="width: 80px">
                <el-option label="精确" value="1" />
                <el-option label="模糊" value="2" />
              </el-select>
            </el-input>
            <div class="operation">
              <el-button type="info" plain size="mini" icon="el-icon-minus" />
              <el-button type="info" plain size="mini" icon="el-icon-plus" />
            </div>
          </div>
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
      selected: '1'
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
  width: 1000px;
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

.filterRow {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
}

.operation {
  display: flex;
  width: 130px;
  flex-direction: row;
  margin-left: 10px;
  justify-content: space-between;
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
