import expect from 'expect'
import newTask from '../src/Task'

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
})
