// 変更後は「npm run webpack:dev」
const WebpackObfuscator = require('webpack-obfuscator');

const isPrd = process.env.NODE_ENV === 'production';
let cfg = {
	resolve: {
		fallback: {'url': require.resolve('url/'),}
	},
};
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
else cfg = {...cfg, cache: {
	type: 'filesystem',
	buildDependencies: { config: [__filename], },
},};

module.exports = [{
	...cfg,
	entry: `./core/app4webpack`,
	target: 'web',
	output: {
		path: process.cwd() +'/doc/app',
		filename: 'index.js',
		chunkFilename: p=> {
			const nm = p.chunk.id
			.replace(/^.+_dist_app_(.+)_js$/, '$1');
			return `app.${nm}.js`;
		},
	},
},{
	...cfg,
	entry: `./core/web4webpack`,
	target: 'web',
	output: {
		path: process.cwd() +'/doc',
		filename: 'web.js',
		chunkFilename: p=> {
			const nm = p.chunk.id
			.replace(/^.+_dist_(.+)_js$/, '$1');
			return `web.${nm}.js`;
		},
	},
}];
