'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildTestCaseHookDefinition = buildTestCaseHookDefinition;
exports.buildTestRunHookDefinition = buildTestRunHookDefinition;
exports.buildStepDefinition = buildStepDefinition;
exports.buildParameterType = buildParameterType;

var _util = require('util');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _helpers = require('../formatter/helpers');

var _cucumberExpressions = require('cucumber-expressions');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _stacktraceJs = require('stacktrace-js');

var _stacktraceJs2 = _interopRequireDefault(_stacktraceJs);

var _step_definition = require('../models/step_definition');

var _step_definition2 = _interopRequireDefault(_step_definition);

var _test_case_hook_definition = require('../models/test_case_hook_definition');

var _test_case_hook_definition2 = _interopRequireDefault(_test_case_hook_definition);

var _test_run_hook_definition = require('../models/test_run_hook_definition');

var _test_run_hook_definition2 = _interopRequireDefault(_test_run_hook_definition);

var _validate_arguments = require('./validate_arguments');

var _validate_arguments2 = _interopRequireDefault(_validate_arguments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildTestCaseHookDefinition(_ref) {
  var options = _ref.options,
      code = _ref.code,
      cwd = _ref.cwd;

  if (typeof options === 'string') {
    options = { tags: options };
  } else if (typeof options === 'function') {
    code = options;
    options = {};
  }

  var _getDefinitionLineAnd = getDefinitionLineAndUri(cwd),
      line = _getDefinitionLineAnd.line,
      uri = _getDefinitionLineAnd.uri;

  (0, _validate_arguments2.default)({
    args: { code: code, options: options },
    fnName: 'defineTestCaseHook',
    location: (0, _helpers.formatLocation)({ line: line, uri: uri })
  });
  return new _test_case_hook_definition2.default({
    code: code,
    line: line,
    options: options,
    uri: uri
  });
}

function buildTestRunHookDefinition(_ref2) {
  var options = _ref2.options,
      code = _ref2.code,
      cwd = _ref2.cwd;

  if (typeof options === 'string') {
    options = { tags: options };
  } else if (typeof options === 'function') {
    code = options;
    options = {};
  }

  var _getDefinitionLineAnd2 = getDefinitionLineAndUri(cwd),
      line = _getDefinitionLineAnd2.line,
      uri = _getDefinitionLineAnd2.uri;

  (0, _validate_arguments2.default)({
    args: { code: code, options: options },
    fnName: 'defineTestRunHook',
    location: (0, _helpers.formatLocation)({ line: line, uri: uri })
  });
  return new _test_run_hook_definition2.default({
    code: code,
    line: line,
    options: options,
    uri: uri
  });
}

function buildStepDefinition(_ref3) {
  var pattern = _ref3.pattern,
      options = _ref3.options,
      code = _ref3.code,
      cwd = _ref3.cwd;

  if (typeof options === 'function') {
    code = options;
    options = {};
  }

  var _getDefinitionLineAnd3 = getDefinitionLineAndUri(cwd),
      line = _getDefinitionLineAnd3.line,
      uri = _getDefinitionLineAnd3.uri;

  (0, _validate_arguments2.default)({
    args: { code: code, pattern: pattern, options: options },
    fnName: 'defineStep',
    location: (0, _helpers.formatLocation)({ line: line, uri: uri })
  });
  return new _step_definition2.default({
    code: code,
    line: line,
    options: options,
    pattern: pattern,
    uri: uri
  });
}

var projectPath = _path2.default.join(__dirname, '..', '..');
var projectSrcPath = _path2.default.join(projectPath, 'src');
var projectLibPath = _path2.default.join(projectPath, 'lib');

function getDefinitionLineAndUri(cwd) {
  var line = 'unknown';
  var uri = 'unknown';
  var stackframes = _stacktraceJs2.default.getSync();
  var stackframe = _lodash2.default.find(stackframes, function (frame) {
    var filename = frame.getFileName();
    return !_lodash2.default.includes(filename, projectSrcPath) && !_lodash2.default.includes(filename, projectLibPath);
  });
  if (stackframe) {
    line = stackframe.getLineNumber();
    uri = stackframe.getFileName();
    if (uri) {
      uri = _path2.default.relative(cwd, uri);
    }
  }
  return { line: line, uri: uri };
}

function buildParameterType(_ref4) {
  var name = _ref4.name,
      typeName = _ref4.typeName,
      regexp = _ref4.regexp,
      transformer = _ref4.transformer,
      useForSnippets = _ref4.useForSnippets,
      preferForRegexpMatch = _ref4.preferForRegexpMatch;

  var getTypeName = (0, _util.deprecate)(function () {
    return typeName;
  }, 'Cucumber defineParameterType: Use name instead of typeName');
  var _name = name || getTypeName();
  if (typeof useForSnippets !== 'boolean') useForSnippets = true;
  if (typeof preferForRegexpMatch !== 'boolean') preferForRegexpMatch = false;
  return new _cucumberExpressions.ParameterType(_name, regexp, null, transformer, useForSnippets, preferForRegexpMatch);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdXBwb3J0X2NvZGVfbGlicmFyeV9idWlsZGVyL2J1aWxkX2hlbHBlcnMuanMiXSwibmFtZXMiOlsiYnVpbGRUZXN0Q2FzZUhvb2tEZWZpbml0aW9uIiwiYnVpbGRUZXN0UnVuSG9va0RlZmluaXRpb24iLCJidWlsZFN0ZXBEZWZpbml0aW9uIiwiYnVpbGRQYXJhbWV0ZXJUeXBlIiwib3B0aW9ucyIsImNvZGUiLCJjd2QiLCJ0YWdzIiwiZ2V0RGVmaW5pdGlvbkxpbmVBbmRVcmkiLCJsaW5lIiwidXJpIiwiYXJncyIsImZuTmFtZSIsImxvY2F0aW9uIiwicGF0dGVybiIsInByb2plY3RQYXRoIiwiam9pbiIsIl9fZGlybmFtZSIsInByb2plY3RTcmNQYXRoIiwicHJvamVjdExpYlBhdGgiLCJzdGFja2ZyYW1lcyIsImdldFN5bmMiLCJzdGFja2ZyYW1lIiwiZmluZCIsImZpbGVuYW1lIiwiZnJhbWUiLCJnZXRGaWxlTmFtZSIsImluY2x1ZGVzIiwiZ2V0TGluZU51bWJlciIsInJlbGF0aXZlIiwibmFtZSIsInR5cGVOYW1lIiwicmVnZXhwIiwidHJhbnNmb3JtZXIiLCJ1c2VGb3JTbmlwcGV0cyIsInByZWZlckZvclJlZ2V4cE1hdGNoIiwiZ2V0VHlwZU5hbWUiLCJfbmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFXZ0JBLDJCLEdBQUFBLDJCO1FBcUJBQywwQixHQUFBQSwwQjtRQXFCQUMsbUIsR0FBQUEsbUI7UUE2Q0FDLGtCLEdBQUFBLGtCOztBQWxHaEI7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVPLFNBQVNILDJCQUFULE9BQTZEO0FBQUEsTUFBdEJJLE9BQXNCLFFBQXRCQSxPQUFzQjtBQUFBLE1BQWJDLElBQWEsUUFBYkEsSUFBYTtBQUFBLE1BQVBDLEdBQU8sUUFBUEEsR0FBTzs7QUFDbEUsTUFBSSxPQUFPRixPQUFQLEtBQW1CLFFBQXZC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L0MsU0FBTyx1Q0FDTEUsS0FESyxFQUVMTCxNQUZLLEVBR0wsSUFISyxFQUlMQyxXQUpLLEVBS0xDLGNBTEssRUFNTEMsb0JBTkssQ0FBUDtBQVFEIiwiZmlsZSI6ImJ1aWxkX2hlbHBlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZXByZWNhdGUgfSBmcm9tICd1dGlsJ1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IHsgZm9ybWF0TG9jYXRpb24gfSBmcm9tICcuLi9mb3JtYXR0ZXIvaGVscGVycydcbmltcG9ydCB7IFBhcmFtZXRlclR5cGUgfSBmcm9tICdjdWN1bWJlci1leHByZXNzaW9ucydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgU3RhY2tUcmFjZSBmcm9tICdzdGFja3RyYWNlLWpzJ1xuaW1wb3J0IFN0ZXBEZWZpbml0aW9uIGZyb20gJy4uL21vZGVscy9zdGVwX2RlZmluaXRpb24nXG5pbXBvcnQgVGVzdENhc2VIb29rRGVmaW5pdGlvbiBmcm9tICcuLi9tb2RlbHMvdGVzdF9jYXNlX2hvb2tfZGVmaW5pdGlvbidcbmltcG9ydCBUZXN0UnVuSG9va0RlZmluaXRpb24gZnJvbSAnLi4vbW9kZWxzL3Rlc3RfcnVuX2hvb2tfZGVmaW5pdGlvbidcbmltcG9ydCB2YWxpZGF0ZUFyZ3VtZW50cyBmcm9tICcuL3ZhbGlkYXRlX2FyZ3VtZW50cydcblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkVGVzdENhc2VIb29rRGVmaW5pdGlvbih7IG9wdGlvbnMsIGNvZGUsIGN3ZCB9KSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICBvcHRpb25zID0geyB0YWdzOiBvcHRpb25zIH1cbiAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvZGUgPSBvcHRpb25zXG4gICAgb3B0aW9ucyA9IHt9XG4gIH1cbiAgY29uc3QgeyBsaW5lLCB1cmkgfSA9IGdldERlZmluaXRpb25MaW5lQW5kVXJpKGN3ZClcbiAgdmFsaWRhdGVBcmd1bWVudHMoe1xuICAgIGFyZ3M6IHsgY29kZSwgb3B0aW9ucyB9LFxuICAgIGZuTmFtZTogJ2RlZmluZVRlc3RDYXNlSG9vaycsXG4gICAgbG9jYXRpb246IGZvcm1hdExvY2F0aW9uKHsgbGluZSwgdXJpIH0pLFxuICB9KVxuICByZXR1cm4gbmV3IFRlc3RDYXNlSG9va0RlZmluaXRpb24oe1xuICAgIGNvZGUsXG4gICAgbGluZSxcbiAgICBvcHRpb25zLFxuICAgIHVyaSxcbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkVGVzdFJ1bkhvb2tEZWZpbml0aW9uKHsgb3B0aW9ucywgY29kZSwgY3dkIH0pIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJykge1xuICAgIG9wdGlvbnMgPSB7IHRhZ3M6IG9wdGlvbnMgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29kZSA9IG9wdGlvbnNcbiAgICBvcHRpb25zID0ge31cbiAgfVxuICBjb25zdCB7IGxpbmUsIHVyaSB9ID0gZ2V0RGVmaW5pdGlvbkxpbmVBbmRVcmkoY3dkKVxuICB2YWxpZGF0ZUFyZ3VtZW50cyh7XG4gICAgYXJnczogeyBjb2RlLCBvcHRpb25zIH0sXG4gICAgZm5OYW1lOiAnZGVmaW5lVGVzdFJ1bkhvb2snLFxuICAgIGxvY2F0aW9uOiBmb3JtYXRMb2NhdGlvbih7IGxpbmUsIHVyaSB9KSxcbiAgfSlcbiAgcmV0dXJuIG5ldyBUZXN0UnVuSG9va0RlZmluaXRpb24oe1xuICAgIGNvZGUsXG4gICAgbGluZSxcbiAgICBvcHRpb25zLFxuICAgIHVyaSxcbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkU3RlcERlZmluaXRpb24oeyBwYXR0ZXJuLCBvcHRpb25zLCBjb2RlLCBjd2QgfSkge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb2RlID0gb3B0aW9uc1xuICAgIG9wdGlvbnMgPSB7fVxuICB9XG4gIGNvbnN0IHsgbGluZSwgdXJpIH0gPSBnZXREZWZpbml0aW9uTGluZUFuZFVyaShjd2QpXG4gIHZhbGlkYXRlQXJndW1lbnRzKHtcbiAgICBhcmdzOiB7IGNvZGUsIHBhdHRlcm4sIG9wdGlvbnMgfSxcbiAgICBmbk5hbWU6ICdkZWZpbmVTdGVwJyxcbiAgICBsb2NhdGlvbjogZm9ybWF0TG9jYXRpb24oeyBsaW5lLCB1cmkgfSksXG4gIH0pXG4gIHJldHVybiBuZXcgU3RlcERlZmluaXRpb24oe1xuICAgIGNvZGUsXG4gICAgbGluZSxcbiAgICBvcHRpb25zLFxuICAgIHBhdHRlcm4sXG4gICAgdXJpLFxuICB9KVxufVxuXG5jb25zdCBwcm9qZWN0UGF0aCA9IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLicsICcuLicpXG5jb25zdCBwcm9qZWN0U3JjUGF0aCA9IHBhdGguam9pbihwcm9qZWN0UGF0aCwgJ3NyYycpXG5jb25zdCBwcm9qZWN0TGliUGF0aCA9IHBhdGguam9pbihwcm9qZWN0UGF0aCwgJ2xpYicpXG5cbmZ1bmN0aW9uIGdldERlZmluaXRpb25MaW5lQW5kVXJpKGN3ZCkge1xuICBsZXQgbGluZSA9ICd1bmtub3duJ1xuICBsZXQgdXJpID0gJ3Vua25vd24nXG4gIGNvbnN0IHN0YWNrZnJhbWVzID0gU3RhY2tUcmFjZS5nZXRTeW5jKClcbiAgY29uc3Qgc3RhY2tmcmFtZSA9IF8uZmluZChzdGFja2ZyYW1lcywgZnJhbWUgPT4ge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gZnJhbWUuZ2V0RmlsZU5hbWUoKVxuICAgIHJldHVybiAoXG4gICAgICAhXy5pbmNsdWRlcyhmaWxlbmFtZSwgcHJvamVjdFNyY1BhdGgpICYmXG4gICAgICAhXy5pbmNsdWRlcyhmaWxlbmFtZSwgcHJvamVjdExpYlBhdGgpXG4gICAgKVxuICB9KVxuICBpZiAoc3RhY2tmcmFtZSkge1xuICAgIGxpbmUgPSBzdGFja2ZyYW1lLmdldExpbmVOdW1iZXIoKVxuICAgIHVyaSA9IHN0YWNrZnJhbWUuZ2V0RmlsZU5hbWUoKVxuICAgIGlmICh1cmkpIHtcbiAgICAgIHVyaSA9IHBhdGgucmVsYXRpdmUoY3dkLCB1cmkpXG4gICAgfVxuICB9XG4gIHJldHVybiB7IGxpbmUsIHVyaSB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFBhcmFtZXRlclR5cGUoe1xuICBuYW1lLFxuICB0eXBlTmFtZSxcbiAgcmVnZXhwLFxuICB0cmFuc2Zvcm1lcixcbiAgdXNlRm9yU25pcHBldHMsXG4gIHByZWZlckZvclJlZ2V4cE1hdGNoLFxufSkge1xuICBjb25zdCBnZXRUeXBlTmFtZSA9IGRlcHJlY2F0ZShcbiAgICAoKSA9PiB0eXBlTmFtZSxcbiAgICAnQ3VjdW1iZXIgZGVmaW5lUGFyYW1ldGVyVHlwZTogVXNlIG5hbWUgaW5zdGVhZCBvZiB0eXBlTmFtZSdcbiAgKVxuICBjb25zdCBfbmFtZSA9IG5hbWUgfHwgZ2V0VHlwZU5hbWUoKVxuICBpZiAodHlwZW9mIHVzZUZvclNuaXBwZXRzICE9PSAnYm9vbGVhbicpIHVzZUZvclNuaXBwZXRzID0gdHJ1ZVxuICBpZiAodHlwZW9mIHByZWZlckZvclJlZ2V4cE1hdGNoICE9PSAnYm9vbGVhbicpIHByZWZlckZvclJlZ2V4cE1hdGNoID0gZmFsc2VcbiAgcmV0dXJuIG5ldyBQYXJhbWV0ZXJUeXBlKFxuICAgIF9uYW1lLFxuICAgIHJlZ2V4cCxcbiAgICBudWxsLFxuICAgIHRyYW5zZm9ybWVyLFxuICAgIHVzZUZvclNuaXBwZXRzLFxuICAgIHByZWZlckZvclJlZ2V4cE1hdGNoXG4gIClcbn1cbiJdfQ==