# Brand Spec — Tree of Wisdom (智慧树)

Extracted from reference: https://www.bianjing-hours.art/street-intro

## Color tokens (OKLch)

```css
:root {
  /* Warm paper body */
  --bg:      oklch(93% 0.018 95);
  --surface: oklch(96% 0.008 92);
  --fg:      oklch(18% 0.012 75);
  --muted:   oklch(48% 0.018 75);
  --border:  oklch(82% 0.08 85 / 0.32);
  --accent:  oklch(78% 0.12 80);
  --accent-strong: oklch(72% 0.16 80);
  --red:     oklch(35% 0.10 28);
  --teal:    oklch(38% 0.04 210);

  /* Dark chrome (topbar, overlays) */
  --chrome-bg:    oklch(8% 0.003 85);
  --chrome-fg:    oklch(93% 0.012 90);
  --chrome-muted: oklch(80% 0.012 90 / 0.68);
}
```

## Typography

- Display: ``Iowan Old Style'', ``Baskerville'', ``Palatino Linotype'', ``Noto Serif SC'', ``Source Han Serif SC'', serif
- Body: ``Avenir Next'', ``PingFang SC'', ``Hiragino Sans GB'', ``Noto Sans CJK SC'', system-ui, sans-serif
- Mono: ``Geist Mono'', ``JetBrains Mono'', ui-monospace, ``Cascadia Code'', monospace

## Layout posture (observed from reference)

1. Warm paper body gradient (#ede3cf O^' #ebe0ca O^' #e7dbc4) with amber radial glows
2. Dark topbar (frosted glass) for navigation contrast
3. Content panels on warm cream (#f5f0e4) with dark brown text
4. Amber/gold accents used sparingly OCo at most twice per screen
5. Serif display for headlines, sans body OCo editorial/archival tone
6. Hairline amber borders at 0.22OCO0.42 opacity
7. Grid texture overlay on body background (mask-image radial gradient)
8. Generous whitespace, one decisive image/flourish per view
9. No shadows except for dropdowns/modals; minimal border-radius
