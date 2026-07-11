---
name: Vibrant Wordplay
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#4a4455'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#7b7487'
  outline-variant: '#ccc3d8'
  surface-tint: '#732ee4'
  primary: '#630ed4'
  on-primary: '#ffffff'
  primary-container: '#7c3aed'
  on-primary-container: '#ede0ff'
  inverse-primary: '#d2bbff'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed01b'
  on-secondary-container: '#6f5900'
  tertiary: '#9b005c'
  on-tertiary: '#ffffff'
  tertiary-container: '#bf2076'
  on-tertiary-container: '#ffdde7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#eaddff'
  primary-fixed-dim: '#d2bbff'
  on-primary-fixed: '#25005a'
  on-primary-fixed-variant: '#5a00c6'
  secondary-fixed: '#ffe083'
  secondary-fixed-dim: '#eec200'
  on-secondary-fixed: '#231b00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#ffd9e4'
  tertiary-fixed-dim: '#ffb0cd'
  on-tertiary-fixed: '#3e0022'
  on-tertiary-fixed-variant: '#8c0053'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 34px
  tile-text:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  label-bold:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base-unit: 4px
  margin-mobile: 16px
  margin-desktop: 32px
  gutter: 12px
  tile-gap: 8px
---

## Brand & Style
The brand personality is energetic, encouraging, and intellectually stimulating. It aims to evoke a "flow state" where users feel both challenged and supported. The target audience includes casual gamers and social groups looking for quick, high-engagement entertainment.

The design style is **Modern Playful**, blending elements of **Minimalism** for clarity with **Tactile** cues for interaction. It uses high-contrast surfaces and generous whitespace to ensure the game mechanics—the words and letters—remain the focal point. The interface avoids unnecessary clutter, opting for "squishy" interactive elements that respond to touch with a sense of physical weight and satisfaction.

## Colors
The palette is led by a vibrant **Electric Purple** (Primary) to drive action and signify "game-state" elements. **Sunny Yellow** (Secondary) is used exclusively for highlights, successes, and "Aha!" moments, providing a warm contrast. **Pink Punch** (Tertiary) acts as an accent for alternative actions or timer warnings.

The background uses a crisp **Off-White** (Neutral) to maintain a clean "app-like" feel, while deep charcoal is reserved for text to ensure maximum legibility against the bright primary colors.

## Typography
The system utilizes **Plus Jakarta Sans** across all levels to maintain a friendly, soft, and approachable aesthetic. 

- **Headlines:** Use Extra Bold (800) weight with tight letter spacing for a punchy, editorial look.
- **Letter Tiles:** Use Bold (700) and large sizing to ensure the game pieces feel substantial.
- **Body & Labels:** Use Medium (500) and Semi-Bold (600) for clarity in instructions and metadata.
- **Mobile scaling:** Headlines shrink slightly on mobile to prevent awkward line breaks, while tiles maintain their size for tap-target integrity.

## Layout & Spacing
The layout follows a **Fluid Grid** model optimized for portrait mobile viewing. 

- **Mobile:** Elements are stacked vertically with a 16px safe-area margin. Letter tiles are arranged in a flexible flex-wrap container with an 8px gap to ensure they stay within thumb-reach.
- **Desktop:** The content is centered in a max-width container (480px) to mimic the mobile experience, ensuring the game logic remains consistent across devices.
- **Rhythm:** A 4px baseline grid governs all spacing. Vertical rhythm between question cards and input zones should be generous (32px) to reduce visual cognitive load.

## Elevation & Depth
Depth is created through **Tonal Layers** and **Ambient Shadows** to give elements a "pressable" feel.

1. **Level 0 (Background):** Solid neutral white/grey.
2. **Level 1 (Cards/Tiles):** White surfaces with a soft, 10% opacity shadow (Primary color tint) and a 1px border in a slightly darker shade of the background.
3. **Level 2 (Active/Selected):** Elements like selected letter tiles use a "pressed" effect—moving 2px down and losing their shadow—to simulate physical interaction.
4. **Modals:** Use a heavy backdrop blur (12px) to isolate the game results or settings without losing context of the game board.

## Shapes
The design system uses **Rounded** (0.5rem) corners for most UI elements to reinforce the friendly and safe brand personality. 

- **Small Components:** Checkboxes and small buttons use `rounded` (8px).
- **Interactive Tiles:** Use `rounded-lg` (16px) to make them look like "chunky" physical pieces.
- **Containers:** Large cards and the View Toggle use `rounded-xl` (24px) for a soft, modern enclosure.

## Components

### Letter Tiles
The core interaction unit. Tiles should have a subtle bottom border (3px) that is a darker shade of the tile color to give it a 3D "key" look. When tapped, the tile should scale down (0.95) and the bottom border should disappear.

### Question Cards
Large, elevated white cards with high-contrast text. They should feature a secondary color (Yellow) icon or badge in the top right to indicate the category or difficulty level.

### View Toggle (Admin vs. Participant)
A segmented control pill-shaped container. The active state should be a high-contrast Primary (Purple) block with white text, sliding smoothly between options to provide clear visual feedback of the "mode" change.

### Buttons
Primary buttons are "Primary Purple" with white text, featuring a subtle inner glow on the top edge. Secondary buttons should use the "Secondary Yellow" to indicate "Ready" or "Submit" actions.

### Lists & Input Fields
Input fields for word entry should be "Ghost" style (transparent background with a thick 2px bottom border) that glows Purple when focused. Lists of players or previous scores should use alternating subtle tinted backgrounds for rows.