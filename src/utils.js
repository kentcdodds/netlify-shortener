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

function commitAndPush(short, longLink) {
  console.log(`committing: ${short} -> ${longLink}`)
  spawnSync('git', ['commit', '-am', `${short} -> ${longLink}`], {
    stdio: 'inherit',
  })
  console.log('pushing')
  spawnSync('git', ['push'], {stdio: 'inherit'})
}

function validateUrl(url) {
  // eslint-disable-next-line no-new
  new URL(url)
}

function generateCode() {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}

module.exports = {
  format,
  generateCode,
  commitAndPush,
  validateUrl,
  validateUnique,
}
