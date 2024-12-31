import { describe, it, test } from '@jest/globals'

type TestCallback = () => void | Promise<void>

export function conditionalDescribe(
  condition: boolean,
  label: string,
  callback: TestCallback
) {
  return condition ? describe(label, callback) : describe.skip(label, callback)
}

export function conditionalIt(
  condition: boolean,
  label: string,
  callback: TestCallback
) {
  return condition ? it(label, callback) : it.skip(label, callback)
}

export function conditionalTest(
  condition: boolean,
  label: string,
  callback: TestCallback
) {
  return condition ? test(label, callback) : test.skip(label, callback)
}
