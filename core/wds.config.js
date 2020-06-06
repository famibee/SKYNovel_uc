module.exports = {
	entry: `./core/web4webpack.js`,
	target: 'web',
	mode: 'development',
	output: {
		path: process.cwd() +'/doc',
		filename: 'web.js',
	},

	devServer: {
		contentBase: './doc',
		watchContentBase: true,
		open: true,
		openPage: 'web.htm',
	},
};
