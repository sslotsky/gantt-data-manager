import { hashCode as encode } from 'hashcode'

export default function cache() {
  const memo = {}

  const get = (obj, meth, ...args) => {
    const key = encode().value({ obj, meth, args })
    if (!memo[key]) {
      memo[key] = obj[meth].apply(obj, args)
    }

    return memo[key]
  }

  return { get }
}
