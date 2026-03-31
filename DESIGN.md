# Design System — Agent Vision

## Product Context
- **What this is:** Marketing website for Agent Vision, a macOS CLI tool that gives AI agents eyes and hands on screen
- **Who it's for:** Developers using AI coding assistants, AI agent builders, QA engineers
- **Space/industry:** Developer tools, AI agent infrastructure
- **Project type:** Marketing site with SEO-driven use case pages

## Aesthetic Direction
- **Direction:** Warm Precision. Clean and technical enough to signal "serious developer tool," warm enough to feel approachable. Linear's polish with more personality.
- **Decoration level:** Intentional. Subtle SVG background shapes (soft geometric arcs, not blobs), gradient accents on key elements, low-opacity indigo/amber gradient paths behind sections.
- **Mood:** Professional, modern, trustworthy, warm. Not cold Swiss minimalism, not hacker cosplay. A developer tool that takes itself seriously but isn't afraid of personality.
- **Anti-patterns:** No terminal-emulator aesthetic. No green-on-black. No monospace headings. No purple AI gradients. No floating particles. No 3-column icon grids.

## Typography
- **Display/Hero:** Satoshi (geometric, confident, modern warmth). Loaded from Fontshare.
- **Body:** DM Sans (warm, highly readable, excellent x-height). Loaded from Google Fonts.
- **Code/Mono:** Geist Mono (clean, pairs well with Satoshi). For code blocks and terminal frames only. Loaded from Google Fonts.
- **Loading:** Fontshare CDN for Satoshi, Google Fonts for DM Sans and Geist Mono. Use `font-display: swap`.
- **Scale:** Hero: clamp(40px, 6vw, 72px). Section headings: clamp(28px, 4vw, 44px). Body: 16px. Small/captions: 13px. Mono labels: 11-12px.

## Color
- **Approach:** Balanced with warm dual-accent system
- **Background:** #09090b (zinc-950, slightly warm black)
- **Surface:** #18181b (zinc-900, cards, frames, alternating sections)
- **Border:** #27272a (zinc-800, subtle, almost invisible)
- **Text:** #fafafa (zinc-50)
- **Text muted:** #a1a1aa (zinc-400)
- **Text dim:** #71717a (zinc-500, captions, meta)
- **Primary accent:** #6366f1 (indigo-500). Used for: section labels, overlay bounding boxes, scan line animation, element type labels in terminal frames, gradient on hero heading.
- **Primary accent light:** #818cf8 (indigo-400). Used for: check marks in comparison table, hover states on structural elements.
- **Secondary accent:** #f59e0b (amber-500). Used boldly for: card hover borders, link text in cards, CTA hover glow, footer link hovers, badges, section divider lines. Amber is the warm counterpoint that makes the design feel alive.
- **Secondary accent light:** #fbbf24 (amber-400). Used for: hover states on amber elements, hero caption highlights.
- **Indigo glow:** rgba(99, 102, 241, 0.15). For subtle glows on indigo elements.
- **Amber glow:** rgba(245, 158, 11, 0.08-0.1). For hover glow on interactive elements.

### Color Usage Rules
- Indigo is structural (labels, overlay, headings, section markers)
- Amber is interactive and warm (hovers, links, CTAs, dividers, badges)
- Never use amber and indigo in the same gradient on text
- Section dividers use amber at 15% opacity with transparent fade on both ends
- SVG background shapes use both indigo and amber gradients at very low opacity (5-15%)

## SVG Background Shapes
- **Purpose:** Add depth and craft without being decorative noise. The shapes make the page feel layered and designed, not flat.
- **Style:** Geometric arcs (quadratic bezier curves), concentric circles, scattered dots. No blobs, no organic shapes, no illustrations.
- **Colors:** Use indigo and amber gradients on SVG strokes. Opacity range: 5-25% on strokes, gradients fade to transparent at ends.
- **Placement:** Hero (large arcs from right side with concentric circles), alternating sections (subtle single arcs), CTA section (crossing wave arcs from both sides).
- **Implementation:** Inline SVG elements positioned absolute behind section content with pointer-events: none and z-index: 0.

## Spacing
- **Base unit:** 8px
- **Density:** Comfortable. More generous than the current design.
- **Section padding:** 120px vertical
- **Max content width:** 1200px
- **Card padding:** 28px
- **Scale:** xs(4) sm(8) md(16) lg(24) xl(32) 2xl(48) 3xl(64) 4xl(120)

## Layout
- **Approach:** Grid-disciplined with breathing room
- **Max width:** 1200px centered
- **Cards grid:** auto-fit, minmax(280px, 1fr), 16px gap
- **Alternating sections:** Background shifts between --bg and --surface to create visual rhythm without hard borders
- **Border radius:** 12px for cards and frames, 8px for install blocks and code, 6px for inline code and badges, 50% for status dots
- **Terminal frames:** Rounded (12px), muted dots (zinc-700, no color), subtle title bar

## Motion
- **Approach:** Intentional
- **Scan overlay:** Keep the scan line animation but in indigo instead of green. Subtler glow.
- **Hover states:** 0.2s transitions on border-color, transform, box-shadow
- **Cards:** translateY(-2px) on hover with amber border glow
- **Install blocks:** Amber border + soft box-shadow glow on hover
- **Easing:** ease-out for entrances, ease-in-out for state changes
- **Reduced motion:** Respect prefers-reduced-motion. Disable scan animation, remove transforms.

## Overlay System
- **Bounding boxes:** 1px solid indigo (#6366f1) instead of green
- **Labels:** Indigo text on bg background, font-mono 9-10px, rounded corners (3px)
- **Scan line:** Indigo gradient sweep instead of green
- **Status bar:** Backdrop blur, indigo dot, indigo count text
- **Purely visual:** No click interception. pointer-events: none on all overlay elements.

## Section Labels
- Font: Geist Mono, 11px, uppercase, letter-spacing 2px
- Color: indigo (#6366f1)
- Followed by a thin horizontal line (border color) fading out via max-width
- Pattern: `// Section name` with the line extending to the right

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-31 | Initial design system | Replaced dark hacker aesthetic with Warm Precision direction |
| 2026-03-31 | Satoshi over Inter/Geist for display | More personality than category defaults, geometric warmth |
| 2026-03-31 | Dual accent (indigo + amber) | Indigo for structure, amber for warmth and interaction. Differentiates from monochrome dev tool sites |
| 2026-03-31 | SVG geometric arcs as background decoration | Adds depth and craft without being noisy. Low-opacity indigo/amber gradients on bezier paths |
| 2026-03-31 | 12px border-radius on cards/frames | Softer than 0px (current), not as bubbly as 16px+. Matches Linear's approach |
| 2026-03-31 | Amber for all interactive hover states | Creates warmth throughout the experience, not just one badge |
