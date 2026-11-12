---
name: bug
description: Explain why something is broken on a Whiteboard, comparing what should happen with what actually happens. Use when you have found the root cause of a bug, crash, error or wrong result and are about to report it, or when the user asks why something broke.
---

# Bug

A root cause written as a paragraph of class names means nothing to the user. Show where the flow breaks.

First read `../../shared/board.md` (relative to this skill's base directory) for how to build and hand over the board. This file only says what goes on it.

## Information to supply

1. **Symptom**: what the user or customer sees, in their words (the error, the wrong number, the page that hangs).
2. **What should happen**: the flow when it works.
3. **What actually happens**: the same flow, with the step where it breaks and what goes wrong there.
4. **Why**: the root cause in one or two plain sentences, plus `file:line` in small text.
5. **Who is hit and how often**: which users, which storefront or screen, every time or only in some cases (say which cases).
6. **Since when**: what introduced it, if known (a commit, a release, a data change), or "unknown".
7. **Fix**: the fix in one sentence with effort and risk. If there is more than one reasonable fix, say so and run the `decision` scenario on the same board for them.

## Board layout

- Takeaway line: the cause in 10 words or fewer.
- Section "What should happen": the flow.
- Section "What actually happens" directly under it, steps lined up with the ones above, the breaking step highlighted with a short label.
- Below: a row of three blocks: Why, Who is hit, Since when. Then the Fix block (yellow).

## Hand over

Board link on its own line, then 2 to 3 lines: the cause, who is hit, and the fix you propose. If the fix needs a choice, ask it through the `decision` scenario.
