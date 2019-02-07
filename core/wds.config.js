module.exports = {
	entry: `./core/web4webpack.js`,
	target: 'web',
	mode: 'development',
	output: {
		path: process.cwd() +'/web',
		filename: 'web.js',
	},

	devServer: {
		contentBase: './',
		openPage: 'web.htm',
		watchContentBase: true,
		open: true,
		headers: {
			// 'Access-Control-Allow-Origin': '*'	//--いまのとこ不要
		},
	},
};
