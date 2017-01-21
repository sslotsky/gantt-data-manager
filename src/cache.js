import { hashCode as encode } from 'hashcode'

export default function cache() {
  const memo = {}

  const getKey = (obj, meth, args) => encode().value({ obj, meth, args })

  const hasKey = (obj, meth, ...args) => !!memo[getKey(obj, meth, args)]

  const get = (obj, meth, ...args) => {
    const key = getKey(obj, meth, args)

    if (!memo[key]) {
      memo[key] = obj[meth].apply(obj, args)
    }

    return memo[key]
  }

  return { get, hasKey }
}
