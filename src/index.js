#!/usr/bin/env node
/* istanbul ignore file */

const fs = require('fs')
const path = require('path')
const clipboardy = require('clipboardy')
const readPkg = require('read-pkg-up')
const {
  format,
  generateCode,
  pull,
  commitAndPush,
  validateUrl,
  validateUnique,
  addProtocolIfMissing,
} = require('./utils')

const {packageJson, path: pkgPath} = readPkg.sync({
  cwd: path.join(__dirname, '../..'),
})
const baseUrl =
  packageJson.baseUrl ||
  packageJson.homepage ||
  'https://update-homepage-in-your-package.json'

const repoRoot = path.dirname(pkgPath)
const redirectPath = path.join(repoRoot, '_redirects')

pull(repoRoot)

const [, , longLink, codeRaw] = process.argv

let code
if (codeRaw) {
  code = encodeURIComponent(codeRaw.startsWith('/') ? codeRaw.substring(1) : codeRaw)
}

const short = `/${code || generateCode()}`
const contents = fs.readFileSync(redirectPath, 'utf8')

let newContents = contents
let formattedLink = null
if (longLink) {
  formattedLink = addProtocolIfMissing(longLink)
  validateUrl(formattedLink)
  validateUnique(short, contents)
  newContents = `${short} ${formattedLink}\n${contents}`
}

fs.writeFileSync(redirectPath, format(newContents))
commitAndPush(short, formattedLink, repoRoot)

const link = `${baseUrl}${short}`
clipboardy.writeSync(link)

console.log(`${link} has been copied to your clipboard`)
