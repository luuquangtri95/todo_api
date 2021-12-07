export function initDelete({ element, onChange }) {
  const ulElement = document.getElementById(element)
  if (!ulElement) return

  ulElement.addEventListener('click', async (event) => {
    if (event.target.tagName === 'BUTTON' && event.target.className.includes('remove')) {
      const liElement = event.target.offsetParent.parentElement

      const id = liElement.dataset.id

      await onChange?.(id)

      // remove ui
      liElement.remove()
    }
  })
}
