import request from '@/utils/request'

export function getValuationReportList() {
  return request({
    url: '/admin-agent/valuation-report',
    method: 'get'
  })
}

export function getReportPatents(reportId) {
  return request({
    url: `/admin-agent/report/patent/${reportId} `,
    method: 'get'
  })
}

export function getInfringementReportList() {
  return request({
    url: '/admin-agent/infringement-report',
    method: 'get'
  })
}

//
export function rejectReport(reportId) {
  return request({
    url: `/admin-agent/report/reject/${reportId} `, method: 'post'
  })
}

//
export function unRejectReport(reportId) {
  return request({
    url: `/admin-agent/report/unReject/${reportId} `, method: 'post'
  })
}

//
export function getReportById(reportId) {
  return request({
    url: `/admin-agent/report/${reportId} `, method: 'get'
  })
}

export function Upload(data) {
  return request({
    url: '/public/uploadFile?type=1', // type=1单文件，type=2多文件
    method: 'post', data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function updateReport(data) {
  return request({
    url: `/admin-agent/report/upload`,
    method: 'put',
    data
  })
}
