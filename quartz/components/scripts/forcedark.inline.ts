// Force light theme — Tree of Wisdom is Specimen (light paper) only
document.documentElement.setAttribute('saved-theme', 'light')
if (localStorage.getItem('theme') !== 'light') {
  localStorage.setItem('theme', 'light')
}

document.addEventListener('nav', () => {
  document.documentElement.setAttribute('saved-theme', 'light')
})
