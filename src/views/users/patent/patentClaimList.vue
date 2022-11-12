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

      </div>

      <el-table
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
          label="ID"
          prop="id"
          sortable="custom"
          width="60"
        >
          <template slot-scope="{row}">
            <span>{{ row.patentId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="专利名称" min-width="150px">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.patentProperties.TI }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="申请日" sortable="custom" width="100px">
          <template slot-scope="{row}">
            <span>{{ row.patentProperties.AD }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="发明人" width="110px">
          <template slot-scope="{row}">
            <span>{{ row.patentProperties.PINN }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="主分类号" width="80px">
          <template slot-scope="{row}">
            <span>{{ row.PNM }}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="状态" width="100">
          <template slot-scope="{row}">
            <el-tag :type="row.status ">
              {{ row.patentProperties.CLS }}
            </el-tag>
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

    </div>
    <!--    <div style="width: 300px">-->
    <!--      <PatentRecommend />-->
    <!--    </div>-->
  </div>
</template>

<script>
import { getClaimedPatents, unClaimPatent } from '@/api/patent'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'ComplexTable',
  directives: { waves },

  data() {
    return {
      tableKey: 0,
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
        console.log(this.list)
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
    }
  }
}
</script>
<style>

</style>
