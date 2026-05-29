import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/topbar.scss"

const Topbar: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  return (
    <div class="topbar">
      <div class="topbar__left">
        <a href="/Tree-of-Wisdom" class="topbar__sitetitle">{cfg.pageTitle}</a>
        <span class="topbar__sep"></span>
        <span class="topbar__theme">生命艺术家</span>
        <nav class="topbar-nav">
          <a href="/Tree-of-Wisdom/入流亡所策展">策展</a>
          <a href="/Tree-of-Wisdom/会议室">会议室</a>
          <a href="/Tree-of-Wisdom/系统文件夹">系统</a>
          <a href="/Tree-of-Wisdom/图谱">图谱</a>
        </nav>
      </div>
    </div>
  )
}

Topbar.css = style

export default (() => Topbar) satisfies QuartzComponentConstructor
