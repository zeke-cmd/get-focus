# focus — design system

## philosophy
minimal. brutalist. zara-inspired. zero decoration, maximum function.
everything lowercase. sharp corners everywhere (borderRadius: 0).

## typography
| role | font | usage |
|------|------|-------|
| logo | Unbounded | "focus" wordmark only, never changes |
| heading | Josefin Sans | screen titles, section headers, card titles |
| body | Montserrat | all body text, labels, inputs, buttons |

- all text: `textTransform: 'lowercase'`
- heading sizes: 28 (screen title), 20 (section), 16 (card title)
- body sizes: 16 (primary), 14 (secondary), 12 (caption), 11 (tab label)
- line height: 1.5× font size

## color palette

### light mode
| token | hex | usage |
|-------|-----|-------|
| background | #FFFFFF | screen bg |
| foreground | #000000 | primary text, active icons |
| muted | #F5F5F5 | secondary bg, input bg |
| mutedForeground | #737373 | secondary text, inactive icons |
| border | #E3E3E3 | all borders |
| chart1 | #000000 | primary chart color |
| chart2 | #333333 | secondary |
| chart3 | #666666 | tertiary |
| chart4 | #999999 | quaternary |

### dark mode
| token | hex | usage |
|-------|-----|-------|
| background | #000000 | screen bg |
| foreground | #FFFFFF | primary text, active icons |
| muted | #1A1A1A | secondary bg, input bg |
| mutedForeground | #A6A6A6 | secondary text, inactive icons |
| border | #333333 | all borders |
| chart1 | #FFFFFF | primary chart color |
| chart2 | #CCCCCC | secondary |
| chart3 | #999999 | tertiary |
| chart4 | #666666 | quaternary |

## spacing
4 · 8 · 12 · 16 · 20 · 24 · 32 · 48

## components

### card
- borderWidth: 1
- borderColor: colors.border
- borderRadius: 0
- padding: 20
- backgroundColor: colors.card (transparent/same as bg)
- no shadows

### button (filled)
- backgroundColor: colors.foreground
- color: colors.background
- height: 56 (large), 48 (default), 36 (small)
- borderRadius: 0
- fontFamily: Montserrat
- fontWeight: 600

### button (outlined)
- borderWidth: 1
- borderColor: colors.border
- backgroundColor: transparent
- color: colors.foreground
- same sizes as filled

### input
- borderWidth: 1
- borderColor: colors.border
- borderRadius: 0
- height: 48
- paddingHorizontal: 16
- fontFamily: Montserrat
- fontSize: 16
- backgroundColor: transparent

### badge
- borderWidth: 1
- borderColor: colors.border
- borderRadius: 0
- paddingHorizontal: 8
- paddingVertical: 2
- fontSize: 12
- fontFamily: Montserrat

### tab bar
- backgroundColor: colors.background
- borderTopWidth: 1
- borderTopColor: colors.border
- no shadows, no elevation
- icon strokeWidth: 1.5
- label: Montserrat 11px lowercase

## interactions
- bottom sheets for all modals (not dialogs)
- haptic feedback on every interactive element
- swipe actions for list items (delete, complete)
- pull-to-refresh on scrollable screens

## icons
lucide-react-native, strokeWidth: 1.5
