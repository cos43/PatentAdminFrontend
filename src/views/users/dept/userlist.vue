<template>

  <div class="app-container" style="display: flex;flex-direction: row">
    <div style="width: 100% ;">
      <div class="filter-container">
        <el-input
          v-model="queryid"
          class="filter-item"
          placeholder="团队名称"
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
          v-if="ifquery || ifpatent"
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
        style="width: 100%;
        border-radius: 10px!important;  "
      >

        <el-table-column align="center" label="团队ID" prop="id" sortable="custom" width="100">
          <template slot-scope="{row}">
            <span>{{ row.deptId }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户ID" min-width="150px">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.userId }}</span>
          </template>

        </el-table-column>
        <el-table-column align="center" label="用户身份" min-width="150px">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.MemType }}</span>
          </template>

        </el-table-column>

        <el-table-column align="center" label="申请内容" width="110px">
          <template slot-scope="{row}">
            <span>{{ row.memStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="申请时间" sortable="custom" width="180px">
          <template slot-scope="{row}">
            <span>{{ row.createdAt }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="审核状态" min-width="90px">
          <template slot-scope="{row}">
            <span class="link-type"> {{ row.ExamineStatus }} </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="最后更新时间" sortable="custom" width="180px">
          <template slot-scope="{row}">
            <span>{{ row.updatedAt }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" class-name="small-padding fixed-width" label="操作" width="280">
          <template slot-scope="{row}">
            <el-button
              v-if="row.ExamineStatus === '未审核' || row.ExamineStatus === '处理中'"
              :disabled="row.ExamineStatus === '已撤销'"
              size="mini"
              type="danger"
              @click="Reject(row)"
            >
              驳回
            </el-button>
            <el-button
              v-if="row.ExamineStatus === '已驳回'"
              size="mini"
              :disabled="row.ExamineStatus === '已撤销'"
              type="danger"
              @click="unReject(row)"
            >
              撤销
            </el-button>
            <el-button
              v-if="row.ExamineStatus === '已完成' && row.memStatus!=='非组员'"
              size="mini"
              :disabled="row.ExamineStatus === '已撤销'"
              type="primary"
              @click="UnJoinDept(row)"
            >
              移出
            </el-button>
            <el-button
              v-if="row.ExamineStatus === '已完成' && row.memStatus==='非组员'"
              size="mini"
              :disabled="row.ExamineStatus === '已撤销'"
              type="primary"
              @click="RecoverMem(row)"
            >
              恢复组员
            </el-button>
            <el-button
              v-if="row.ExamineStatus !== '已完成'"
              size="mini"
              :disabled="row.ExamineStatus === '已撤销'"
              type="warning"
              @click="Permission(row)"
            >
              同意
            </el-button>
          </template>
        </el-table-column>

      </el-table>

    </div>

  </div>

</template>
<script>

import waves from '@/directive/waves' // waves directive

import { getDeptRELAList, JoinDept, unJoinDept, JoinRejectDept, unReject, recoverJoinDept } from '@/api/dept'
export default {
  name: 'ComplexTable',
  directives: { waves },

  data() {
    return {
      files: null,
      tableKey: 0,
      patents: null,
      ifquery: false,

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
    getList() {
      this.listLoading = true
      getDeptRELAList().then(response => {
        this.list = response.data.data
        for (var i = 0; i < this.list.length; i++) {
          if (this.list[i].UpdatedAt === '') this.list[i].UpdatedAt = '无'
        }
        this.listLoading = false
      })
    },

    Reject(row) {
      alert('您确定拒绝该用户加入请求？')
      JoinRejectDept(row.deptId, row.userId).then(response => {
        this.getList()
        this.$message({
          message: '成功拒绝请求',
          type: 'success',
          duration: 1000
        })
        this.queryid = ''
      })
    },

    Permission(row) {
      if (row.ExamineStatus === '已驳回') {
        alert('您已驳回请求，请先撤销驳回')
        return
      } else {
        JoinDept(row.deptId, row.userId).then(response => {
          this.$message({
            message: '成功同意加入',
            type: 'success',
            duration: 1000
          })
          this.queryid = ''
          this.getList()
        })
      }
    },

    unReject(row) {
      unReject(row.deptId, row.userId).then(response => {
        this.$message({
          message: '成功撤销驳回',
          type: 'success',
          duration: 1000
        })
        this.getList()
      })
    },

    UnJoinDept(row) {
      unJoinDept(row.deptId, row.userId).then(response => {
        this.$message({
          message: '成功移出组员',
          type: 'success',
          duration: 1000
        })
        this.getList()
      })
    },

    RecoverMem(row) {
      recoverJoinDept(row.deptId, row.userId).then(response => {
        this.$message({
          message: '成功恢复组员',
          type: 'success',
          duration: 1000
        })
        this.getList()
      })
    },

    back() {
      this.ifpatent = false
      this.ifquery = false
      this.queryid = ''
      this.getList()
    },
    flash() {
      this.getList()
      this.queryid = ''
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
