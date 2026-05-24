import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { concatenateResources } from "../util/resources"
// @ts-ignore
import sidebarToggleScript from "./scripts/sidebar-toggle.inline"
import sidebarToggleStyle from "./styles/sidebar-zones.scss"

type SidebarZonesConfig = {
  graph: QuartzComponent
  content: QuartzComponent[]
}

export default ((config: SidebarZonesConfig) => {
  const SidebarZones: QuartzComponent = (props: QuartzComponentProps) => {
    return (
      <>
        <div class="sidebar-zone sidebar-content-zone" id="sidebar-content-zone">
          <button
            class="sidebar-zone-toggle"
            data-zone-toggle="content"
            aria-label="Toggle content zone"
          >
            <span class="zone-toggle-label">内容</span>
            <span class="zone-toggle-icon">&#9650;</span>
          </button>
          <div class="sidebar-zone-body">
            {config.content.map((Component) => (
              <Component {...props} />
            ))}
          </div>
        </div>
        <div class="sidebar-zone sidebar-graph-zone" id="sidebar-graph-zone">
          <button
            class="sidebar-zone-toggle"
            data-zone-toggle="graph"
            aria-label="Toggle graph zone"
          >
            <span class="zone-toggle-label">关系图谱</span>
            <span class="zone-toggle-icon">&#9650;</span>
          </button>
          <div class="sidebar-zone-body">
            <config.graph {...props} />
          </div>
        </div>
      </>
    )
  }

  SidebarZones.css = concatenateResources(
    sidebarToggleStyle,
    config.graph.css,
    ...config.content.map((c) => c.css),
  )
  SidebarZones.afterDOMLoaded = concatenateResources(
    sidebarToggleScript,
    config.graph.afterDOMLoaded,
    ...config.content.map((c) => c.afterDOMLoaded),
  )
  SidebarZones.beforeDOMLoaded = concatenateResources(
    config.graph.beforeDOMLoaded,
    ...config.content.map((c) => c.beforeDOMLoaded),
  )

  return SidebarZones
}) satisfies QuartzComponentConstructor<SidebarZonesConfig>
