// othello-angular-electron/e2e/main.e2e.ts

// import { expect } from 'chai';
// import { expect } from 'mocha';
import { strict as assert } from 'assert';
import { SpectronClient } from 'spectron';

import { join } from 'path';
import { Application } from 'spectron';
import * as electron from 'electron';

// import commonSetup from './common-setup';

describe('othello-angular-electron', () => {
	// commonSetup.apply(this);

	let app: Application;
	let client: SpectronClient;

	beforeEach(async function () {
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

		// return this.app.start();
		await app.start();

		// if (typeof this !== 'undefined') {
		client = app.client;
		// }
	});

	afterEach(async function () {
		if (app && app.isRunning()) {
			await app.stop();
		}
	});

	it('Creates initial app window', async () => {
		const count = await client.getWindowCount();

		// expect(count).to.equal(1);
		assert.strictEqual(count, 1);
	});

	it('should display h1 element containing the text: Othello', async () => {
		// const elem = await client.$('app-home h1');
		const elem = await client.$('h1');
		const text = await elem.getText();

		// expect(text).toEqual('App works !');
		assert.strictEqual(text, 'Othello');
	});
});
