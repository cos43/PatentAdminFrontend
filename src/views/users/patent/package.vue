<template>
  <div class="container">
    <create-pack ref="createPack" />
    <div style="margin: 20px 0 0 10px;display: flex;flex-direction: row;align-items: center">
      <el-input
        class="filter-item"
        placeholder="工艺包名称名称"
        size="small"
        style="width: 200px;margin-right: 10px"
      />

      <el-button class="filter-item" icon="el-icon-search" size="small" type="primary">
        搜索
      </el-button>
      <el-button icon="el-icon-folder-add" size="small" type="primary" @click="showCreatePack">
        创建工艺包
      </el-button>

    </div>
    <el-row :gutter="10">
      <el-col v-for="(o,index) in packageList" :key="index" :sm="6" :span="6" :xs="8">
        <el-card :style="{ padding: '0px',margin:'10px' }">
          <img alt="" class="image" src="https://i.pinimg.com/originals/4e/b3/9e/4eb39e8616a353272d771b6f3271427f.png">
          <div style="padding-top: 14px;">
            <div style="margin: 5px 0;font-size: 0.8rem">
              {{ o.packageName }}
            </div>
            <el-row justify="space-between" type="flex">
              <el-button size="mini" type="text" />
              <el-button-group>
                <Link :to="`package/${o.packageId}`">
                  <el-button icon="el-icon-folder" size="mini" type="primary">查看</el-button>
                </Link>
                <el-button icon="el-icon-download" size="mini" type="primary">打包下载</el-button>
              </el-button-group>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import createPack from '@/views/users/components/createPack'
import { mapGetters } from 'vuex'
import Link from '@/layout/components/Sidebar/Link'

export default {
  name: 'TechPack',
  components: {
    Link,
    createPack
  },
  computed: {
    ...mapGetters([
      'packageList'
    ])
  },
  mounted() {
    this.$store.dispatch('package/getPackageList', this.form).then(() => {
      console.log('yes')
    })
  },
  methods: {
    showCreatePack() {
      this.$refs.createPack.show()
    }
  }
}
</script>
<style scoped>
.image {
  width: 100%;
  display: block;
}
</style>
