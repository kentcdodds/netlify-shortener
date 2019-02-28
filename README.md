<div align="center">
<h1>netlify-shortener</h1>

<p>Uses netlify's redirect functionality to make a personal URL shortener. Works
beautifully :)</p>

</div>

<hr />

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package] [![downloads][downloads-badge]][npmtrends]
[![MIT License][license-badge]][license]

[![All Contributors](https://img.shields.io/badge/all_contributors-7-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome][prs-badge]][prs] [![Code of Conduct][coc-badge]][coc]

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
  - [Fish](#fish)
  - [Windows (cmd)](#windows-cmd)
- [FAQ](#faq)
- [What about analytics?](#what-about-analytics)
- [Can I keep my links private?](#can-i-keep-my-links-private)
- [Inspiration](#inspiration)
- [Other Solutions](#other-solutions)
- [Contributors](#contributors)
- [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `devDependencies`:

```
npm install --save-dev netlify-shortener
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
You also need to add a `baseUrl` to your `package.json`:

```json
{
  "baseUrl": "https://jsair.io",
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
3. From your project directory, run the following to register the command globally:
   ```sh
   npm link
   ```

### Bash

Place this in your `~/.bash_profile` file:

```bash
shorten() { node {path-to-local-repo}/node_modules/.bin/netlify-shortener "$1" "$2"; }
```

### Fish

Place this in `~/.config/fish/funcitons/shorten.fish`:

```fish
function shorten --description "Shorten a URL"
  node {path-to-local-repo}/node_modules/.bin/netlify-shortener $argv
end
```

(Alternatively, run `funced -s shorten` and Fish will open your editor. Paste this code into the opened file.)

### Windows (cmd)

Using Cmder, add this to your `user-alias.cmd` file.

```cmd
shorten=cmd /c "cd /d {path-to-local-repo} && npm run shorten $1 $2"
```

## FAQ

## What about analytics?

I don't think Netlify will give you analytics, but you should be able to set up
CloudFlare in front of your domain and I think they'll give you analytics.

## Can I keep my links private?

Netlify doesn't charge for linking up private repositories (HOW COOL IS THAT!?)
so you can make your GitHub repo private and that should keep your links
private.

## Inspiration

URL shorteners for custom domains and custom short codes are insanely expensive.
Hiveam.com was the best price-wise, but the price went up and it's super
expensive as well.

So I
[tried writing a custom netlify function](https://www.youtube.com/watch?v=Xs-qvWqoi2U&list=PLV5CVI1eNcJgCrPH_e6d57KRUTiDZgs0u)
and it worked pretty well, but then I was tipped off by
[smart](https://twitter.com/CarlRosell/status/1070824678468567040)
[people](https://twitter.com/philhawksworth/status/1070826313173426176) that
using Netlify's built-in `_redirects` functionality would work well and it does!

So I built this tool to make it easier to do this for the two domains I need
this for and now you can use it too!

## Other Solutions

- [netlify-shortener-sh](https://github.com/caarlos0/netlify-shortener-sh): plain shell script version

If you know more alternatives, please [make a pull request][prs] and add it
here!

## Contributors

Thanks goes to these people ([emoji key][emojis]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars.githubusercontent.com/u/1500684?v=3" width="100px;" alt="Kent C. Dodds"/><br /><sub><b>Kent C. Dodds</b></sub>](https://kentcdodds.com)<br />[💻](https://github.com/kentcdodds/netlify-shortener/commits?author=kentcdodds "Code") [📖](https://github.com/kentcdodds/netlify-shortener/commits?author=kentcdodds "Documentation") [🚇](#infra-kentcdodds "Infrastructure (Hosting, Build-Tools, etc)") [⚠️](https://github.com/kentcdodds/netlify-shortener/commits?author=kentcdodds "Tests") | [<img src="https://avatars0.githubusercontent.com/u/2036823?v=4" width="100px;" alt="Carl Rosell"/><br /><sub><b>Carl Rosell</b></sub>](https://github.com/CarlRosell)<br />[🤔](#ideas-CarlRosell "Ideas, Planning, & Feedback") | [<img src="https://avatars3.githubusercontent.com/u/5865?v=4" width="100px;" alt="Phil Hawksworth"/><br /><sub><b>Phil Hawksworth</b></sub>](http://hawksworx.com)<br />[🤔](#ideas-philhawksworth "Ideas, Planning, & Feedback") | [<img src="https://avatars3.githubusercontent.com/u/2480667?v=4" width="100px;" alt="Matt Ferderer"/><br /><sub><b>Matt Ferderer</b></sub>](http://mattferderer.com)<br />[📖](https://github.com/kentcdodds/netlify-shortener/commits?author=mattferderer "Documentation") | [<img src="https://avatars2.githubusercontent.com/u/25517624?v=4" width="100px;" alt="Jed Fox"/><br /><sub><b>Jed Fox</b></sub>](https://j-f1.github.io)<br />[💡](#example-j-f1 "Examples") | [<img src="https://avatars3.githubusercontent.com/u/622118?v=4" width="100px;" alt="Eric McCormick"/><br /><sub><b>Eric McCormick</b></sub>](https://edm00se.codes/)<br />[📖](https://github.com/kentcdodds/netlify-shortener/commits?author=edm00se "Documentation") | [<img src="https://avatars3.githubusercontent.com/u/2006222?v=4" width="100px;" alt="Preston Lamb"/><br /><sub><b>Preston Lamb</b></sub>](http://www.prestonlamb.com)<br />[💻](https://github.com/kentcdodds/netlify-shortener/commits?author=pjlamb12 "Code") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][all-contributors] specification.
Contributions of any kind welcome!

## LICENSE

MIT

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[build-badge]: https://img.shields.io/travis/kentcdodds/netlify-shortener.svg?style=flat-square
[build]: https://travis-ci.org/kentcdodds/netlify-shortener
[coverage-badge]: https://img.shields.io/codecov/c/github/kentcdodds/netlify-shortener.svg?style=flat-square
[coverage]: https://codecov.io/github/kentcdodds/netlify-shortener
[version-badge]: https://img.shields.io/npm/v/netlify-shortener.svg?style=flat-square
[package]: https://www.npmjs.com/package/netlify-shortener
[downloads-badge]: https://img.shields.io/npm/dm/netlify-shortener.svg?style=flat-square
[npmtrends]: http://www.npmtrends.com/netlify-shortener
[license-badge]: https://img.shields.io/npm/l/netlify-shortener.svg?style=flat-square
[license]: https://github.com/kentcdodds/netlify-shortener/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[donate-badge]: https://img.shields.io/badge/$-support-green.svg?style=flat-square
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/kentcdodds/netlify-shortener/blob/master/other/CODE_OF_CONDUCT.md
[github-watch-badge]: https://img.shields.io/github/watchers/kentcdodds/netlify-shortener.svg?style=social
[github-watch]: https://github.com/kentcdodds/netlify-shortener/watchers
[github-star-badge]: https://img.shields.io/github/stars/kentcdodds/netlify-shortener.svg?style=social
[github-star]: https://github.com/kentcdodds/netlify-shortener/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20netlify-shortener%20by%20%40kentcdodds%20https%3A%2F%2Fgithub.com%2Fkentcdodds%2Fnetlify-shortener%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/kentcdodds/netlify-shortener.svg?style=social
[emojis]: https://github.com/kentcdodds/all-contributors#emoji-key
[all-contributors]: https://github.com/kentcdodds/all-contributors
[npm-bin]: https://docs.npmjs.com/files/package.json#bin
