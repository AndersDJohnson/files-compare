import 'babel-polyfill'
import { readFile, readFileSync } from 'fs'
import { promisify } from 'util'
import getStdin from 'get-stdin'
import { map } from 'p-iteration'
import arrayAllEqual from 'array-all-equal'

const readFileAsync = promisify(readFile)

const readFilesOrStdIn = async files => map(files, file =>
  file === '-' ? getStdin() : readFileAsync(file, 'utf8')
)

const filesCompare = async files =>
  arrayAllEqual(await readFilesOrStdIn(files))

const sync = files =>
  arrayAllEqual(files.map(file => readFileSync(file, 'utf8')))

export { sync }

export default filesCompare
