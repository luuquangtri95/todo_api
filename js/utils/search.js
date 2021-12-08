export function initSearch({ element, defaultParams, onChange }) {
  const searchElement = document.getElementById(element)
  if (!searchElement) return

  if (defaultParams && defaultParams.get('search'))
    searchElement.value = defaultParams.get('search')

  searchElement.addEventListener('input', async (event) => {
    await onChange?.(event.target.value)
  })
}
