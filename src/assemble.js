import newTask from './Task';

const getSize = t => t.size
const getIdentifier = t => t.id
const getBlockingIds = t => t.blockingIds

const defaults = { getSize, getIdentifier, getBlockingIds }

export default function assemble(tasks, overrides = {}) {
  const settings = { ...defaults, ...overrides }

  const taskMap = tasks.reduce((map, t) => ({
    ...map,
    [settings.getIdentifier(t)]: newTask(settings.getSize(t))
  }), {})

  tasks.forEach(t => {
    const blockers = settings.getBlockingIds(t).map(id => taskMap[id])
    taskMap[settings.getIdentifier(t)].addBlockers(blockers)
  })

  return tasks.map(t => taskMap[settings.getIdentifier(t)])
}
