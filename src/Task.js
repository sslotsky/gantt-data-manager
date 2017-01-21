import { List } from 'immutable'

export class Task {
  constructor(size, ...blockers) {
    this.size = size
    this.blockers = List(blockers)
  }

  waitTime() {
    if (this.blockers.isEmpty()) {
      return this.size
    }

    return this.size + this.maxBlockTime()
  }

  maxBlockTime() {
    return Math.max(...this.blockers.map(t => t.waitTime()))
  }
}

export default function(size, ...blockers) {
  return new Task(size, ...blockers)
}
