"use strict";
// othello-angular-electron/main.ts
Object.defineProperty(exports, "__esModule", { value: true });
var os = require("os");
var electron_1 = require("electron");
var platform = os.platform(); // TODO? : Use process.platform instead?
var isPlatformWindows = platform === 'win32';
var isPlatformMac = platform === 'darwin';
// const isPlatformLinux = platform === 'linux';
var assetsDir = './dist/assets';
var faviconFileBasePath = assetsDir + '/favicon';
var faviconFileExtension = isPlatformWindows ? 'ico' : 'png';
// const icoIconFilePath = faviconFileBasePath + 'ico';
// const pngIconFilePath = faviconFileBasePath + 'png';
// const faviconFilePath = isPlatformWindows ? icoIconFilePath : pngIconFilePath;
var faviconFilePath = faviconFileBasePath + "." + faviconFileExtension;
var macOSDockIconFilePath = assetsDir + '/icons/tom-weatherhead-512x512.png';
// const browserWindowWidth = 992;
// const browserWindowHeight = 750;
var browserWindowWidth = 500;
var browserWindowHeight = 750;
var win;
// See https://electronjs.org/docs/api/app#appdisablehardwareacceleration
// app.disableHardwareAcceleration();
// TODO: Use app.isUnityRunning() on Linux?
if (isPlatformMac) {
    electron_1.app.setAboutPanelOptions({
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
    var dockMenu = electron_1.Menu.buildFromTemplate([
        {
            label: 'New Window',
            click: function () {
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
    electron_1.app.dock.setMenu(dockMenu);
    electron_1.app.dock.setIcon(macOSDockIconFilePath);
}
// On macOS: function createWindow (launchInfo) {
// function createWindow(launchInfo) {
function createWindow(launchInfo) {
    // launchInfo is defined only on macOS
    // console.log('launchInfo is', typeof launchInfo, launchInfo);
    if (launchInfo === void 0) { launchInfo = undefined; }
    if (!isPlatformMac && !isPlatformWindows) {
        console.log('platform is', typeof platform, platform);
    }
    // macOS: This icon appears briefly in the Menu Bar, not scaled.
    // -> Use a PNG that is less than 32x32.
    var tray = new electron_1.Tray(faviconFilePath);
    if (!electron_1.screen) {
        console.error('FATAL: screen is falsy');
        throw new Error('FATAL: screen is falsy');
    }
    var primaryDisplayWorkArea = electron_1.screen.getPrimaryDisplay().workArea;
    var dx = Math.floor((primaryDisplayWorkArea.width - browserWindowWidth) / 2);
    var dy = Math.floor((primaryDisplayWorkArea.height - browserWindowHeight) / 2);
    var browserWindowConfig = {
        backgroundColor: '#ffffff',
        // backgroundColor: '#7851a9', // From the TouchBar button
        // icon: 'assets/favicon.png',
        icon: faviconFilePath,
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
            contextIsolation: false,
            enableRemoteModule: true,
            nodeIntegration: true // ,
            // preload: '/absolute/path/to/some/preload.js'
            // preload: `${__dirname}/preload.js`
            // worldSafeExecuteJavaScript: true
        }
    };
    // Create the browser window.
    win = new electron_1.BrowserWindow(browserWindowConfig);
    win.loadFile('dist/index.html');
    // win.loadFile(`file://${__dirname}/dist/index.html`);
    // Event that fires when the window is closed.
    win.on('closed', function () {
        win = null;
    });
    // win.on('resize', () => {
    // 	ipcMain.send('on-browser-window-resize', primaryDisplayWorkArea.x, primaryDisplayWorkArea.y, primaryDisplayWorkArea.width, primaryDisplayWorkArea.height);
    // });
    win.webContents.on('before-input-event', function (event, input) {
        // For example, only enable application menu keyboard shortcuts when Ctrl/Cmd are down:
        // win.webContents.setIgnoreMenuShortcuts(!input.control && !input.meta)
        if (input && input.code) {
            // console.log('Electron before-input-event: input.code is', input.code);
            switch (input.code) {
                case 'KeyA':
                    electron_1.app.showAboutPanel();
                    event.preventDefault();
                    break;
                case 'KeyB':
                    if (isPlatformMac) {
                        setTimeout(function () { return electron_1.app.dock.bounce(); }, 5000);
                    }
                    event.preventDefault();
                    break;
                case 'KeyC':
                    if (isPlatformMac) {
                        electron_1.app.dock.setBadge('Foo');
                    }
                    event.preventDefault();
                    break;
                case 'KeyD':
                    if (isPlatformMac) {
                        electron_1.app.dock.setBadge('');
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
                case 'F11':
                    console.log('TODO: Full-screen mode');
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
    // Configure the application's icon in the tray
    tray.on('click', function () {
        win.isVisible() ? win.hide() : win.show();
    });
    // win.webContents.on('did-finish-load', () => {
    // 	// The Electron main process sends an Electron IPC message to Angular:
    // 	win.webContents.send('ping2', 'Yee-haw, MoFo!');
    // });
    setDockMenu(); // macOS only
}
// Create the browser window upon Electron intialization:
electron_1.app.on('ready', createWindow);
electron_1.app.on('activate', function () {
    if (!win) {
        createWindow();
    }
});
// macOS: Terminate the app when all of the app's windows are closed.
electron_1.app.on('window-all-closed', function () {
    if (isPlatformMac) {
        electron_1.app.quit();
    }
});
