export function initFilterStatus({ element, defaultParams, onChange }) {
  const filterElement = document.getElementById(element)
  if (!filterElement) return

  if (defaultParams && defaultParams.get('status'))
    filterElement.value = defaultParams.get('status')

  filterElement.addEventListener('change', async (event) => {
    await onChange?.(event.target.value)
  })
}
