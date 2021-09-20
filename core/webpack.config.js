// 変更後は「npm run webpack:dev」
const WebpackObfuscator = require('webpack-obfuscator');

const isPrd = process.env.NODE_ENV === 'production';
const cfg = {};
if (isPrd) cfg = {...cfg, module: {rules: [
	{
		enforce: 'post',
		test: /\.js$/,
		use: [{
			loader: WebpackObfuscator.loader,
			options: {
				compact: true,
				controlFlowFlattening: false,
				deadCodeInjection: false,
				debugProtection: false,
				debugProtectionInterval: false,
				disableConsoleOutput: false,
				identifierNamesGenerator: 'hexadecimal',
				log: false,
				renameGlobals: false,
				rotateStringArray: true,
				selfDefending: false,
				stringArray: true,
	//			stringArrayEncoding: false,
				stringArrayThreshold: 0.75,
				unicodeEscapeSequence: false,
			}
		}],
		exclude: /node_modules/
	},
]},};

module.exports = [{
	...cfg,
	entry: `./core/app4webpack`,
	target: 'web',
	output: {
		path: process.cwd() +'/doc/app',
		filename: 'index.js',
	},
},{
	...cfg,
	entry: `./core/web4webpack`,
	target: 'web',
	output: {
		path: process.cwd() +'/doc',
		filename: 'web.js',
		chunkFilename: 'web.[name].js'
	},
}];
