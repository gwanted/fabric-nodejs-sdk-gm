'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SupportCodeLibraryBuilder = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _parameter_type_registry_builder = require('./parameter_type_registry_builder');

var _parameter_type_registry_builder2 = _interopRequireDefault(_parameter_type_registry_builder);

var _build_helpers = require('./build_helpers');

var _finalize_helpers = require('./finalize_helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SupportCodeLibraryBuilder = exports.SupportCodeLibraryBuilder = function () {
  function SupportCodeLibraryBuilder() {
    var _this = this;

    (0, _classCallCheck3.default)(this, SupportCodeLibraryBuilder);

    this.methods = {
      defineParameterType: this.defineParameterType.bind(this),
      After: this.defineTestCaseHook('afterTestCaseHookDefinitions'),
      AfterAll: this.defineTestRunHook('afterTestRunHookDefinitions'),
      Before: this.defineTestCaseHook('beforeTestCaseHookDefinitions'),
      BeforeAll: this.defineTestRunHook('beforeTestRunHookDefinitions'),
      defineStep: this.defineStep.bind(this),
      defineSupportCode: _util2.default.deprecate(function (fn) {
        fn(_this.methods);
      }, 'cucumber: defineSupportCode is deprecated. Please require/import the individual methods instead.'),
      setDefaultTimeout: function setDefaultTimeout(milliseconds) {
        _this.options.defaultTimeout = milliseconds;
      },
      setDefinitionFunctionWrapper: function setDefinitionFunctionWrapper(fn) {
        _this.options.definitionFunctionWrapper = fn;
      },
      setWorldConstructor: function setWorldConstructor(fn) {
        _this.options.World = fn;
      }
    };
    this.methods.Given = this.methods.When = this.methods.Then = this.methods.defineStep;
  }

  (0, _createClass3.default)(SupportCodeLibraryBuilder, [{
    key: 'defineParameterType',
    value: function defineParameterType(options) {
      var parameterType = (0, _build_helpers.buildParameterType)(options);
      this.options.parameterTypeRegistry.defineParameterType(parameterType);
    }
  }, {
    key: 'defineStep',
    value: function defineStep(pattern, options, code) {
      var stepDefinition = (0, _build_helpers.buildStepDefinition)({
        pattern: pattern,
        options: options,
        code: code,
        cwd: this.cwd
      });
      this.options.stepDefinitions.push(stepDefinition);
    }
  }, {
    key: 'defineTestCaseHook',
    value: function defineTestCaseHook(collectionName) {
      var _this2 = this;

      return function (options, code) {
        var hookDefinition = (0, _build_helpers.buildTestCaseHookDefinition)({
          options: options,
          code: code,
          cwd: _this2.cwd
        });
        _this2.options[collectionName].push(hookDefinition);
      };
    }
  }, {
    key: 'defineTestRunHook',
    value: function defineTestRunHook(collectionName) {
      var _this3 = this;

      return function (options, code) {
        var hookDefinition = (0, _build_helpers.buildTestRunHookDefinition)({
          options: options,
          code: code,
          cwd: _this3.cwd
        });
        _this3.options[collectionName].push(hookDefinition);
      };
    }
  }, {
    key: 'finalize',
    value: function finalize() {
      var _this4 = this;

      (0, _finalize_helpers.wrapDefinitions)({
        cwd: this.cwd,
        definitionFunctionWrapper: this.options.definitionFunctionWrapper,
        definitions: _lodash2.default.chain(['afterTestCaseHook', 'afterTestRunHook', 'beforeTestCaseHook', 'beforeTestRunHook', 'step']).map(function (key) {
          return _this4.options[key + 'Definitions'];
        }).flatten().value()
      });
      this.options.afterTestCaseHookDefinitions.reverse();
      this.options.afterTestRunHookDefinitions.reverse();
      return this.options;
    }
  }, {
    key: 'reset',
    value: function reset(cwd) {
      this.cwd = cwd;
      this.options = _lodash2.default.cloneDeep({
        afterTestCaseHookDefinitions: [],
        afterTestRunHookDefinitions: [],
        beforeTestCaseHookDefinitions: [],
        beforeTestRunHookDefinitions: [],
        defaultTimeout: 5000,
        definitionFunctionWrapper: null,
        stepDefinitions: [],
        parameterTypeRegistry: _parameter_type_registry_builder2.default.build(),
        World: function World(_ref) {
          var attach = _ref.attach,
              parameters = _ref.parameters;

          this.attach = attach;
          this.parameters = parameters;
        }
      });
    }
  }]);
  return SupportCodeLibraryBuilder;
}();

exports.default = new SupportCodeLibraryBuilder();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdXBwb3J0X2NvZGVfbGlicmFyeV9idWlsZGVyL2luZGV4LmpzIl0sIm5hbWVzIjpbIlN1cHBvcnRDb2RlTGlicmFyeUJ1aWxkZXIiLCJtZXRob2RzIiwiZGVmaW5lUGFyYW1ldGVyVHlwZSIsImJpbmQiLCJBZnRlciIsImRlZmluZVRlc3RDYXNlSG9vayIsIkFmdGVyQWxsIiwiZGVmaW5lVGVzdFJ1bkhvb2siLCJCZWZvcmUiLCJCZWZvcmVBbGwiLCJkZWZpbmVTdGVwIiwiZGVmaW5lU3VwcG9ydENvZGUiLCJkZXByZWNhdGUiLCJmbiIsInNldERlZmF1bHRUaW1lb3V0Iiwib3B0aW9ucyIsImRlZmF1bHRUaW1lb3V0IiwibWlsbGlzZWNvbmRzIiwic2V0RGVmaW5pdGlvbkZ1bmN0aW9uV3JhcHBlciIsImRlZmluaXRpb25GdW5jdGlvbldyYXBwZXIiLCJzZXRXb3JsZENvbnN0cnVjdG9yIiwiV29ybGQiLCJHaXZlbiIsIldoZW4iLCJUaGVuIiwicGFyYW1ldGVyVHlwZSIsInBhcmFtZXRlclR5cGVSZWdpc3RyeSIsInBhdHRlcm4iLCJjb2RlIiwic3RlcERlZmluaXRpb24iLCJjd2QiLCJzdGVwRGVmaW5pdGlvbnMiLCJwdXNoIiwiY29sbGVjdGlvbk5hbWUiLCJob29rRGVmaW5pdGlvbiIsImRlZmluaXRpb25zIiwiY2hhaW4iLCJtYXAiLCJrZXkiLCJmbGF0dGVuIiwidmFsdWUiLCJhZnRlclRlc3RDYXNlSG9va0RlZmluaXRpb25zIiwicmV2ZXJzZSIsImFmdGVyVGVzdFJ1bkhvb2tEZWZpbml0aW9ucyIsImNsb25lRGVlcCIsImJlZm9yZVRlc3RDYXNlSG9va0RlZmluaXRpb25zIiwiYmVmb3JlVGVzdFJ1bkhvb2tEZWZpbml0aW9ucyIsImJ1aWxkIiwiYXR0YWNoIiwicGFyYW1ldGVycyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBTUE7Ozs7SUFFYUEseUIsV0FB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O0FBY0EsV0FBS3pCLE9BQUwsQ0FBYTBCLDRCQUFiLENBQTBDQyxPQUExQztBQUNBLFdBQUszQixPQUFMLENBQWE0QiwyQkFBYixDQUF5Q0QsT0FBekM7QUFDQSxhQUFPLEtBQUszQixPQUFaO0FBQ0Q7OzswQkFFS2UsRyxFQUFLO0FBQ1QsV0FBS0EsR0FBTCxHQUFXQSxHQUFYO0FBQ0EsV0FBS2YsT0FBTCxHQUFlLGlCQUFFNkIsU0FBRixDQUFZO0FBQ3pCSCxzQ0FBOEIsRUFETDtBQUV6QkUscUNBQTZCLEVBRko7QUFHekJFLHVDQUErQixFQUhOO0FBSXpCQyxzQ0FBOEIsRUFKTDtBQUt6QjlCLHdCQUFnQixJQUxTO0FBTXpCRyxtQ0FBMkIsSUFORjtBQU96QlkseUJBQWlCLEVBUFE7QUFRekJMLCtCQUF1QiwwQ0FBdUJxQixLQUF2QixFQVJFO0FBU3pCMUIsYUFUeUIsdUJBU0s7QUFBQSxjQUF0QjJCLE1BQXNCLFFBQXRCQSxNQUFzQjtBQUFBLGNBQWRDLFVBQWMsUUFBZEEsVUFBYzs7QUFDNUIsZUFBS0QsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsZUFBS0MsVUFBTCxHQUFrQkEsVUFBbEI7QUFDRDtBQVp3QixPQUFaLENBQWY7QUFjRDs7Ozs7a0JBR1ksSUFBSWpELHlCQUFKLEUiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgdXRpbCBmcm9tICd1dGlsJ1xuaW1wb3J0IFRyYW5zZm9ybUxvb2t1cEJ1aWxkZXIgZnJvbSAnLi9wYXJhbWV0ZXJfdHlwZV9yZWdpc3RyeV9idWlsZGVyJ1xuaW1wb3J0IHtcbiAgYnVpbGRQYXJhbWV0ZXJUeXBlLFxuICBidWlsZFN0ZXBEZWZpbml0aW9uLFxuICBidWlsZFRlc3RDYXNlSG9va0RlZmluaXRpb24sXG4gIGJ1aWxkVGVzdFJ1bkhvb2tEZWZpbml0aW9uLFxufSBmcm9tICcuL2J1aWxkX2hlbHBlcnMnXG5pbXBvcnQgeyB3cmFwRGVmaW5pdGlvbnMgfSBmcm9tICcuL2ZpbmFsaXplX2hlbHBlcnMnXG5cbmV4cG9ydCBjbGFzcyBTdXBwb3J0Q29kZUxpYnJhcnlCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5tZXRob2RzID0ge1xuICAgICAgZGVmaW5lUGFyYW1ldGVyVHlwZTogdGhpcy5kZWZpbmVQYXJhbWV0ZXJUeXBlLmJpbmQodGhpcyksXG4gICAgICBBZnRlcjogdGhpcy5kZWZpbmVUZXN0Q2FzZUhvb2soJ2FmdGVyVGVzdENhc2VIb29rRGVmaW5pdGlvbnMnKSxcbiAgICAgIEFmdGVyQWxsOiB0aGlzLmRlZmluZVRlc3RSdW5Ib29rKCdhZnRlclRlc3RSdW5Ib29rRGVmaW5pdGlvbnMnKSxcbiAgICAgIEJlZm9yZTogdGhpcy5kZWZpbmVUZXN0Q2FzZUhvb2soJ2JlZm9yZVRlc3RDYXNlSG9va0RlZmluaXRpb25zJyksXG4gICAgICBCZWZvcmVBbGw6IHRoaXMuZGVmaW5lVGVzdFJ1bkhvb2soJ2JlZm9yZVRlc3RSdW5Ib29rRGVmaW5pdGlvbnMnKSxcbiAgICAgIGRlZmluZVN0ZXA6IHRoaXMuZGVmaW5lU3RlcC5iaW5kKHRoaXMpLFxuICAgICAgZGVmaW5lU3VwcG9ydENvZGU6IHV0aWwuZGVwcmVjYXRlKGZuID0+IHtcbiAgICAgICAgZm4odGhpcy5tZXRob2RzKVxuICAgICAgfSwgJ2N1Y3VtYmVyOiBkZWZpbmVTdXBwb3J0Q29kZSBpcyBkZXByZWNhdGVkLiBQbGVhc2UgcmVxdWlyZS9pbXBvcnQgdGhlIGluZGl2aWR1YWwgbWV0aG9kcyBpbnN0ZWFkLicpLFxuICAgICAgc2V0RGVmYXVsdFRpbWVvdXQ6IG1pbGxpc2Vjb25kcyA9PiB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5kZWZhdWx0VGltZW91dCA9IG1pbGxpc2Vjb25kc1xuICAgICAgfSxcbiAgICAgIHNldERlZmluaXRpb25GdW5jdGlvbldyYXBwZXI6IGZuID0+IHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmRlZmluaXRpb25GdW5jdGlvbldyYXBwZXIgPSBmblxuICAgICAgfSxcbiAgICAgIHNldFdvcmxkQ29uc3RydWN0b3I6IGZuID0+IHtcbiAgICAgICAgdGhpcy5vcHRpb25zLldvcmxkID0gZm5cbiAgICAgIH0sXG4gICAgfVxuICAgIHRoaXMubWV0aG9kcy5HaXZlbiA9IHRoaXMubWV0aG9kcy5XaGVuID0gdGhpcy5tZXRob2RzLlRoZW4gPSB0aGlzLm1ldGhvZHMuZGVmaW5lU3RlcFxuICB9XG5cbiAgZGVmaW5lUGFyYW1ldGVyVHlwZShvcHRpb25zKSB7XG4gICAgY29uc3QgcGFyYW1ldGVyVHlwZSA9IGJ1aWxkUGFyYW1ldGVyVHlwZShvcHRpb25zKVxuICAgIHRoaXMub3B0aW9ucy5wYXJhbWV0ZXJUeXBlUmVnaXN0cnkuZGVmaW5lUGFyYW1ldGVyVHlwZShwYXJhbWV0ZXJUeXBlKVxuICB9XG5cbiAgZGVmaW5lU3RlcChwYXR0ZXJuLCBvcHRpb25zLCBjb2RlKSB7XG4gICAgY29uc3Qgc3RlcERlZmluaXRpb24gPSBidWlsZFN0ZXBEZWZpbml0aW9uKHtcbiAgICAgIHBhdHRlcm4sXG4gICAgICBvcHRpb25zLFxuICAgICAgY29kZSxcbiAgICAgIGN3ZDogdGhpcy5jd2QsXG4gICAgfSlcbiAgICB0aGlzLm9wdGlvbnMuc3RlcERlZmluaXRpb25zLnB1c2goc3RlcERlZmluaXRpb24pXG4gIH1cblxuICBkZWZpbmVUZXN0Q2FzZUhvb2soY29sbGVjdGlvbk5hbWUpIHtcbiAgICByZXR1cm4gKG9wdGlvbnMsIGNvZGUpID0+IHtcbiAgICAgIGNvbnN0IGhvb2tEZWZpbml0aW9uID0gYnVpbGRUZXN0Q2FzZUhvb2tEZWZpbml0aW9uKHtcbiAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgY29kZSxcbiAgICAgICAgY3dkOiB0aGlzLmN3ZCxcbiAgICAgIH0pXG4gICAgICB0aGlzLm9wdGlvbnNbY29sbGVjdGlvbk5hbWVdLnB1c2goaG9va0RlZmluaXRpb24pXG4gICAgfVxuICB9XG5cbiAgZGVmaW5lVGVzdFJ1bkhvb2soY29sbGVjdGlvbk5hbWUpIHtcbiAgICByZXR1cm4gKG9wdGlvbnMsIGNvZGUpID0+IHtcbiAgICAgIGNvbnN0IGhvb2tEZWZpbml0aW9uID0gYnVpbGRUZXN0UnVuSG9va0RlZmluaXRpb24oe1xuICAgICAgICBvcHRpb25zLFxuICAgICAgICBjb2RlLFxuICAgICAgICBjd2Q6IHRoaXMuY3dkLFxuICAgICAgfSlcbiAgICAgIHRoaXMub3B0aW9uc1tjb2xsZWN0aW9uTmFtZV0ucHVzaChob29rRGVmaW5pdGlvbilcbiAgICB9XG4gIH1cblxuICBmaW5hbGl6ZSgpIHtcbiAgICB3cmFwRGVmaW5pdGlvbnMoe1xuICAgICAgY3dkOiB0aGlzLmN3ZCxcbiAgICAgIGRlZmluaXRpb25GdW5jdGlvbldyYXBwZXI6IHRoaXMub3B0aW9ucy5kZWZpbml0aW9uRnVuY3Rpb25XcmFwcGVyLFxuICAgICAgZGVmaW5pdGlvbnM6IF8uY2hhaW4oW1xuICAgICAgICAnYWZ0ZXJUZXN0Q2FzZUhvb2snLFxuICAgICAgICAnYWZ0ZXJUZXN0UnVuSG9vaycsXG4gICAgICAgICdiZWZvcmVUZXN0Q2FzZUhvb2snLFxuICAgICAgICAnYmVmb3JlVGVzdFJ1bkhvb2snLFxuICAgICAgICAnc3RlcCcsXG4gICAgICBdKVxuICAgICAgICAubWFwKGtleSA9PiB0aGlzLm9wdGlvbnNbYCR7a2V5fURlZmluaXRpb25zYF0pXG4gICAgICAgIC5mbGF0dGVuKClcbiAgICAgICAgLnZhbHVlKCksXG4gICAgfSlcbiAgICB0aGlzLm9wdGlvbnMuYWZ0ZXJUZXN0Q2FzZUhvb2tEZWZpbml0aW9ucy5yZXZlcnNlKClcbiAgICB0aGlzLm9wdGlvbnMuYWZ0ZXJUZXN0UnVuSG9va0RlZmluaXRpb25zLnJldmVyc2UoKVxuICAgIHJldHVybiB0aGlzLm9wdGlvbnNcbiAgfVxuXG4gIHJlc2V0KGN3ZCkge1xuICAgIHRoaXMuY3dkID0gY3dkXG4gICAgdGhpcy5vcHRpb25zID0gXy5jbG9uZURlZXAoe1xuICAgICAgYWZ0ZXJUZXN0Q2FzZUhvb2tEZWZpbml0aW9uczogW10sXG4gICAgICBhZnRlclRlc3RSdW5Ib29rRGVmaW5pdGlvbnM6IFtdLFxuICAgICAgYmVmb3JlVGVzdENhc2VIb29rRGVmaW5pdGlvbnM6IFtdLFxuICAgICAgYmVmb3JlVGVzdFJ1bkhvb2tEZWZpbml0aW9uczogW10sXG4gICAgICBkZWZhdWx0VGltZW91dDogNTAwMCxcbiAgICAgIGRlZmluaXRpb25GdW5jdGlvbldyYXBwZXI6IG51bGwsXG4gICAgICBzdGVwRGVmaW5pdGlvbnM6IFtdLFxuICAgICAgcGFyYW1ldGVyVHlwZVJlZ2lzdHJ5OiBUcmFuc2Zvcm1Mb29rdXBCdWlsZGVyLmJ1aWxkKCksXG4gICAgICBXb3JsZCh7IGF0dGFjaCwgcGFyYW1ldGVycyB9KSB7XG4gICAgICAgIHRoaXMuYXR0YWNoID0gYXR0YWNoXG4gICAgICAgIHRoaXMucGFyYW1ldGVycyA9IHBhcmFtZXRlcnNcbiAgICAgIH0sXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgU3VwcG9ydENvZGVMaWJyYXJ5QnVpbGRlcigpXG4iXX0=