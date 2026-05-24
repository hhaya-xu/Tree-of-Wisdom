import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "🌿 Tree of Wisdom",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "zh-CN",
    baseUrl: "hhaya-xu.github.io/Tree-of-Wisdom",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Noto Serif SC",
        body: "Noto Sans SC",
        code: "Geist Mono",
      },
      colors: {
        lightMode: {
          light: "#0d0c0a",
          lightgray: "#1a1714",
          gray: "#3d362a",
          darkgray: "#d4c8b0",
          dark: "#ece3d1",
          secondary: "#d2b379",
          tertiary: "#e8c97a",
          highlight: "rgba(210,179,121,0.10)",
          textHighlight: "#d2b37944",
        },
        darkMode: {
          light: "#0d0c0a",
          lightgray: "#1a1714",
          gray: "#3d362a",
          darkgray: "#d4c8b0",
          dark: "#ece3d1",
          secondary: "#d2b379",
          tertiary: "#e8c97a",
          highlight: "rgba(210,179,121,0.10)",
          textHighlight: "#d2b37944",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({ priority: ["frontmatter", "git", "filesystem"] }),
      Plugin.SyntaxHighlighting({ theme: { light: "github-light", dark: "github-dark" }, keepBackground: false }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({ enableSiteMap: true, enableRSS: true }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
