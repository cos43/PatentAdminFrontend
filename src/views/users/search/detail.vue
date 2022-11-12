<template>
  <div class="container">
    <h3>一种基于提取网络参数置乱的图像隐写模型保护方法</h3>
    <div class="info">
      <div class="row-desc">
        <div>
          <span>专利类型：	</span>
          <span>	发明公开</span>
        </div>
      </div>
      <div class="row-desc">
        <div>
          <span>申请(专利)号：	</span>
          <span>CN202210458370.4</span>
        </div>
        <div>
          <span>申请日：	</span>
          <span>	2022-04-27</span>
        </div>
      </div>
      <div class="row-desc">
        <div>
          <span>申请公布号：	</span>
          <span>	CN114897658A</span>
        </div>
        <div>
          <span>公开公告日：</span>
          <span>	2022-04-27</span>
        </div>
      </div>
      <div class="row-desc">
        <div>
          <span>申请人：	</span>
          <span>		河南师范大学</span>
        </div>
      </div>
      <div class="row-desc">
        <div>
          <span>地址：</span>
          <span>	453007 河南省新乡市建设东路46号</span>
        </div>
      </div>
      <div class="row-desc">
        <div>
          <span>  发明人：</span>
          <span>段新涛; 张永强; 邵志强; 刘孬; 岳冬利; 谢自梅; 刘行兵; 张恩</span>
        </div>
      </div>
      <div class="row-desc">
        <div>
          <span>  专辑：</span>
          <span>信息科技</span>
        </div>
      </div>
      <div class="desc">
        <span>主权项：</span>
        <p>
          1.一种基于提取网络参数置乱的图像隐写模型保护方法,其特征在于,包括如下步骤：S1、发送方通过已训练好的隐藏网络模型将待发送的秘密图像隐藏到载体图像中,得到对应的载密图像,并获取已训练好的提取网络模型,隐藏网络模型和提取网络模型共同构成深度学习的图像隐写网络；S2、发送方通过约定的置乱算法对已训练好的提取网络模型的参数进行置乱操作,并根据置乱后的提取网络模型的参数进行重构,得到新的提取网络模型；发送方将载密图像和新的提取网络模型发送至接收方；约定的置乱算法满足：对于同一载密图像,置乱前的提取网络模型与置乱后的提取网络模型提取出的秘密图像的相似度低于设定阈值；S3、接收方收到新的提取网络模型后,按照所述约定的置乱算法对新的提取网络模型进行置乱解密,得到置乱前的提取网络模型,并根据置乱前的提取网络模型对收到的载密图像进行提取,从而得到所述秘密图像。
        </p>
      </div>
      <div class="desc">
        <span>摘要：</span>
        <p>
          本发明提供一种基于提取网络参数置乱的图像隐写模型保护方法,属于图像加密技术领域。由于发送方在第一次向接收方发送提取网络时,可能被第三方窃取,导致后续传输的秘密图像泄露。对此,发送方先通过与接收方约定好的置乱算法对提取网络模型的参数进行置乱,进而通过置乱后提取网络模型的参数重构出新的提取网络模型。发送方将新的提取网络和载密图像发送至接收方时,即使在传输过程中提取网络模型被第三方获取,但是从载密图像中提取出的秘密图像与原来的秘密图像相似度较低,从而避免了秘密图像泄露。而接收方可以根据约定的置乱算法将新的提取网络模型恢复为置乱前的提取网络模型,并从载密图像中提取秘密图像,增强了图像隐写过程的安全性。
        </p>
      </div>
      <div class="desc">
        <span>专利推荐：</span>
        <p>
          [1]图像处理方法、装置、智能驾驶系统和车载运算平台[P]. 温拓朴,程光亮,石建萍. 中国专利:CN111383156B, 2022-08-02
        </p>
        <p>
          [2]图像处理方法、装置、智能驾驶系统和车载运算平台[P]. 温拓朴,程光亮,石建萍. 中国专利:CN111383156A, 2020-07-07
        </p>
        <p>
          [3]一种基于生成对抗网络的图像去水印方法和系统[P]. 姚毅,章国川,阳帅. 中国专利:CN109345441A, 2019-02-15
        </p>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  name: 'Detail'

}
</script>
<style scoped>
.container {
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.info {
  width: 80%;
  margin: 10px auto;
}

.desc span {
  font-size: 1rem;
  font-weight: bold;
}

.desc p {
  font-size: 0.8rem;
  color: #666;
  line-height: 1.5;
}

.row-desc {
  margin: 20px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.row-desc div {
  width: 50%;
}

.row-desc {
  font-size: 0.9rem;
}

.row-desc span:first-child {
  font-weight: bold;
}
</style>
