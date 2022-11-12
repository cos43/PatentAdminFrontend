<template>
  <div class="app-container" style="display: flex;flex-direction: row">
    <div style="width: 100% ;">
      <div
        style="display: flex;flex-direction: row;align-items: center;justify-content:space-between;margin-bottom: 10px"
      >
        <div>
          <el-input
            v-model="listQuery.title"
            class="filter-item"
            placeholder="报告名称"
            size="small"
            style="width: 200px;margin-right: 10px"
          />
          <el-select placeholder="请选择" size="small" style="width: 200px;margin-right: 10px" value="">
            <el-option
              v-for="item in ['查新报告','侵权报告','估值报告']"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
          <el-button v-waves class="filter-item" icon="el-icon-search" size="small" type="primary">
            搜索
          </el-button>
        </div>
        <div>
          <el-button-group style="margin-left: 10px">
            <el-button v-waves class="filter-item" size="small" type="primary">
              生成查新报告
            </el-button>
            <el-button v-waves class="filter-item" size="small" type="primary">
              生成侵权报告
            </el-button>
            <el-button v-waves class="filter-item" size="small" type="primary">
              生成估值报告
            </el-button>
          </el-button-group>
        </div>

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
            <span>{{ row.reportId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="报告名称">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.patent }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="报告类型" width="120px">
          <template slot-scope="{row}">
            <span>{{ row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="申请时间" width="100px">
          <template slot-scope="{row}">
            <span>{{ row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态" width="100px">
          <template slot-scope="{row}">
            <span>{{ row.status === 0 ? '处理中' : '已完成' }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" class-name="small-padding fixed-width" label="操作">
          <template slot-scope="row">
            <el-button :disabled="row.row.status!==1" size="mini" type="primary">
              下载
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>

  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import { list } from '../../../../mock/report'

export default {
  name: 'ComplexTable',
  directives: { waves },

  data() {
    return {
      tableKey: 0,
      list: list,
      listLoading: false,
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
    }
  }
}
</script>
<style>

</style>

