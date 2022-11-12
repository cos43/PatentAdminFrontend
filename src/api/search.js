import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function searchSimple(searchForm) {
  const token = getToken()
  let path = '/user-agent/search'
  if (token) {
    path = '/user-agent/auth-search'
  }
  return request({
    url: path,
    method: 'post',
    data: searchForm
  })
}
