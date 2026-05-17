# Sprint 1 Execution Tracker

## COMPLETED
- [x] #01 Set up jest + testing-library — jest 29 + jest-expo, 3 suites, 11 tests green ✅
- [x] #02 Fix web preview CORS — patched CorsMiddleware, script at scripts/patch-cors.sh ✅
- [x] #03 Error boundaries — global + per-widget on dashboard ✅
- [x] #10 Add notes column to tasks — schema, client.ts, migration, task-detail.tsx ✅
- [x] #13 Test pin flow — set, verify, remove all tested ✅
- [x] #21 Loading skeletons — Skeleton, SkeletonCard, SkeletonList, SkeletonWidget ✅
- [x] #26 Bookmark tap-to-edit — Pressable card → router.push to detail modal ✅
- [x] #27 Widget reorder — edit mode with up/down arrows + hide/show toggles, persisted to DB ✅
- [x] #29 Swipe-to-delete — SwipeToDelete component, integrated in bookmarks ✅
- [x] #33 A11y labels — Button component auto-derives labels, key pressables labeled ✅
- [x] #15-19 Empty states — EmptyState component created, widgets have inline empty text ✅

## DEFERRED TO SPRINT 2
- [ ] #11 DB operation CRUD tests (lower priority - schema tests cover structure)
- [ ] #14 Test export-import
- [ ] #30 Onboarding polish
- [ ] #31 Typography audit
- [ ] #33-35 A11y focus order, contrast (labels done, deeper audit deferred)
- [ ] #36 FlatList consistency audit
- [ ] #37-38 Memo components, lazy load modals
- [ ] #39-42 E2E lifecycle tests

## ENVIRONMENT
- tmux `expo`: npx expo start --web --port 4301 — RUNNING
- tmux `proxy`: node proxy.mjs on port 4300 — RUNNING, CORS fix verified
- tsc: passes clean
- jest: 3 suites, 11 tests, all green

## SPRINT 1 STATUS: ✅ COMPLETE (11/11 tickets closed)
