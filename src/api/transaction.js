import request from '@/utils/request'
export function txList(data) {
  return request({
    url: '/transaction' + data,
    method: 'get'
  })
}
export function txOver(data) {
  return request({
    url: '/transaction/over' + data,
    method: 'get'
  })
}
export function deleteTx(data) {
  return request({
    url: '/transaction/' + data,
    method: 'delete'
  })
}
export function getchannel(data) {
  return request({
    url: '/channel' + data,
    method: 'get'
  })
}
export function postchannel(data) {
  return request({
    url: '/channel/',
    method: 'post',
    data
  })
}
export function deletechannel(data) {
  return request({
    url: '/channel/' + data,
    method: 'delete'
  })
}
