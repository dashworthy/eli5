---
name: plan
description: Lay out a multi-step implementation plan on a Whiteboard before asking for approval. Use before calling ExitPlanMode, before starting work that touches several parts of the system, when the eli5 hook asks for it, or when the user asks what the plan is.
---

# Plan

A wall of plan text is hard to approve. Show the steps, what each one gives the user, and what could go wrong.

First read `../../shared/board.md` (relative to this skill's base directory) for how to build and hand over the board. This file only says what goes on it.

## Information to supply

1. **Goal**: what will be true for users when this is done, in one sentence.
2. **Steps**: numbered, in order, each with a short name, effort, and what the user can check when it is done (a page, a button, a test).
3. **Before / after**: the user-facing flow today and after the change, changed steps highlighted.
4. **Risks**: what could go wrong, and how each is undone (revert, migration down, feature flag).
5. **Not doing**: what is deliberately left out, so nobody expects it.
6. **Total**: total effort and the order to review the work in.

## Board layout

- Takeaway line: the goal in 10 words or fewer.
- Section "Steps": numbered blocks left to right (wrap after 6), effort under each in small text.
- Section "Before" and section "After" side by side, flows lined up.
- Bottom row: Risks list, Not doing list, and a yellow block with the total.

## Hand over

Board link on its own line. If you are in plan mode, also add the link to the top of the plan file, then call ExitPlanMode. Otherwise ask whether to start, with the total effort in the question.
