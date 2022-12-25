import request from '@/utils/request'

export function getDeptList() {
  return request({
    url: '/admin-agent/dept/list',
    method: 'get'
  })
}

export function getDeptRELAList() {
  return request({
    url: '/admin-agent/dept/relaList',
    method: 'get'
  })
}

export function getDeptRELAListbyId(deptId) {
  return request({
    url: `/admin-agent/dept/relaListById/${deptId} `,
    method: 'get'
  })
}

// 拒绝用户加入团队的申请
export function rejecJoin(deptId) {
  return request({
    url: `/admin-agent/dept/joinReject/${deptId} `, method: 'put'
  })
}

// 管理员创建团队
export function InsertDept(form) {
  return request({
    url: '/admin-agent/dept',
    method: 'post',
    data: form
  })
}

// 管理下线团队
export function OfflineDept(deptId) {
  return request({
    url: `/admin-agent/dept/offline/${deptId} `,
    method: 'put'

  })
}
// 管理重新上线团队
export function reOnlineDept(deptId) {
  return request({
    url: `/admin-agent/dept/reOnline/${deptId} `,
    method: 'put'

  })
}

// 管理踢出用户
export function unJoinDept(deptId, userId) {
  return request({
    url: `/admin-agent/dept/unJoin/${deptId}/${userId}`,
    method: 'put'

  })
}

// 管理恢复用户
export function recoverJoinDept(deptId, userId) {
  return request({
    url: `/admin-agent/dept/recoverJoin/${deptId}/${userId}`,
    method: 'put'

  })
}

// 管理批准用户加入
export function JoinDept(deptId, userId) {
  return request({
    url: `/admin-agent/dept/join/${deptId}/${userId}`,
    method: 'put'

  })
}

// 管理拒绝用户加入
export function JoinRejectDept(deptId, userId) {
  return request({
    url: `/admin-agent/dept/joinReject/${deptId}/${userId}`,
    method: 'put'

  })
}

// 管理撤销驳回
export function unReject(deptId, userId) {
  return request({
    url: `/admin-agent/dept/unReject/${deptId}/${userId}`,
    method: 'put'

  })
}
