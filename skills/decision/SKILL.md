---
name: decision
description: Draw a technical decision on a Whiteboard before asking the user to choose. Use before any AskUserQuestion that asks the user to pick between technical approaches (architecture, data flow, a fix strategy, a schema, an integration path), when the eli5 hook asks for it, or when the user asks to lay out options.
---

# Decision

The user cannot answer a technical question from a short blurb. Show them the choice as a picture, then ask.

First read `../../shared/board.md` (relative to this skill's base directory) for how to build and hand over the board. This file only says what goes on it.

## Information to supply

1. **The question**: what is being decided, in user words.
2. **Today**: how it works now, as a flow, with the step where the problem shows up and what goes wrong there.
3. **Options (2 to 4)**: each with a short name (1 to 5 words, used identically on the board and in the question), its flow drawn the same way as Today, 2 to 4 pros, 2 to 4 cons, effort, and risk.
4. **Comparison**: one row per option: what changes for users, effort, risk, easy to undo?
5. **Recommendation**: which option and why, in one sentence.

## Board layout

- Takeaway line: the recommendation in 10 words or fewer.
- Section "Today": the flow, problem step highlighted with a short label.
- One section per option, side by side if 3 or fewer, titled `Option A: <name>`; add "(Recommended)" to the recommended one. Inside: the flow (steps that differ from Today highlighted), Pros and Cons lists side by side, then effort and risk in small text.
- Under the options: the comparison `table`, and beside it a yellow block with the recommendation.

## Hand over

Board link on its own line, then call AskUserQuestion with the link inside the `question` text, option labels matching the board's names, the recommended one first with "(Recommended)", and each description one plain sentence ending "See Option X on the board."
