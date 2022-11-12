import request from '@/utils/request'

export function getPackageList(params) {
  return request({
    url: '/user-agent/package',
    method: 'get',
    params
  })
}

export function createPackage(data) {
  return request({
    url: `/user-agent/package`,
    method: 'post',
    data
  })
}

export function deletePackage(id) {
  return request({
    url: `/user-agent/package/${id}`,
    method: 'delete'
  })
}

export function updatePackage(id, data) {
  return request({
    url: `/user-agent/package/${id}`,
    method: 'put',
    data
  })
}

export function getPackage(id) {
  return request({
    url: `/user-agent/package/${id}`,
    method: 'get'
  })
}

export function addPatentToPackage(packageId, patentId, patent) {
  return request({
    url: `/user-agent/package/${packageId}/patent/${patentId}`,
    method: 'post',
    data: patent
  })
}

export function checkPatentToPackage(packageId, patentId, patent) {
  return request({
    url: `/user-agent/package/${packageId}/patent/${patentId}/isExist`,
    method: 'get',
    data: patent
  })
}

export function getPatentListByPackageId(packageId) {
  return request({
    url: `/user-agent/package/${packageId}/patent`,
    method: 'get'
  })
}
