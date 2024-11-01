module.exports = {
	status: 'ready',
	default: 'Basic',

	context: {
		author_name: 'Pennan Modemberg',
		author_archive: '',
		archive_text: 'Visa alla artiklar från skribenten',
		author_email: false,
		author_image: '/assets/images/author.png',
		publish_date: '29 september 2020',
		update_date: '2 december 2020',
	},
	variants: [
		{
			name: 'Reviewed by',
			context: {
				publish_date: '29 september 2020',
				reviewer_name: 'Charlotte Sandberg, Polismyndigheten',
				update_date: '2 december 2020'
			},

		}
	]
};
