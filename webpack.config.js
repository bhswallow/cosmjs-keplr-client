// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const friendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
	devtool: "inline-source-map",
	mode: "development",
	entry: {
		app: "./src/index.tsx",
	},
	output: {
		publicPath: "/",
		path: path.resolve(__dirname, "./dist"),
		filename: "bundle.[hash].js",
	},
	devServer: {
		open: true, 
		hot: true, 
		port: 8888, 
		static: "./public",
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: "/node-modules/",
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				type: "asset/resource",
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				type: "asset/inline",
			},
			{
				test: /\.(scss|css)$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
						},
					},
					"postcss-loader",
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Cosmjs 课程实践",
			template: path.resolve(__dirname, "./public/index.html"), 
			filename: "index.html",
		}),
    new NodePolyfillPlugin(),
		new CleanWebpackPlugin(),
		new friendlyErrorsWebpackPlugin(),
	],
	resolve: {
		extensions: ["", ".ts", ".tsx", ".js", ".jsx"],
		alias: {
			"@": require("path").resolve(__dirname, "./src"),
		},
	},
};
