# files-compare

Check contents of files or stdin to see if they're equal. Includes CLI.
Includes asynchronous and synchronous variants.

## async

```js
import filesCompare from 'files-compare'

filesCompare([]).then(equal => {
  console.log(equal) // true
})

filesCompare([
  '__fixtures__/one.txt',
  '__fixtures__/two.txt',
  '__fixtures__/three.txt'
]).then(equal => {
  console.log(equal) // true
})

filesCompare([
  '__fixtures__/one.txt',
  '__fixtures__/other.txt',
  '__fixtures__/three.txt'
]).then(equal => {
  console.log(equal) // false
})

filesCompare([
  '__fixtures__/one.txt',
  '__fixtures__/nonexistent.txt',
  '__fixtures__/three.txt'
]).catch(err => {
  console.error(err)
}
```

## sync

```js
import { sync as filesCompareSync } from 'files-compare'

filesCompareSync([]) // true

filesCompareSync([
  '__fixtures__/one.txt',
  '__fixtures__/two.txt',
  '__fixtures__/three.txt'
]) // true

filesCompareSync([
  '__fixtures__/one.txt',
  '__fixtures__/other.txt',
  '__fixtures__/three.txt'
]) // false

filesCompareSync([
  '__fixtures__/one.txt',
  '__fixtures__/nonexistent.txt',
  '__fixtures__/three.txt'
]) // throws error
```

## CLI

You can execute `files-compare` from the command line, passing it a space-separated list of files as arguments. To compare with stdin, you can use `-` in place of one of the file names.

Suppose we have files `one.txt`, `two.txt`, and `three.txt` with identical contents of:
```
this is same
```
and also a file `other.txt` with different contents of:
```
some other
```

```sh
files-compare ./one.txt ./two.txt ./three.txt
# exit 0

files-compare ./one.txt ./other.txt ./three.txt
# exit 1

echo "this is same" | files-compare - ./one.txt
# exit 0

echo "this is not same" | files-compare - ./one.txt
# exit 1
```
