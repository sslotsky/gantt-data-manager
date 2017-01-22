import expect from 'expect'
import assemble from '../src/assemble'

describe('assemble()', () => {
  const data = [{
    id: 1,
    size: 1,
    blockingIds: [2]
  }, {
    id: 2,
    size: 1,
    blockingIds: []
  }]

  const tasks = assemble(data)

  it('assigns blockers correctly', () => {
    const expected = data.map(d => d.blockingIds.length)
    const actual = tasks.map(t => t.blockers.count())
    expect(actual).toEqual(expected)
  })

  it('assigns size correctly', () => {
    const expected = data.map(d => d.size)
    const actual = tasks.map(t => t.size)
    expect(actual).toEqual(expected)
  })
})
