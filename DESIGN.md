# Design System — The Toast Taproom

## Personality
Dark and warm craft beer taproom with gold accents — industrial Malasaña vibe meets American-Mexican fusion energy. Immersive full-bleed hero with bold condensed typography.

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
| Element   | Font             | Size                          | Weight | Line-height |
|-----------|------------------|-------------------------------|--------|-------------|
| hero h1   | Bebas Neue       | clamp(5rem, 10vw, 9rem)       | 400    | 0.92        |
| h2        | Playfair Display | clamp(1.8rem, 3.5vw, 2.8rem)  | 800    | 1.15        |
| h3        | Playfair Display | 1.1rem                         | 800    | —           |
| body      | Outfit           | 17px                           | 400    | 1.6         |
| eyebrow   | Outfit           | 0.72rem                        | 500    | —           |
| nav       | Outfit           | 0.82rem                        | 500    | —           |
| button    | Outfit           | 0.78rem                        | 600    | —           |
| hero-tag  | Bebas Neue       | 1.6rem (strong)                | 400    | 1           |

- Hero h1: uppercase, `letter-spacing: 0.01em`, outline effect on "TOAST" (`-webkit-text-stroke: 2px var(--gold)`)
- Eyebrow: `letter-spacing: 0.22em`, uppercase, with `::before` gold line
- Buttons: `letter-spacing: 0.12em`, uppercase
- Section labels: `letter-spacing: 0.16em`, uppercase

## Spacing Scale
8px · 12px · 16px · 20px · 24px · 32px · 36px · 48px · 60px · 80px · 120px

## Border Radius
| Element       | Radius |
|---------------|--------|
| Buttons       | 3px    |
| Cards         | 20px (--radius-lg) |
| Inputs        | 12px (--radius) |
| Images        | 20px   |
| Feature icons | 14px   |
| Hero tags     | 3px    |

## Shadows
| Level    | Value                                                            |
|----------|------------------------------------------------------------------|
| subtle   | 0 4px 24px rgba(212,168,83,0.3)                                  |
| card     | 0 16px 48px rgba(0,0,0,0.3)                                     |
| beer-img | 0 24px 64px rgba(0,0,0,0.4)                                     |
| button   | 0 4px 24px rgba(212,168,83,0.3)                                 |

## Buttons
| Style     | Background    | Text      | Border                           | Radius | Padding       |
|-----------|---------------|-----------|----------------------------------|--------|---------------|
| Primary   | #D4A853       | #111111   | none                             | 3px    | 14px 32px     |
| Outline   | transparent   | #F5F0E8   | 1px solid rgba(245,240,232,0.2)  | 3px    | 14px 32px     |
| Nav CTA   | #D4A853       | #111111   | none                             | 3px    | 10px 24px     |

## Nav
- Fixed position, transparent by default
- On scroll (`.scrolled`): `background: rgba(17,17,17,0.92)`, `backdrop-filter: blur(16px)`
- Logo: Playfair Display 1.4rem weight 900
- Links: Outfit 0.82rem uppercase, `color: rgba(245,240,232,0.6)`, hover gold
- Hamburger at ≤768px, mobile menu full-screen dark overlay

## Hero
- Full-bleed background image (bar interior) with gradient overlay
- Gradient: radial gold glows + linear-gradient dark-to-transparent
- Two-column grid, content bottom-left, info tags bottom-right
- Eyebrow "MALASAÑA, MADRID" with gold `::before` line
- Heading: Bebas Neue, "TOAST" has outline text effect
- Tagline: "Cerveza artesanal. Brunch legendario." muted subtitle
- Info tags: glass cards (rgba(255,255,255,0.05) bg, 1px border)

## Footer
- Background: `#0A0A0A`
- Border-top: `1px solid rgba(212,168,83,0.08)`
- 4-column grid: brand / navegar / contacto / síguenos
- Column headers: gold uppercase, Outfit 0.72rem
- Links: cream at 50% opacity, underline with gold on hover
- Social icons: 36px rounded squares, gold hover

## Notes
- Grain noise overlay on body::after at 0.04 opacity
- All sections use 120px vertical padding consistently
- Scroll reveal: CSS transitions 0.7s cubic-bezier(0.16,1,0.3,1)
- Stagger: nth-child transition-delay 0/80/160/240/320/400ms
- Stats counter: vanilla rAF with easeOutExpo, 1.5s duration
- prefers-reduced-motion disables all animations
- All content in Spanish
- Part of Grupo Bang Bang restaurant group
