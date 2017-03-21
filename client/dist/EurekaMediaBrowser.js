'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _Eureka = require('./Eureka');

var _Eureka2 = _interopRequireDefault(_Eureka);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var actions = require('./model/actions'),
    store = require('./model/store');

var EurekaMediaBrowser = function (_Component) {
  _inherits(EurekaMediaBrowser, _Component);

  function EurekaMediaBrowser(props) {
    _classCallCheck(this, EurekaMediaBrowser);

    var _this = _possibleConstructorReturn(this, (EurekaMediaBrowser.__proto__ || Object.getPrototypeOf(EurekaMediaBrowser)).call(this, props));

    store.dispatch(actions.updateConfig(props));

    store.subscribe(function () {
      var state = store.getState();
      console.log(state);
      /*try {
        const siteName = title.dataset.siteName,
        title = document.querySelector('head > title'),
        ct = (`${state.content.cd} of ${state.source.sources[state.source.currentSource].name} media source`);
        title.innerHTML = `${ct} | ${siteName}`;
      } catch (e) {}*/

      if (state.config.useLocalStorage) {
        try {
          localStorage.setItem(state.config.storagePrefix + 'currentDirectory', state.content.cd);
          localStorage.setItem(state.config.storagePrefix + 'source', JSON.stringify(state.source));
          localStorage.setItem(state.config.storagePrefix + 'mode', state.view.mode);
          localStorage.setItem(state.config.storagePrefix + 'sort', state.view.sort);
          localStorage.setItem(state.config.storagePrefix + 'treeHidden', !state.view.sourceTreeOpen);
        } catch (e) {}
      }
    });
    return _this;
  }

  _createClass(EurekaMediaBrowser, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.EurekaController = (0, _reactRedux.connect)(function (state, props) {
        // todo list
        return {
          content: state.content,
          view: state.view,
          tree: state.tree,
          source: state.source,
          directory: state.directory,
          fetched: state.fetched,
          config: state.config
        };
      })(_Eureka2.default);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(this.EurekaController, null)
      );
    }
  }]);

  return EurekaMediaBrowser;
}(_react.Component);

exports.default = EurekaMediaBrowser;