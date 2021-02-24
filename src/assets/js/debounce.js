const debounce = (func, delay = []) => {
	let inDebounce;

	return (...args) => {
		const context = this;
		clearTimeout(inDebounce);
		inDebounce = setTimeout(() => func.apply(context, args), delay);
	};
};

export default (func, delay) => debounce(func, delay);
