"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var typings = require('./transmit-transparently.type');
var others_1 = require('../others/others');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function () {
    for (var _len = arguments.length, ignore = Array(_len), _key = 0; _key < _len; _key++) {
        ignore[_key] = arguments[_key];
    }

    return function (Target) {
        var Transmit = function (_React$Component) {
            _inherits(Transmit, _React$Component);

            function Transmit() {
                var _ref;

                _classCallCheck(this, Transmit);

                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                var _this = _possibleConstructorReturn(this, (_ref = Transmit.__proto__ || Object.getPrototypeOf(Transmit)).call.apply(_ref, [this].concat(args)));

                _this.state = new typings.State();
                _this.displayName = 'TransmitTransparently';
                return _this;
            }

            _createClass(Transmit, [{
                key: 'render',
                value: function render() {
                    var _this2 = this;

                    var newProps = _extends({}, this.props);
                    newProps.others = others_1.default(Target.defaultProps, newProps, ignore);
                    newProps.ref = function (ref) {
                        _this2.wrappedInstance = ref;
                    };
                    return React.createElement(Target, newProps, this.props.children);
                }
            }]);

            return Transmit;
        }(React.Component);

        Transmit.defaultProps = new typings.Props();
        var func = function func() {
            return Transmit;
        };
        return func();
    };
};