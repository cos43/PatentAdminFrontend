export function getTagColor(tag) {
  const tags = ['授权', '部分无效', '权利恢复', '公开', '实审', '全部无效', '届满', '终止', '撤回', '驳回', '未缴年费', '主动放弃', '视为放弃', '避重放弃']
  const colors = ['#67C23A', '#E6A23C', '#F56C6C', '#409EFF', '#67C23A', '#F56C6C', '#E6A23C', '#909399', '#909399', '#F56C6C', '#F56C6C', '#909399', '#909399', '#909399']
  return colors[tags.indexOf(tag)]
}
