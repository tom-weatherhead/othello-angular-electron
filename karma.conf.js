// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
// See also https://github.com/angular/angular-cli/blob/v11.0.0/packages/schematics/angular/application/files/karma.conf.js.template

// TODO: 2021-04-13 :
// WARN [karma-server]: Passing raw CLI options to `new Server(config,
// done)` is deprecated. Use `parseConfig(configFilePath, cliOptions,
// {promiseConfig: true, throwErrors: true})` to prepare a processed
// `Config` instance and pass that as the `config` argument instead.

module.exports = (config) => {
	config.set({
		basePath: '',
		frameworks: ['jasmine', '@angular-devkit/build-angular'],
		plugins: [
			require('@angular-devkit/build-angular/plugins/karma'),
			require('karma-coverage'),
			require('karma-electron'),
			require('karma-jasmine'),
			require('karma-jasmine-html-reporter')
		],
		client: {
			clearContext: false, // leave Jasmine Spec Runner output visible in browser
			// DEV: `useIframe: false` is for launching a new window instead of using an iframe
			//   In Electron, iframes don't get `nodeIntegration` priveleges yet windows do
			useIframe: false
		},
		preprocessors: {
			'src/**/*.ts': ['electron']
		},
		coverageReporter: {
			// specify a common output directory
			// dir: require('path').join(__dirname, '<%= relativePathToWorkspaceRoot %>/coverage/<%= appName%>'),
			dir: 'coverage',
			subdir: '.',
			reporters: [
				{
					type: 'lcovonly',
					// subdir: '.',
					file: 'lcov.info'
				},
				{ type: 'html' },
				{ type: 'text-summary' }
			]
		},
		reporters: ['progress', 'kjhtml'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		browsers: ['OthelloAngularElectron'],
		singleRun: false,
		restartOnFileChange: true,
		customLaunchers: {
			OthelloAngularElectron: {
				base: 'Electron',
				flags: ['--remote-debugging-port=9222'],
				browserWindowOptions: {
					webPreferences: {
						nodeIntegration: true,
						nodeIntegrationInSubFrames: true,
						allowRunningInsecureContent: false, // true,
						contextIsolation: false, // false if you want to run e2e test with Spectron
						enableRemoteModule: true // , // true if you want to run e2e tests with Spectron or use remote module in renderer context (ie. Angular)
					}
				}
			}
		}
	});
};
