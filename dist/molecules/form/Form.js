'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash.template');

var _lodash2 = _interopRequireDefault(_lodash);

var _Events = require('../../assets/js/Events');

var _Events2 = _interopRequireDefault(_Events);

var _Button = require('../../atoms/button/Button');

var _Button2 = _interopRequireDefault(_Button);

var _className = require('../../assets/js/className');

var _className2 = _interopRequireDefault(_className);

var _validationMessage = require('../../assets/js/validationMessage');

var _validationMessage2 = _interopRequireDefault(_validationMessage);

var _request = require('../../assets/js/request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Form = function () {
	function Form(element) {
		var _this = this;

		var i18n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

		_classCallCheck(this, Form);

		this.onSubmit = function (e) {
			e.preventDefault();

			_this.updateData();
			_this.clearFieldErrors();

			if (_this.validate()) {
				_this.send();
			} else {
				_this.displayError({ message: _this.i18n('Alla fält måste vara ifyllda') });
			}
		};

		this.displayError = function (error) {
			_this.events.emit('error', error);
			_this.setLoading(false);

			if ('response' in error) {
				var response = error.response;


				if ('data' in response && response.data && response.data.errors) {
					_this.errors = response.data.errors;
				}
			}

			if (Object.keys(_this.errors).length) {
				Object.entries(_this.errors).forEach(_this.displayFieldError);

				return;
			}

			var message = 'response' in error ? error.response.message : error.statusText;

			_this.error.classList.remove('is-hidden');
			_this.error.innerHTML = message || _this.i18n('Något gick fel');
		};

		this.displayFieldError = function (_ref) {
			var _ref2 = _slicedToArray(_ref, 2),
			    name = _ref2[0],
			    error = _ref2[1];

			var input = _this.element.querySelector('[name="' + name + '"]');

			if (!input) {
				return;
			}

			var id = input.getAttribute('aria-describedby');

			if (!id) {
				id = name + '-help';
				input.setAttribute('aria-describedby', id);
			}

			var help = document.getElementById(id);

			if (!help) {
				help = document.createElement('div');
				help.id = id;
				help.className = (0, _className2.default)('input-help');

				var _fieldGroup = input.closest('[class*="field-group"]');

				if (_fieldGroup) {
					_fieldGroup.appendChild(help);
				}
			}

			help.innerHTML = error.map(_validationMessage2.default).join('<br>');

			var fieldGroup = input.closest('[class*="field-group"]');

			if (fieldGroup) {
				fieldGroup.classList.add('is-invalid');
			}
		};

		this.onSuccess = function (json) {
			_this.setLoading(false);

			var tmpl = (0, _lodash2.default)(_this.successMessage);

			_this.success.classList.remove('is-hidden');
			_this.success.innerHTML = tmpl(json);

			_this.events.emit('success', json);
		};

		this.reset = function () {
			_this.element.reset();
			_this.hideMessages();

			_this.success.innerHTML = '';
			_this.error.innerHTML = '';
		};

		this.element = element;
		this.submit = new _Button2.default(this.element.querySelector('button[type="submit"]'));
		this.error = this.element.querySelector('[data-form-error]');
		this.success = this.element.querySelector('[data-form-success]');
		this.events = new _Events2.default();

		if (this.success) {
			var tpl = document.getElementById(this.success.getAttribute('data-form-success'));
			this.successMessage = tpl ? tpl.innerHTML : '';
		}

		this.validation = this.element.querySelector('meta[name="form-validation"]');
		this.i18n = i18n;

		if (!this.i18n) {
			this.i18n = function (str) {
				return str;
			};
		}

		this.data = {};
		this.errors = {};
		this.validationRules = null;

		if (this.validation) {
			this.parseValidationRules();
		}

		this.collectInputs();
		this.attach();
	}

	_createClass(Form, [{
		key: 'collectInputs',
		value: function collectInputs() {
			this.inputs = this.element.querySelectorAll('input');
		}
	}, {
		key: 'parseValidationRules',
		value: function parseValidationRules() {
			var _this2 = this;

			var validationsStr = this.validation.getAttribute('content');
			var validations = validationsStr.split('|');

			if (!validations.length) {
				return;
			}

			this.validationRules = {};

			validations.forEach(function (validation) {
				var _validation$split = validation.split('='),
				    _validation$split2 = _slicedToArray(_validation$split, 2),
				    name = _validation$split2[0],
				    rulesStr = _validation$split2[1];

				_this2.validationRules[name] = rulesStr.split(',');
			});
		}
	}, {
		key: 'attach',
		value: function attach() {
			this.element.addEventListener('submit', this.onSubmit);
			this.element.addEventListener('reset', this.reset);
		}
	}, {
		key: 'updateData',
		value: function updateData() {
			var data = _extends({}, this.data);

			this.collectInputs();
			this.inputs.forEach(function (input) {
				var name = input.getAttribute('name');
				var value = input.value;

				var type = input.getAttribute('type');

				if (type === 'radio' && input.checked || type === 'checkbox' && input.checked || type !== 'checkbox' && type !== 'radio' && value && value.length) {
					data[name] = value;
				} else if (type === 'checkbox' && !input.checked) {
					delete data[name];
				}
			});

			this.data = data;
		}
	}, {
		key: 'validateRule',
		value: function validateRule(value, rule, field) {
			var _rule$split = rule.split(':'),
			    _rule$split2 = _slicedToArray(_rule$split, 2),
			    ruleName = _rule$split2[0],
			    ruleData = _rule$split2[1];

			switch (ruleName) {
				case 'required':
					{
						return field in this.data;
					}
				case 'min':
					{
						return !value || value.length >= parseInt(ruleData, 10);
					}
				default:
					{
						return true;
					}
			}
		}
	}, {
		key: 'validate',
		value: function validate() {
			var _this3 = this;

			this.errors = {};

			if (!this.validationRules) {
				return true;
			}

			Object.entries(this.validationRules).forEach(function (_ref3) {
				var _ref4 = _slicedToArray(_ref3, 2),
				    field = _ref4[0],
				    rules = _ref4[1];

				rules.forEach(function (rule) {
					if (!_this3.validateRule(_this3.data[field], rule, field)) {
						if (!(field in _this3.errors)) {
							_this3.errors[field] = [];
						}

						_this3.errors[field].push(rule);
					}
				});
			});

			return Object.keys(this.errors).length < 1;
		}
	}, {
		key: 'setLoading',
		value: function setLoading(loading) {
			if (loading) {
				this.inputs.forEach(function (input) {
					input.disabled = true;
				});
				this.submit.start();
				this.element.classList.add('is-loading');
			} else {
				this.inputs.forEach(function (input) {
					input.disabled = false;
				});
				this.submit.stop();
				this.element.classList.remove('is-loading');
			}
		}
	}, {
		key: 'clearFieldErrors',
		value: function clearFieldErrors() {
			this.inputs.forEach(function (input) {
				var id = input.getAttribute('aria-describedby');

				if (!id) {
					id = input.getAttribute('name') + '-help';
					input.setAttribute('aria-describedby', id);
				}

				var help = document.getElementById(id);

				if (help) {
					help.innerHTML = '';
				}

				var fieldGroup = input.closest('[class*="field-group"]');

				if (fieldGroup) {
					fieldGroup.classList.remove('is-invalid');
				}
			});
		}
	}, {
		key: 'hideMessages',
		value: function hideMessages() {
			this.success.classList.add('is-hidden');
			this.error.classList.add('is-hidden');
		}
	}, {
		key: 'send',
		value: function send() {
			this.hideMessages();
			this.setLoading(true);

			var data = _extends({}, this.data);
			var method = this.element.getAttribute('method').toUpperCase() || 'POST';
			var url = this.element.getAttribute('data-form');

			if (this.token) {
				data.token = this.token;
			}

			(0, _request2.default)(url, data, method).then(this.onSuccess).catch(this.displayError);
		}
	}]);

	return Form;
}();

exports.default = Form;