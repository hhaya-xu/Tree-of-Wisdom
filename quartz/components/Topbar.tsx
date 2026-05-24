import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/topbar.scss"

const Topbar: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  return (
    <div class="topbar">
      <div class="topbar__left">
        <a href="/Tree-of-Wisdom" class="topbar__sitetitle">{cfg.pageTitle}</a>
        <span class="topbar__sep"></span>
        <span class="topbar__theme">入 流 亡 所 群 聊 录</span>
      </div>
    </div>
  )
}

Topbar.css = style

export default (() => Topbar) satisfies QuartzComponentConstructor
