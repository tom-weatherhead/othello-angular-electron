// // othello-angular-electron/e2e/common-setup.ts

// import { join } from 'path';
// import { Application } from 'spectron';
// import * as electron from 'electron';

// export default function setup(): void {
// 	beforeEach(function () {
// 		const electronPath = electron.toString();

// 		this.timeout(10000);

// 		this.app = new Application({
// 			// Your electron path can be any binary
// 			// i.e for OSX an example path could be '/Applications/MyApp.app/Contents/MacOS/MyApp'
// 			// But for the sake of the example we fetch it from our node_modules.
// 			path: electronPath,

// 			// Assuming you have the following directory structure

// 			//  |__ my project
// 			//     |__ ...
// 			//     |__ main.js
// 			//     |__ package.json
// 			//     |__ index.html
// 			//     |__ ...
// 			//     |__ test
// 			//        |__ spec.js  <- You are here! ~ Well you should be.

// 			// The following line tells spectron to look and use the main.js file
// 			// and the package.json located 1 level above.
// 			args: [join(__dirname, '..')],
// 			webdriverOptions: {},

// 			// From http://www.matthiassommer.it/programming/web/integration-e2e-test-electron-mocha-spectron-chai/ :

// 			env: {
// 				ELECTRON_ENABLE_LOGGING: true,
// 				ELECTRON_ENABLE_STACK_DUMPING: true,
// 				NODE_ENV: 'development'
// 			},
// 			startTimeout: 20000 // ,
// 			// chromeDriverLogPath: '../chromedriverlog.txt'
// 		});

// 		return this.app.start();
// 	});

// 	afterEach(async function () {
// 		if (this.app && this.app.isRunning()) {
// 			await this.app.stop();
// 		}
// 	});
// }
