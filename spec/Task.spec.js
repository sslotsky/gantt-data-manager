import expect from 'expect'
import makeCache from '../src/cache'
import newTask, { resetCache } from '../src/Task'

describe('Task', () => {
  const task = newTask(
    1,
    newTask(2),
    newTask(3),
    newTask(
      2,
      newTask(2)
    )
  )

  describe('waitTime()', () => {
    it('is calculate from the tree of blockers', () => {
      expect(task.waitTime()).toEqual(5)
    })
  })

  describe('caching', () => {
    const cache = makeCache()
    resetCache(cache)

    it('caches the maxBlockTime', () => {
      const waitTime = task.waitTime()
      const expectedTime = task.size + cache.get(task, 'maxBlockTime')
      expect(waitTime).toEqual(expectedTime);
    })
  })
})
