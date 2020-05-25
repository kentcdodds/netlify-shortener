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

const {
  packageJson: {baseUrl = 'https://update-baseUrl-in-your-package.json'},
  path: pkgPath,
} = readPkg.sync({cwd: path.join(__dirname, '../..')})

const repoRoot = path.dirname(pkgPath)
const redirectPath = path.join(repoRoot, '_redirects')

pull(repoRoot)

const [, , longLink, codeRaw] = process.argv

let code
if (codeRaw) {
  code = codeRaw.startsWith('/') ? codeRaw.substring(1) : codeRaw
}

const short = `/${code || generateCode()}`
const contents = fs.readFileSync(redirectPath, 'utf8')

const formattedLink = addProtocolIfMissing(longLink)

let newContents = contents
if (formattedLink) {
  validateUrl(formattedLink)
  validateUnique(short, contents)
  newContents = `${short} ${formattedLink}\n${contents}`
}

fs.writeFileSync(redirectPath, format(newContents))
commitAndPush(short, formattedLink, repoRoot)

const link = `${baseUrl}${short}`
clipboardy.writeSync(link)

console.log(`${link} has been copied to your clipboard`)
