const {spawnSync} = require('child_process')
const {
  format,
  validateUnique,
  validateUrl,
  addProtocolIfMissing,
  generateCode,
  pull,
  commitAndPush,
} = require('../utils')

jest.mock('child_process', () => ({spawnSync: jest.fn()}))

afterEach(() => {
  spawnSync.mockClear()
})

test('format formats the redirects links', () => {
  expect(
    format(`
# comment 1

/foo https://foo.com
#comment2


/* http://google.com
  `),
  ).toMatchInlineSnapshot(`
"
# comment1

/foo   https://foo.com
#comment2


/*     http://google.com
"
`)
})

test('validates links are unique', () => {
  expect(() => validateUnique('/foo', `/bar https://bar.com`)).not.toThrow()
  expect(() =>
    validateUnique('/foo', `/foo https://foo.com`),
  ).toThrowErrorMatchingInlineSnapshot(
    `"A link with this code already exists. It points to https://foo.com"`,
  )
})

test('validates url is valid', () => {
  expect(() => validateUrl('https://blah.com')).not.toThrow()
  expect(() => validateUrl('blah')).toThrow()
  const urlError1 = 'Invalid URL'
  const urlError2 = 'Invalid URL: blah'
  const errorMessages = new RegExp(`${urlError1}|${urlError2}`)
  expect(() => validateUrl('blah')).toThrow(errorMessages)
})

test('adds https:// to url if protocol is missing', () => {
  expect(addProtocolIfMissing('https://blah.com')).toEqual('https://blah.com')
  expect(addProtocolIfMissing('http://blah.com')).toEqual('http://blah.com')
  expect(addProtocolIfMissing('blah.com')).toEqual('https://blah.com')
})

test('generates a random code', () => {
  expect(generateCode()).toHaveLength(5)
})

test('pulls', () => {
  jest.spyOn(console, 'log').mockImplementation(() => {})

  pull('/my/cwd')
  expect(spawnSync.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    "git",
    Array [
      "pull",
    ],
    Object {
      "cwd": "/my/cwd",
      "stdio": "inherit",
    },
  ],
]
`)
  console.log.mockRestore()
})

test('commits and pushes', () => {
  jest.spyOn(console, 'log').mockImplementation(() => {})

  commitAndPush('/foo', 'https://foo.com', '/my/cwd')
  expect(spawnSync.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    "git",
    Array [
      "commit",
      "-am",
      "/foo -> https://foo.com",
    ],
    Object {
      "cwd": "/my/cwd",
      "stdio": "inherit",
    },
  ],
  Array [
    "git",
    Array [
      "push",
    ],
    Object {
      "cwd": "/my/cwd",
      "stdio": "inherit",
    },
  ],
]
`)
  expect(console.log.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    "committing: /foo -> https://foo.com",
  ],
  Array [
    "pushing",
  ],
]
`)
  console.log.mockRestore()
})

test('commits and pushes a format', () => {
  jest.spyOn(console, 'log').mockImplementation(() => {})

  commitAndPush('/foo')
  expect(spawnSync.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    "git",
    Array [
      "commit",
      "-am",
      "format links",
    ],
    Object {
      "cwd": undefined,
      "stdio": "inherit",
    },
  ],
  Array [
    "git",
    Array [
      "push",
    ],
    Object {
      "cwd": undefined,
      "stdio": "inherit",
    },
  ],
]
`)
  expect(console.log.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    "committing: format links",
  ],
  Array [
    "pushing",
  ],
]
`)
  console.log.mockRestore()
})
