const ImageminPlugin = require('imagemin-webpack-plugin').default;

const ip = {
	disable: process.env.NODE_ENV !== 'production',
	test: /\.(jpe?g|png|gif|svg)$/i,
	pngquant: {quality: '95-100',},
};
const cfg = {
	optimization: {
		splitChunks: {
			cacheGroups: {
				three: {test: /three/, name: 'three', chunks: 'initial'},
			}
		},
	},
	resolve: {
		fallback: {
			crypto: require.resolve('crypto-browserify'),
			stream: require.resolve('stream-browserify'),
		}
	},
	plugins: [new ImageminPlugin(ip),],
};

// 変更後は「npm run webpack:dev」
module.exports = [{
	...cfg,
	entry: `./core/app4webpack`,
	target: 'electron-renderer',
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
