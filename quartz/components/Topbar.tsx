import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/topbar.scss"

const Topbar: QuartzComponent = () => {
  return (
    <div class="topbar">
      <div class="topbar__theme">
        <span class="topbar__theme-text">入 流 亡 所 群 聊 录</span>
      </div>
    </div>
  )
}

Topbar.css = style

export default (() => Topbar) satisfies QuartzComponentConstructor
