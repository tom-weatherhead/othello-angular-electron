# othello-angular-electron
An Othello (Reversi) proof-of-concept application built on Angular, Docker, and Electron

Obligatory BadgeFest:

[![chrome][chrome-badge-image]][chrome-url]
[![codeclimate][codeclimate-badge-image]][codeclimate-url]
[![git][git-badge-image]][git-url]
[![github][github-badge-image]][github-url]
[![travis][travis-badge-image]][travis-url]
[![typescript][typescript-badge-image]][typescript-url]

[![status][status-badge-image]][status-url]
[![build status][build-status-badge-image]][build-status-url]
[![watchers][watchers-badge-image]][watchers-url]
[![stars][stars-badge-image]][stars-url]
[![issues][issues-badge-image]][issues-url]
[![forks][forks-badge-image]][forks-url]
[![contributors][contributors-badge-image]][contributors-url]
[![branches][branches-badge-image]][branches-url]
[![commits][commits-badge-image]][commits-url]
[![last commit][last-commit-badge-image]][last-commit-url]
[![known vulnerabilities][known-vulnerabilities-badge-image]][known-vulnerabilities-url]
[![lines of code][lines-of-code-badge-image]][lines-of-code-url]
[![technical debt][technical-debt-badge-image]][technical-debt-url]
[![maintainability][maintainability-badge-image]][maintainability-url]
[![test coverage][test-coverage-badge-image]][test-coverage-url]
[![code style: prettier][prettier-badge-image]][prettier-url]
[![license][license-badge-image]][license-url]

Features:

- The application is built on the latest version of [Angular](https://angular.io/)
- The application code can be [linted](https://en.wikipedia.org/wiki/Lint_(software)) (statically analyzed) by [TSLint](https://palantir.github.io/tslint/) before it is built
- [System tests](https://en.wikipedia.org/wiki/System_testing) (e2e (end-to-end) tests) and [unit tests](https://en.wikipedia.org/wiki/Unit_testing) are enabled
- [Code coverage](https://en.wikipedia.org/wiki/Code_coverage) is measured and reported
- The application uses [Bootstrap](https://getbootstrap.com/) for some UI features within the Angular Web app
- [SASS](https://sass-lang.com/) stylesheets are supported via [node-sass](https://github.com/sass/node-sass)
- The application can be served as a Web app (e.g. via 'ng serve')
- The application can run as a desktop application via [Electron](https://electronjs.org/)
- The Electron desktop application can run within a [Docker](https://www.docker.com/) container
- The application uses [PulseAudio](https://www.freedesktop.org/wiki/Software/PulseAudio/) for audio when running within a Docker container
- [Travis CI](https://travis-ci.org/) is used for [continuous integration](https://en.wikipedia.org/wiki/Continuous_integration)
- [Code Climate](https://codeclimate.com/) is used to measure maintainability and to report code coverage
- [Snyk](https://snyk.io/) is used to detect known vulnerabilities

To build, test, and run the project as an Electron desktop application:

```sh
$ npm run all
```

Then, to run the project as a Web application available at [http://localhost:4200/](http://localhost:4200/)

```sh
$ npm run serve
```

## License
[MIT](https://choosealicense.com/licenses/mit/)

[chrome-badge-image]: https://badgen.net/badge/icon/chrome?icon=chrome&label
[chrome-url]: https://google.com
[codeclimate-badge-image]: https://badgen.net/badge/icon/codeclimate?icon=codeclimate&label
[codeclimate-url]: https://codeclimate.com
[git-badge-image]: https://badgen.net/badge/icon/git?icon=git&label
[git-url]: https://git-scm.com
[github-badge-image]: https://badgen.net/badge/icon/github?icon=github&label
[github-url]: https://github.com
[travis-badge-image]: https://badgen.net/badge/icon/travis?icon=travis&label
[travis-url]: https://travis-ci.com
[typescript-badge-image]: https://badgen.net/badge/icon/typescript?icon=typescript&label
[typescript-url]: https://www.typescriptlang.org

[status-badge-image]: https://badgen.net/github/status/tom-weatherhead/othello-angular-electron
[status-url]: https://badgen.net/github/status/tom-weatherhead/othello-angular-electron
[build-status-badge-image]: https://secure.travis-ci.org/tom-weatherhead/othello-angular-electron.svg
[build-status-url]: https://travis-ci.org/tom-weatherhead/othello-angular-electron
[watchers-badge-image]: https://badgen.net/github/watchers/tom-weatherhead/othello-angular-electron
[watchers-url]: https://github.com/tom-weatherhead/othello-angular-electron/watchers
[stars-badge-image]: https://badgen.net/github/stars/tom-weatherhead/othello-angular-electron
[stars-url]: https://github.com/tom-weatherhead/othello-angular-electron/stargazers
[issues-badge-image]: https://badgen.net/github/issues/tom-weatherhead/othello-angular-electron
[issues-url]: https://github.com/tom-weatherhead/othello-angular-electron/issues
[forks-badge-image]: https://badgen.net/github/forks/tom-weatherhead/othello-angular-electron
[forks-url]: https://github.com/tom-weatherhead/othello-angular-electron/network/members
[contributors-badge-image]: https://badgen.net/github/contributors/tom-weatherhead/othello-angular-electron
[contributors-url]: https://github.com/tom-weatherhead/othello-angular-electron/graphs/contributors
[branches-badge-image]: https://badgen.net/github/branches/tom-weatherhead/othello-angular-electron
[branches-url]: https://github.com/tom-weatherhead/othello-angular-electron/branches
[commits-badge-image]: https://badgen.net/github/commits/tom-weatherhead/othello-angular-electron
[commits-url]: https://github.com/tom-weatherhead/othello-angular-electron/commits/master
[last-commit-badge-image]: https://badgen.net/github/last-commit/tom-weatherhead/othello-angular-electron
[last-commit-url]: https://github.com/tom-weatherhead/othello-angular-electron
[known-vulnerabilities-badge-image]: https://snyk.io/test/github/tom-weatherhead/othello-angular-electron/badge.svg?targetFile=package.json&package-lock.json
[known-vulnerabilities-url]: https://snyk.io/test/github/tom-weatherhead/othello-angular-electron?targetFile=package.json&package-lock.json
[lines-of-code-badge-image]: https://badgen.net/codeclimate/loc/tom-weatherhead/othello-angular-electron
[lines-of-code-url]: https://badgen.net/codeclimate/loc/tom-weatherhead/othello-angular-electron
[technical-debt-badge-image]: https://badgen.net/codeclimate/tech-debt/tom-weatherhead/othello-angular-electron
[technical-debt-url]: https://badgen.net/codeclimate/tech-debt/tom-weatherhead/othello-angular-electron
[maintainability-badge-image]: https://api.codeclimate.com/v1/badges/067c83f4f476431aa46b/maintainability
[maintainability-url]: https://codeclimate.com/github/tom-weatherhead/othello-angular-electron/maintainability
[test-coverage-badge-image]: https://api.codeclimate.com/v1/badges/067c83f4f476431aa46b/test_coverage
[test-coverage-url]: https://codeclimate.com/github/tom-weatherhead/othello-angular-electron/test_coverage
[prettier-badge-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[prettier-url]: https://github.com/prettier/prettier
[license-badge-image]: https://img.shields.io/github/license/mashape/apistatus.svg
[license-url]: https://github.com/tom-weatherhead/othello-angular-electron/blob/master/LICENSE
