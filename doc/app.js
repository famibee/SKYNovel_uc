/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2021 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// electron メインプロセス
const {crashReporter, app, Menu} = require('electron');
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
app.on('second-instance', ()=> {
	if (! guiWin) return;

	if (guiWin.isMinimized()) guiWin.restore();
	guiWin.focus();
});
app.on('ready', ()=> {
	const isMac = (process.platform === 'darwin');
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
						copyright: 'Copyright '+ process.env.npm_package_appCopyright +' 2021',
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

	const SKYNovel = require('@famibee/skynovel/appMain');
	guiWin = SKYNovel.initRenderer(
		path.join(__dirname, 'app/index.htm'),
		{
			id			: 'SKYNovel-'+ app.name,
			width		: 1024,
			height		: 768,
			min_width	: 300,
			min_height	: 300,
			acceptFirstMouse		: true,
			textAreasAreResizable	: false,
			resizable		: false,
			fullscreenable	: true,
		}
	);
	guiWin.on('closed', ()=> app.quit());
});
