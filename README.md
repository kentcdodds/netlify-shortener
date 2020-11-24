<div align="center">
<h1>netlify-shortener</h1>

<p>Uses netlify's redirect functionality to make a personal URL shortener. Works beautifully :)</p>
</div>

---

<!-- prettier-ignore-start -->
[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package]
[![downloads][downloads-badge]][npmtrends]
[![MIT License][license-badge]][license]
[![All Contributors][all-contributors-badge]](#contributors-)
[![PRs Welcome][prs-badge]][prs]
[![Code of Conduct][coc-badge]][coc]
<!-- prettier-ignore-end -->

## The problem

You want a URL shortener for your custom domain and you want an easy way to
create and update URLs but you don't want to pay hundreds of dollars a year.

## This solution

This relies on [Netlify's](https://www.netlify.com)
[`_redirects`](https://www.netlify.com/docs/redirects/) file for building a
super simple URL shortener where the URLs are managed on GitHub and Netlify
handles the redirecting for you.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)
- [Shell Function](#shell-function)
  - [Shell Agnostic](#shell-agnostic)
  - [Bash](#bash)
- [Inspiration](#inspiration)
- [Other Solutions](#other-solutions)
- [Issues](#issues)
  - [🐛 Bugs](#-bugs)
  - [💡 Feature Requests](#-feature-requests)
- [Contributors ✨](#contributors-)
- [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `dependencies`:

```
npm install --save netlify-shortener
```

## Usage

- [Watch a demo](https://www.youtube.com/watch?v=HL6paXyx6hM&list=PLV5CVI1eNcJgCrPH_e6d57KRUTiDZgs0u)
- [View the example repo](https://github.com/kentcdodds/netlify-shortener-example)

Your project should have a `_redirects` file that looks like this:

```
/example http://example.com

# fallback
/*       https://your-website.com
```

This module exposes a binary that you should use in your `package.json` scripts.
You also need to add a `homepage` to your `package.json`:

```json
{
  "homepage": "https://jsair.io",
  "scripts": {
    "shorten": "netlify-shortener"
  }
}
```

Then you can run:

```
npm run shorten # simply formats your _redirects file
npm run shorten https://yahoo.com # generates a short code and adds it for you
npm run shorten https://github.com gh # adds gh as a short URL for you
```

The `netlify-shortener` does a few things:

1. generates a short code if one is not provided
2. validates your URL is a real URL
3. adds the URL to the top of `_redirects`
4. runs a git commit and push (this will trigger netlify to deploy your new
   redirect)
5. Copies the short URL to your clipboard

Netlify's deploys are normally fast enough that the new URL should be deployed
by the time you've shared it to someone.

<a name="bash-function"></a>

## Shell Function

If you want to be able to run this anywhere in the terminal, you can try making
a custom function for your shell.

### Shell Agnostic

1. Add the following [executable definition][npm-bin] to your `package.json`:
   ```json
   {"bin": {"shorten": "cli.js"}}
   ```
2. Create the `cli.js` file:
   ```js
   #!/usr/bin/env node
   require('netlify-shortener')
   ```
3. From your project directory, run the following to register the command
   globally:
   ```sh
   npm link
   ```

### Bash

## Inspiration

URL shorteners for custom domains and custom short codes are insanely expensive.
Hiveam.com was the best price-wise, but the price went up and it's super
expensive as well.

## Other Solutions

- [netlify-shortener-sh](https://github.com/caarlos0/netlify-shortener-sh):
  plain shell script version

If you know more alternatives, please [make a pull request][prs] and add it
here!

## Issues

_Looking to contribute? Look for the [Good First Issue][good-first-issue]
label._

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

[**See Bugs**][bugs]

### 💡 Feature Requests

Please file an issue to suggest new features. Vote on feature requests by adding
a 👍. This helps maintainers prioritize what to work on.

[**See Feature Requests**][requests]

## Contributors ✨

Thanks goes to these people ([emoji key][emojis]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://kentcdodds.com"><img src="https://avatars.githubusercontent.com/u/1500684?v=3" width="100px;" alt=""/><br /><sub><b>Kent C. Dodds</b></sub></a><br /><a href="https://github.com/kentcdodds/netlify-shortener/commits?author=kentcdodds" title="Code">💻</a> <a href="https://github.com/kentcdodds/netlify-shortener/commits?author=kentcdodds" title="Documentation">📖</a> <a href="#infra-kentcdodds" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/kentcdodds/netlify-shortener/commits?author=kentcdodds" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/CarlRosell"><img src="https://avatars0.githubusercontent.com/u/2036823?v=4" width="100px;" alt=""/><br /><sub><b>Carl Rosell</b></sub></a><br /><a href="#ideas-CarlRosell" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://hawksworx.com"><img src="https://avatars3.githubusercontent.com/u/5865?v=4" width="100px;" alt=""/><br /><sub><b>Phil Hawksworth</b></sub></a><br /><a href="#ideas-philhawksworth" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://mattferderer.com"><img src="https://avatars3.githubusercontent.com/u/2480667?v=4" width="100px;" alt=""/><br /><sub><b>Matt Ferderer</b></sub></a><br /><a href="https://github.com/kentcdodds/netlify-shortener/commits?author=mattferderer" title="Documentation">📖</a></td>
    <td align="center"><a href="https://j-f1.github.io"><img src="https://avatars2.githubusercontent.com/u/25517624?v=4" width="100px;" alt=""/><br /><sub><b>Jed Fox</b></sub></a><br /><a href="#example-j-f1" title="Examples">💡</a></td>
    <td align="center"><a href="https://edm00se.codes/"><img src="https://avatars3.githubusercontent.com/u/622118?v=4" width="100px;" alt=""/><br /><sub><b>Eric McCormick</b></sub></a><br /><a href="https://github.com/kentcdodds/netlify-shortener/commits?author=edm00se" title="Documentation">📖</a></td>
    <td align="center"><a href="http://www.prestonlamb.com"><img src="https://avatars3.githubusercontent.com/u/2006222?v=4" width="100px;" alt=""/><br /><sub><b>Preston Lamb</b></sub></a><br /><a href="https://github.com/kentcdodds/netlify-shortener/commits?author=pjlamb12" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://ddbeck.com/"><img src="https://avatars2.githubusercontent.com/u/64103?v=4" width="100px;" alt=""/><br /><sub><b>Daniel D. Beck</b></sub></a><br /><a href="https://github.com/kentcdodds/netlify-shortener/commits?author=ddbeck" title="Documentation">📖</a></td>
    <td align="center"><a href="https://stackshare.io/jdorfman/decisions"><img src="https://avatars1.githubusercontent.com/u/398230?v=4" width="100px;" alt=""/><br /><sub><b>Justin Dorfman</b></sub></a><br /><a href="#fundingFinding-jdorfman" title="Funding Finding">🔍</a></td>
    <td align="center"><a href="http://jarv.is"><img src="https://avatars3.githubusercontent.com/u/1703673?v=4" width="100px;" alt=""/><br /><sub><b>Jake Jarvis</b></sub></a><br /><a href="https://github.com/kentcdodds/netlify-shortener/commits?author=jakejarvis" title="Code">💻</a></td>
    <td align="center"><a href="https://michaeldeboey.be"><img src="https://avatars3.githubusercontent.com/u/6643991?v=4" width="100px;" alt=""/><br /><sub><b>Michaël De Boey</b></sub></a><br /><a href="https://github.com/kentcdodds/netlify-shortener/commits?author=MichaelDeBoey" title="Code">💻</a></td>
    <td align="center"><a href="https://oisin.io"><img src="https://avatars0.githubusercontent.com/u/5693967?v=4" width="100px;" alt=""/><br /><sub><b>Oisín Quinn</b></sub></a><br /><a href="https://github.com/kentcdodds/netlify-shortener/commits?author=oisinq" title="Code">💻</a> <a href="https://github.com/kentcdodds/netlify-shortener/commits?author=oisinq" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/SebJones"><img src="https://avatars3.githubusercontent.com/u/13268343?v=4" width="100px;" alt=""/><br /><sub><b>SebJones</b></sub></a><br /><a href="https://github.com/kentcdodds/netlify-shortener/commits?author=SebJones" title="Code">💻</a></td>
    <td align="center"><a href="http://gabinaureche.com"><img src="https://avatars1.githubusercontent.com/u/2291025?v=4" width="100px;" alt=""/><br /><sub><b>Gabin Aureche</b></sub></a><br /><a href="https://github.com/kentcdodds/netlify-shortener/commits?author=Zhouzi" title="Code">💻</a> <a href="https://github.com/kentcdodds/netlify-shortener/commits?author=Zhouzi" title="Tests">⚠️</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://twitter.com/nat0n"><img src="https://avatars3.githubusercontent.com/u/444538?v=4" width="100px;" alt=""/><br /><sub><b>Anton Andreasson</b></sub></a><br /><a href="https://github.com/kentcdodds/netlify-shortener/commits?author=naton" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][all-contributors] specification.
Contributions of any kind welcome!

## LICENSE

MIT

<!-- prettier-ignore-start -->
[npm]: https://www.npmjs.com
[node]: https://nodejs.org
[build-badge]: https://img.shields.io/github/workflow/status/kentcdodds/netlify-shortener/validate?logo=github&style=flat-square
[build]: https://github.com/kentcdodds/netlify-shortener/actions?query=workflow%3Avalidate
[coverage-badge]: https://img.shields.io/codecov/c/github/kentcdodds/netlify-shortener.svg?style=flat-square
[coverage]: https://codecov.io/github/kentcdodds/netlify-shortener
[version-badge]: https://img.shields.io/npm/v/netlify-shortener.svg?style=flat-square
[package]: https://www.npmjs.com/package/netlify-shortener
[downloads-badge]: https://img.shields.io/npm/dm/netlify-shortener.svg?style=flat-square
[npmtrends]: http://www.npmtrends.com/netlify-shortener
[license-badge]: https://img.shields.io/npm/l/netlify-shortener.svg?style=flat-square
[license]: https://github.com/kentcdodds/netlify-shortener/blob/main/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/kentcdodds/netlify-shortener/blob/main/CODE_OF_CONDUCT.md
[emojis]: https://github.com/all-contributors/all-contributors#emoji-key
[all-contributors]: https://github.com/all-contributors/all-contributors
[all-contributors-badge]: https://img.shields.io/github/all-contributors/kentcdodds/netlify-shortener?color=orange&style=flat-square
[bugs]: https://github.com/kentcdodds/netlify-shortener/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+sort%3Acreated-desc+label%3Abug
[requests]: https://github.com/kentcdodds/netlify-shortener/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc+label%3Aenhancement
[good-first-issue]: https://github.com/kentcdodds/netlify-shortener/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc+label%3Aenhancement+label%3A%22good+first+issue%22

[npm-bin]: https://docs.npmjs.com/files/package.json#bin
<!-- prettier-ignore-end -->
