# Design System — The Toast Taproom

## Personality
Dark and warm craft beer taproom with gold accents — industrial Malasaña vibe meets American-Mexican fusion energy.

## Colors
| Token        | Value                      | Usage                    |
|--------------|----------------------------|--------------------------|
| --gold       | #D4A853                    | Buttons, links, accents  |
| --gold-light | #E8C97A                    | Hover states, highlights |
| --gold-dark  | #B8903A                    | Pressed states           |
| --dark       | #111111                    | Page background          |
| --charcoal   | #1A1A1A                    | Alt background           |
| --warm-gray  | #2A2622                    | Section backgrounds      |
| --surface    | rgba(255,255,255,0.04)     | Cards                    |
| --cream      | #F5F0E8                    | Primary text, headings   |
| --text       | #F5F0E8                    | Body text                |
| --text-muted | #B5A998                    | Secondary text (WCAG AA) |
| --border     | rgba(212,168,83,0.15)      | Borders, dividers        |
| footer-bg    | #0A0A0A                    | Footer background        |

## Typography
| Element | Font              | Size                          | Weight | Line-height |
|---------|-------------------|-------------------------------|--------|-------------|
| h1      | Playfair Display  | clamp(2.8rem, 5vw, 4.2rem)   | 900    | 1.08        |
| h2      | Playfair Display  | clamp(1.8rem, 3.5vw, 2.8rem) | 800    | 1.15        |
| h3      | Playfair Display  | 1.1rem                        | 800    | —           |
| body    | Outfit            | 17px                          | 400    | 1.6         |
| small   | Outfit            | 0.72rem                       | 600    | —           |
| nav     | Outfit            | 0.82rem                       | 500    | —           |
| button  | Outfit            | 0.9rem                        | 700    | —           |

- Headings: `letter-spacing: -0.03em` (h1), `-0.02em` (h2)
- Nav labels: `letter-spacing: 0.04em`, `text-transform: uppercase`
- Section labels: `letter-spacing: 0.16em`, `text-transform: uppercase`

## Spacing Scale
8px · 10px · 12px · 16px · 20px · 24px · 28px · 32px · 36px · 48px · 60px · 80px · 100px · 120px

## Border Radius
| Element     | Radius  |
|-------------|---------|
| Buttons     | 999px   |
| Cards       | 20px (--radius-lg) |
| Inputs      | 12px (--radius) |
| Images      | 20–24px |
| Feature icons | 14px  |
| Stat badge  | 16px    |

## Shadows
| Level    | Value                                                            |
|----------|------------------------------------------------------------------|
| subtle   | 0 4px 24px rgba(212,168,83,0.3)                                  |
| card     | 0 16px 48px rgba(0,0,0,0.3)                                     |
| elevated | 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,168,83,0.1)    |
| beer-img | 0 24px 64px rgba(0,0,0,0.4)                                     |
| badge    | 0 8px 32px rgba(212,168,83,0.4)                                 |

## Buttons
| Style     | Background    | Text      | Border                           | Radius | Padding       |
|-----------|---------------|-----------|----------------------------------|--------|---------------|
| Primary   | #D4A853       | #111111   | none                             | 999px  | 14px 32px     |
| Outline   | transparent   | #F5F0E8   | 1px solid rgba(245,240,232,0.2)  | 999px  | 14px 32px     |
| Nav CTA   | #D4A853       | #111111   | none                             | 999px  | 10px 24px     |

## Nav
- Fixed position, transparent by default
- On scroll (`.scrolled`): `background: rgba(17,17,17,0.92)`, `backdrop-filter: blur(16px)`
- Logo: Playfair Display 1.4rem weight 900
- Links: Outfit 0.82rem uppercase, `color: rgba(245,240,232,0.6)`, hover gold
- Hamburger at ≤768px, mobile menu full-screen overlay

## Footer
- Background: `#0A0A0A`
- Border-top: `1px solid rgba(212,168,83,0.08)`
- 4-column grid: brand / navegar / contacto / síguenos
- Column headers: gold uppercase, Outfit 0.72rem
- Links: cream at 50% opacity, underline with gold on hover
- Social icons: 36px rounded squares, gold hover

## Notes
- Grain noise overlay on body::after at 0.04 opacity
- Gold radial gradients used for ambient glow (hero, CTA)
- Section dividers: `linear-gradient(90deg, transparent, rgba(212,168,83,0.2) 20%, rgba(212,168,83,0.2) 80%, transparent)`
- Feature cards have image + body layout with hover zoom on image
- All content in Spanish
- Part of Grupo Bang Bang restaurant group
