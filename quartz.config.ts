import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
  pageTitle: "Tree of Wisdom",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "zh-CN",
    baseUrl: "hhaya-xu.github.io/Tree-of-Wisdom",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "local",
      cdnCaching: true,
      typography: {
        header: "Songti SC",
        body: "PingFang SC",
        code: "SF Mono",
      },
      colors: {
        lightMode: {
          light: "#ede3cf",
          lightgray: "#e7dbc4",
          gray: "#c4b898",
          darkgray: "#4a3f35",
          dark: "#2b2218",
          secondary: "#b8860b",
          tertiary: "#8b6914",
          highlight: "rgba(184,134,11,0.08)",
          textHighlight: "#b8860b22",
        },
        darkMode: {
          light: "#ede3cf",
          lightgray: "#e7dbc4",
          gray: "#c4b898",
          darkgray: "#4a3f35",
          dark: "#2b2218",
          secondary: "#b8860b",
          tertiary: "#8b6914",
          highlight: "rgba(184,134,11,0.08)",
          textHighlight: "#b8860b22",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({ priority: ["frontmatter", "git", "filesystem"] }),
      Plugin.SyntaxHighlighting({ theme: { light: "github-light", dark: "github-light" }, keepBackground: false }),
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
      ],
  },
}

export default config
