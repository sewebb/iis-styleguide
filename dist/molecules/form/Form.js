"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return Form;
    }
});
const _template = /*#__PURE__*/ _interop_require_default(require("lodash/template"));
const _Events = /*#__PURE__*/ _interop_require_default(require("../../assets/js/Events"));
const _Button = /*#__PURE__*/ _interop_require_default(require("../../atoms/button/Button"));
const _className = /*#__PURE__*/ _interop_require_default(require("../../assets/js/className"));
const _validationMessage = /*#__PURE__*/ _interop_require_default(require("../../assets/js/validationMessage"));
const _request = /*#__PURE__*/ _interop_require_default(require("../../assets/js/request"));
function _extends() {
    _extends = Object.assign || function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source){
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends.apply(this, arguments);
}
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class Form {
    collectInputs() {
        this.inputs = this.element.querySelectorAll('input');
    }
    parseValidationRules() {
        const validationsStr = this.validation.getAttribute('content');
        const validations = validationsStr.split('|');
        if (!validations.length) {
            return;
        }
        this.validationRules = {};
        validations.forEach((validation)=>{
            const [name, rulesStr] = validation.split('=');
            this.validationRules[name] = rulesStr.split(',');
        });
    }
    attach() {
        this.element.addEventListener('submit', this.onSubmit);
        this.element.addEventListener('reset', this.reset);
    }
    updateData() {
        const data = _extends({}, this.data);
        this.collectInputs();
        this.inputs.forEach((input)=>{
            const name = input.getAttribute('name');
            const { value } = input;
            const type = input.getAttribute('type');
            if (type === 'radio' && input.checked || type === 'checkbox' && input.checked || type !== 'checkbox' && type !== 'radio' && value && value.length) {
                data[name] = value;
            } else if (type === 'checkbox' && !input.checked) {
                delete data[name];
            }
        });
        this.data = data;
    }
    validateRule(value, rule, field) {
        const [ruleName, ruleData] = rule.split(':');
        switch(ruleName){
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
    validate() {
        this.errors = {};
        if (!this.validationRules) {
            return true;
        }
        Object.entries(this.validationRules).forEach(([field, rules])=>{
            rules.forEach((rule)=>{
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
    setLoading(loading) {
        if (loading) {
            this.inputs.forEach((input)=>{
                input.disabled = true;
            });
            this.submit.start();
            this.element.classList.add('is-loading');
        } else {
            this.inputs.forEach((input)=>{
                input.disabled = false;
            });
            this.submit.stop();
            this.element.classList.remove('is-loading');
        }
    }
    clearFieldErrors() {
        this.inputs.forEach((input)=>{
            let id = input.getAttribute('aria-describedby');
            if (!id) {
                id = `${input.getAttribute('name')}-help`;
                input.setAttribute('aria-describedby', id);
            }
            const help = document.getElementById(id);
            if (help) {
                help.innerHTML = '';
            }
            const fieldGroup = input.closest('[class*="field-group"]');
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
        const data = _extends({}, this.data);
        const method = this.element.getAttribute('method').toUpperCase() || 'POST';
        const url = this.element.getAttribute('data-form');
        if (this.token) {
            data.token = this.token;
        }
        (0, _request.default)(url, data, method).then(this.onSuccess).catch(this.displayError);
    }
    constructor(element, i18n = null){
        this.onSubmit = (e)=>{
            e.preventDefault();
            this.updateData();
            this.clearFieldErrors();
            if (this.validate()) {
                this.send();
            } else {
                this.displayError({
                    message: this.i18n('Alla fält måste vara ifyllda')
                });
            }
        };
        this.displayError = (error)=>{
            this.events.emit('error', error);
            this.setLoading(false);
            if ('response' in error) {
                const { response } = error;
                if ('data' in response && response.data && response.data.errors) {
                    this.errors = response.data.errors;
                }
            }
            if (Object.keys(this.errors).length) {
                Object.entries(this.errors).forEach(this.displayFieldError);
                return;
            }
            const message = 'response' in error ? error.response.message : error.statusText;
            this.error.classList.remove('is-hidden');
            this.error.innerHTML = message || this.i18n('Något gick fel');
        };
        this.displayFieldError = ([name, error])=>{
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
                help.className = (0, _className.default)('input-help');
                const fieldGroup = input.closest('[class*="field-group"]');
                if (fieldGroup) {
                    fieldGroup.appendChild(help);
                }
            }
            help.innerHTML = error.map(_validationMessage.default).join('<br>');
            const fieldGroup = input.closest('[class*="field-group"]');
            if (fieldGroup) {
                fieldGroup.classList.add('is-invalid');
            }
        };
        this.onSuccess = (json)=>{
            this.setLoading(false);
            const tmpl = (0, _template.default)(this.successMessage);
            this.success.classList.remove('is-hidden');
            this.success.innerHTML = tmpl(json);
            this.events.emit('success', json);
        };
        this.reset = ()=>{
            this.element.reset();
            this.hideMessages();
            this.success.innerHTML = '';
            this.error.innerHTML = '';
        };
        this.element = element;
        this.submit = new _Button.default(this.element.querySelector('button[type="submit"]'));
        this.error = this.element.querySelector('[data-form-error]');
        this.success = this.element.querySelector('[data-form-success]');
        this.events = new _Events.default();
        if (this.success) {
            const tpl = document.getElementById(this.success.getAttribute('data-form-success'));
            this.successMessage = tpl ? tpl.innerHTML : '';
        }
        this.validation = this.element.querySelector('meta[name="form-validation"]');
        this.i18n = i18n;
        if (!this.i18n) {
            this.i18n = (str)=>str;
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
}
