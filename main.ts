// othello-angular-electron/main.ts

// import * as os from 'os';
import { platform } from 'os';

import {
	app,
	BrowserWindow,
	// ipcMain,
	Menu,
	screen,
	TouchBar,
	Tray
} from 'electron';

// const platform = os.platform(); // TODO? : Use process.platform instead?
const isPlatformWindows = platform() === 'win32';
const isPlatformMac = platform() === 'darwin';
// const isPlatformLinux = platform() === 'linux';

// const assetsDir = './dist/assets';
const assetsDir = `${__dirname}/dist/assets`;

const faviconFileBasePath = assetsDir + '/favicon';
const faviconFileExtension = isPlatformWindows ? 'ico' : 'png';
// const icoIconFilePath = faviconFileBasePath + 'ico';
// const pngIconFilePath = faviconFileBasePath + 'png';
// const faviconFilePath = isPlatformWindows ? icoIconFilePath : pngIconFilePath;
const faviconFilePath = `${faviconFileBasePath}.${faviconFileExtension}`;

const macOSDockIconFilePath = assetsDir + '/icons/tom-weatherhead-512x512.png';

// const browserWindowWidth = 992;
// const browserWindowHeight = 750;
const browserWindowWidth = 500;
const browserWindowHeight = 750;

let win;

// See https://electronjs.org/docs/api/app#appdisablehardwareacceleration
// app.disableHardwareAcceleration();

// TODO: Use app.isUnityRunning() on Linux?

if (isPlatformMac) {
	app.setAboutPanelOptions({
		applicationName: 'othello-angular-electron',
		applicationVersion: '0.0.0',
		copyright: 'Copyright (c) 2018-2021 Tom Weatherhead',
		version: '0.0.0',
		credits: 'Hallelujah!',
		authors: ['Tom Weatherhead'],
		website: 'https://2hrd4u.org',
		iconPath: macOSDockIconFilePath
	});
}

function setDockMenu() {
	if (!isPlatformMac) {
		return;
	}

	const dockMenu = Menu.buildFromTemplate([
		{
			label: 'New Window',
			click() {
				console.log('New Window');
			}
		},
		{
			label: 'New Window with Settings',
			submenu: [
				{
					label: 'Basic'
				},
				{
					label: 'Pro'
				}
			]
		},
		{
			label: 'New Foo Command...'
		}
	]);

	app.dock.setMenu(dockMenu);
	app.dock.setIcon(macOSDockIconFilePath);
}

let turbineBoostEnabled = false;

function turnTouchBarOn() {
	if (!isPlatformMac) {
		return;
	}

	const { TouchBarLabel, TouchBarButton, TouchBarSpacer } = TouchBar;

	const touchBarButton = new TouchBarButton({
		label: 'Turbine Boost',
		backgroundColor: '#7851A9',
		click: () => {
			turbineBoostEnabled = !turbineBoostEnabled;

			const status = turbineBoostEnabled ? 'enabled' : 'disabled';

			label1.label = status;
			label1.textColor = turbineBoostEnabled ? '#00FF00' : '#FF0000';
			console.log(`Turbine Boost ${status}.`);
			// win.webContents.send('touchbar-button-toggle-turbine-boost');
		}
	});
	const label1 = new TouchBarLabel({
		label: 'disabled',
		// accessibilityLabel: 'disabled',
		textColor: '#FF0000'
	});

	// label1.label = 'disabled';

	const touchBar = new TouchBar({
		items: [touchBarButton, new TouchBarSpacer({ size: 'small' }), label1]
	});

	win.setTouchBar(touchBar);
}

// function turnTouchBarOff() {
// 	if (!isPlatformMac) {
// 		return;
// 	}

// 	win.setTouchBar(null);
// }

// let isTouchBarOn = false;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createWindow(launchInfo: unknown = undefined) {
	// launchInfo is defined only on macOS
	// console.log('launchInfo is', typeof launchInfo, launchInfo);

	// if (!isPlatformMac && !isPlatformWindows) {
	// 	console.log('platform is', typeof platform, platform);
	// }

	// const p = platform();

	// console.log(`platform is ${typeof p} '${p}'`);

	// macOS: This icon appears briefly in the Menu Bar, not scaled.
	// -> Use a PNG that is less than 32x32.
	const tray = new Tray(faviconFilePath);

	if (!screen) {
		console.error('FATAL: screen is falsy');
		throw new Error('FATAL: screen is falsy');
	}

	// const defaultDisplayWorkArea = {
	// 	x: 0,
	// 	y: 0,
	// 	width: browserWindowWidth,
	// 	height: browserWindowHeight
	// };
	const primaryDisplayWorkArea = screen.getPrimaryDisplay().workArea;
	// const primaryDisplayWorkArea = screen
	// 	? screen.getPrimaryDisplay().workArea
	// 	: defaultDisplayWorkArea;
	const dx = Math.floor(
		(primaryDisplayWorkArea.width - browserWindowWidth) / 2
	);
	const dy = Math.floor(
		(primaryDisplayWorkArea.height - browserWindowHeight) / 2
	);

	const browserWindowConfig = {
		backgroundColor: '#ffffff',
		// backgroundColor: '#7851a9', // From the TouchBar button
		// icon: 'assets/favicon.png',
		icon: faviconFilePath, // ThAW: Does this have any effect?
		title: 'Forexus',
		// x: primaryDisplayWorkArea.x,
		// y: primaryDisplayWorkArea.y,
		// width: primaryDisplayWorkArea.width,
		// height: primaryDisplayWorkArea.height,
		x: Math.max(dx, 0),
		y: Math.max(dy, 0),
		width: Math.min(browserWindowWidth, primaryDisplayWorkArea.width),
		height: Math.min(browserWindowHeight, primaryDisplayWorkArea.height),
		webPreferences: {
			allowRunningInsecureContent: false,
			// contextIsolation and worldSafeExecuteJavaScript:
			// See https://stackoverflow.com/questions/63427191/security-warning-in-the-console-of-browserwindow-electron-9-2-0
			// See also https://www.electronjs.org/docs/api/browser-window#class-browserwindow
			contextIsolation: false, // false if you want to run e2e tests with Spectron
			enableRemoteModule: true, // true if you want to run e2e tests with Spectron or use remote module in renderer context (ie. Angular)
			nodeIntegration: true // ,
			// preload: '/absolute/path/to/some/preload.js'
			// preload: `${__dirname}/preload.js`
			// worldSafeExecuteJavaScript: true
		}
	};

	// Create the browser window.
	win = new BrowserWindow(browserWindowConfig);

	// win.loadFile('dist/index.html');
	win.loadFile(`${__dirname}/dist/index.html`);
	// win.loadFile(`file://${__dirname}/dist/index.html`);

	// Event that fires when the window is closed.
	win.on('closed', () => {
		win = null;
	});

	// win.on('resize', () => {
	// 	ipcMain.send('on-browser-window-resize', primaryDisplayWorkArea.x, primaryDisplayWorkArea.y, primaryDisplayWorkArea.width, primaryDisplayWorkArea.height);
	// });

	win.webContents.on('before-input-event', (event, input) => {
		// For example, only enable application menu keyboard shortcuts when Ctrl/Cmd are down:
		// win.webContents.setIgnoreMenuShortcuts(!input.control && !input.meta)

		if (input && input.code) {
			// console.log('Electron before-input-event: input.code is', input.code);

			switch (input.code) {
				case 'KeyA':
					app.showAboutPanel();
					event.preventDefault();
					break;

				case 'KeyB':
					if (isPlatformMac) {
						setTimeout(() => app.dock.bounce(), 5000);
					}

					event.preventDefault();
					break;

				case 'KeyC':
					if (isPlatformMac) {
						app.dock.setBadge('Foo');
					}

					event.preventDefault();
					break;

				case 'KeyD':
					if (isPlatformMac) {
						app.dock.setBadge('');
					}

					event.preventDefault();
					break;

				// case 'KeyE':
				// 	if (isPlatformMac) {
				// 		turnTouchBarOn();
				// 	}

				// 	event.preventDefault();
				// 	break;

				// case 'KeyF':
				// 	if (isPlatformMac) {
				// 		turnTouchBarOff();
				// 	}

				// 	event.preventDefault();
				// 	break;

				// app.dock.bounce(): number : Returns an integer ID representing the request.
				//   - Note that this method can only be used while the app is not focused; when the app is not focused it will return -1
				// app.dock.cancelBounce(id: number)
				// app.dock.downloadFinished(filePath: string)
				// app.dock.hide()
				// app.dock.show(): Promise<void> : Resolves when the dock icon is shown
				// app.dock.isVisible(): boolean
				// app.dock.setMenu(menu: Menu)
				// app.dock.getMenu(): Menu | null
				// app.dock.setIcon(image: NativeImage | string);

				case 'F5':
					win.webContents.reload();
					event.preventDefault();
					break;

				// case 'F11':
				// 	console.log('TODO: Full-screen mode');
				// 	break;

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

	// Configure the application's icon in the tray

	tray.on('click', () => {
		win.isVisible() ? win.hide() : win.show();
	});

	// win.webContents.on('did-finish-load', () => {
	// 	// The Electron main process sends an Electron IPC message to Angular:
	// 	win.webContents.send('ping2', 'Yee-haw, MoFo!');
	// });

	setDockMenu(); // macOS only
	turnTouchBarOn(); // macOS only
}

// Create the browser window upon Electron intialization:
app.on('ready', createWindow);

app.on('activate', () => {
	if (!win) {
		createWindow();
	}
});

// macOS: Terminate the app when all of the app's windows are closed.
app.on('window-all-closed', () => {
	// if (isPlatformMac) {
	app.quit();
	// }
});
