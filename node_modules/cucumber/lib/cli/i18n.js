'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.getLanguages = getLanguages;
exports.getKeywords = getKeywords;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _gherkin = require('gherkin');

var _gherkin2 = _interopRequireDefault(_gherkin);

var _cliTable = require('cli-table3');

var _cliTable2 = _interopRequireDefault(_cliTable);

var _titleCase = require('title-case');

var _titleCase2 = _interopRequireDefault(_titleCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keywords = ['feature', 'background', 'scenario', 'scenarioOutline', 'examples', 'given', 'when', 'then', 'and', 'but'];

function getAsTable(header, rows) {
  var table = new _cliTable2.default({
    chars: {
      bottom: '',
      'bottom-left': '',
      'bottom-mid': '',
      'bottom-right': '',
      left: '',
      'left-mid': '',
      mid: '',
      'mid-mid': '',
      middle: ' | ',
      right: '',
      'right-mid': '',
      top: '',
      'top-left': '',
      'top-mid': '',
      'top-right': ''
    },
    style: {
      border: [],
      'padding-left': 0,
      'padding-right': 0
    }
  });
  table.push(header);
  table.push.apply(table, (0, _toConsumableArray3.default)(rows));
  return table.toString();
}

function getLanguages() {
  var rows = _lodash2.default.map(_gherkin2.default.DIALECTS, function (data, isoCode) {
    return [isoCode, data.name, data.native];
  });
  return getAsTable(['ISO 639-1', 'ENGLISH NAME', 'NATIVE NAME'], rows);
}

function getKeywords(isoCode) {
  var language = _gherkin2.default.DIALECTS[isoCode];
  var rows = _lodash2.default.map(keywords, function (keyword) {
    var words = _lodash2.default.map(language[keyword], function (s) {
      return '"' + s + '"';
    }).join(', ');
    return [(0, _titleCase2.default)(keyword), words];
  });
  return getAsTable(['ENGLISH KEYWORD', 'NATIVE KEYWORDS'], rows);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvaTE4bi5qcyJdLCJuYW1lcyI6WyJnZXRMYW5ndWFnZXMiLCJnZXRLZXl3b3JkcyIsImtleXdvcmRzIiwiZ2V0QXNUYWJsZSIsImhlYWRlciIsInJvd3MiLCJ0YWJsZSIsImNoYXJzIiwiYm90dG9tIiwibGVmdCIsIm1pZCIsIm1pZGRsZSIsInJpZ2h0IiwidG9wIiwic3R5bGUiLCJib3JkZXIiLCJwdXNoIiwidG9TdHJpbmciLCJtYXAiLCJESUFMRUNUUyIsImRhdGEiLCJpc29Db2RlIiwibmFtZSIsIm5hdGl2ZSIsImxhbmd1YWdlIiwid29yZHMiLCJrZXl3b3JkIiwicyIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7UUFnRGdCQSxZLEdBQUFBLFk7UUFTQUMsVyxHQUFBQSxXOztBQXpEaEI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1DLFdBQVcsQ0FDZixTQURlLEVBRWYsWUFGZSxFQUdmLFVBSGUsRUFJZixpQkFKZSxFQUtmLFVBTGUsRUFNZixPQU5lLEVBT2YsTUFQZSxFQVFmLE1BUmUsRUFTZixLQVRlLEVBVWYsS0FWZSxDQUFqQjs7QUFhQSxTQUFTQyxVQUFULENBQW9CQyxNQUFwQixFQUE0QkMsSUFBNUIsRUFBa0M7QUFDaEMsTUFBTUMsUUFBUSx1QkFBVTtBQUN0QkMsV0FBTztBQUNMQyxjQUFRLEVBREg7QUFFTCxxQkFBZSxFQUZWO0FBR0wsb0JBQWMsRUFIVDtBQUlMLHNCQUFnQixFQUpYO0FBS0xDLFlBQU0sRUFMRDtBQU1MLGtCQUFZLEVBTlA7QUFPTEMsV0FBSyxFQVBBO0FBUUwsaUJBQVcsRUFSTjtBQVNMQyxjQUFRLEtBVEg7QUFVTEMsYUFBTyxFQVZGO0FBV0wsbUJBQWEsRUFYUjtBQVlMQyxXQUFLLEVBWkE7QUFhTCxrQkFBWSxFQWJQO0FBY0wsaUJBQVcsRUFkTjtBQWVMLG1CQUFhO0FBZlIsS0FEZTtBQWtCdEJDLFdBQU87QUFDTEMsY0FBUSxFQURIO0FBRUwsc0JBQWdCLENBRlg7QUFHTCx1QkFBaUI7QUFIWjtBQWxCZSxHQUFWLENBQWQ7QUF3QkFULFFBQU1VLElBQU4sQ0FBV1osTUFBWDtBQUNBRSxRQUFNVSxJQUFOLCtDQUFjWCxJQUFkO0FBQ0EsU0FBT0MsTUFBTVcsUUFBTixFQUFQO0FBQ0Q7O0FBRU0sU0FBU2pCLFlBQVQsR0FBd0I7QUFDN0IsTUFBTUssT0FBTyxpQkFBRWEsR0FBRixDQUFNLGtCQUFRQyxRQUFkLEVBQXdCLFVBQUNDLElBQUQsRUFBT0MsT0FBUDtBQUFBLFdBQW1CLENBQ3REQSxPQURzRCxFQUV0REQsS0FBS0UsSUFGaUQsRUFHdERGLEtBQUtHLE1BSGlELENBQW5CO0FBQUEsR0FBeEIsQ0FBYjtBQUtBLFNBQU9wQixXQUFXLENBQUMsV0FBRCxFQUFjLGNBQWQsRUFBOEIsYUFBOUIsQ0FBWCxFQUF5REUsSUFBekQsQ0FBUDtBQUNEOztBQUVNLFNBQVNKLFdBQVQsQ0FBcUJvQixPQUFyQixFQUE4QjtBQUNuQyxNQUFNRyxXQUFXLGtCQUFRTCxRQUFSLENBQWlCRSxPQUFqQixDQUFqQjtBQUNBLE1BQU1oQixPQUFPLGlCQUFFYSxHQUFGLENBQU1oQixRQUFOLEVBQWdCLG1CQUFXO0FBQ3RDLFFBQU11QixRQUFRLGlCQUFFUCxHQUFGLENBQU1NLFNBQVNFLE9BQVQsQ0FBTixFQUF5QjtBQUFBLG1CQUFTQyxDQUFUO0FBQUEsS0FBekIsRUFBd0NDLElBQXhDLENBQTZDLElBQTdDLENBQWQ7QUFDQSxXQUFPLENBQUMseUJBQVVGLE9BQVYsQ0FBRCxFQUFxQkQsS0FBckIsQ0FBUDtBQUNELEdBSFksQ0FBYjtBQUlBLFNBQU90QixXQUFXLENBQUMsaUJBQUQsRUFBb0IsaUJBQXBCLENBQVgsRUFBbURFLElBQW5ELENBQVA7QUFDRCIsImZpbGUiOiJpMThuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IEdoZXJraW4gZnJvbSAnZ2hlcmtpbidcbmltcG9ydCBUYWJsZSBmcm9tICdjbGktdGFibGUzJ1xuaW1wb3J0IHRpdGxlQ2FzZSBmcm9tICd0aXRsZS1jYXNlJ1xuXG5jb25zdCBrZXl3b3JkcyA9IFtcbiAgJ2ZlYXR1cmUnLFxuICAnYmFja2dyb3VuZCcsXG4gICdzY2VuYXJpbycsXG4gICdzY2VuYXJpb091dGxpbmUnLFxuICAnZXhhbXBsZXMnLFxuICAnZ2l2ZW4nLFxuICAnd2hlbicsXG4gICd0aGVuJyxcbiAgJ2FuZCcsXG4gICdidXQnLFxuXVxuXG5mdW5jdGlvbiBnZXRBc1RhYmxlKGhlYWRlciwgcm93cykge1xuICBjb25zdCB0YWJsZSA9IG5ldyBUYWJsZSh7XG4gICAgY2hhcnM6IHtcbiAgICAgIGJvdHRvbTogJycsXG4gICAgICAnYm90dG9tLWxlZnQnOiAnJyxcbiAgICAgICdib3R0b20tbWlkJzogJycsXG4gICAgICAnYm90dG9tLXJpZ2h0JzogJycsXG4gICAgICBsZWZ0OiAnJyxcbiAgICAgICdsZWZ0LW1pZCc6ICcnLFxuICAgICAgbWlkOiAnJyxcbiAgICAgICdtaWQtbWlkJzogJycsXG4gICAgICBtaWRkbGU6ICcgfCAnLFxuICAgICAgcmlnaHQ6ICcnLFxuICAgICAgJ3JpZ2h0LW1pZCc6ICcnLFxuICAgICAgdG9wOiAnJyxcbiAgICAgICd0b3AtbGVmdCc6ICcnLFxuICAgICAgJ3RvcC1taWQnOiAnJyxcbiAgICAgICd0b3AtcmlnaHQnOiAnJyxcbiAgICB9LFxuICAgIHN0eWxlOiB7XG4gICAgICBib3JkZXI6IFtdLFxuICAgICAgJ3BhZGRpbmctbGVmdCc6IDAsXG4gICAgICAncGFkZGluZy1yaWdodCc6IDAsXG4gICAgfSxcbiAgfSlcbiAgdGFibGUucHVzaChoZWFkZXIpXG4gIHRhYmxlLnB1c2goLi4ucm93cylcbiAgcmV0dXJuIHRhYmxlLnRvU3RyaW5nKClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldExhbmd1YWdlcygpIHtcbiAgY29uc3Qgcm93cyA9IF8ubWFwKEdoZXJraW4uRElBTEVDVFMsIChkYXRhLCBpc29Db2RlKSA9PiBbXG4gICAgaXNvQ29kZSxcbiAgICBkYXRhLm5hbWUsXG4gICAgZGF0YS5uYXRpdmUsXG4gIF0pXG4gIHJldHVybiBnZXRBc1RhYmxlKFsnSVNPIDYzOS0xJywgJ0VOR0xJU0ggTkFNRScsICdOQVRJVkUgTkFNRSddLCByb3dzKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0S2V5d29yZHMoaXNvQ29kZSkge1xuICBjb25zdCBsYW5ndWFnZSA9IEdoZXJraW4uRElBTEVDVFNbaXNvQ29kZV1cbiAgY29uc3Qgcm93cyA9IF8ubWFwKGtleXdvcmRzLCBrZXl3b3JkID0+IHtcbiAgICBjb25zdCB3b3JkcyA9IF8ubWFwKGxhbmd1YWdlW2tleXdvcmRdLCBzID0+IGBcIiR7c31cImApLmpvaW4oJywgJylcbiAgICByZXR1cm4gW3RpdGxlQ2FzZShrZXl3b3JkKSwgd29yZHNdXG4gIH0pXG4gIHJldHVybiBnZXRBc1RhYmxlKFsnRU5HTElTSCBLRVlXT1JEJywgJ05BVElWRSBLRVlXT1JEUyddLCByb3dzKVxufVxuIl19