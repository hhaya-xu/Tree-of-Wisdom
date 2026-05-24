// Right sidebar zone toggle — SPA-safe via event delegation on document.body
// document.body persists across micromorph morphing, so click delegation survives navigation

function initSidebarZones() {
  const contentZone = document.getElementById("sidebar-content-zone")
  const graphZone = document.getElementById("sidebar-graph-zone")

  if (!contentZone || !graphZone) return

  // Default: graph expanded, content collapsed
  contentZone.classList.add("collapsed")
  graphZone.classList.add("expanded")
}

// Event delegation on document.body (SPA-safe: body element persists through micromorph)
document.body.addEventListener("click", (e) => {
  const toggle = (e.target as Element).closest("[data-zone-toggle]") as HTMLElement | null
  if (!toggle) return

  const zoneId = toggle.dataset.zoneToggle
  const contentZone = document.getElementById("sidebar-content-zone")
  const graphZone = document.getElementById("sidebar-graph-zone")

  if (!contentZone || !graphZone) return

  if (zoneId === "content") {
    contentZone.classList.add("expanded")
    contentZone.classList.remove("collapsed")
    graphZone.classList.add("collapsed")
    graphZone.classList.remove("expanded")
  } else if (zoneId === "graph") {
    graphZone.classList.add("expanded")
    graphZone.classList.remove("collapsed")
    contentZone.classList.add("collapsed")
    contentZone.classList.remove("expanded")
  }
})

// Reset zones on SPA navigation
document.addEventListener("nav", () => {
  initSidebarZones()
})

// Initial setup
initSidebarZones()
