import { DIV_CLASS, STATUS } from '../constants/todo_constants'

function showLoading(form) {
  const button = form.querySelector('[name="submit"]')
  if (!button) return

  button.textContent = 'loading...'
  button.disabled = true
}

function hideLoading(form) {
  const button = form.querySelector('[name="submit"]')
  if (!button) return

  button.textContent = 'Submit'
  button.disabled = false
}

export function initForm({ element, isEdit, dataList, onSubmit }) {
  const form = document.getElementById(element)
  if (!form) return

  const formInput = form.querySelector('[name="formInput"]')
  if (!formInput) return

  const formCheck = form.querySelector('[name="formCheck"]')
  if (!formCheck) return

  let isSubmitting = false

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const isEdited = form.dataset.id
    if (!!isEdited) {
      isEdit = true

      const index = dataList.findIndex((x) => x.id.toString() === form.dataset.id)
      dataList[index].title = formInput.value
      dataList[index].status = formCheck.checked ? STATUS.COMPLETED : STATUS.PENDING

      // update UI
      const liElement = document.querySelector(`ul#todo__list > li[data-id="${form.dataset.id}"]`)
      const divClass = liElement.querySelector('div.todo')
      const titleElement = liElement.querySelector('p.todo__heading')

      const currStatus = formCheck.checked

      titleElement.textContent = formInput.value

      if (currStatus) {
        divClass.classList.remove(DIV_CLASS.COMPLETED, DIV_CLASS.PENDING)
        divClass.classList.add(DIV_CLASS.COMPLETED)
      } else {
        divClass.classList.remove(DIV_CLASS.COMPLETED)
        divClass.classList.add(DIV_CLASS.PENDING)
      }

      showLoading(form)
      isSubmitting = true
      await onSubmit?.(isEdit, dataList[index])

      hideLoading(form)
      isSubmitting = false

      delete form.dataset.id
    } else {
      const data = {
        title: formInput.value,
        status: formCheck.checked ? STATUS.COMPLETED : STATUS.PENDING,
      }

      showLoading(form)
      isSubmitting = true

      await onSubmit?.(isEdit, data)

      hideLoading(form)
      isSubmitting = false
    }

    // reset form
    form.reset()
  })
}
