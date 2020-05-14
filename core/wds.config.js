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
		openPage: 'web.htm',
		watchContentBase: true,
		open: true,
	},
};
