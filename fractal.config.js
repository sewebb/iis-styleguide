const fractal = module.exports = require('@frctl/fractal').create();
const fs = require('fs');
const host = require('./getNetworkHost');
const packageJson = require('./package.json');
const ports = packageJson.ports;

fractal.web.set('server.port', ports.fractal);

fractal.set('project.title', 'Internetstiftelsen');
fractal.set('components.title', 'Styleguide');
fractal.components.set('path', __dirname + '/src');
fractal.docs.set('path', __dirname + '/docs');
fractal.components.set('default.preview', '@layout');

fractal.web.set('static.path', __dirname + '/public');
fractal.web.set('builder.dest', __dirname + '/build');

var lang = process.env.npm_config_lang || 'en';
var mode = process.env.NODE_ENV || 'production';

const handlebars = require('@frctl/handlebars')({
    helpers: {
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

        getassetspath: function() {
            return (mode === 'development') ? 'http://' + host + ':' + ports.assets + '/' : '/assets';
        },

        isDevelop: function(opts) {
            return (mode === 'development') ? opts.fn(this) : opts.inverse(this);
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

fractal.cli.command('add', {
        description: 'Adds a new component',
        options: [
            ['-n, --name <name>', 'The name of the component']
        ]
    }, (args, done) => {
        if (!args.options.name) {
            return done();
        }

        const name = args.options.name;
        const path = `${__dirname}/${fractal.get('components.path')}/components/${name}`;

        fs.access(path, (err) => {
            if (!err) {
                fractal.console.log(`Component '${name}' already exists`);
                return done();
            }

            fs.mkdir(path, (err) => {
                if (err) {
                    fractal.console.log(err);
                    return done();
                }

                fs.writeFileSync(`${path}/README.md`, '');
                fs.writeFileSync(`${path}/${name}${fractal.get('components.ext')}`, '');

                done();
            });
        });
    }
);
