// othello-angular-electron/main.js

// const fs = require('fs');
const os = require('os');

const { app, BrowserWindow, ipcMain, Tray } = require('electron');

const platform = os.platform(); // TODO? : Use process.platform instead?
const isPlatformWindows = platform === 'win32';
const isPlatformMac = platform === 'darwin';
const isPlatformLinux = platform === 'linux';

const screen = !isPlatformWindows && require('electron').screen;

const browserWindowWidth = 992;
const browserWindowHeight = 750;

// See https://electronjs.org/docs/api/app#appdisablehardwareacceleration
// app.disableHardwareAcceleration();

// TODO: Use app.isUnityRunning() on Linux?

let win;

// function isPlatformWindows () {
// 	return os.platform() === 'win32';
// }

function createWindow() {
	const faviconFilename = isPlatformWindows ? 'favicon.ico' : 'favicon.png';
	const faviconPath = `${__dirname}/dist/assets/${faviconFilename}`;
	const tray = new Tray(faviconPath);

	// Create the browser window.
	// win = new BrowserWindow({
	// 	width: browserWindowWidth,
	// 	height: browserWindowHeight,
	// 	backgroundColor: '#ffffff',
	// 	icon: 'assets/' + faviconFilename,
	// 	webPreferences: {
	// 		nodeIntegration: true
	// 	}
	// });

	let browserWindowConfig = {
		backgroundColor: '#ffffff',
		// backgroundColor: '#7851a9', // From the TouchBar button
		// icon: 'assets/favicon.png',
		// icon: faviconFilePath, // ThAW: Does this have any effect?
		icon: faviconPath,
		title: 'Othello',
		// worldSafeExecuteJavaScript: true,
		x: 0,
		y: 0,
		width: browserWindowWidth,
		heighht: browserWindowHeight,
		webPreferences: {
			allowRunningInsecureContent: false,
			contextIsolation: false, // false if you want to run e2e tests with Spectron
			enableRemoteModule: true, // true if you want to run e2e tests with Spectron or use remote module in renderer context (ie. Angular)
			nodeIntegration: true //,
			// preload: '/absolute/path/to/some/preload.js'
			// preload: `${__dirname}/preload.js`
		}
	};

	// if (isPlatformWindows) {
	// 	browserWindowConfig.width = browserWindowWidth;
	// 	browserWindowConfig.height = browserWindowHeight;
	// } else {
	if (screen) {
		const primaryDisplayWorkArea = screen.getPrimaryDisplay().workArea;

		browserWindowConfig.x = primaryDisplayWorkArea.x;
		browserWindowConfig.y = primaryDisplayWorkArea.y;
		browserWindowConfig.width = primaryDisplayWorkArea.width;
		browserWindowConfig.height = primaryDisplayWorkArea.height;
	}

	// Create the browser window.
	win = new BrowserWindow(browserWindowConfig);

	// win.loadFile('dist/index.html');
	win.loadFile(`${__dirname}/dist/index.html`);

	// Event that fires when the window is closed.
	win.on('closed', () => {
		win = null;
	});

	tray.on('click', () => {
		win.isVisible() ? win.hide() : win.show();
	});

	win.webContents.on('before-input-event', (event, input) => {
		// For example, only enable application menu keyboard shortcuts when Ctrl/Cmd are down:
		// win.webContents.setIgnoreMenuShortcuts(!input.control && !input.meta)

		if (input && input.code) {
			switch (input.code) {
				case 'F5':
					win.webContents.reload();
					event.preventDefault();
					break;

				case 'F12':
					win.webContents.toggleDevTools();
					event.preventDefault();
					break;

				default:
					break;
			}
		}
	});

	// Uncomment the line below to open the DevTools.
	// win.webContents.openDevTools();
}

// Create the browser window upon Electron intialization:
app.on('ready', createWindow);

app.on('activate', () => {
	if (!win) {
		createWindow();
	}
});

// Terminate the app when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS specific close process
	if (isPlatformMac || isPlatformLinux) {
		app.quit();
	}
});
