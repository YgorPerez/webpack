const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin =
	require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	mode: 'development',
	entry: {
		bundle: path.resolve(__dirname, 'src/index.js'),
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name][contenthash].js',
		clean: true,
		assetModuleFilename: '[name][ext]',
	},
	devtool: 'source-map',
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'dist'),
		},
		port: 3000,
		open: true,
		hot: true,
		compress: true,
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.pgn|svg|jpg|jpeg|gif$/i,
				type: 'asset/resource',
			},
		],
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.html'),
			title: 'Joke Generator',
			filename: 'index.html',
		}),
		new BundleAnalyzerPlugin(),
	],
};
