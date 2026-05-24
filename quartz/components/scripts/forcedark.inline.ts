// Force dark theme — Tree of Wisdom is dark-only
document.documentElement.setAttribute('saved-theme', 'dark')
localStorage.setItem('theme', 'dark')

// Block any attempts to switch theme
document.addEventListener('nav', () => {
  document.documentElement.setAttribute('saved-theme', 'dark')
})
