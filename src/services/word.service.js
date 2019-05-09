import axios from 'axios'

const HOST = `http://localhost:4201`

export const createWord = word => {
  return axios.post(`api/words`, word).then(res => res.data)
}
export const updateWord = word => {
  return axios.put(`api/words`, word).then(res => res.data)
}
export const getWords = () => {
  return axios.get(`api/words`).then(res => res.data)
}
export const removeWord = id => {
  return axios.delete(`api/words/${id}`).then(res => res.data)
}
export const order = orderData => {
  return axios.post(`api/order`, orderData).then(res => res.data)
}
export const checkOrder = orderData => {
  return axios.post(`api/check-order`, orderData).then(res => res.data)
}
