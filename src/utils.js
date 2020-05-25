const {URL} = require('url')
const {spawnSync} = require('child_process')

function format(contents) {
  const links = parseLinks(contents)

  const longestLength = links.reduce((length, [short]) => {
    if (short.startsWith('/') && short.length > length) {
      return short.length
    }
    return length
  }, 0)

  const formattedLinks = links.map(([short, long]) => {
    if (short.startsWith('/')) {
      return `${short.padEnd(longestLength, ' ')}   ${long}`
    } else {
      return `${short}${long}`
    }
  })

  return formattedLinks.join('\n')
}

function parseLinks(contents) {
  return contents.split('\n').map(r => {
    if (!r.trim()) {
      return ['', '']
    }
    const [, short, long] = r.trim().match(/^(.*)\s+(.*)$/) || [r, r.trim(), '']
    return [short.trim(), long.trim()]
  })
}

function validateUnique(short, contents) {
  const links = parseLinks(contents)
  const [, existingLink] = links.find(([s]) => s === short) || []
  if (existingLink) {
    throw new Error(
      `A link with this code already exists. It points to ${existingLink}`,
    )
  }
}

function pull(cwd) {
  console.log('pulling the latest changes')
  spawnSync('git', ['pull'], {stdio: 'inherit', cwd})
}

function commitAndPush(short, longLink, cwd) {
  const message = longLink ? `${short} -> ${longLink}` : 'format links'
  console.log(`committing: ${message}`)
  spawnSync('git', ['commit', '-am', message], {
    stdio: 'inherit',
    cwd,
  })
  console.log('pushing')
  spawnSync('git', ['push'], {stdio: 'inherit', cwd})
}

function validateUrl(url) {
  // eslint-disable-next-line no-new
  new URL(url)
}

function addProtocolIfMissing(url) {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  } else {
    return `https://${url}`
  }
}

function generateCode() {
  let text = ''
  const possible = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789'

  for (let i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}

module.exports = {
  format,
  generateCode,
  pull,
  commitAndPush,
  validateUrl,
  validateUnique,
  addProtocolIfMissing,
}
