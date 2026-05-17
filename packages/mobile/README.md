# focus

a local-first, open-source productivity dashboard for mobile.

minimal. brutalist. zara-inspired. all data stored locally in sqlite. no cloud, no accounts.

## features
- pomodoro timer with background notifications
- task management with priorities and tags
- daily focus intention
- daily journal
- habit tracker with streaks
- bookmark manager
- calendar integration (device calendar)
- gym workout tracker
- analytics dashboard
- data export/import (json)
- optional pin lock with biometric

## tech stack
- expo + react native (managed)
- expo-router (file-based navigation)
- expo-sqlite + drizzle orm (local database)
- asyncstorage (key-value settings)
- lucide icons
- react-native-svg

## design
- fonts: unbounded (logo), josefin sans (headings), montserrat (body)
- colors: pure black/white, grayscale only
- 0 border-radius everywhere
- 1px borders, no shadows
- all text lowercase

## development
```bash
bun run dev:mobile
```
