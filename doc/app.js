/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2021 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// electron メインプロセス
const {crashReporter, app, Menu, BrowserWindow} = require('electron');
const path = require('path');

const pkg = require('../package.json');
app.name = pkg.name;	// 非パッケージだと 'Electron' になる件対応
app.setPath('userData', app.getPath('appData') +'/'+ app.name);

crashReporter.start({
	productName	: app.name,
	companyName	: "電子演劇部",
	submitURL	: pkg.homepage,
	autoSubmit	: false,
	compress	: true,
});
if (! app.requestSingleInstanceLock()) app.quit();
app.on('window-all-closed', ()=> app.quit());

let guiWin = null;
function log(mes) {guiWin.webContents.send('log', mes)}
const isMac = (process.platform === 'darwin');
app.on('second-instance', ()=> {
	if (! guiWin) return;

	if (guiWin.isMinimized()) guiWin.restore();
	guiWin.focus();
});
app.on('ready', ()=> {
	const menu = Menu.buildFromTemplate([{
		label: app.name,
		submenu: [
			{
				label: 'About This App',
				click: ()=> {
					const openAboutWindow = require('about-window').default;
					openAboutWindow({
						icon_path: path.join(__dirname, 'app/icon.png'),
						package_json_dir: __dirname,
						copyright: 'Copyright '+ process.env.npm_package_appCopyright +' 2020',
						homepage: pkg.homepage,
						license: '',
						use_version_info: false,
					});
				}
			},
			{
				label: 'DevTools',
				click() {guiWin.webContents.openDevTools();},
			},
			isMac ?{role: 'close'} :{role: 'quit'},
		],
	}]);
	Menu.setApplicationMenu(menu);

	const Store = require('electron-store');
	Store.initRenderer();

	guiWin = new BrowserWindow({
		id			: 'SKYNovel-'+ app.name,
		width		: 1024,
		height		: 768,
		min_width	: 300,
		min_height	: 300,
		acceptFirstMouse		: true,
		textAreasAreResizable	: false,
		resizable		: false,
		fullscreenable	: true,
		webPreferences	: {nodeIntegration: true, enableRemoteModule: true,},
	});
	try {
		guiWin.loadFile(path.join(__dirname, 'app/index.htm'),);
	}
	catch (e) {
		guiWin.webContents.openDevTools();
		console.error(`ealy err:${e}`);
	}
	guiWin.on('closed', ()=> app.quit());
});

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
	// 2018/05/08
	// disable security-warnings not working · Issue #11970 · electron/electron https://github.com/electron/electron/issues/11970
