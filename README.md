# othello-angular-electron
An Othello (Reversi) proof-of-concept application built on Angular, Bootstrap, Docker, and Electron

[![build status](https://secure.travis-ci.org/tom-weatherhead/othello-angular-electron.svg)](https://travis-ci.org/tom-weatherhead/othello-angular-electron)
[![maintainability](https://api.codeclimate.com/v1/badges/067c83f4f476431aa46b/maintainability)](https://codeclimate.com/github/tom-weatherhead/othello-angular-electron/maintainability)
[![test coverage](https://api.codeclimate.com/v1/badges/067c83f4f476431aa46b/test_coverage)](https://codeclimate.com/github/tom-weatherhead/othello-angular-electron/test_coverage)
[![known vulnerabilities](https://snyk.io/test/github/tom-weatherhead/othello-angular-electron/badge.svg?targetFile=package.json&package-lock.json)](https://snyk.io/test/github/tom-weatherhead/othello-angular-electron?targetFile=package.json&package-lock.json)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/tom-weatherhead/othello-angular-electron/blob/master/LICENSE)

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

Then, to run the project as a Web application available at [http://localhost:4200/]

```sh
$ npm run serve
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
