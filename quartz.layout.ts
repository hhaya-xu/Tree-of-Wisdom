import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.Topbar(),
    Component.Search(),
  ],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.TagList(),
  ],
  left: [
    Component.ContentMeta(),
    Component.MobileOnly(Component.Spacer()),
    Component.Explorer({ title: "浏览" }),
  ],
  right: [
    Component.SidebarZones({
      graph: Component.Graph(),
      content: [
        Component.DesktopOnly(Component.TableOfContents()),
        Component.Backlinks(),
      ],
    }),
  ],
}

export const defaultListPageLayout: PageLayout = {
  beforeBody: [],
  left: [
    Component.ContentMeta(),
    Component.MobileOnly(Component.Spacer()),
    Component.Explorer({ title: "浏览" }),
  ],
  right: [],
}
