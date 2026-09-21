import { QuartzComponent, QuartzComponentConstructor } from "../types"

const IruwangsuHero: QuartzComponent = ({ fileData }) => {
  const isHome = fileData.slug === "index"
  const isDayOne = fileData.slug === "策展文本/Day1-2026-04-14-入流"

  if (!isHome && !isDayOne) return null

  return (
    <>
      <section class="irw-hero" aria-labelledby="irw-hero-title">
        <div class="irw-hero__meta">
          <b>{isDayOne ? "DAY 01" : "ARCHIVE 00"}</b>
          <span>{isDayOne ? "2026.04.14" : "2026"}</span>
          <span>FIRST-PERSON RECORD</span>
        </div>
        <h1 id="irw-hero-title">初于闻中<br />入流亡所</h1>
        <p class="irw-hero__subtitle">从声音进入能闻之性。以时间为经，以第一人称体悟为纬，保留一次修行经验发生时的真实纹理。</p>
        <span class="irw-orbit irw-orbit--field" aria-hidden="true" />
        <span class="irw-orbit irw-orbit--ring" aria-hidden="true" />
        <span class="irw-orbit irw-orbit--mark" aria-hidden="true" />
      </section>
      <div class="irw-color-ribbon" aria-hidden="true"><i></i><i></i><i></i></div>
    </>
  )
}

export default (() => IruwangsuHero) satisfies QuartzComponentConstructor
