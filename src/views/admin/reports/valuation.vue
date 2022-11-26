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
        right:20px; "
          @click="flash"
        >
          刷新
        </el-button>
        <el-button
          v-if="ifquery||ifpatent"
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

      <el-table
        v-if="ifpatent === false"
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;  border-radius: 10px!important;"
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
            <el-button v-if="isreject(row) ===false" size="mini" type="danger" @click="Reject(row.reportId)">

              驳回
            </el-button>
            <el-button v-if="isreject(row)" size="mini" type="danger" @click="UnReject(row.reportId)">
              撤销
            </el-button>
            <el-button size="mini" type="primary" icon="el-icon-document-add" @click="upload">
              <!-- @click="upload" -->

              上传
            </el-button>
            <el-button size="mini" type="warning" icon="el-icon-view" @click="showreport">
              <!-- @click="showreport"下载文件 -->
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
            <span class="link-type">{{ row.patentProperties.CL }}</span>
          </template>
        </el-table-column>

      </el-table>

    </div>
    <!--    <div style="width: 300px">-->
    <!--      <PatentRecommend />-->
    <!--    </div>-->
  </div>

</template>

<script>
// import { unClaimPatent } from '@/api/patent'
import waves from '@/directive/waves' // waves directive
import { getValuationReportList, getReportPatents, rejectReport, unRejectReport, getReportById } from '@/api/report'

export default {
  name: 'ComplexTable',
  directives: { waves },

  data() {
    return {
      tableKey: 0,
      patents: null,
      ifpatent: false,
      ifreport: false,
      ifshow1: false,
      ifquery: false,
      patentitems: null,
      patentlist: [],
      queryid: '',
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
      }

    }
  },
  created() {
    this.getList()
  },
  methods: {
    getReport(a) {
      this.listLoading = true
      getReportById(a).then(response => {
        if (response.data.data.Type !== 'valuation') {
          this.ifquery = true

          alert('您搜索的不是估值报告')
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
    getList() {
      this.listLoading = true
      getValuationReportList().then(response => {
        this.list = response.data.data
        this.listLoading = false
      })
    },
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
    Reject(a) {
      alert('您确定驳回该请求？')
      rejectReport(a).then(response => {
        this.getList()
        alert('成功驳回请求')
        this.queryid = ''
      })
    },
    UnReject(a) {
      alert('您确定取消驳回该请求？')
      unRejectReport(a).then(response => {
        this.getList()
        alert('成功撤销驳回,请处理该请求')
        this.queryid = ''
      })
    },
    back() {
      this.ifpatent = false
      // this.ifquery =false
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

    upload() { },
    showreport(row) {
      if (row.rejectTag !== '已上传') {
        alert('请先上传文件')
      }
      // 下载文件
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
</style>
