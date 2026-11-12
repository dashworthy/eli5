# Making an eli5 board

Every eli5 scenario uses these steps. The scenario's own SKILL.md says WHAT information to supply and how to lay it out; this file says HOW to put it on a board.

## Who reads it

Someone who knows the business and the product, not the code. Write for them:

- Plain words. Use a technical term only when the reader will meet it again, and say what it is in 5 to 10 words the first time.
- Say what it means for the people who use the system (admins, customers, the warehouse) before how it works inside.
- A real example (this order, this field, this button) beats a general rule.
- A few words per block. Class names and file paths go in small text, never in block labels.
- Every claim must be true. Read the code first; be ready to cite `file:line` for each step.
- Effort in concrete units (minutes, hours, days). Risk as low / medium / high.

## Reuse before you create

If this conversation already has a board on the same subject, add to it (read it fresh, then write only new elements). A new board is only for a new subject.

## Create and fill the board

1. Artifact tool, publish with `type_url` `https://claude.ai/artifact/PLsEyfjXbDUM1iasW7rjLR` (the Whiteboard type), a `title` of 2 to 5 words, `auto_open: "after_first_write"`, no files. If that url is refused, find the Whiteboard type with `action: "list"`, `scope: "types"`.
2. The create result carries the Whiteboard type's instructions (element format, colours, spacing, claims). Follow them for every write.
3. Fill it with `ArtifactData` `batch` (load it with ToolSearch if needed): `board/meta` first, then elements back to front, at most 50 writes per call.
4. Do not check it with screenshots or read-backs unless the user asks.

## Common layout rules

- Top: `text` size `title` with the subject, then `text` size `large` with the one takeaway (10 words max).
- Then the scenario's sections, top to bottom, each a `container`.
- Flows run left to right as blocks joined by arrows; past 6 steps, wrap to a new row starting at the left.
- One strong colour (`terracotta` stroke) marks what matters most: the broken step, the changed step. Everything else stays plain white blocks.
- Pros / cons and other lists are `text` with `- ` lines and a `wrap` of 200 to 400.
- Keep the board within about 1,500 wide. No pictures of people. Software is blocks and arrows, not drawings.

## When there is no Whiteboard

If the Artifact tool or the Whiteboard type is not available (a `-p` run, an account without it), give the same information in chat: ASCII flow diagrams (never Mermaid), then the scenario's sections as short headed lists.

## Hand it over

Put the board link on its own line in chat, then whatever the scenario says to do next (ask, ask for approval, or a 2 to 3 line summary).
