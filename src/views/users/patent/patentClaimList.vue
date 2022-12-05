<template>
  <div class="app-container" style="display: flex;flex-direction: row">
    <div style="width: 100% ;">
      <div class="filter-container">
        <el-input
          v-model="listQuery.title"
          class="filter-item"
          placeholder="专利名称"
          size="small"
          style="width: 200px;margin-right: 10px"
        />

        <el-button v-waves class="filter-item" icon="el-icon-search" size="small" type="primary">
          搜索
        </el-button>
        <el-button
          v-if="ifreport"
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
        v-if="!ifreport"
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;  border-radius: 10px!important;"
      >
        <el-table-column
          align="center"
          label="报告ID"
          prop="id"
          sortable="custom"
          width="110"
        >
          <template slot-scope="{row}">
            <span>{{ row.patentId }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="报告名称" min-width="150px">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.patentProperties.TI }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="申请日期" sortable="custom" width="250px">
          <template slot-scope="{row}">
            <span>{{ row.patentProperties.AD }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="通过日期" sortable="custom" width="250px">
          <template slot-scope="{row}">
            <span>{{ row.patentProperties.PD }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="主分类号" width="180px">
          <template slot-scope="{row}">
            <span>{{ row.PNM }}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="报告" width="100">
          <template slot-scope="{row}">
            <el-button class="detail" size="mini" type="warning" icon="el-icon-view" @click="showReports(row.patentId)">
              查看
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" class-name="small-padding fixed-width" label="操作" width="180">
          <template slot-scope="row">
            <el-button size="mini" type="danger" @click="unClaimClick(row)">
              取消认领
            </el-button>
            <el-button size="mini" type="primary" @click="unClaimClick(row)">
              加入工艺包
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-table
        v-if="ifreport"
        :key="tableKey"
        v-loading="listLoading"
        :data="reportlist"
        border
        fit
        style="width: 100%;  border-radius: 10px!important;"
      >

        <el-table-column align="center" label="报告ID" prop="id" sortable="custom" width="100">
          <template slot-scope="{row}">
            <span>{{ row.reportId }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="报告类型" min-width="150px">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.Type }}</span>
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

        <el-table-column align="center" class-name="small-padding fixed-width" label="操作" width="280">
          <template slot-scope="{row}">
            <el-button
              v-if="row.rejectTag === '已上传'"
              size="mini"
              type="primary"
              icon="el-icon-download"
              @click="getFiles(row.reportId)"
            >
              下载
            </el-button>
            <div v-if="row.rejectTag !== '已上传'">/</div>
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
import { getClaimedPatents, unClaimPatent } from '@/api/patent'
import waves from '@/directive/waves' // waves directive

import {
  getReportListByPaId
} from '@/api/report'

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
      patentitems: null,
      reportlist: null,
      patentlist: [],
      isreject: false,

      patentid: 0,
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
    getList() {
      this.listLoading = true
      getClaimedPatents(this.listQuery).then(response => {
        const results = response.data.data
        results.map(item => {
          item.patentProperties = JSON.parse(item.patentProperties)
        })
        this.list = results
        this.listLoading = false
      })
    },
    unClaimClick(row) {
      unClaimPatent(row.row.patentId).then(response => {
        this.$message({
          message: '取消认领成功',
          type: 'success',
          duration: 5 * 1000
        })
        this.getList()
      })
    },
    showReports(id) {
      this.ifreport = true
      this.listLoading = true
      getReportListByPaId(id).then(response => {
        console.log(response.data.data)
        this.listLoading = false
        this.reportlist = response.data.data
      })
    },
    back() {
      this.ifreport = false
      this.queryid = ''
      this.getList()
    }
  }
}
</script>
<style>

</style>
