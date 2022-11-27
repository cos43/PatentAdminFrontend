<template>
  <div class="app-container" style="display: flex;flex-direction: row">
    <div style="width: 100% ;">
      <div class="filter-container">
        <el-input
          v-model="queryid"
          class="filter-item"
          placeholder="报告id"
          size="small"
          style="width: 200px;margin-right: 10px"
        />

        <el-button
          v-waves
          class="filter-item"
          icon="el-icon-search"
          size="small"
          type="primary"
          @click="getReport(queryid)"
        >
          搜索
        </el-button>

        <el-button
          v-waves
          class="filter-item"
          icon="el-icon-refresh"
          size="small"
          type="primary"
          style="position:absolute;
        right:20px;"
          @click="flash()"
        >
          刷新
        </el-button>
        <el-button
          v-if="ifquery || ifpatent || ifupload"
          v-waves
          class="filter-item"
          icon="el-icon-d-arrow-left"
          size="small"
          type="primary"
          @click="back"
        >
          返回
        </el-button>

      </div>
      <input v-show="false" ref="uploadInput" type="file">
      <el-table
        v-if="ifpatent == false && ifupload == false"
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;
      border-radius: 10px!important;"
      >

        <el-table-column align="center" label="ID" prop="id" sortable="custom" width="60">
          <template slot-scope="{row}">
            <span>{{ row.reportId }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="报告名称" min-width="150px">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.reportName }}</span>
          </template>

        </el-table-column>
        <el-table-column align="center" label="申请时间" sortable="custom" width="230px">
          <template slot-scope="{row}">
            <span>{{ row.CreatedAt }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="最后更新时间" sortable="custom" width="230px">
          <template slot-scope="{row}">
            <span>{{ row.UpdatedAt }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="状态" width="110px">

          <template slot-scope="{row}">
            <span>{{ row.rejectTag }}</span>
          </template>
        </el-table-column>

        <el-table-column class-name="status-col" label="专利详情" width="100">
          <template slot-scope="{row}">
            <el-button class="detail" size="mini" type="warning" icon="el-icon-view" @click="getPatent(row.reportId)">
              查看
            </el-button>
          </template>
        </el-table-column>

        <el-table-column align="center" class-name="small-padding fixed-width" label="操作" width="280">
          <template slot-scope="{row}">
            <el-button v-if="isreject(row) === false" size="mini" type="danger" @click="Reject(row.reportId)">
              驳回
            </el-button>
            <el-button v-if="isreject(row)" size="mini" type="danger" @click="UnReject(row.reportId)">
              撤销
            </el-button>
            <el-button icon="el-icon-upload" size="mini" type="primary" @click="upload(row)">
              上传
            </el-button>
            <el-button
              v-if="row.rejectTag === '已上传'"
              size="mini"
              type="warning"
              icon="el-icon-view"
              @click="getFiles(row.reportId)"
            >
              查看
            </el-button>
          </template>
        </el-table-column>

      </el-table>

      <el-table
        v-if="ifpatent"
        :key="tableKey"
        v-loading="listLoading"
        :data="patentlist"
        border
        fit
        style="width: 100%;  border-radius: 10px!important;"
      >

        <el-table-column align="center" label="ID" prop="id" sortable="custom" width="90">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.patentId }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="专利名称" min-width="150px">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.patentProperties.TI }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="申请日" sortable="custom" width="220px">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.patentProperties.AD }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="发明人" width="110px">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.patentProperties.PINN }}.el</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="主分类号" width="100px">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.PNM }}</span>
          </template>
        </el-table-column>

        <el-table-column class-name="status-col" label="简介" width="300">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.patentProperties.CLS }}</span>
          </template>
        </el-table-column>

      </el-table>

      <el-table
        v-if="ifupload"
        :key="tableKey"
        v-loading="listLoading"
        :data="files"
        border
        fit
        style="width: 100%;  border-radius: 10px!important;"
      >
        <el-table-column align="center" label="报告ID" prop="id" sortable="custom" width="90">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.reportId }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="文件名称" min-width="150px">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.files[0].FileName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="上传日期" sortable="custom" width="220px">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.UpdatedAt }}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="缩略图" width="300">
          <template slot-scope="{row}">
            <div v-if="ifupload" class="cards">

              <el-card
                v-for="(file, index) in row.files"
                :key="`file-${index}`"
                :body-style="{ padding: 0 }"
                :style="{ padding: '0px', margin: '10px 10px 10px 0' }"
                class="my-card"
                shadow="hover"
              >
                <div class="card-actions">
                  <div style="display: flex;flex-direction: row;align-items: center;justify-content: center">
                    <el-button-group>
                      <el-button size="mini" type="primary" @click="preview(file)">预览
                      </el-button>
                      <el-button size="mini" type="primary">下载</el-button>
                    </el-button-group>
                  </div>
                </div>
                <div class="imageField">
                  <img :src="`http://localhost:8000${file.FilePath}`" alt="" class="image">
                </div>
                <div style="font-size: 0.8rem;text-align: center">
                  {{ file.FileName }}
                </div>
                <el-dialog
                  title="预览"
                  :visible.sync="centerDialogVisible"
                  width="30%"
                  center
                  :close-on-click-modal="true"
                  :close-on-press-escape="true"
                >

                  <div class="imageField">
                    <img :src="`http://localhost:8000${file.FilePath}`" alt="" class="image">
                  </div>
                  <span slot="footer" class="dialog-footer">
                    <el-button icon="el-icon-download" @click="centerDialogVisible = false">下载</el-button>
                  </span>
                </el-dialog>
              </el-card>

            </div>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" sortable="custom" width="220px" />

      </el-table>

    </div>

  </div>

</template>

<script>

import waves from '@/directive/waves' // waves directive
import {
  getInfringementReportList,
  getReportPatents,
  rejectReport,
  unRejectReport,
  getReportById,
  Upload,
  updateReport
} from '@/api/report'

export default {
  name: 'ComplexTable',
  directives: { waves },

  data() {
    return {
      files: null,
      tableKey: 0,

      patents: null,
      ifquery: false,
      ifupload: false,
      ifpatent: false,
      ifreport: false,
      ifshow1: false,
      patentitems: null,
      patentlist: [],
      patentid: 0,
      time1: '0:0:0',
      centerDialogVisible: false,

      a: 0,
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },

      queryid: ''

    }
  },

  created() {
    this.getList()
  },

  methods: {
    preview(file) {
      console.log(file)
      this.centerDialogVisible = true
    },

    getReport(a) {
      this.listLoading = true
      if (this.queryid === '') {
        alert('请输入报告id')
        this.listLoading = false
        return
      }
      getReportById(a).then(response => {
        // getlist的list是数组是因为patent一直大于1个。
        // 如果需要单个patent,需要重新设置一个数组赋值收到的response为数组的0下标元素
        if (response.data.data.Type !== 'infringement') {
          this.ifquery = true
          alert('您搜索的不是侵权报告')
          this.listLoading = false
          return
        }
        if (response.data.data == null) {
          alert('您搜索的报告不存在')
          this.ifquery = true
          this.listLoading = false
          return
        }
        this.ifquery = true
        this.list = [{}]
        this.list[0] = response.data.data
        this.listLoading = false
      })
    },

    getFiles(id) {
      this.listLoading = true
      this.ifupload = !this.ifupload
      getReportById(id).then(response => {
        // 将数据转化为js对象
        this.files = response.data.data
        this.files.files = JSON.parse(response.data.data.files)
        this.files = [{}]
        this.files[0] = response.data.data
        this.listLoading = false
      })
    },

    getList() {
      this.listLoading = true
      getInfringementReportList().then(response => {
        this.list = response.data.data
        for (var i = 0; i < this.list.length; i++) {
          if (this.list[i].UpdatedAt === '') this.list[i].UpdatedAt = '无'
        }
        this.listLoading = false
      })
    },

    // const，let，var的区别
    getPatent(a) {
      this.listLoading = true
      getReportPatents(a).then(response => {
        this.patents = response.data.data
        this.patentlist[0] = this.patents
        this.ifpatent = true
        this.patents.patentProperties = JSON.parse(this.patents.patentProperties)
        this.listLoading = false
      })
    },
    Reject(id) {
      console.log(id, 'reportid reject')
      alert('您确定驳回该请求？')
      rejectReport(id).then(response => {
        this.getList()
        alert('成功驳回请求')
      })
    },
    UnReject(a) {
      alert('您确定取消驳回该请求？')
      unRejectReport(a).then(response => {
        this.getList()
        alert('成功撤销驳回,请处理该请求')
      })
    },

    back() {
      this.ifpatent = false
      this.ifupload = false
      this.ifquery = false
      this.queryid = ''
      this.getList()
    },

    flash() {
      this.getList()
      this.queryid = ''
    },

    isreject(row) {
      if (row.rejectTag === '已驳回') {
        return true
      }
      return false
    },

    upload(row) {
      // 1、未审核时，上传也出现两个row的情况
      // 2、在驳回=>撤销驳回=>再上传的时候，会出现row有两个对象的情况

      // row只有上传的时候不正常，其他驳回、撤销都正常
      // 出问题时直接打印row，发现传过来的也是两个对象。
      if (row.rejectTag === '已驳回') {
        alert('该报告已被驳回，请先撤销驳回')
        return
      }
      console.log('文件内容', row.files, '状态标签', row.rejectTag, '报告id', row.reportId)
      if (row.files !== 'rejected clean' && row.files !== 'null' && row.files !== '') {
        alert('您已上传侵权报告')
        return
      }
      this.$refs.uploadInput.click()
      console.log(this.$refs)
      this.$refs.uploadInput.onchange = e => {
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        Upload(formData).then(res => {
          const path = res.data.data.path
          const id = row.reportId
          updateReport({
            reportId: id,
            filesOpt: 'add',
            files: [path]
          }).then(res => {
            console.log(res.data)
            this.getList()
            setTimeout(() => {
              // 这样才能正确关闭
              this.msg = this.$message({
                duration: 1000,
                type: 'success',
                message: '提交成功'
              })
            }, 0)
          })
        })
      }
    }
  }
}
</script>

<style>
.detail {
  background-color: transparent;
  border: 1px solid #409EFF;
  color: #409EFF;
}

.container {
  padding: 10px 15px;
}

.cards {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  flex-wrap: wrap;
}

.my-card {
  width: 180px;
  height: 200px;
}

.imageField {
  height: 150px;
  padding: 10px;
}

.imageField img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.my-card {
  position: relative;
}

.my-card:hover .card-actions {
  display: flex;
}

.card-actions {
  display: none;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
