const objToQuery = (obj, exclude = [], parent = null) => {
	const query = [];

	Object.entries(obj).forEach(([key, value]) => {
		if (exclude.indexOf(key) > -1) {
			return;
		}

		const queryKey = (parent) ? `${parent}[${key}]` : key;

		if (Array.isArray(value)) {
			value.forEach((subValue) => query.push(`${queryKey}[]=${encodeURIComponent(subValue)}`));
		} else if (typeof value === 'object') {
			query.push(objToQuery(value, exclude, queryKey));
		} else {
			query.push(`${queryKey}=${encodeURIComponent(value)}`);
		}
	});

	return query.join('&');
};

export default (obj, exclude) => objToQuery(obj, exclude);
