import template from 'lodash.template';
import Button from '../../atoms/button/Button';
import className from '../../assets/js/className';
import validationMessage from '../../assets/js/validationMessage';
import request from '../../assets/js/request';

export default class Form {
	constructor(element, i18n = null) {
		this.element = element;
		this.inputs = this.element.querySelectorAll('input');
		this.submit = new Button(this.element.querySelector('button[type="submit"]'));
		this.error = this.element.querySelector('[data-form-error]');
		this.success = this.element.querySelector('[data-form-success]');

		if (this.success) {
			const tpl = document.getElementById(this.success.getAttribute('data-form-success'));
			this.successMessage = (tpl) ? tpl.innerHTML : '';
		}

		this.validation = this.element.querySelector('meta[name="form-validation"]');
		this.i18n = i18n;

		if (!this.i18n) {
			this.i18n = (str) => str;
		}

		this.data = {};
		this.errors = {};
		this.validationRules = null;

		this.recaptcha = this.element.getAttribute('data-recaptcha');

		if (this.recaptcha) {
			window.captchaCallback = this.captchaCallback;
			this.renderCaptchaForm();
		}

		if (this.validation) {
			this.parseValidationRules();
		}

		this.attach();
	}

	renderCaptchaForm() {
		const s = document.createElement('script');
		s.defer = true;
		s.setAttribute('data-origin', this.recaptcha);
		s.setAttribute('src', 'https://www.google.com/recaptcha/api.js?onload=captchaCallback&render=6LdtNnkUAAAAACYo0vISI-z9tOyr3djjZore-6wY&hl=sv');
		document.body.appendChild(s);
	}

	parseValidationRules() {
		const validationsStr = this.validation.getAttribute('content');
		const validations = validationsStr.split('|');

		if (!validations.length) {
			return;
		}

		this.validationRules = {};

		validations.forEach((validation) => {
			const [name, rulesStr] = validation.split('=');

			this.validationRules[name] = rulesStr.split(',');
		});
	}

	attach() {
		this.element.addEventListener('submit', this.onSubmit);
	}

	updateData() {
		const data = { ...this.data };

		this.inputs.forEach((input) => {
			const name = input.getAttribute('name');
			const { value } = input;
			const type = input.getAttribute('type');

			if ((type === 'radio' && input.checked) || (type === 'checkbox' && input.checked) || (type !== 'checkbox' && type !== 'radio' && value && value.length)) {
				data[name] = value;
			} else if (type === 'checkbox' && !input.checked) {
				delete data[name];
			}
		});

		this.data = data;
	}

	validateRule(value, rule, field) {
		const [ruleName, ruleData] = rule.split(':');

		switch (ruleName) {
			case 'required': {
				return field in this.data;
			}
			case 'min': {
				return !value || value.length >= parseInt(ruleData, 10);
			}
			default: {
				return true;
			}
		}
	}

	validate() {
		this.errors = {};

		if (!this.validationRules) {
			return true;
		}

		Object.entries(this.validationRules).forEach(([field, rules]) => {
			rules.forEach((rule) => {
				if (!this.validateRule(this.data[field], rule, field)) {
					if (!(field in this.errors)) {
						this.errors[field] = [];
					}

					this.errors[field].push(rule);
				}
			});
		});

		return Object.keys(this.errors).length < 1;
	}

	onSubmit = (e) => {
		e.preventDefault();

		this.updateData();
		this.clearFieldErrors();

		if (this.validate()) {
			if (this.recaptcha) {
				this.captchaCallback();
			}

			this.send();
		} else {
			this.displayError({ message: this.i18n('Alla fält måste vara ifyllda') });
		}
	};

	setLoading(loading) {
		if (loading) {
			this.inputs.forEach((input) => { input.disabled = true; });
			this.submit.start();
			this.element.classList.add('is-loading');
		} else {
			this.inputs.forEach((input) => { input.disabled = false; });
			this.submit.stop();
			this.element.classList.remove('is-loading');
		}
	}

	displayError = (error) => {
		this.setLoading(false);

		if ('response' in error) {
			const { response } = error;

			if ('data' in response && response.data.errors) {
				this.errors = response.data.errors;
			}
		}

		if (Object.keys(this.errors).length) {
			Object.entries(this.errors).forEach(this.displayFieldError);

			return;
		}

		const message = ('response' in error) ? error.response.message : error.statusText;

		this.error.classList.remove('is-hidden');
		this.error.innerHTML = message || this.i18n('Något gick fel');
	};

	displayFieldError = ([name, error]) => {
		const input = this.element.querySelector(`[name="${name}"]`);

		if (!input) {
			return;
		}

		let id = input.getAttribute('aria-describedby');

		if (!id) {
			id = `${name}-help`;
			input.setAttribute('aria-describedby', id);
		}

		let help = document.getElementById(id);

		if (!help) {
			help = document.createElement('div');
			help.id = id;
			help.className = className('input-help');

			if (input.getAttribute('type') === 'checkbox') {
				const checkboxParent = input.closest(`.${className('checkbox')}`);

				if (checkboxParent) {
					checkboxParent.parentNode.insertBefore(help, checkboxParent.nextSibling);
				}
			} else {
				input.parentNode.insertBefore(help, input.nextSibling);
			}
		}

		help.innerHTML = error.map(validationMessage).join('<br>');

		const fieldGroup = input.closest('.field-group');

		if (fieldGroup) {
			fieldGroup.classList.add('is-invalid');
		}
	};

	clearFieldErrors() {
		this.inputs.forEach((input) => {
			let id = input.getAttribute('aria-describedby');

			if (!id) {
				id = `${input.getAttribute('name')}-help`;
				input.setAttribute('aria-describedby', id);
			}

			const help = document.getElementById(id);

			if (help) {
				help.innerHTML = '';
			}

			const fieldGroup = input.closest('.field-group');

			if (fieldGroup) {
				fieldGroup.classList.remove('is-invalid');
			}
		});
	}

	hideMessages() {
		this.success.classList.add('is-hidden');
		this.error.classList.add('is-hidden');
	}

	send() {
		this.hideMessages();
		this.setLoading(true);

		const data = { ...this.data };
		const method = this.element.getAttribute('method').toUpperCase() || 'POST';
		const url = this.element.getAttribute('data-form');

		if (this.token) {
			data.token = this.token;
		}

		request(url, data, method)
			.then(this.onSuccess)
			.catch(this.displayError);
	}

	onSuccess = (json) => {
		this.setLoading(false);

		const tmpl = template(this.successMessage);

		this.success.classList.remove('is-hidden');
		this.success.innerHTML = tmpl(json);
	};

	captchaCallback = () => {
		if (typeof window.grecaptcha !== 'undefined' && 'CAPTCHA_KEY' in process.env) {
			/* global grecaptcha */
			grecaptcha.execute(process.env.CAPTCHA_KEY, { action: this.recaptcha })
				.then((token) => {
					this.token = token;
				});
		}
	};
}
