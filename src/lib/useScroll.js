export function useScroll() {
  const scrollToElementById = (id, options = { behavior: 'smooth' }) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView(options)
    }
  }

  return {
    scrollToElementById
  }
}
