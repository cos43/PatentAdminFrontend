<template>
  <div class="container">
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" class="input-with-select">
        <el-button slot="append" type="primary" plain icon="el-icon-search" />
      </el-input>
    </div>
    <div class="results">
      <div class="result-item active">
        <div class="result-title row-center">
          <span class="text-primary">1 基于条件标准化流模型的强鲁棒性图像隐写方法及系统[ZH]</span>
          <el-tag style="margin: 0 5px" effect="dark" size="mini" type="warning">审中</el-tag>
          中国发明申请
        </div>
        <div class="desc">
          申请号：CN202210754766.3 申请日：2022.06.30 公开(公告）号：CN114827381A 公开（公告）日：2022.07.29
        </div>
        <div class="desc">
          申请（专利权）人：广东]北京大学深圳研究生院发明(设计)人：张健；许佑民
        </div>
        <div class="desc">
          本发明涉及基于条件标准化流模型的强鲁棒性图像隐写方法，包括步骤：S1.构建流模型单元：对输入的宿主图像和隐藏图像进行分布变换，转化为高频冗余信息和容器图像；S2.构造分布映射模块：建模高频冗余信息在容器图像条件依赖下的分布，将其映射到标准正态分布以隐式保存有价值的隐藏信息；S3.构造失真模拟单元：在模型训练过程中仿真各类失真干扰的影响；S4.构造图像增强模块：对受干扰的容器图像进行初步增强去噪处理；以及S5.构造条件调制模块：以干扰强度和类型为条件，调制流模型单元的网络参数。本发明方法解决当前图像隐写术在鲁棒性和还原质量、隐写容量上的缺陷和不足，解决之前基于学习的隐写术在受到失真干扰时性能大幅下降的问题。
        </div>
        <div class="flex-end">
          <el-button-group>
            <el-button type="primary" icon="el-icon-edit">认领</el-button>
            <el-button type="primary" icon="el-icon-share">收藏</el-button>
            <el-button type="primary" icon="el-icon-delete">加入技术包</el-button>
          </el-button-group>
        </div>
      </div>
      <div class="result-item">
        <div class="result-title row-center">
          <span class="text-primary">2 基于条件标准化流模型的强鲁棒性图像隐写方法及系统[ZH]</span>
          <el-tag style="margin: 0 5px" effect="dark" size="mini" type="warning">审中</el-tag>
          中国发明申请
        </div>
        <div class="desc">
          申请号：CN202210754766.3 申请日：2022.06.30 公开(公告）号：CN114827381A 公开（公告）日：2022.07.29
        </div>
        <div class="desc">
          申请（专利权）人：广东]北京大学深圳研究生院发明(设计)人：张健；许佑民
        </div>
        <div class="desc">
          本发明涉及基于条件标准化流模型的强鲁棒性图像隐写方法，包括步骤：S1.构建流模型单元：对输入的宿主图像和隐藏图像进行分布变换，转化为高频冗余信息和容器图像；S2.构造分布映射模块：建模高频冗余信息在容器图像条件依赖下的分布，将其映射到标准正态分布以隐式保存有价值的隐藏信息；S3.构造失真模拟单元：在模型训练过程中仿真各类失真干扰的影响；S4.构造图像增强模块：对受干扰的容器图像进行初步增强去噪处理；以及S5.构造条件调制模块：以干扰强度和类型为条件，调制流模型单元的网络参数。本发明方法解决当前图像隐写术在鲁棒性和还原质量、隐写容量上的缺陷和不足，解决之前基于学习的隐写术在受到失真干扰时性能大幅下降的问题。
        </div>
        <div class="flex-end">
          <el-button-group>
            <el-button type="primary" icon="el-icon-edit">认领</el-button>
            <el-button type="primary" icon="el-icon-share">收藏</el-button>
            <el-button type="primary" icon="el-icon-delete">加入技术包</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {}
    }
  }
}
</script>
<style scoped>
.container {
  padding: 0 15px;
}

.results {
  margin-top: 10px;
}

.row-center {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.result-title {
  font-size: 0.9rem;
}

.text-primary {
  color: #00a9ed;
}
.desc{
  font-size: 0.75rem;
  margin: 5px 0;
  line-height: 1.3rem;
}
.result-item{
  padding: 20px 10px;
  cursor: pointer;
  border-radius: 10px;
  margin-bottom: 10px;
  transition:0.3s;
}
.flex-end{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.result-item:hover{
  background-color: #e3f8fd;
}
.active{
  background-color: #e3f8fd;
}
</style>
