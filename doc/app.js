/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2024 Famibee (famibee.blog38.fc2.com)

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
		label: 'システム',
		submenu: [
			{label: 'このアプリについて', click: ()=> require('about-window').default({
				icon_path	: path.join(__dirname, 'app/icon.png'),
				package_json_dir	: __dirname,
				copyright	: 'Copyright '+ pkg.appCopyright +' 2025',
				homepage	: pkg.homepage,
				license		: '',
				use_version_info	: false,
			})},
			{type: 'separator'},
			{label: '設定', click: ()=> guiWin.webContents.send('fire', 'c'), accelerator: "CmdOrCtrl+,"},
			{label: '全画面/ウインドウモード切替', click: ()=> guiWin.webContents.send('fire', 'alt+enter'), accelerator: 'F11'},
			{label: 'ウインドウサイズを初期に戻す', click: ()=> guiWin.webContents.send('fire', 'Meta+0')},
			{type: 'separator'},
			{label: 'メッセージを消す', click: ()=> guiWin.webContents.send('fire', ' ')},
			{label: 'メッセージ履歴の表示', click: ()=> guiWin.webContents.send('fire', 'r')},
			{label: '次の選択肢・未読まで進む', click: ()=> guiWin.webContents.send('fire', 'f')},
			{label: '自動的に読み進む', click: ()=> guiWin.webContents.send('fire', 'a')},
			{type: 'separator'},
			{label: 'DevTools', click: ()=> guiWin.webContents.openDevTools(), accelerator: 'F12'},
			isMac ?{role: 'close'} :{role: 'quit'},
		],
	}]);
	Menu.setApplicationMenu(menu);

	guiWin = require('@famibee/skynovel/appMain').initRenderer(
		path.join(__dirname, 'app/index.htm'),
		pkg.version, {},
	);
	guiWin.on('closed', ()=> app.quit());
});
