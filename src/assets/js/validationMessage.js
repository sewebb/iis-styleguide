export default function validationMessage(message) {
	const [rule, data] = message.split(':');

	if (!('Iis_Lang' in window)) {
		return message;
	}

	const { validation } = window.Iis_Lang;

	if (rule in validation) {
		return validation[rule].replace(new RegExp(`:${rule}`, 'g'), data);
	}

	return message;
}
