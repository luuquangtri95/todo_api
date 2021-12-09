import { updateTodoEdited } from '.'
import { STATUS } from '../constants/todo_constants'

export function initForm({ element, defaultValue, onSubmit }) {
  const form = document.getElementById(element)
  if (!form) return

  const formInput = form.querySelector('[name="formInput"]')
  if (!formInput) return

  const formCheck = form.querySelector('[name="formCheck"]')
  if (!formCheck) return

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const data = {
      id: form.dataset.id,
      title: formInput.value,
      status: formCheck.checked ? STATUS.COMPLETED : STATUS.PENDING,
    }

    if (data.id !== undefined) {
      const index = defaultValue.findIndex((x) => x.id.toString() === form.dataset.id)

      defaultValue[index] = formInput.value
      defaultValue[index] = formCheck.value

      updateTodoEdited(formCheck, form.dataset.id)

      delete form.dataset.id

      await onSubmit?.(data)
    } else {
      const data = {
        title: formInput.value,
        status: formCheck.checked ? STATUS.COMPLETED : STATUS.PENDING,
      }

      await onSubmit?.(data)
    }

    form.reset()
  })
}
