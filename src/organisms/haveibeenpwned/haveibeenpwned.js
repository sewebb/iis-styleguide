import track from '../../assets/js/track';

const haveIBeenPwnedSubmit = document.querySelector('#o-search-result-submit');
haveIBeenPwnedSubmit.addEventListener('submit', function() {
	track({
		event: 'guided_tour',
	});
});
