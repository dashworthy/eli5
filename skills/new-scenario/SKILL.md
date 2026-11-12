---
name: new-scenario
description: Add a new eli5 scenario, a template of the information Claude must supply in a given situation, drawn on a Whiteboard. Use when the user describes a new situation where Claude's technical communication should improve, or asks to add, change or list eli5 scenarios.
---

# Add an eli5 scenario

Each scenario is one folder in this plugin: `skills/<name>/SKILL.md`, written from `shared/scenario-template.md`. Nothing else needs to change: the plugin's system prompt section tells Claude to use any `eli5:*` scenario, and each scenario's `description` says when it applies.

Paths below are relative to this skill's base directory: the plugin root is `../..`.

## Steps

1. Read `../../shared/scenario-template.md` and list the existing scenarios (`ls ../../skills`), reading any that sound close to the new one. If the new idea overlaps an existing scenario, propose extending that one instead.
2. From what the user said, draft:
   - a name (one lowercase word, or two with a hyphen),
   - the trigger (when Claude should use it),
   - the information to supply (4 to 7 items),
   - the board layout,
   - the hand over.
   Fill gaps with your best guess rather than asking.
3. Show the user the draft as a short list (name, trigger, the items) and ask one question: anything to add, remove or reword? Use AskUserQuestion with "Looks right" as the recommended option.
4. Write `../../skills/<name>/SKILL.md` from the template. Keep it under about 50 lines, and keep the "First read `../../shared/board.md`" line.
5. Run `claude plugin validate ../..` and fix anything it reports.
6. Tell the user the scenario's name, that it is live from the next turn, and how to call it directly: `/eli5:<name>`.

## If it should be forced at a tool call

Some scenarios must happen before a specific tool runs (`decision` before AskUserQuestion, `plan` before ExitPlanMode). That needs one line in `../../hooks/register.ts`: add the tool and scenario to `GATES`. Only do this when the user asks for it to be forced.
