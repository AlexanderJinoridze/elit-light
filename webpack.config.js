const path = require("path");
const fs = require("fs");

const HTMLWebpackPlugin = require("html-webpack-plugin");
const HTMLBeautifyPlugin = require("html-beautify-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const filename = ext => isProd ? `[name].${ext}` : `[name].[hash].${ext}`;

const pagesDirectory = path.join(__dirname, "src", "views", "pages");
const pages = fs.readdirSync(pagesDirectory).filter(file => file.endsWith(".hbs"));

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all"
        }
    };

    if (isProd) {
        config.minimize = true;
    }

    return config;
}

const cssLoaders = extra => {
    const loaders = [
        "style-loader",
        {
            loader: MiniCssExtractPlugin.loader,
            options: {}
        },
        {
            loader: 'css-loader',
            options: { url: true, sourceMap: true }
        },
        "postcss-loader"
    ];

    if (extra) {
        loaders.push(extra);
    }

    return loaders;
};

const plugins = () => {
    const base = [
        ...pages.map(page => new HTMLWebpackPlugin({
            template: `${pagesDirectory}/${page}`,
            filename: `./${page.replace(/\.hbs/, ".html")}`
        })),
        new HTMLBeautifyPlugin({
            config: {
                html: {
                    end_with_newline: true,
                    indent_size: 4,
                    indent_with_tabs: false,
                    indent_inner_html: true,
                    preserve_newlines: false,
                    unformatted: []
                }
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.join(__dirname, "static"),
                    to: path.join(__dirname, "dist"),
                }, {
                    from: path.join(__dirname, "src", "images"),
                    to: path.join(__dirname, "dist", "images"),
                }
            ],
        }),
        new MiniCssExtractPlugin({
            filename: filename("css"),
        }),
    ];

    return base;
};

module.exports = {
    context: path.join(__dirname, "src"),
    mode: "development",
    entry: "./index.js",
    output: {
        filename: filename("js"),
        path: path.join(__dirname, "dist")
    },
    optimization: optimization(),
    devServer: {
        hot: false,
        liveReload: false,
        port: 4200
    },
    devtool: isDev ? "source-map" : false,
    plugins: plugins(),
    module: {
        rules: [{
            test: /\.hbs$/,
            loader: "handlebars-loader"
        }, {
            test: /\.css$/,
            use: cssLoaders()
        }, {
            test: /\.s[ac]ss$/,
            use: cssLoaders("sass-loader")
        }, {
            test: /\.(png|jpg|jpeg|svg|gif)$/,
            loader: "url-loader"
        }, {
            test: /\.(ttf|woff|woff2|eot)$/,
            loader: "file-loader"
        }, {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: [
                        "@babel/preset-env"
                    ]
                }
            }
        }]
    }
};