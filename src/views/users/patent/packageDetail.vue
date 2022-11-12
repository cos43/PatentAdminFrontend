<template>
  <div class="container">

    <div
      style="margin: 20px 10px 10px 10px;display: flex;flex-direction: row;align-items: center;justify-content: space-between"
    >
      <div style="display: flex;flex-direction: row;align-items: center">
        <div style="margin-right: 50px">
          工艺包: {{ packageDetail.packageName }}
        </div>

        <el-button icon="el-icon-upload" size="small" type="primary">上传文件</el-button>
        <el-button icon="el-icon-download" size="small" type="primary">打包下载</el-button>
        <el-button icon="el-icon-edit" size="small" type="primary">编辑</el-button>
        <el-button icon="el-icon-delete" size="small" type="danger" @click="handleDeletePackage()">删除</el-button>
      </div>
      <div>
        <el-input
          class="filter-item"
          placeholder="搜索"
          size="small"
          style="width: 200px;margin-right: 10px"
        />

        <el-button class="filter-item" icon="el-icon-search" size="small" type="primary">
          搜索
        </el-button>
      </div>
    </div>
    <el-row :gutter="10">
      <el-col v-for="(patent) in patentList.list" :key="patent.patentId" :sm="4" :span="4" :xs="4">
        <el-card :body-style="{padding:'0 10px 10px 10px'}" :style="{ padding: '0px',margin:'10px'}" shadow="hover">
          <svg
            class="image"
            height="200"
            p-id="4706"
            t="1666860341838"
            version="1.1"
            viewBox="0 0 1024 1024"
            width="200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#75B3F2" p-id="4707" />
            <path
              d="M448 128c-107.4 0-206 37.8-283.2 100.8C101.8 306 64 404.6 64 512c0 247.4 200.6 448 448 448 107.4 0 206-37.8 283.2-100.8C858.2 782 896 683.4 896 576c0-247.4-200.6-448-448-448z"
              fill="#69A5ED"
              p-id="4708"
            />
            <path
              d="M384 192c-91 0-175.6 27.1-246.3 73.7C91.1 336.4 64 421 64 512c0 247.4 200.6 448 448 448 91 0 175.6-27.1 246.3-73.7C804.9 815.6 832 731 832 640c0-247.4-200.6-448-448-448z"
              fill="#5E99EF"
              p-id="4709"
            />
            <path
              d="M384 256c-126.5 0-238.7 61.2-308.7 155.6C67.9 443.8 64 477.5 64 512c0 247.4 200.6 448 448 448 34.5 0 68.2-3.9 100.4-11.3C706.8 878.7 768 766.5 768 640c0-212.1-171.9-384-384-384z"
              fill="#558FF3"
              p-id="4710"
            />
            <path
              d="M575.5 704s114.7-18.4 205.2-125.8 27.8-282.5-205.5-255.3c0 0 184.3 9.5 177.2 161.5 0 0 16.8 116.2-180.2 195.7l3.4 23.3"
              fill="#FFFFFF"
              p-id="4711"
            />
            <path d="M506.5 238.2l-0.5 588.2-85.5-22.6z" fill="#B8E6FF" p-id="4712" />
            <path
              d="M339.9 439.2l24.5 49.7 54.8 8-39.6 38.6 9.3 54.7-49-25.8-49.1 25.8 9.4-54.7-39.7-38.6 54.9-8zM506.5 234.9v591.5l92.8-31.5-12.3-82.2z"
              fill="#FFFFFF"
              p-id="4713"
            />
          </svg>
          <div style="">
            <div style="font-size: 0.8rem;text-align: center">
              {{ JSON.parse(patent.patentProperties).TI }}<br>
              10-23 15:37
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { deletePackage, getPackage, getPatentListByPackageId } from '@/api/package'

export default {
  name: 'TechPack',
  data() {
    return {
      packageDetail: { packageName: '' },
      patentList: []
    }
  },
  mounted() {
    const packageId = this.$route.params.id
    getPackage(packageId).then(res => {
      this.packageDetail = res.data.data
      getPatentListByPackageId(packageId).then(res => {
        console.log(res.data.data)
        this.patentList = res.data.data
      })
    })
  },
  methods: {
    handleDeletePackage() {
      deletePackage(this.packageDetail.packageId).then(res => {
        console.log(res)
        this.$message.success('删除成功')
        this.$router.push('/patent/package')
      })
    }
  }
}
</script>
<style scoped>

.image {
  width: 80%;
  margin: 0 10%;
}
</style>
