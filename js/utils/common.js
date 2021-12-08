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

export function isMatch(params, liElement) {
  return isMatchSearch(params.get('search'), liElement)
}
