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
