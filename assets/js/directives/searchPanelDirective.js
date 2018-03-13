'use strict';

/**
 * @ngdoc directive
 * @name app.directive:searchPanel
 * @description
 * Directive to search bar in sidebar panel
 * @scope
 * @priority 100
 * @param {String} searchModel Search value
 * @param {String} placeholder Placeholder text
 * @param {Function} onSearchClose Close search handler
 * @param {Function} onSearchAction Search action handler
 * @param {Boolean} isSearchActive If search is active
 * @param {Function} onFilterAction Enable filter button
 * @param {Boolean} isFilterActive If filter is active
 * @restrict AE
 */

angular.module('app').directive('searchPanel', function () {

  /**
   * Main return function
   */
  return {
    restrict: 'AE',
    replace: true,
    scope: {
      searchModel: '=',
      placeholder: '=',
      onSearchClose: '&',
      onSearchAction: '&',
      isSearchActive: '=?',
      onFilterAction: '&?',
      isFilterActive: '='
    },
    require: 'ngModel',
    templateUrl: 'assets/js/templates/searchPanel.tpl.html',
    controller: function controller($scope) {

      $scope.isSearchFocused = false;
      $scope.enableFilter = angular.isDefined($scope.onFilterAction);

      // update ngModel based on UI change
      $scope.$watch('searchModel', function (newVal) {
        $scope.isSearchActive = angular.isDefined(newVal) && newVal !== null && newVal.searchModel !== null && newVal.searchModel !== '';
      });

      /**
       * Closing handler
       * @return {void}
       */
      $scope.searchClose = function () {
        $scope.searchModel = null;
        $scope.onSearchClose.call();
      };

      /**
       * Filter handler
       * @return {void}
       */
      $scope.filterAction = function () {
        $scope.onFilterAction.call();
      };
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvc2VhcmNoUGFuZWxEaXJlY3RpdmUuanMiXSwibmFtZXMiOlsiYW5ndWxhciIsIm1vZHVsZSIsImRpcmVjdGl2ZSIsInJlc3RyaWN0IiwicmVwbGFjZSIsInNjb3BlIiwic2VhcmNoTW9kZWwiLCJwbGFjZWhvbGRlciIsIm9uU2VhcmNoQ2xvc2UiLCJvblNlYXJjaEFjdGlvbiIsImlzU2VhcmNoQWN0aXZlIiwib25GaWx0ZXJBY3Rpb24iLCJpc0ZpbHRlckFjdGl2ZSIsInJlcXVpcmUiLCJ0ZW1wbGF0ZVVybCIsImNvbnRyb2xsZXIiLCIkc2NvcGUiLCJpc1NlYXJjaEZvY3VzZWQiLCJlbmFibGVGaWx0ZXIiLCJpc0RlZmluZWQiLCIkd2F0Y2giLCJuZXdWYWwiLCJzZWFyY2hDbG9zZSIsImNhbGwiLCJmaWx0ZXJBY3Rpb24iXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQUEsUUFBUUMsTUFBUixDQUFlLEtBQWYsRUFBc0JDLFNBQXRCLENBQWdDLGFBQWhDLEVBQStDLFlBQVk7O0FBRXpEOzs7QUFHQSxTQUFPO0FBQ0xDLGNBQVUsSUFETDtBQUVMQyxhQUFTLElBRko7QUFHTEMsV0FBTztBQUNMQyxtQkFBYSxHQURSO0FBRUxDLG1CQUFhLEdBRlI7QUFHTEMscUJBQWUsR0FIVjtBQUlMQyxzQkFBZ0IsR0FKWDtBQUtMQyxzQkFBZ0IsSUFMWDtBQU1MQyxzQkFBZ0IsSUFOWDtBQU9MQyxzQkFBZ0I7QUFQWCxLQUhGO0FBWUxDLGFBQVMsU0FaSjtBQWFMQyxpQkFBYSwwQ0FiUjtBQWNMQyxnQkFBWSxvQkFBVUMsTUFBVixFQUFrQjs7QUFFNUJBLGFBQU9DLGVBQVAsR0FBeUIsS0FBekI7QUFDQUQsYUFBT0UsWUFBUCxHQUFzQmxCLFFBQVFtQixTQUFSLENBQWtCSCxPQUFPTCxjQUF6QixDQUF0Qjs7QUFFQTtBQUNBSyxhQUFPSSxNQUFQLENBQWMsYUFBZCxFQUE2QixVQUFDQyxNQUFELEVBQVk7QUFDdkNMLGVBQU9OLGNBQVAsR0FBd0JWLFFBQVFtQixTQUFSLENBQWtCRSxNQUFsQixLQUNuQkEsV0FBVyxJQURRLElBRW5CQSxPQUFPZixXQUFQLEtBQXVCLElBRkosSUFHbkJlLE9BQU9mLFdBQVAsS0FBdUIsRUFINUI7QUFJRCxPQUxEOztBQU9BOzs7O0FBSUFVLGFBQU9NLFdBQVAsR0FBcUIsWUFBVztBQUM5Qk4sZUFBT1YsV0FBUCxHQUFxQixJQUFyQjtBQUNBVSxlQUFPUixhQUFQLENBQXFCZSxJQUFyQjtBQUNELE9BSEQ7O0FBS0E7Ozs7QUFJQVAsYUFBT1EsWUFBUCxHQUFzQixZQUFXO0FBQy9CUixlQUFPTCxjQUFQLENBQXNCWSxJQUF0QjtBQUNELE9BRkQ7QUFJRDtBQTVDSSxHQUFQO0FBOENELENBbkREIiwiZmlsZSI6ImRpcmVjdGl2ZXMvc2VhcmNoUGFuZWxEaXJlY3RpdmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQG5nZG9jIGRpcmVjdGl2ZVxuICogQG5hbWUgYXBwLmRpcmVjdGl2ZTpzZWFyY2hQYW5lbFxuICogQGRlc2NyaXB0aW9uXG4gKiBEaXJlY3RpdmUgdG8gc2VhcmNoIGJhciBpbiBzaWRlYmFyIHBhbmVsXG4gKiBAc2NvcGVcbiAqIEBwcmlvcml0eSAxMDBcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWFyY2hNb2RlbCBTZWFyY2ggdmFsdWVcbiAqIEBwYXJhbSB7U3RyaW5nfSBwbGFjZWhvbGRlciBQbGFjZWhvbGRlciB0ZXh0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvblNlYXJjaENsb3NlIENsb3NlIHNlYXJjaCBoYW5kbGVyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvblNlYXJjaEFjdGlvbiBTZWFyY2ggYWN0aW9uIGhhbmRsZXJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNTZWFyY2hBY3RpdmUgSWYgc2VhcmNoIGlzIGFjdGl2ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gb25GaWx0ZXJBY3Rpb24gRW5hYmxlIGZpbHRlciBidXR0b25cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNGaWx0ZXJBY3RpdmUgSWYgZmlsdGVyIGlzIGFjdGl2ZVxuICogQHJlc3RyaWN0IEFFXG4gKi9cblxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmRpcmVjdGl2ZSgnc2VhcmNoUGFuZWwnLCBmdW5jdGlvbiAoKSB7XG5cbiAgLyoqXG4gICAqIE1haW4gcmV0dXJuIGZ1bmN0aW9uXG4gICAqL1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQUUnLFxuICAgIHJlcGxhY2U6IHRydWUsXG4gICAgc2NvcGU6IHtcbiAgICAgIHNlYXJjaE1vZGVsOiAnPScsXG4gICAgICBwbGFjZWhvbGRlcjogJz0nLFxuICAgICAgb25TZWFyY2hDbG9zZTogJyYnLFxuICAgICAgb25TZWFyY2hBY3Rpb246ICcmJyxcbiAgICAgIGlzU2VhcmNoQWN0aXZlOiAnPT8nLFxuICAgICAgb25GaWx0ZXJBY3Rpb246ICcmPycsXG4gICAgICBpc0ZpbHRlckFjdGl2ZTogJz0nXG4gICAgfSxcbiAgICByZXF1aXJlOiAnbmdNb2RlbCcsXG4gICAgdGVtcGxhdGVVcmw6ICdhc3NldHMvanMvdGVtcGxhdGVzL3NlYXJjaFBhbmVsLnRwbC5odG1sJyxcbiAgICBjb250cm9sbGVyOiBmdW5jdGlvbiAoJHNjb3BlKSB7XG5cbiAgICAgICRzY29wZS5pc1NlYXJjaEZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICRzY29wZS5lbmFibGVGaWx0ZXIgPSBhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUub25GaWx0ZXJBY3Rpb24pO1xuXG4gICAgICAvLyB1cGRhdGUgbmdNb2RlbCBiYXNlZCBvbiBVSSBjaGFuZ2VcbiAgICAgICRzY29wZS4kd2F0Y2goJ3NlYXJjaE1vZGVsJywgKG5ld1ZhbCkgPT4ge1xuICAgICAgICAkc2NvcGUuaXNTZWFyY2hBY3RpdmUgPSBhbmd1bGFyLmlzRGVmaW5lZChuZXdWYWwpXG4gICAgICAgICAgJiYgbmV3VmFsICE9PSBudWxsXG4gICAgICAgICAgJiYgbmV3VmFsLnNlYXJjaE1vZGVsICE9PSBudWxsXG4gICAgICAgICAgJiYgbmV3VmFsLnNlYXJjaE1vZGVsICE9PSAnJztcbiAgICAgIH0pO1xuXG4gICAgICAvKipcbiAgICAgICAqIENsb3NpbmcgaGFuZGxlclxuICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAqL1xuICAgICAgJHNjb3BlLnNlYXJjaENsb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRzY29wZS5zZWFyY2hNb2RlbCA9IG51bGw7XG4gICAgICAgICRzY29wZS5vblNlYXJjaENsb3NlLmNhbGwoKTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogRmlsdGVyIGhhbmRsZXJcbiAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgKi9cbiAgICAgICRzY29wZS5maWx0ZXJBY3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgJHNjb3BlLm9uRmlsdGVyQWN0aW9uLmNhbGwoKTtcbiAgICAgIH07XG5cbiAgICB9XG4gIH07XG59KTtcbiJdfQ==
