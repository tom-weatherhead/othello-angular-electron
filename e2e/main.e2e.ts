// othello-angular-electron/e2e/main.e2e.ts

// **** BEGIN : Example code from https://www.electronjs.org/spectron ****

// var Application = require('spectron').Application
// var assert = require('assert')

// var app = new Application({
//   path: '/Applications/MyApp.app/Contents/MacOS/MyApp'
// })

// app.start().then(function () {
//   // Check if the window is visible
//   return app.browserWindow.isVisible()
// }).then(function (isVisible) {
//   // Verify the window is visible
//   assert.equal(isVisible, true)
// }).then(function () {
//   // Get the window's title
//   return app.client.getTitle()
// }).then(function (title) {
//   // Verify the window's title
//   assert.equal(title, 'My App')
// }).then(function () {
//   // Stop the application
//   return app.stop()
// }).catch(function (error) {
//   // Log any failures
//   console.error('Test failed', error.message)
// })

// Some documentation:

// electron

// The electron property is your gateway to accessing the full Electron API.

// Each Electron module is exposed as a property on the electron property so you can think of it as an alias for require('electron') from within your app.

// So if you wanted to access the clipboard API in your tests you would do:

// app.electron.clipboard.writeText('pasta')
//    .electron.clipboard.readText().then(function (clipboardText) {
//      console.log('The clipboard text is ' + clipboardText)
//    })

// browserWindow

// The browserWindow property is an alias for require('electron').remote.getCurrentWindow().

// It provides you access to the current BrowserWindow and contains all the APIs.

// So if you wanted to check if the current window is visible in your tests you would do:

// app.browserWindow.isVisible().then(function (visible) {
//   console.log('window is visible? ' + visible)
// })

// It is named browserWindow instead of window so that it doesn't collide with the WebDriver command of that name.

// webContents

// The webContents property is an alias for require('electron').remote.getCurrentWebContents().

// It provides you access to the WebContents for the current window and contains all the APIs.

// So if you wanted to check if the current window is loading in your tests you would do:

// app.webContents.isLoading().then(function (visible) {
//   console.log('window is loading? ' + visible)
// })

// executeJavaScript

// The async executeJavaScript API is supported but instead of taking a callback it returns a Promise that will resolve with the result of the last statement of the script.

// app.webContents.executeJavaScript('1 + 2')
//   .then(function (result) {
//     console.log(result) // prints 3
//   })

// mainProcess

// The mainProcess property is an alias for require('electron').remote.process.

// It provides you access to the main process's process global.

// So if you wanted to get the argv for the main process in your tests you would do:

// app.mainProcess.argv().then(function (argv) {
//   console.log('main process args: ' + argv)
// })

// Properties on the process are exposed as functions that return promises so make sure to call mainProcess.env().then(...) instead of mainProcess.env.then(...).

// rendererProcess

// The rendererProcess property is an alias for global.process.

// It provides you access to the renderer process's process global.

// So if you wanted to get the environment variables for the renderer process in your tests you would do:

// app.rendererProcess.env().then(function (env) {
//   console.log('renderer process env variables: ' + env)
// })

// **** END : Example code from https://www.electronjs.org/spectron ****

// import { expect } from 'chai';
// import { expect } from 'mocha';
import { strict as assert } from 'assert';
import { join } from 'path';

import * as electron from 'electron';

import { Application, SpectronClient } from 'spectron';

// import { Application } from 'spectron';

// import commonSetup from './common-setup';

describe('othello-angular-electron', () => {
	// commonSetup.apply(this);

	let app: Application;
	let client: SpectronClient;

	beforeEach(async () => {
		const electronPath = electron.toString();

		// timeout(10000);

		app = new Application({
			// Your electron path can be any binary
			// i.e for OSX an example path could be '/Applications/MyApp.app/Contents/MacOS/MyApp'
			// But for the sake of the example we fetch it from our node_modules.
			path: electronPath,

			// Assuming you have the following directory structure

			//  |__ my project
			//     |__ ...
			//     |__ main.js
			//     |__ package.json
			//     |__ index.html
			//     |__ ...
			//     |__ test
			//        |__ spec.js  <- You are here! ~ Well you should be.

			// The following line tells spectron to look and use the main.js file
			// and the package.json located 1 level above.
			args: [join(__dirname, '..')],
			webdriverOptions: {},

			// From http://www.matthiassommer.it/programming/web/integration-e2e-test-electron-mocha-spectron-chai/ :

			env: {
				ELECTRON_ENABLE_LOGGING: true,
				ELECTRON_ENABLE_STACK_DUMPING: true,
				NODE_ENV: 'development'
			},
			startTimeout: 20000 // ,
			// chromeDriverLogPath: '../chromedriverlog.txt'
		});

		await app.start();

		// The client API is WebdriverIO's browser object. Documentation
		// can be found here ().
		client = app.client;
	});

	afterEach(async () => {
		if (app && app.isRunning()) {
			await app.stop();
		}
	});

	it('Creates a visible browser window', async () => {
		const isVisible = await app.browserWindow.isVisible();

		assert.equal(isVisible, true);
	});

	it('Sets the client window title to: Othello', async () => {
		const title = await app.client.getTitle();

		assert.equal(title, 'Othello');
	});

	it('Creates exactly one client window', async () => {
		const count = await client.getWindowCount();

		// expect(count).to.equal(1);
		// assert.equal() or assert.strictEqual() ?
		assert.equal(count, 1);
	});

	it('Displays an h1 element containing the text: Othello', async () => {
		// const elem = await client.$('app-home h1');
		const elem = await client.$('h1');
		const text = await elem.getText();

		// expect(text).toEqual('App works !');
		assert.equal(text, 'Othello');
	});
});
