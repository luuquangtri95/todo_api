import todoApi from './api/todoApi'
import { initDelete, initForm, renderTodoItem, toast } from './utils'

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
    toast.error('Delete todo sucess')
  } catch (error) {
    console.log('failed fetch data', error)
  }
}

// MAIN
;(async () => {
  try {
    const response = await todoApi.getAll()
    const { data } = response

    renderTodoItem('todo__list', data)

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
  } catch (error) {
    console.log(error)
  }
})()
