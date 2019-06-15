const ImageminPlugin = require('imagemin-webpack-plugin').default;

// 変更後は「npm run webpack:dev」
module.exports = [
	{
		entry: `./core/app4webpack.js`,
		target: 'electron-renderer',
		output: {
			path: process.cwd() +'/app',
			filename: 'index.js',
		},
		optimization: {
			minimize: true,
		},
	},
	{
		entry: `./core/mob4webpack.js`,
		target: 'web',
		output: {
			path: process.cwd() +'/mobile/www',
			filename: 'index.js',
		},
		optimization: {
			minimize: true,
		},
	},
	{
		entry: `./core/web4webpack.js`,
		target: 'web',
		output: {
			path: process.cwd() +'/web',
			filename: 'web.js',
			chunkFilename: 'web.[name].js'
		},
		optimization: {
			splitChunks: {
				cacheGroups: {
					three: {test: /three/, name: 'three', chunks: 'initial'},
				}
			},
			minimize: true,
		},
		plugins: [
			new ImageminPlugin({
				disable: process.env.NODE_ENV !== 'production',
				test: /\.(jpe?g|png|gif|svg)$/i,
				pngquant: {quality: '95-100',},
			}),
		],
	}
];
