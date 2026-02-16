//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {

  // ==========================================================================
  // Super Navigation Header — toggle behaviour
  // Replicates the GOV.UK mega-menu open/close interaction
  // ==========================================================================

  const menuToggle = document.getElementById('super-navigation-menu-toggle')
  const menuPanel = document.getElementById('super-navigation-menu')
  const searchToggle = document.getElementById('super-search-menu-toggle')
  const searchPanel = document.getElementById('super-search-menu')

  if (!menuToggle || !menuPanel || !searchToggle || !searchPanel) return

  // Reveal the JS-only toggle buttons (they start hidden="hidden")
  menuToggle.removeAttribute('hidden')
  searchToggle.removeAttribute('hidden')

  function openPanel (toggle, panel) {
    panel.removeAttribute('hidden')
    toggle.setAttribute('aria-expanded', 'true')
    toggle.setAttribute('aria-label', toggle.dataset.textForHide)
  }

  function closePanel (toggle, panel) {
    panel.setAttribute('hidden', 'hidden')
    toggle.setAttribute('aria-expanded', 'false')
    toggle.setAttribute('aria-label', toggle.dataset.textForShow)
  }

  function isPanelOpen (toggle) {
    return toggle.getAttribute('aria-expanded') === 'true'
  }

  // Menu toggle
  menuToggle.addEventListener('click', () => {
    if (isPanelOpen(menuToggle)) {
      closePanel(menuToggle, menuPanel)
    } else {
      // Close search if open
      closePanel(searchToggle, searchPanel)
      openPanel(menuToggle, menuPanel)
    }
  })

  // Search toggle
  searchToggle.addEventListener('click', () => {
    if (isPanelOpen(searchToggle)) {
      closePanel(searchToggle, searchPanel)
    } else {
      // Close menu if open
      closePanel(menuToggle, menuPanel)
      openPanel(searchToggle, searchPanel)
    }
  })

  // Close dropdowns on Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (isPanelOpen(menuToggle)) {
        closePanel(menuToggle, menuPanel)
        menuToggle.focus()
      }
      if (isPanelOpen(searchToggle)) {
        closePanel(searchToggle, searchPanel)
        searchToggle.focus()
      }
    }
  })

})
