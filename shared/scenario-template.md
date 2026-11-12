---
name: <scenario-name>
description: <When Claude should use this, in one or two sentences, starting with the situation. Name the moments it triggers on, e.g. "Use when ..., when ..., or when the user asks to ...". This line is how Claude decides to load it, so make the trigger concrete.>
---

# <Scenario title>

<One sentence: the communication problem this scenario fixes for the user.>

First read `../../shared/board.md` (relative to this skill's base directory) for how to build and hand over the board. This file only says what goes on it.

## Information to supply

<The template: every piece of information the user wants Claude to supply in this situation, as a numbered list. Each item: a short name in bold, then what it must contain.>

1. **<Item>**: <what it holds>
2. **<Item>**: <what it holds>

## Board layout

<Where each item above sits on the board, top to bottom, after the title and takeaway. Say which items are flows (blocks and arrows), lists, tables, or single blocks, and what gets the highlight colour.>

## Hand over

<What Claude does after the board: ask a question, ask for approval, or reply with a short summary. Say what the reply must include.>
