<template>
  <div>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart />
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <table-info :table-data="categoricalData" table-type="categorical" title="分类号：按部统计" />
      </el-col>
      <el-col :span="12">
        <table-info :table-data="categoricalData" table-type="pieChart" title="专利饼图" />
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="12">
        <table-info :table-data="applicationData" table-type="application" title="申请人统计" />
      </el-col>
      <el-col :span="12">
        <table-info :table-data="applicationData" table-type="inventor" title="发明人统计" />
      </el-col>
    </el-row>

  </div>
</template>
<script>
import LineChart from './LineChart'
import TableInfo from './tableInfo'

export default {
  components: {
    LineChart,
    TableInfo
  },
  data() {
    return {
      categoricalData: [{
        date: 'G 物理',
        number: 805,
        percent: 80.5
      }, {
        date: 'H电学',
        number: 22,
        percent: 10.2
      }, {
        date: 'F 机械工程；照明；加热',
        number: 13,
        percent: 1.3
      }, {
        date: 'B 作业；运输',
        number: 8,
        percent: 0.8
      },
      {
        date: 'C 作业；运输',
        number: 8,
        percent: 0.8
      }],
      applicationData: [{
        person: '张三',
        number: 805,
        percent: 80.5
      },
      {
        person: '张三',
        number: 805,
        percent: 80.5
      }, {
        person: '张三',
        number: 805,
        percent: 80.5
      }, {
        person: '张三',
        number: 805,
        percent: 80.5
      }, {
        person: '张三',
        number: 805,
        percent: 80.5
      }, {
        person: '张三',
        number: 805,
        percent: 80.5
      }]
    }
  }
}
</script>
