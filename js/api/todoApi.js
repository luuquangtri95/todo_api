import axiosClient from './axiosClient'

const todoApi = {
  getAll(params) {
    const url = '/todolist'
    return axiosClient.get(url, { params })
  },
  getById(id) {
    const url = `/todolist/${id}`
    return axiosClient.get(url)
  },
  addTodo(data) {
    const url = '/todolist'
    return axiosClient.post(url, data)
  },
  update(data) {
    const url = `/todolist/${data.id}`
    return axiosClient.patch(url, data)
  },
  remove(id) {
    const url = `/todolist/${id}`
    return axiosClient.delete(url)
  },
}

export default todoApi
