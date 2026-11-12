import { expect, test } from 'claude-code/testing'

const ask = (question: string) => ({
  tool: 'AskUserQuestion' as const,
  questions: [{
    question,
    header: 'Approach',
    multiSelect: false,
    options: [
      { label: 'Queue it', description: 'Send through the message queue' },
      { label: 'Do it inline', description: 'Run during the request' },
    ],
  }],
})

const engine = (on: any) => {
  on('turn.start', (_: unknown, e: { turnId: string }) => ({ turnId: e.turnId }))
  on('tool.call', () => ({ result: { ok: true } }))
}

test('a question is sent back once per turn, then goes through', async ($, on) => {
  engine(on)
  await $.turn.start({ text: 'hi', turnId: 't1' })
  expect((await $.tool.call(ask('Which approach?'))).deny).toContain('eli5:decision')
  expect((await $.tool.call(ask('Which approach?'))).deny).toBeUndefined()

  await $.turn.start({ text: 'next', turnId: 't2' })
  expect((await $.tool.call(ask('Which approach?'))).deny).toContain('eli5:decision')
})

test('a question with a board link goes straight through', async ($, on) => {
  engine(on)
  await $.turn.start({ text: 'hi', turnId: 't1' })
  const ran = await $.tool.call(ask('See https://claude.ai/artifact/abc123 - which approach?'))
  expect(ran.deny).toBeUndefined()
})

test('plan approval is sent back once, separately from questions', async ($, on) => {
  engine(on)
  await $.turn.start({ text: 'hi', turnId: 't1' })
  expect((await $.tool.call(ask('Which approach?'))).deny).toContain('eli5:decision')
  expect((await $.tool.call({ tool: 'ExitPlanMode' })).deny).toContain('eli5:plan')
  expect((await $.tool.call({ tool: 'ExitPlanMode' })).deny).toBeUndefined()
})

test('other tools are untouched', async ($, on) => {
  engine(on)
  await $.turn.start({ text: 'hi', turnId: 't1' })
  expect((await $.tool.call({ tool: 'Bash', command: 'ls' })).deny).toBeUndefined()
})

test('the system prompt gains the eli5 section', async ($, on) => {
  on('prompt.compose', () => ({ sections: [{ id: 'intro', text: 'x', scope: 'shared' }] }))
  const { sections } = await $.prompt.compose({ model: 'm', promptModel: 'm', surfaces: [], tools: [], outputStyle: null, traits: [] })
  expect(sections.map(s => s.id)).toEqual(['intro', 'eli5:style'])
})
