---
name: explain
description: Explain how a part of the system works on a Whiteboard. Use when the user asks how something works, what a feature or integration does, where data goes, or wants to understand an unfamiliar part of the codebase before deciding anything.
---

# Explain

Code walkthroughs lose the reader in the details. Show the shape of the thing first.

First read `../../shared/board.md` (relative to this skill's base directory) for how to build and hand over the board. This file only says what goes on it.

## Information to supply

1. **What it is for**: the job it does for users, in one sentence.
2. **The shape**: the main flow in the form it really has: a line for a process, a loop for something that repeats, a tree for parts of a whole. 6 to 10 parts at most.
3. **Triggers**: what starts it (a click, a schedule, a message, an import) and how often.
4. **Data in and out**: what it reads, what it writes, and which other systems it talks to (ERP, search, payment, email).
5. **Gotchas**: 2 to 4 behaviours that surprise people, each one line.
6. **Where it lives**: the main files or bundles, in small text, for whoever needs to go deeper.

## Board layout

- Takeaway line: what it is for, 10 words or fewer.
- The shape in the middle, as large as the board allows. Outside systems as blocks at the edges, in one colour, named in a small key.
- Triggers at the start of the flow, data labels on the arrows only where they are not obvious.
- Bottom row: Gotchas list, then Where it lives in small text.

## Hand over

Board link on its own line, then the one-sentence purpose and the most surprising gotcha.
