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
