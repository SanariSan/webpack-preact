import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import esbuild from 'esbuild';
import { EsbuildPlugin } from 'esbuild-loader';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env) => {
  const isProduction = env.production;

  return {
    mode: isProduction ? 'production' : 'development',

    entry: './src/index.tsx',

    optimization: {
      splitChunks: {
        chunks: 'all',
      },
      minimize: true,
      minimizer: [
        new EsbuildPlugin({
          minify: true,
          target: 'es6',
          legalComments: 'none',
        }),
      ],
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      assetModuleFilename: 'assets/[name][ext]',
      // chunkFilename: '[name].chunk.js',
    },

    devtool: isProduction ? false : 'inline-source-map',

    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      alias: {
        react: 'preact/compat',
        'react-dom': 'preact/compat',
      },
    },

    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: [
            // {
            //  // 30% slower when used in chain!
            // loader: 'babel-loader',
            // },
            {
              loader: 'esbuild-loader',
              options: {
                implementation: esbuild,
                loader: 'tsx',
                target: 'es6',
                minify: true,
                legalComments: 'none',
                sourcemap: !isProduction,
                treeShaking: true,
              },
            },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico|webp)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },

    devServer: {
      static: path.join(__dirname, 'public'),
      port: 3000,
      hot: true,
      open: true,
      // liveReload: false,
      // watchFiles
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico',
      }),
    ],
  };
};
