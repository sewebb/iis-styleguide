'use strict';

const fs = require('fs');
const packageJson = require('./package.json');
const ports = packageJson.ports;
/*
* Require the path module
*/
const path = require('path');

/*
 * Require the Fractal module
 */
const fractal = module.exports = require('@frctl/fractal').create();

/* Theme */
const myCustomisedTheme = require('@frctl/mandelbrot')({
    'skin': 'default',
	'favicon': 'https://static.internetstiftelsen.se/favicons/favicon.ico',
	'styles': ['default','/theme-overrides/css/default.css']
});

// specify a directory to hold the theme override templates
myCustomisedTheme.addLoadPath(__dirname + '/theme-overrides');

fractal.web.theme(myCustomisedTheme);

/*
 * Give your project a title.
 */
fractal.set('project.title', 'Internetstiftelsen Styleguide');

/*
 * Tell Fractal where to look for components.
 */
fractal.components.set('path', path.join(__dirname, 'src'));
fractal.components.set('label', 'Contents');

/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.docs.set('path', path.join(__dirname, 'docs'));

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', path.join(__dirname, 'public'));

/*
 * Tell the Fractal where to build static site.
 */
fractal.web.set('builder.dest', __dirname + '/build');

fractal.web.set('server.syncOptions', {
	watchOptions: {
		ignored: [path.resolve('public/assets/css/app.css'),path.resolve('src/app.js'), path.resolve('src/assets/css/**/*.css'), path.resolve('src/**/*.scss')],
	},
	files: ['public/assets/js/scripts.js', 'public/assets/css/app.min.css']
});

const handlebars = require('@frctl/handlebars')({
	helpers: {
		fileExists: function(path) {
			return fs.existsSync(path);
		},
		read: function(path) {
			return fs.existsSync(path) ? fs.readFileSync(path, 'utf8') : '';
		},
		jsonParse: function(string) {
			try {
				return JSON.parse(string);
			} catch (e) {
				return {};
			}
		},
		manifestCss: function(manifest, path) {
			return manifest[path]?.css?.[0] || '';
		},
		attr: function(attr) {
			let obj,
				str = '';

			if (typeof attr === 'string') {
				attr = attr.replace(/\'/g, '"');
				obj = JSON.parse(attr);
			} else {
				obj = attr;
			}

			for (let prop in obj) {
				if (obj.hasOwnProperty(prop)) {
					str += prop + '=' + obj[prop] + ' ';
				}
			}

			str = str.trim();
			return str;
		},

		ifequals: function(a, b, opts) {
			return (a === b) ? opts.fn(this) : opts.inverse(this);
		},
		unlessequals: function(a, b, opts) {
			return (a !== b) ? opts.fn(this) : opts.inverse(this);
		},
		and: function () {
			return Array.prototype.slice.call(arguments).every(Boolean);
		},
		or: function () {
			return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
		},
		getcomponent: function(str) {
			return '@' + str;
		},

		concat: function() {
			var str = '';

			for (var arg in arguments){
				if (typeof arguments[arg] != 'object') {
					str += arguments[arg];
				}
			}
			return str;
		},

		getmodifiers: (modifiers = [], prefix = '') => {
			let m = [];

			if (typeof modifiers === 'string') {
				m = modifiers.split(',');

				for (let i = 0; i < m.length; i++) {
					m[i] = m[i].trim();
				}
			} else {
				m = modifiers;
			}

			if (prefix && typeof prefix === 'string') {
				m = m.map(i => prefix + '--' + i);
			}
			return m.join(' ');
		},

		switch: function(value, options) {
			this._switch_value_ = value;
			var html = options.fn(this);
			delete this._switch_value_;
			return html;
		},

		case: function() {
			var args = Array.prototype.slice.call(arguments);
			var options    = args.pop();
			var caseValues = args;

			if (caseValues.indexOf(this._switch_value_) === -1) {
				return '';
			} else {
				return options.fn(this);
			}
		},

		each_upto: function(ary, max, options) {
			if(!ary || ary.length == 0)
				return options.inverse(this);

			var result = [ ];
			for(var i = 0; i < max && i < ary.length; ++i)
				result.push(options.fn(ary[i]));
			return result.join('');

		},

		tolowercase: function(str) {
			return str.toLowerCase();
		},

		getelement: function(el, fallback) {
			if (typeof el === 'string') {
				return el;
			}

			return fallback;
		}
	},
	loadHelpers: true
});

fractal.components.engine(handlebars);
