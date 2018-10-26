const path = require('path')

module.exports = {
	// devServer: {
	// 	proxy: 'http://apitest-sass.jinghao.com'
	// },
	chainWebpack: (config) => {
		const svgRule = config.module.rule('svg').include.add(path.join(__dirname, 'src/assets/svg')).end()

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