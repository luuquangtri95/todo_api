export function updateTitle(element, text) {
  const titleElement = element.querySelector('.todo__heading')
  if (!titleElement) return

  titleElement.textContent = text
}
