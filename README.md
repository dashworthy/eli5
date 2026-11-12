# eli5

A Claude Code plugin that makes Claude explain technical work so you can act on it without reading code.

Before Claude asks you to choose between technical approaches, it draws the choice on a claude.ai Whiteboard: how things work today, a flow for each option, pros and cons, effort, risk and a recommendation. The same idea covers bugs, plans, explanations and recaps of finished work. Each situation is a **scenario**: a template of the information Claude must supply.

## Install

At the prompt of a Claude Code terminal session:

```
/plugin install eli5 --marketplace dashworthy/eli5
```

Answer `y` to add the marketplace, then pick a scope (user scope is first).

From a shell:

```
claude plugin install eli5 --marketplace dashworthy/eli5
```

In the desktop app: click + next to the prompt box, then Plugins, Add marketplace with `dashworthy/eli5`, then Add plugin.

The repository is private: installing needs read access to it on GitHub and a git credential for github.com on your machine (an SSH key, or `gh auth login` then `gh auth setup-git`). The install does not prompt for one.

**Needs:** a Claude Code build with function-hook plugins, and a claude.ai account with Artifacts and the Whiteboard type. Without a Whiteboard, Claude gives the same information in chat as ASCII diagrams and lists.

## Scenarios

| Scenario | When it is used | What Claude supplies |
|---|---|---|
| `decision` | Before asking you to choose a technical approach | Today's flow, each option's flow, pros and cons, effort and risk, comparison table, recommendation |
| `bug` | When reporting why something is broken | What should happen next to what actually happens, the cause, who is hit, since when, the fix |
| `plan` | Before multi-step work or plan approval | Goal, steps with effort, before and after, risks and how to undo them, what is left out |
| `explain` | When you ask how something works | Its purpose, its main flow, what starts it, data in and out, gotchas, where the code lives |
| `recap` | After a change that users will notice | Before and after, how to see it yourself, the tests that prove it, what is still open |

Run any of them directly with `/eli5:<scenario> <topic>`, for example `/eli5:explain how orders reach the ERP`.

### Forced scenarios

Two scenarios are forced by a hook, so Claude cannot skip them:

- The first `AskUserQuestion` in a turn is sent back once, asking Claude to run `decision` first and put the board link in the question.
- The first `ExitPlanMode` in a turn is sent back once, asking Claude to run `plan` first.

A call that already holds a claude.ai artifact link goes straight through. If the question is not technical (a name, a yes or no), Claude calls the tool again unchanged and it goes through, at a cost of one extra round trip.

The plugin also adds a short section to Claude's system prompt: plain words first, define a term the first time, say what something means for users before how it works, and use an `eli5:*` scenario when you would otherwise have to read code to follow.

## Adding a scenario

Tell Claude: "add an eli5 scenario for <situation>". The `new-scenario` skill drafts the template, asks you one question, writes `skills/<name>/SKILL.md` and validates the plugin. The scenario is live from the next turn.

To write one by hand, copy `shared/scenario-template.md` to `skills/<name>/SKILL.md` and fill in:

1. `description`: when Claude should use it. This line is how Claude decides to load it.
2. **Information to supply**: the template, 4 to 7 items.
3. **Board layout**: where each item sits on the board.
4. **Hand over**: what Claude does after the board (ask, ask for approval, or summarize).

No code change is needed. To force a scenario before a tool runs, add the tool and scenario to `GATES` in `hooks/register.ts`.

## Layout

```
.claude-plugin/plugin.json      manifest
hooks/register.ts               gates and the system prompt section
shared/board.md                 how every scenario builds its board
shared/scenario-template.md     blank scenario template
skills/<scenario>/SKILL.md      one folder per scenario
tests/gates.test.ts             hook tests
```

## Development

```
claude plugin validate .
claude plugin test .
```

## Known issue

If another plugin answers Claude's system-prompt event without passing it on (seen with `cc-plugin-sec-default`), the eli5 system prompt section is skipped. The forced scenarios and the skills still work; only the always-on plain-words guidance is lost.
