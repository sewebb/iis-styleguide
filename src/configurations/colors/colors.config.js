// const colors = require('../../../getColors');
//
// const getVariants = (colors) => {
// 	const variants = [];
//
// 	for (let color in colors) {
// 		variants.push({
// 			name: color.replace('$', ''),
// 			context: {
// 				title: color,
// 				name: color.replace('$color-', ''),
// 				hex: colors[color].toUpperCase(),
// 				rgb: color.replace('$rgb-', '')
// 			}
// 		});
// 	}
//
// 	console.log(variants);
// 	return variants;
// };
//
// module.exports = {
// 	status: 'wip',
// 	order: -1,
// 	preview: '@layout-colors',
// 	collated: true,
// 	default: getVariants(colors)[0].name,
// 	context: {
// 		title: '',
// 		name: '',
// 		hex: '',
// 		rgb: '',
// 		cmyk: '',
// 		pms: ''
// 	},
// 	variants: getVariants(colors)
// };

module.exports = {
	status: 'wip',

	context: {
		sass: 'SASS',
		hex: 'HEX',
		rgb: 'RGB',
		cmyk: 'CMYK',
		pms: 'PMS',
		colors: [
			{
				name: 'black',
				title: '$color-black',
				hex: '#000000',
				rgb: '0 0 0',
				cmyk: '50 50 50 100',
				pms: 'n/a',
				hasBorder: false
			},
			{
				name: 'snow',
				title: '$color-snow',
				hex: '#ffffff',
				rgb: '255 255 255',
				cmyk: '0 0 0 0',
				pms: 'n/a',
				hasBorder: true
			},
			{
				name: 'granit',
				title: '$color-granit',
				hex: '#8E9297',
				rgb: 'n/a',
				cmyk: 'n/a',
				pms: 'n/a',
				hasBorder: false
			},
			{
				name: 'ash',
				title: '$color-ash',
				hex: '#ededed',
				rgb: 'n/a',
				cmyk: 'n/a',
				pms: 'n/a'
			},
			{
				name: 'ruby',
				title: '$color-ruby',
				hex: '#ff4069',
				rgb: '255 64 105',
				cmyk: '0 84 38 0',
				pms: '1925U',
				hasBorder: false
			},
			{
				name: 'ruby-light',
				title: '$color-ruby-light',
				hex: '#ff9fb4',
				rgb: '255 109 180',
				cmyk: '0 51 13 0',
				pms: '708UP',
				hasBorder: false
			},
			{
				name: 'peacock',
				title: '$color-peacock',
				hex: '#c27fec',
				rgb: '194 127 236',
				cmyk: '41 54 0 0',
				pms: '2655U',
				hasBorder: false
			},
			{
				name: 'peacock-light',
				title: '$color-peacock-light',
				hex: '#e0bff5',
				rgb: '224 191 245',
				cmyk: '17 30 0 0',
				pms: '2635U',
				hasBorder: false
			},
			{
				name: 'jade',
				title: '$color-jade',
				hex: '#55c7b4',
				rgb: '85 199 180',
				cmyk: '58 0 30 0',
				pms: '325U',
				hasBorder: false
			},
			{
				name: 'jade-light',
				title: '$color-jade-light',
				hex: '#aae3d9',
				rgb: '170 227 217',
				cmyk: '28 0 20 0',
				pms: '324U',
				hasBorder: false
			},
			{
				name: 'sandstone',
				title: '$color-sandstone',
				hex: '#f99963',
				rgb: '249 153 99',
				cmyk: '0 39 50 0',
				pms: '473U'
			},
			{
				name: 'sandstone-light',
				title: '$color-sandstone-light',
				hex: '#fcccb1',
				rgb: '249 153 99',
				cmyk: '1 20 30 0',
				pms: '719UP',
				hasBorder: false
			},
			{
				name: 'lemon',
				title: '$color-lemon',
				hex: '#ffce2e',
				rgb: '255 206 46',
				cmyk: '0 20 86 0',
				pms: '120U'
			},
			{
				name: 'lemon-light',
				title: '$color-lemon-light',
				hex: '#ffe696',
				rgb: '255 230 150',
				cmyk: '0 9 50 0',
				pms: '1215UP',
				hasBorder: false
			},
			{
				name: 'ocean',
				title: '$color-ocean',
				hex: '#50b2fc',
				rgb: '80 178 256',
				cmyk: '69 10 0 0',
				pms: '299U',
				hasBorder: false
			},
			{
				name: 'ocean-light',
				title: '$color-ocean-light',
				hex: '#a7d8fd',
				rgb: '167 216 253',
				cmyk: '35 5 1 0',
				pms: '2830U',
				hasBorder: false
			}
		]
	}
}
