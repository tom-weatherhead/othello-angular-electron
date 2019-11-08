// othello-angular-electron/main.js

const os = require('os');
const { app, BrowserWindow, Tray } = require('electron');

const browserWindowWidth = 900;
const browserWindowHeight = 750;

// See https://electronjs.org/docs/api/app#appdisablehardwareacceleration
// app.disableHardwareAcceleration();

// TODO: Use app.isUnityRunning() on Linux?

let win;

function isPlatformWindows () {
	return os.platform() === 'win32';
}

function createWindow () {
	const faviconFilename = isPlatformWindows() ? 'favicon.ico' : 'favicon.png';
	const tray = new Tray('./dist/assets/' + faviconFilename);

	// Create the browser window.
	win = new BrowserWindow({
		width: browserWindowWidth,
		height: browserWindowHeight,
		backgroundColor: '#ffffff',
		icon: 'assets/' + faviconFilename,
		webPreferences: {
			nodeIntegration: true
		}
	});

	win.loadFile('dist/index.html');

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
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
