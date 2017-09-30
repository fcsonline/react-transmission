'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = printICUMessage;

var _intlMessageformatParser = require('intl-messageformat-parser');

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _glob = require('glob');

var _mkdirp = require('mkdirp');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MESSAGES_PATTERN = './build/messages/**/*.json';
var LANG_DIR = './build/lang/';

var ESCAPED_CHARS = {
    '\\': '\\\\',
    '\\#': '\\#',
    '{': '\\{',
    '}': '\\}'
};

var ESAPE_CHARS_REGEXP = /\\#|[{}\\]/g;

function printICUMessage(ast) {
    return ast.elements.reduce(function (message, el) {
        var format = el.format,
            id = el.id,
            type = el.type,
            value = el.value;


        if (type === 'messageTextElement') {
            return message + value.replace(ESAPE_CHARS_REGEXP, function (char) {
                return ESCAPED_CHARS[char];
            });
        }

        if (!format) {
            return message + ('{' + id + '}');
        }

        var formatType = format.type.replace(/Format$/, '');

        var style = void 0,
            offset = void 0,
            options = void 0;

        switch (formatType) {
            case 'number':
            case 'date':
            case 'time':
                style = format.style ? ', ' + format.style : '';
                return message + ('{' + id + ', ' + formatType + style + '}');

            case 'plural':
            case 'selectOrdinal':
            case 'select':
                offset = format.offset ? ', offset:' + format.offset : '';
                options = format.options.reduce(function (str, option) {
                    var optionValue = printICUMessage(option.value);
                    return str + (' ' + option.selector + ' {' + optionValue + '}');
                }, '');
                return message + ('{' + id + ', ' + formatType + offset + ',' + options + '}');
        }
    }, '');
}

var Translator = function () {
    function Translator(translateText) {
        _classCallCheck(this, Translator);

        this.translateText = translateText;
    }

    _createClass(Translator, [{
        key: 'translate',
        value: function translate(message) {
            var ast = (0, _intlMessageformatParser.parse)(message);
            var translated = this.transform(ast);
            return print(translated);
        }
    }, {
        key: 'transform',
        value: function transform(ast) {
            var _this = this;

            ast.elements.forEach(function (el) {
                if (el.type === 'messageTextElement') {
                    el.value = _this.translateText(el.value);
                } else {
                    var options = el.format && el.format.options;
                    if (options) {
                        options.forEach(function (option) {
                            return _this.transform(option.value);
                        });
                    }
                }
            });

            return ast;
        }
    }]);

    return Translator;
}();

var defaultMessages = (0, _glob.sync)(MESSAGES_PATTERN).map(function (filename) {
    return fs.readFileSync(filename, 'utf8');
}).map(function (file) {
    return JSON.parse(file);
}).reduce(function (collection, descriptors) {
    descriptors.forEach(function (_ref) {
        var id = _ref.id,
            defaultMessage = _ref.defaultMessage;

        if (collection.hasOwnProperty(id)) {
            throw new Error('Duplicate message id: ' + id);
        }

        collection[id] = defaultMessage;
    });

    return collection;
}, {});

(0, _mkdirp.sync)(LANG_DIR);
fs.writeFileSync(LANG_DIR + 'en.json', JSON.stringify(defaultMessages, null, 2));

