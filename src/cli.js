#!/usr/bin/env node

import filesCompare from '.'

const files = process.argv.slice(2)

filesCompare(files)
  .then(res => {
    process.exit(res ? 0 : 1)
  })
