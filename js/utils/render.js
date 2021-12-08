import { getTemplate, isMatch, updateTitle } from '.'
import { BUTTON_CLASS, BUTTON_NAME, DIV_CLASS, STATUS } from '../constants/todo_constants'

function formEditWhenData(todo) {
  if (!todo) return

  const form = document.getElementById('formId')
  if (!form) return
  form.dataset.id = todo.id

  const formInput = form.querySelector('[name="formInput"]')
  if (!formInput) return

  const formCheck = form.querySelector('[name="formCheck"]')
  if (!formCheck) return

  // render title, status at form

  formInput.value = todo.title

  formCheck.checked = todo.status === STATUS.COMPLETED ? true : false
}

export function createLiElement(todo, params) {
  if (!todo) return null

  const template = getTemplate()
  const liElement = template.content.firstElementChild.cloneNode(true)

  // update data-status, data-id for liElement
  liElement.dataset.status = todo.status
  liElement.dataset.id = todo.id

  // update title
  updateTitle(liElement, todo.title)

  /**
   * handle hidden li element not match
   */
  if (params) {
    liElement.hidden = !isMatch(params, liElement)
  }

  // change class when status
  const currentStatus = liElement.dataset.status

  const divElement = liElement.querySelector('.todo')
  const newClass = currentStatus === STATUS.PENDING ? DIV_CLASS.PENDING : DIV_CLASS.COMPLETED

  divElement.classList.remove(DIV_CLASS.COMPLETED, DIV_CLASS.PENDING)
  divElement.classList.add(newClass)

  const buttonElement = liElement.querySelector('.mark-as-done')
  const newClassButton =
    currentStatus === STATUS.PENDING ? BUTTON_CLASS.PENDING : BUTTON_CLASS.COMPLETED
  const newText = currentStatus === STATUS.PENDING ? BUTTON_NAME.RESET : BUTTON_NAME.FINISH

  buttonElement.classList.remove(BUTTON_CLASS.COMPLETED, BUTTON_CLASS.PENDING)
  buttonElement.classList.add(newClassButton)
  buttonElement.textContent = newText

  // edit
  const editButtonElement = liElement.querySelector('.edit')
  editButtonElement.addEventListener('click', () => {
    formEditWhenData(todo)
  })

  return liElement
}

export function renderTodoItem(ulElementId, todoList, params) {
  if (!Array.isArray(todoList) || todoList.length === 0) return

  const ulElement = document.getElementById(ulElementId)
  if (!ulElement) return

  if (params) {
    ulElement.textContent = ''
  }

  for (const todo of todoList) {
    const liElement = createLiElement(todo, params)

    ulElement.appendChild(liElement)
  }
}
