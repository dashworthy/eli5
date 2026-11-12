import type { Register } from 'claude-code'

// Scenarios forced before a tool runs. The first call of the tool in a turn
// is sent back once with a nudge; Claude either draws the board or, if the
// scenario does not apply, calls the tool again and it goes through.
// Add a line here to force another scenario at another tool.
const GATES: Record<string, { scenario: string; when: string }> = {
  AskUserQuestion: {
    scenario: 'decision',
    when: 'asks the user to choose between technical approaches',
  },
  ExitPlanMode: {
    scenario: 'plan',
    when: 'is a multi-step technical plan',
  },
}

// A call that already carries a board link has been drawn.
const BOARD_LINK = /claude\.ai\/(code\/)?artifact\//

const STYLE = [
  '# Explaining technical work (eli5 plugin)',
  '',
  'The user often is not deep in the code and cannot act on a short technical blurb.',
  '- Plain words first. Use a technical term only when the user will meet it again, and define it in 5 to 10 words the first time.',
  '- Say what something means for the people who use the system before how it works inside.',
  '- Use a real example (this order, this field) over a general rule.',
  "- When the user would otherwise have to read code to follow you, use the matching `eli5:*` skill: each is a scenario template that draws a claude.ai Whiteboard. Their descriptions say when each applies. Small, simple answers stay in chat.",
].join('\n')

const nudge = (tool: string, gate: { scenario: string; when: string }) =>
  [
    `eli5: hold this ${tool} call.`,
    'The user cannot answer or approve technical work from a short blurb.',
    `If this ${gate.when}, first run the \`eli5:${gate.scenario}\` skill,`,
    "then call the tool again with the board's claude.ai link included.",
    `If not, call ${tool} again unchanged and it will go through.`,
  ].join(' ')

const nudged = new Set<string>()

export const register: Register = on => {
  on('turn.start', ($, e, next) => {
    if (e.agentId === undefined) nudged.clear()
    return next(e)
  })

  on('prompt.compose', async ($, e, next) => {
    const { sections } = await next(e)
    return { sections: [...sections, { id: 'eli5:style', text: STYLE, scope: 'session' as const }] }
  })

  on('tool.call', ($, e, next) => {
    const gate = GATES[String(e.tool)]
    if (gate === undefined || nudged.has(String(e.tool))) return next(e)
    if (BOARD_LINK.test(JSON.stringify(e))) return next(e)

    nudged.add(String(e.tool))
    return { deny: nudge(String(e.tool), gate) }
    // If this guard ever fails, let the call through rather than block it.
  }).catch(($, e, next) => next(e))
}
