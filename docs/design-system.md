# NARA design system

## Palette

| Token | Hex | Use |
| --- | --- | --- |
| Royal Maroon | `#682C35` | Primary actions and brand emphasis |
| Antique Gold | `#C4A46A` | Fine accents and decorative details |
| Ivory | `#F5ECDD` | Warm section surfaces |
| Forest Green | `#344B38` | Botanical feature panels |
| Terracotta | `#B56D50` | Secondary accent |
| Deep Brown | `#35271F` | Body text |

Paper, muted text, border, hover, and semantic colors are defined alongside these tokens in `src/app/globals.css`. Gold is reserved for accents; small text uses darker foregrounds for contrast.

## Type and spacing

Cormorant Garamond provides expressive editorial headings. Inter is used for interface and body text. Noto Serif Sinhala is loaded as a future localization option. Headings scale with `clamp()`, content is centered within a 1200px measure, and section spacing expands with viewport width.

## Accessibility and motion

Layouts reflow to one column on narrow screens. Navigation, cart controls, and links have visible keyboard focus; imagery has descriptive alternative text; form-like actions have accessible labels. Motion is limited to short reveal and image transitions. `prefers-reduced-motion` disables nonessential animation and smooth scrolling.

Heritage motifs are used as contemporary visual inspiration. The supplied fresco-style product concept is identified as illustrative rather than archaeological documentation. Product claims and details remain unverified until confirmed.
