# Slotwork (prototype scaffold)
npm install && npm run dev

- `src/types` typed domain models (User, Job, Availability, MatchScore, ...)
- `src/utils/matching.ts` weighted match engine (schedule 40%, skills 25%, location 20%, experience 10%, prefs 5%)
- `src/services/*` mock API layer; replace bodies with fetch() later
- `src/components/AvailabilityCalendar.tsx` drag-to-paint weekly editor
- `src/components/MatchScore.tsx` animated ring
