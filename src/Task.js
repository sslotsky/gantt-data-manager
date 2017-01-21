import { List } from 'immutable'
import makeCache from './cache'

let cache = makeCache()

export function resetCache(newCache = makeCache()) {
  cache = newCache
}

export class Task {
  constructor(size, ...blockers) {
    this.size = size
    this.blockers = List(blockers)
  }

  waitTime() {
    if (this.blockers.isEmpty()) {
      return this.size
    }

    return this.size + cache.get(this, 'maxBlockTime')
  }

  maxBlockTime() {
    return Math.max(...this.blockers.map(t => t.waitTime()))
  }
}

export default function(size, ...blockers) {
  return new Task(size, ...blockers)
}
