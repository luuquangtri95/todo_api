import todoApi from './api/todoApi'
import { initDelete, initFilterStatus, initForm, initSearch, renderTodoItem, toast } from './utils'

async function handleForm(isEdit, data) {
  try {
    if (isEdit) {
      // mode edit
      await todoApi.update(data)
      toast.success('Update todo success')
    } else {
      // mode add
      const newData = await todoApi.addTodo(data)
      toast.info('Add new todo successfully')
      // render new todo
      renderTodoItem('todo__list', [newData.data])
    }
  } catch (error) {
    console.log('failed fetch data', error)
  }
}

async function handleDelete(id) {
  try {
    await todoApi.remove(id)
    toast.error('Delete todo success')
  } catch (error) {
    console.log('failed fetch data', error)
  }
}

async function handleFilterChange(filterName, filterValue) {
  try {
    const url = new URL(window.location)

    url.searchParams.set(filterName, filterValue)

    window.history.pushState({}, '', url)

    // fetch api

    // ! if status === all get all data
    if (url.searchParams.get('status') === 'all') {
      const response = await todoApi.getAll()
      const { data } = response

      renderTodoItem('todo__list', data, url.searchParams)
    }

    const { data } = await todoApi.getAll(url.searchParams)
    renderTodoItem('todo__list', data, url.searchParams)
  } catch (error) {
    toast.error('failed to fetch api search', error)
  }
}

// MAIN
;(async () => {
  try {
    // ! set default search & filter (search,status) on url
    const url = new URL(window.location)

    if (!url.searchParams.get('search')) url.searchParams.set('search', '')
    if (!url.searchParams.get('status')) url.searchParams.set('status', 'all')

    window.history.pushState({}, '', url)

    const queryParams = url.searchParams
    // ********************************

    const response = await todoApi.getAll()
    const { data } = response

    renderTodoItem('todo__list', data, queryParams)

    initForm({
      element: 'formId',
      isEdit: false,
      dataList: data,
      onSubmit: (isEdit, data) => handleForm(isEdit, data),
    })

    initDelete({
      element: 'todo__list',
      onChange: (id) => handleDelete(id),
    })

    initSearch({
      element: 'formSearchTodo',
      defaultParams: queryParams,
      onChange: (value) => handleFilterChange('search', value),
    })

    initFilterStatus({
      element: 'formFilterTodo',
      defaultParams: queryParams,
      onChange: (value) => handleFilterChange('status', value),
    })
  } catch (error) {
    toast.error('failed to fetch todo !!!', error)
  }
})()
