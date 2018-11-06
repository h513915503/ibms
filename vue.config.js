const path = require('path')

module.exports = {
	devServer: {
		proxy: 'http://192.168.0.105:3000'
	},
	chainWebpack: (config) => {
		const svgRule = config.module.rule('svg').include.add(path.join(__dirname, 'src/assets/svg')).end()

		const imagesRule = config.module.rule('images').test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)

		imagesRule.exclude.add(path.join(__dirname, 'src/assets/svg'))
		imagesRule.use('url-loader').loader('url-loader').options({
			limit: 4096,
			fallback: {
				loader: 'file-loader',
				options: {
				name: 'img/[name].[hash:8].[ext]'
				}
			}
        })

		svgRule.uses.clear()

		svgRule.use('svg-sprite-loader').loader('svg-sprite-loader').options({
			name: '[name]',
			prefixze: true
		})

		svgRule.use('svgo-loader').loader('svgo-loader').options({
			plugins: [
				{ removeTitle: true },
				{ convertColors: { shorthex: true } },
				{ convertPathData: true },
				{ cleanupAttrs: true },
				{ removeComments: true },
				{ removeDesc: true },
				{ removeUselessDefs: true },
				{ removeEmptyAttrs: true },
				{ removeHiddenElems: true },
				{ removeEmptyText: true }
			]
		})
	}
}