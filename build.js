const is_windows = process.platform==='win32'
//const is_mac = process.platform==='darwin'

const config = require('./package.json');
const opts = {
	dir: './',
	name: config.name,
	appCopyright: config.appCopyright,
 	appVersion	: config.version,
	platform: is_windows ?'win32' :'darwin',
//	arch: 'ia32',
	arch: 'x64',
		// 2018/5/1時点で
		// Allowed values: ia32, x64, armv7l, arm64 (Electron 1.8.0 and above), mips64el (Electron 1.8.2-beta.5 and above), all
	icon: 'build/icon/icon',
	out: 'build/',

	overwrite: true,
	//asar: {unpackDir: 'prj'},	// 絵や動画など、2018/04/30 時点で不要だった
	asar: true,
	ignore: "^/([\\x00-\\x60]|[b-oq-z]|a[^p]|p[^ar]|package-|[\\u007b-\\uffff])",

	appBundleId	: config.appBundleId,
	helperBundleId: config.appBundleId,
	win32metadata: {
		CompanyName: config.appCopyright,
		FileDescription: config.description,
		OriginalFilename: config.name,
		FileVersion: config.version,
		ProductVersion: config.version,
		ProductName: config.name,
		InternalName: config.name
	}
};
const packager = require('electron-packager');
packager(opts).then(_appPaths => {
	// Win
	if (is_windows) {
		console.log(`---- ${opts.name}.exe Done!!`);

		console.log(`Creating ${opts.name}.msi ...`);
		const electronInstaller = require('electron-winstaller');
		const fld = opts.name +'-win32-'+ opts.arch;
		resultPromise = electronInstaller.createWindowsInstaller({
			appDirectory: `build/${fld}/`,
			outputDirectory: opts.out,
			authors: config.authors,
/*
			exe: opts.name +'.exe',
			setupExe: opts.name +'.exe',
			setupMsi: opts.name +'.msi',
*/
		});
		resultPromise.then(
			()=> console.log(`---- ${opts.name}.msi Done!!`),
			e=> console.log(`No dice: ${e.message}`));
	}

	// Mac
	if (process.platform==='darwin') {
		console.log(`🍏 🍔 ${opts.name}.app Done!!`);

		console.log(`Creating ${opts.name}.dmg ...`);
		const fld = opts.name +'-darwin-'+ opts.arch;
		const createDMG = require('electron-installer-dmg');
		createDMG({
			appPath: 'build/'+ fld +'/'+ opts.name +'.app',
			name: opts.name,
			icon: opts.icon +'.icns',
			overwrite: true,
			out: opts.out,
		}, err=> {
			if (err) throw Error(err);
			console.log(`🍎 📦 ${opts.name}.dmg Done!!`);
		});
	}
});
