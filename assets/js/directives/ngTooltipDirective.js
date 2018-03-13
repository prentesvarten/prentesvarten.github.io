/*
 Directive to display a Bootstrap tooltip
 Requires Bootstrap JS
 */

'use strict';

/**
 * @ngdoc directive
 * @name app.directive:ngTooltip
 * @description
 * Display tooltip under certain conditions
 * @scope
 * @restrict A
 * @priority 100
 * @param ngTooltip Text to display
 * @param [ngTooltipIf] Expression with condition under which to display the tooltip
 */

angular.module('app').directive('ngTooltip', function () {
  return {
    restrict: 'A',
    scope: {
      title: '@ngTooltip',
      enabled: '&?ngTooltipIf'
    },
    replace: true,
    link: function link(scope, element) {

      // If not specified, enable by default
      scope.enabled = angular.isDefined(scope.enabled) ? scope.enabled : function () {
        return true;
      };

      var enableTooltip = function enableTooltip(title) {
        var options = {
          title: scope.title,
          container: 'body'
        };

        angular.element(element).tooltip(options).attr('data-original-title', title);
        angular.element(element).on('mouseenter', function () {
          return angular.element(element).tooltip('show');
        });
        angular.element(element).on('mouseleave', function () {
          return angular.element(element).tooltip('hide');
        });
      };

      var disableTooltip = function disableTooltip() {
        angular.element(element).tooltip('destroy');
        angular.element(element).off('mouseenter');
        angular.element(element).off('mouseleave');
      };

      scope.$watchGroup(['title', 'enabled'], function (newValues) {
        if (newValues[1]) {
          enableTooltip(newValues[0]);
        } else {
          disableTooltip();
        }
      });

      // Cleanup when removed from DOM
      scope.$on('$destroy', function () {
        angular.element(element).unbind('mouseenter mouseleave');
      });
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvbmdUb29sdGlwRGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJkaXJlY3RpdmUiLCJyZXN0cmljdCIsInNjb3BlIiwidGl0bGUiLCJlbmFibGVkIiwicmVwbGFjZSIsImxpbmsiLCJlbGVtZW50IiwiaXNEZWZpbmVkIiwiZW5hYmxlVG9vbHRpcCIsIm9wdGlvbnMiLCJjb250YWluZXIiLCJ0b29sdGlwIiwiYXR0ciIsIm9uIiwiZGlzYWJsZVRvb2x0aXAiLCJvZmYiLCIkd2F0Y2hHcm91cCIsIm5ld1ZhbHVlcyIsIiRvbiIsInVuYmluZCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0FBS0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQVdBQSxRQUFRQyxNQUFSLENBQWUsS0FBZixFQUFzQkMsU0FBdEIsQ0FBZ0MsV0FBaEMsRUFBNkMsWUFBVztBQUN0RCxTQUFPO0FBQ0xDLGNBQVUsR0FETDtBQUVMQyxXQUFPO0FBQ0xDLGFBQU8sWUFERjtBQUVMQyxlQUFTO0FBRkosS0FGRjtBQU1MQyxhQUFTLElBTko7QUFPTEMsVUFBTSxjQUFTSixLQUFULEVBQWdCSyxPQUFoQixFQUF5Qjs7QUFFN0I7QUFDQUwsWUFBTUUsT0FBTixHQUFnQk4sUUFBUVUsU0FBUixDQUFrQk4sTUFBTUUsT0FBeEIsSUFBbUNGLE1BQU1FLE9BQXpDLEdBQW1ELFlBQVc7QUFBRSxlQUFPLElBQVA7QUFBYyxPQUE5Rjs7QUFFQSxVQUFNSyxnQkFBZ0IsU0FBaEJBLGFBQWdCLENBQVVOLEtBQVYsRUFBaUI7QUFDckMsWUFBTU8sVUFBVTtBQUNkUCxpQkFBT0QsTUFBTUMsS0FEQztBQUVkUSxxQkFBVztBQUZHLFNBQWhCOztBQUtBYixnQkFBUVMsT0FBUixDQUFnQkEsT0FBaEIsRUFBeUJLLE9BQXpCLENBQWlDRixPQUFqQyxFQUEwQ0csSUFBMUMsQ0FBK0MscUJBQS9DLEVBQXNFVixLQUF0RTtBQUNBTCxnQkFBUVMsT0FBUixDQUFnQkEsT0FBaEIsRUFBeUJPLEVBQXpCLENBQTRCLFlBQTVCLEVBQTBDO0FBQUEsaUJBQU1oQixRQUFRUyxPQUFSLENBQWdCQSxPQUFoQixFQUF5QkssT0FBekIsQ0FBaUMsTUFBakMsQ0FBTjtBQUFBLFNBQTFDO0FBQ0FkLGdCQUFRUyxPQUFSLENBQWdCQSxPQUFoQixFQUF5Qk8sRUFBekIsQ0FBNEIsWUFBNUIsRUFBMEM7QUFBQSxpQkFBTWhCLFFBQVFTLE9BQVIsQ0FBZ0JBLE9BQWhCLEVBQXlCSyxPQUF6QixDQUFpQyxNQUFqQyxDQUFOO0FBQUEsU0FBMUM7QUFDRCxPQVREOztBQVdBLFVBQU1HLGlCQUFpQixTQUFqQkEsY0FBaUIsR0FBWTtBQUNqQ2pCLGdCQUFRUyxPQUFSLENBQWdCQSxPQUFoQixFQUF5QkssT0FBekIsQ0FBaUMsU0FBakM7QUFDQWQsZ0JBQVFTLE9BQVIsQ0FBZ0JBLE9BQWhCLEVBQXlCUyxHQUF6QixDQUE2QixZQUE3QjtBQUNBbEIsZ0JBQVFTLE9BQVIsQ0FBZ0JBLE9BQWhCLEVBQXlCUyxHQUF6QixDQUE2QixZQUE3QjtBQUNELE9BSkQ7O0FBTUFkLFlBQU1lLFdBQU4sQ0FBa0IsQ0FBQyxPQUFELEVBQVMsU0FBVCxDQUFsQixFQUF1QyxxQkFBYTtBQUNsRCxZQUFJQyxVQUFVLENBQVYsQ0FBSixFQUFrQjtBQUNoQlQsd0JBQWNTLFVBQVUsQ0FBVixDQUFkO0FBQ0QsU0FGRCxNQUVPO0FBQ0xIO0FBQ0Q7QUFDRixPQU5EOztBQVFBO0FBQ0FiLFlBQU1pQixHQUFOLENBQVUsVUFBVixFQUFzQixZQUFXO0FBQy9CckIsZ0JBQVFTLE9BQVIsQ0FBZ0JBLE9BQWhCLEVBQXlCYSxNQUF6QixDQUFnQyx1QkFBaEM7QUFDRCxPQUZEO0FBR0Q7QUF6Q0ksR0FBUDtBQTJDRCxDQTVDRCIsImZpbGUiOiJkaXJlY3RpdmVzL25nVG9vbHRpcERpcmVjdGl2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gRGlyZWN0aXZlIHRvIGRpc3BsYXkgYSBCb290c3RyYXAgdG9vbHRpcFxuIFJlcXVpcmVzIEJvb3RzdHJhcCBKU1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBAbmdkb2MgZGlyZWN0aXZlXG4gKiBAbmFtZSBhcHAuZGlyZWN0aXZlOm5nVG9vbHRpcFxuICogQGRlc2NyaXB0aW9uXG4gKiBEaXNwbGF5IHRvb2x0aXAgdW5kZXIgY2VydGFpbiBjb25kaXRpb25zXG4gKiBAc2NvcGVcbiAqIEByZXN0cmljdCBBXG4gKiBAcHJpb3JpdHkgMTAwXG4gKiBAcGFyYW0gbmdUb29sdGlwIFRleHQgdG8gZGlzcGxheVxuICogQHBhcmFtIFtuZ1Rvb2x0aXBJZl0gRXhwcmVzc2lvbiB3aXRoIGNvbmRpdGlvbiB1bmRlciB3aGljaCB0byBkaXNwbGF5IHRoZSB0b29sdGlwXG4gKi9cbmFuZ3VsYXIubW9kdWxlKCdhcHAnKS5kaXJlY3RpdmUoJ25nVG9vbHRpcCcsIGZ1bmN0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgc2NvcGU6IHtcbiAgICAgIHRpdGxlOiAnQG5nVG9vbHRpcCcsXG4gICAgICBlbmFibGVkOiAnJj9uZ1Rvb2x0aXBJZicsXG4gICAgfSxcbiAgICByZXBsYWNlOiB0cnVlLFxuICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG5cbiAgICAgIC8vIElmIG5vdCBzcGVjaWZpZWQsIGVuYWJsZSBieSBkZWZhdWx0XG4gICAgICBzY29wZS5lbmFibGVkID0gYW5ndWxhci5pc0RlZmluZWQoc2NvcGUuZW5hYmxlZCkgPyBzY29wZS5lbmFibGVkIDogZnVuY3Rpb24oKSB7IHJldHVybiB0cnVlOyB9O1xuXG4gICAgICBjb25zdCBlbmFibGVUb29sdGlwID0gZnVuY3Rpb24gKHRpdGxlKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgdGl0bGU6IHNjb3BlLnRpdGxlLFxuICAgICAgICAgIGNvbnRhaW5lcjogJ2JvZHknXG4gICAgICAgIH07XG5cbiAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLnRvb2x0aXAob3B0aW9ucykuYXR0cignZGF0YS1vcmlnaW5hbC10aXRsZScsIHRpdGxlKTtcbiAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLm9uKCdtb3VzZWVudGVyJywgKCkgPT4gYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLnRvb2x0aXAoJ3Nob3cnKSk7XG4gICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KS5vbignbW91c2VsZWF2ZScsICgpID0+IGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KS50b29sdGlwKCdoaWRlJykpO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgZGlzYWJsZVRvb2x0aXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KS50b29sdGlwKCdkZXN0cm95Jyk7XG4gICAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtZW50KS5vZmYoJ21vdXNlZW50ZXInKTtcbiAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLm9mZignbW91c2VsZWF2ZScpO1xuICAgICAgfTtcblxuICAgICAgc2NvcGUuJHdhdGNoR3JvdXAoWyd0aXRsZScsJ2VuYWJsZWQnXSwgbmV3VmFsdWVzID0+IHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlc1sxXSkge1xuICAgICAgICAgIGVuYWJsZVRvb2x0aXAobmV3VmFsdWVzWzBdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkaXNhYmxlVG9vbHRpcCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gQ2xlYW51cCB3aGVuIHJlbW92ZWQgZnJvbSBET01cbiAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYW5ndWxhci5lbGVtZW50KGVsZW1lbnQpLnVuYmluZCgnbW91c2VlbnRlciBtb3VzZWxlYXZlJyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59KTtcbiJdfQ==
