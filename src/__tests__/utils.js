const {spawnSync} = require('child_process')
const {
  format,
  validateUnique,
  validateUrl,
  generateCode,
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
  expect(() => validateUrl('blah')).toThrowErrorMatchingInlineSnapshot(
    `"Invalid URL: blah"`,
  )
})

test('generates a random code', () => {
  expect(generateCode()).toHaveLength(5)
})

test('commits and pushes', () => {
  jest.spyOn(console, 'log').mockImplementation(() => {})

  commitAndPush('/foo', 'https://foo.com')
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
      "stdio": "inherit",
    },
  ],
  Array [
    "git",
    Array [
      "push",
    ],
    Object {
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
      "stdio": "inherit",
    },
  ],
  Array [
    "git",
    Array [
      "push",
    ],
    Object {
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
