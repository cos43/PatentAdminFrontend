<template>
  <div class="results">
    <create-pack ref="createPack" />

    <div v-for="(item,index) of results" :key="item.NO" class="result-item">
      <div class="result-title row-center">
        <span class="text-primary">{{ index + 1 }} {{ item.TI }}[ZH]</span>
        <el-tag
          :style="{backgroundColor:getTagColor(item.CLS),border:'none'}"
          effect="dark"
          size="mini"
          style="margin: 0 5px"
        >{{ item.CLS }}
        </el-tag>
        中国发明申请
      </div>
      <div class="desc">
        申请号：{{ item.AN }}
        <el-divider direction="vertical" />
        申请日：{{ item.AD }}
        <el-divider direction="vertical" />
        公开(公告）号：{{ item.PNM }}
        <el-divider direction="vertical" />
        公开（公告）日：{{ item.PD }}

      </div>
      <div class="desc">
        申请（专利权）人：{{ item.PA }}
        <el-divider direction="vertical" />
        发明(设计）人：{{ item.PINN }}
      </div>
      <div class="desc">
        {{ item.CL }}
      </div>
      <div class="flex-end">
        <el-popover
          ref="popover"
          content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
          placement="right"
          title="标题"
          trigger="focus"
          width="200"
        />
        <el-button-group>
          <el-button size="mini" type="primary" @click="claim(item)">
            {{ item.isClaimed ? '取消认领' : '认领' }}
          </el-button>
          <el-button size="mini" type="primary" @click="focus(item)">
            {{ item.isFocused ? '取消关注' : '关注' }}
          </el-button>
          <el-popover
            placement="left-end"
            width="350"
          >
            <el-form
              :model="addPackForm"
              label-position="left"
              label-width="60px"
              size="small"
              style="margin: 10px"
            >
              <el-form-item label="专利" size="small">
                <el-input v-model="addPackForm.patentName" size="small" />
              </el-form-item>
              <el-form-item label="工艺包" size="small">
                <el-select
                  v-model="addPackForm.packageId"
                  v-loading="loadingPackageList"
                  placeholder="请选择工艺包"
                  size="small"
                  style="width: 100%"
                >
                  <el-option
                    v-for="p in packageList"
                    :key="'p'+p.packageName"
                    :label="p.packageName"
                    :value="p.packageId"
                  />
                </el-select>
              </el-form-item>
              <div style="display: flex;flex-direction: row;align-items: center;justify-content: space-between">
                <el-button size="mini" type="primary" @click="showCreatePack">新增工艺包</el-button>
                <div style="text-align: right; margin: 0">

                  <el-button
                    v-loading="loadingRelation"
                    :disabled="patentPackageExist"
                    size="mini"
                    type="primary"
                    @click="handleAddPatentToPackage(item)"
                  >
                    {{ patentPackageExist ? '已添加' : '添加' }}
                  </el-button>
                </div>
              </div>
            </el-form>
            <el-button slot="reference" size="mini" type="primary" @click="showPopover(item)">加入工艺包
            </el-button>
          </el-popover>
        </el-button-group>
      </div>
    </div>
    <div class="block center">
      <el-pagination
        :total="1000"
        layout="prev, pager, next"
      />
    </div>
  </div>
</template>
<script>
import { claimPatent, focusPatent, unClaimPatent, unFocusPatent } from '@/api/patent'
import { addPatentToPackage, checkPatentToPackage, getPackageList } from '@/api/package'
import { getTagColor } from '@/views/users/utils'
import createPack from '@/views/users/components/createPack'

export default {
  name: 'SearchList',
  components: {
    createPack
  },
  props: {
    results: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      searchResults: [],
      addPackForm: {
        patentName: '',
        patentId: '',
        packageId: ''
      },
      dialogVisible: false,
      popoverVisible: true,
      loadingPackageList: true,
      loadingRelation: false,
      packageList: [],
      patentPackageExist: false
    }
  },
  watch: {
    'addPackForm.packageId': function(val) {
      if (val) {
        this.loadingRelation = true
        const { patentId } = this.addPackForm
        console.log(this.addPackForm)
        checkPatentToPackage(val, patentId).then(res => {
          this.loadingRelation = false
          this.patentPackageExist = res.data.data.existed
        })
      } else {
        this.patentPackageExist = false
      }
    }
  },
  methods: {
    loadPackageList() {
      getPackageList().then(res => {
        this.packageList = res.data.data
        this.loadingPackageList = false
      })
    },
    showPopover(patent) {
      this.loadPackageList()
      this.addPackForm.patentId = patent.patentId
      console.log(patent)
      this.addPackForm.patentName = patent.TI
      this.addPackForm.packageId = ''
    },
    claim(patent) {
      if (patent.isClaimed) {
        unClaimPatent(patent.patentId).then(res => {
          if (res.data.code === 200) {
            this.$message.success('取消认领成功')
            patent.isClaimed = false
          } else {
            this.$message.error(res.data.msg)
          }
        })
      } else {
        claimPatent(patent).then(res => {
          if (res.data.code === 200) {
            this.$message.success('认领成功')
            patent.isClaimed = true
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }
    },
    handleAddPatentToPackage(patent) {
      const { packageId, patentId } = this.addPackForm
      addPatentToPackage(packageId, patentId, patent).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.$message.success('添加成功')
          this.dialogVisible = false
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    showCreatePack() {
      this.$refs.createPack.show()
    },
    focus(patent) {
      if (patent.isFocused) {
        unFocusPatent(patent.patentId).then(res => {
          if (res.data.code === 200) {
            this.$message.success('取消关注成功')
            patent.isFocused = false
          } else {
            this.$message.error(res.data.msg)
          }
        })
      } else {
        focusPatent(patent).then(res => {
          if (res.data.code === 200) {
            this.$message.success('关注成功')
            patent.isFocused = true
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }
    },
    getTagColor: getTagColor
  }
}
</script>
<style>

.results {
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

.desc {
  font-size: 0.8rem;
  line-height: 1.7;
  margin-top: 3px;
}

.result-item {
  padding: 20px 10px;
  cursor: pointer;
  border-radius: 10px;
  margin-bottom: 10px;
  transition: 0.3s;
}

.flex-end {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 10px;
}

.result-item:hover {
  background-color: #e3f8fd;
}

.active {
  background-color: #e3f8fd;
}

.center {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
