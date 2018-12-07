#!/usr/bin/env node
/* istanbul ignore file */

const fs = require('fs')
const path = require('path')
const clipboardy = require('clipboardy')
const readPkg = require('read-pkg-up')
const {
  format,
  generateCode,
  commitAndPush,
  validateUrl,
  validateUnique,
} = require('./utils')

const {
  pkg: {baseUrl = 'https://update-baseUrl-in-your-package.json'},
  path: pkgPath,
} = readPkg.sync()

const redirectPath = path.join(path.dirname(pkgPath), '_redirects')

const [, , longLink, code] = process.argv
const short = `/${code || generateCode()}`
const contents = fs.readFileSync(redirectPath, 'utf8')

let newContents = contents
if (longLink) {
  validateUrl(longLink)
  validateUnique(short, contents)
  newContents = `${short} ${longLink}\n${contents}`
}

fs.writeFileSync(redirectPath, format(newContents))

commitAndPush(short, longLink)

const link = `${baseUrl}${short}`
clipboardy.writeSync(link)

console.log(`${link} has been copied to your clipboard`)
