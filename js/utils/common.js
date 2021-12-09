import { DIV_CLASS } from '../constants/todo_constants'

export function updateTitle(element, text) {
  const titleElement = element.querySelector('.todo__heading')
  if (!titleElement) return

  titleElement.textContent = text
}

function isMatchSearch(search, liElement) {
  if (search === '') return true

  const titleElement = liElement.querySelector('p.todo__heading')
  if (!titleElement) return

  return titleElement.textContent.toLowerCase().includes(search.toLowerCase())
}

function isMatchStatus(status, liElement) {
  return status === 'all' || liElement.dataset.status === status
}

export function isMatch(params, liElement) {
  return (
    isMatchSearch(params.get('search'), liElement) && isMatchStatus(params.get('status'), liElement)
  )
}

export function updateTodoEdited(formCheck, formId) {
  const liElement = document.querySelector(`ul#todo__list > li[data-id="${formId}"]`)
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
}
