# Landing page — "What people are saying" reviews section

**Date:** 2026-06-27
**Surface:** `landing/index.html` + `landing/src/styles.css` (static, no client framework)

## Goal

Add a social-proof section to `mindwtr.app` featuring real user reviews pulled
from public posts, in the calm "clear water" aesthetic, without fabricating
anything (no invented quotes, no fake avatars, no invented ratings).

## Placement

New `<section>` in the flow: `trust` → **reviews** → `download`. Testimonials sit
directly above the download CTA — the natural conversion spot.

## Hard honesty rules (these are the point of the feature)

1. **Quotes are verbatim.** Trimming for length with `…` is allowed; changing,
   reordering, or substituting words is NOT. Each quote must match its source
   screenshot word-for-word before publish. *(Sole sanctioned exception:
   correcting an obvious misspelling of the product's own name, e.g.
   "Mindwrt" → "Mindwtr".)*
2. **No meaning-flips.** A trim must never turn a mixed/caveated review into a
   purely positive one. (Reviews whose praise was wrapped in real caveats were
   excluded outright rather than trimmed to look positive.)
3. **Stars only where they genuinely exist** — App Store and Google Play cards
   only. GitHub / Reddit / Discord have no star mechanic, so no stars there.
4. **No aggregate rating stat** unless backed by the real, currently-verified
   store average. (We are not printing "5.0" or an unverified "4.8".)
5. **No full legal names without consent.** Self-chosen public handles are fine.
   Store reviewers' real display names are downgraded to first-name + platform.
6. **No avatars / photos** — privacy + avoids the "fake testimonial" look. Each
   card shows handle/first-name + a small platform glyph instead.
7. Auto-translated store reviews use the store's own English rendering; the
   section copy notes reviews come "from across" the platforms and are "trimmed
   for length, never reworded" (no "unedited" claim, since we trim).

## Section copy

- **Heading:** "Loved by people who actually get things done"
- **Sub-line:** "Real reviews from across GitHub, Reddit, the App Store, Google
  Play and Discord — trimmed for length, never reworded."

## The 9 cards (final, verbatim — trim-only)

Each entry: attribution · platform · (stars if real) — quote as it will appear.

1. **James · Discord** —
   "This is by far the best GTD software I've used including two paid
   subscription ones. Cannot emphasize that enough."
   *(source display name "James Wilson"; downgraded to first name. Upgrade to
   full name only with his consent.)*

2. **Hamstercannon · App Store · ★★★★★** —
   "By default this app only shows the task being worked on instead of
   everything at once! This is amazing for not getting distracted by massive
   todo lists. … Also, this is local-only by default, with option to turn on
   iCloud and other syncs. Simple without all the extra junk no one actually
   uses. And no garbage AI!"

3. **Philip · Google Play · ★★★★★** —
   "Just what I have been looking for: GTD at its best, local first, no cloud,
   no costs."
   *(source "Philip Palzer"; first name only.)*

4. **Dads-finest · Reddit** —
   "Exactly the kind of to-do app I've been looking for for so long. For
   Android, Linux, and macOS. Excellent data protection. Offline. Clear,
   minimalist design without looking ugly. And then it's also free and open
   source…"

5. **Jonathan · Google Play · ★★★★★** —
   "The best digital fast-capture GTD-oriented app I've ever used and rapidly
   improving all the time, and will always be free thanks to the creator's
   licensing philosophy."
   *(source "Jonathan Zacsh"; first name. May be community member "jzacsh" —
   switch to handle/full name only if confirmed + consented.)*

6. **Richardo · Google Play · ★★★★★** *(translated from Indonesian)* —
   "A revolutionary task manager application, I can note down anything, and
   process it later, encouraging me to think freely…"
   *(source "Richardo Ariyanto"; first name. Trimmed before the translation
   artifact "for getting"; not reworded.)*

7. **Srijan · Google Play · ★★★★★** —
   "Pretty solid cross-platform GTD app with various sync options. Not perfect,
   but very close to it, and the developer is super responsive."
   *(source "Srijan Choudhary"; first name. "Not perfect" caveat kept.)*

8. **NicoLargi · Reddit** —
   "I yearned for GTD again and just cannot go back to Notion … I looked for
   'Todoist open source' alternative and found this recent post. So grateful I
   did. I added a few tasks and … this feels fantastic!"

9. **gum-leaf · GitHub** —
   "I have used several TODO/Task apps in the past and have not much success
   with them i.e. I never Got Things Done! I have used Mindwtr for a few weeks
   now and I am very impressed and have actually managed to get a few things
   done."
   *(verbatim except the reviewer's "Mindwrt" → "Mindwtr" product-name fix.)*

**Approved alternates** (swap in if any card is cut): Alexander Mot · Google Play
(WebDAV + responsive on GitHub); MichaelP67 · App Store (no paywall, donated);
Mohamed Fofana · Google Play ("perfect replacement for Super Productivity");
marceloantoniot · Reddit (daily user, data ownership).

## Layout & markup

- Semantic structure: `<section>` with a heading; each card is a
  `<figure>` containing a `<blockquote>` and a `<figcaption>` (name + platform).
- **Masonry via CSS `columns`** (3 → 2 → 1 across desktop/tablet/mobile) so
  varied quote lengths flow without ragged equal-height gaps. No JavaScript.
- Platform glyph: reuse existing `assets/badges/` art where available
  (GitHub, App Store, Google Play); add small inline monochrome SVG glyphs for
  Reddit and Discord. Glyphs rendered muted/monochrome to fit the calm palette;
  decorative, with the platform named in text (`aria`-labelled, not icon-only).
- Stars: small `★★★★★` rendered with an accessible label (e.g.
  `aria-label="Rated 5 out of 5"`), shown only on the two store cards.

## Styling

- Cards: white background, soft shadow + hairline border, rounded corners,
  generous padding — matching existing section cards.
- Quote text in the site navy; a brand-blue opening-quote accent.
- Reuse existing CSS custom properties / section-band rhythm; no new colors
  outside the established palette.

## Accessibility

- `<blockquote>`/`<figure>`/`<figcaption>` semantics; sufficient text contrast;
  glyphs decorative with text fallback; no motion (so no reduced-motion needed).

## Verification before publish

- Re-diff every quote against its source screenshot in `~/mindwtr_reviews/`
  (word-for-word; `…` = omission only).
- Confirm star cards correspond to actual store reviews.
- `bun run check` (secret scan + landing + docs production builds) must pass.

## Out of scope

- No JavaScript, no carousel/marquee, no avatars, no aggregate rating widget,
  no deep-links to sources (handles only) for this iteration.
