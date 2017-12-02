import path from 'path'
import cases from 'jest-in-case'
import filesCompare, { sync } from '..'

const here = p => path.join(__dirname, p)

const casesData = [
  {
    name: 'should return true when empty',
    files: [],
    equal: true
  },
  {
    name: 'should return true when all equal',
    files: [
      here('__fixtures__/one.txt'),
      here('__fixtures__/two.txt'),
      here('__fixtures__/three.txt')
    ],
    equal: true
  },
  {
    name: 'should return false when not all equal',
    files: [
      here('__fixtures__/one.txt'),
      here('__fixtures__/other.txt'),
      here('__fixtures__/three.txt')
    ],
    equal: false
  }
]

cases('filesCompare async', opts => {
  filesCompare(opts.files).then(equal => expect(equal).toBe(opts.equal))
}, casesData)

cases('filesCompare sync', opts => {
  expect(sync(opts.files)).toBe(opts.equal)
}, casesData)

describe('filesCompare async error', () => {
  it('should throw when file does not exist', () => {
    return expect(filesCompare([
      here('__fixtures__/one.txt'),
      here('__fixtures__/nonexistent.txt'),
      here('__fixtures__/three.txt')
    ])).rejects.toEqual(expect.anything())
  })
})

describe('filesCompare sync error', () => {
  it('should throw when file does not exist', () => {
    return expect(() => sync([
      here('__fixtures__/one.txt'),
      here('__fixtures__/nonexistent.txt'),
      here('__fixtures__/three.txt')
    ])).toThrow()
  })
})
