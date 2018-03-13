/* ============================================================
 * Directive: pgPortlet
 * AngularJS directive for Pages Portlets jQuery plugin
 * ============================================================ */

'use strict';

angular.module('app').directive('pgPortlet', ['$parse', function ($parse) {
  return {
    restrict: 'A',
    scope: true,
    link: function link(scope, element, attrs) {

      var onRefresh = $parse(attrs.onRefresh);

      var options = {};

      if (attrs.progress) {
        options.progress = attrs.progress;
      }
      if (attrs.overlayOpacity) {
        options.overlayOpacity = attrs.overlayOpacity;
      }
      if (attrs.overlayColor) {
        options.overlayColor = attrs.overlayColor;
      }
      if (attrs.progressColor) {
        options.progressColor = attrs.progressColor;
      }
      if (attrs.onRefresh) {
        options.onRefresh = function () {
          onRefresh(scope);
        };
      }

      element.portlet(options);

      scope.maximize = function () {
        element.portlet('maximize');
      };
      scope.refresh = function () {
        element.portlet({
          refresh: true
        });
      };
      scope.close = function () {
        element.portlet('close');
      };
      scope.collapse = function () {
        element.portlet('collapse');
      };
    }
  };
}]);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvcGctcG9ydGxldC5qcyJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwiZGlyZWN0aXZlIiwiJHBhcnNlIiwicmVzdHJpY3QiLCJzY29wZSIsImxpbmsiLCJlbGVtZW50IiwiYXR0cnMiLCJvblJlZnJlc2giLCJvcHRpb25zIiwicHJvZ3Jlc3MiLCJvdmVybGF5T3BhY2l0eSIsIm92ZXJsYXlDb2xvciIsInByb2dyZXNzQ29sb3IiLCJwb3J0bGV0IiwibWF4aW1pemUiLCJyZWZyZXNoIiwiY2xvc2UiLCJjb2xsYXBzZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0FBS0E7O0FBRUFBLFFBQVFDLE1BQVIsQ0FBZSxLQUFmLEVBQ0tDLFNBREwsQ0FDZSxXQURmLEVBQzRCLENBQUMsUUFBRCxFQUFXLFVBQVNDLE1BQVQsRUFBaUI7QUFDbEQsU0FBTztBQUNMQyxjQUFVLEdBREw7QUFFTEMsV0FBTyxJQUZGO0FBR0xDLFVBQU0sY0FBU0QsS0FBVCxFQUFnQkUsT0FBaEIsRUFBeUJDLEtBQXpCLEVBQWdDOztBQUVwQyxVQUFNQyxZQUFZTixPQUFPSyxNQUFNQyxTQUFiLENBQWxCOztBQUVBLFVBQU1DLFVBQVUsRUFBaEI7O0FBRUEsVUFBSUYsTUFBTUcsUUFBVixFQUFvQjtBQUFFRCxnQkFBUUMsUUFBUixHQUFtQkgsTUFBTUcsUUFBekI7QUFBb0M7QUFDMUQsVUFBSUgsTUFBTUksY0FBVixFQUEwQjtBQUFFRixnQkFBUUUsY0FBUixHQUF5QkosTUFBTUksY0FBL0I7QUFBZ0Q7QUFDNUUsVUFBSUosTUFBTUssWUFBVixFQUF3QjtBQUFFSCxnQkFBUUcsWUFBUixHQUF1QkwsTUFBTUssWUFBN0I7QUFBNEM7QUFDdEUsVUFBSUwsTUFBTU0sYUFBVixFQUF5QjtBQUFFSixnQkFBUUksYUFBUixHQUF3Qk4sTUFBTU0sYUFBOUI7QUFBOEM7QUFDekUsVUFBSU4sTUFBTUMsU0FBVixFQUFxQjtBQUNuQkMsZ0JBQVFELFNBQVIsR0FBb0IsWUFBVztBQUM3QkEsb0JBQVVKLEtBQVY7QUFDRCxTQUZEO0FBR0Q7O0FBRURFLGNBQVFRLE9BQVIsQ0FBZ0JMLE9BQWhCOztBQUVBTCxZQUFNVyxRQUFOLEdBQWlCLFlBQVc7QUFDMUJULGdCQUFRUSxPQUFSLENBQWdCLFVBQWhCO0FBQ0QsT0FGRDtBQUdBVixZQUFNWSxPQUFOLEdBQWdCLFlBQVc7QUFDekJWLGdCQUFRUSxPQUFSLENBQWdCO0FBQ2RFLG1CQUFTO0FBREssU0FBaEI7QUFHRCxPQUpEO0FBS0FaLFlBQU1hLEtBQU4sR0FBYyxZQUFXO0FBQ3ZCWCxnQkFBUVEsT0FBUixDQUFnQixPQUFoQjtBQUNELE9BRkQ7QUFHQVYsWUFBTWMsUUFBTixHQUFpQixZQUFXO0FBQzFCWixnQkFBUVEsT0FBUixDQUFnQixVQUFoQjtBQUNELE9BRkQ7QUFHRDtBQW5DSSxHQUFQO0FBcUNELENBdEN1QixDQUQ1QiIsImZpbGUiOiJkaXJlY3RpdmVzL3BnLXBvcnRsZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIERpcmVjdGl2ZTogcGdQb3J0bGV0XG4gKiBBbmd1bGFySlMgZGlyZWN0aXZlIGZvciBQYWdlcyBQb3J0bGV0cyBqUXVlcnkgcGx1Z2luXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuZGlyZWN0aXZlKCdwZ1BvcnRsZXQnLCBbJyRwYXJzZScsIGZ1bmN0aW9uKCRwYXJzZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgICAgc2NvcGU6IHRydWUsXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgICAgY29uc3Qgb25SZWZyZXNoID0gJHBhcnNlKGF0dHJzLm9uUmVmcmVzaCk7XG5cbiAgICAgICAgICBjb25zdCBvcHRpb25zID0ge307XG5cbiAgICAgICAgICBpZiAoYXR0cnMucHJvZ3Jlc3MpIHsgb3B0aW9ucy5wcm9ncmVzcyA9IGF0dHJzLnByb2dyZXNzOyB9XG4gICAgICAgICAgaWYgKGF0dHJzLm92ZXJsYXlPcGFjaXR5KSB7IG9wdGlvbnMub3ZlcmxheU9wYWNpdHkgPSBhdHRycy5vdmVybGF5T3BhY2l0eTsgfVxuICAgICAgICAgIGlmIChhdHRycy5vdmVybGF5Q29sb3IpIHsgb3B0aW9ucy5vdmVybGF5Q29sb3IgPSBhdHRycy5vdmVybGF5Q29sb3I7IH1cbiAgICAgICAgICBpZiAoYXR0cnMucHJvZ3Jlc3NDb2xvcikgeyBvcHRpb25zLnByb2dyZXNzQ29sb3IgPSBhdHRycy5wcm9ncmVzc0NvbG9yOyB9XG4gICAgICAgICAgaWYgKGF0dHJzLm9uUmVmcmVzaCkge1xuICAgICAgICAgICAgb3B0aW9ucy5vblJlZnJlc2ggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgb25SZWZyZXNoKHNjb3BlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZWxlbWVudC5wb3J0bGV0KG9wdGlvbnMpO1xuXG4gICAgICAgICAgc2NvcGUubWF4aW1pemUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGVsZW1lbnQucG9ydGxldCgnbWF4aW1pemUnKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHNjb3BlLnJlZnJlc2ggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGVsZW1lbnQucG9ydGxldCh7XG4gICAgICAgICAgICAgIHJlZnJlc2g6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG4gICAgICAgICAgc2NvcGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGVsZW1lbnQucG9ydGxldCgnY2xvc2UnKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHNjb3BlLmNvbGxhcHNlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBlbGVtZW50LnBvcnRsZXQoJ2NvbGxhcHNlJyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XSk7XG4iXX0=
