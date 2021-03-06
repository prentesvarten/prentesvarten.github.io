/* ============================================================
 * Directive: pgTab
 * Makes Bootstrap Tabs compatible with AngularJS and add sliding
 * effect for tab transitions.
 * ============================================================ */

'use strict';

angular.module('app').directive('pgTab', ['$parse', function ($parse) {
  return {
    link: function link(scope, element, attrs) {
      var onShown = $parse(attrs.onShown);
      // Sliding effect for tabs

      $(element).on('show.bs.tab', function (e) {
        e = $(e.target).parent().find('a[data-toggle=tab]');

        var hrefCurrent = e.attr('href');

        if ($(hrefCurrent).is('.slide-left, .slide-right')) {
          $(hrefCurrent).addClass('sliding');

          setTimeout(function () {
            $(hrefCurrent).removeClass('sliding');
          }, 100);
        }
      });

      $(element).on('shown.bs.tab', {
        onShown: onShown
      }, function (e) {
        if (e.data.onShown) {
          e.data.onShown(scope);
        }
      });

      element.click(function (e) {
        e.preventDefault();
        $(element).tab('show');
      });
    }
  };
}]);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvcGctdGFiLmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJkaXJlY3RpdmUiLCIkcGFyc2UiLCJsaW5rIiwic2NvcGUiLCJlbGVtZW50IiwiYXR0cnMiLCJvblNob3duIiwiJCIsIm9uIiwiZSIsInRhcmdldCIsInBhcmVudCIsImZpbmQiLCJocmVmQ3VycmVudCIsImF0dHIiLCJpcyIsImFkZENsYXNzIiwic2V0VGltZW91dCIsInJlbW92ZUNsYXNzIiwiZGF0YSIsImNsaWNrIiwicHJldmVudERlZmF1bHQiLCJ0YWIiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFNQTs7QUFFQUEsUUFBUUMsTUFBUixDQUFlLEtBQWYsRUFDS0MsU0FETCxDQUNlLE9BRGYsRUFDd0IsQ0FBQyxRQUFELEVBQVcsVUFBU0MsTUFBVCxFQUFpQjtBQUM5QyxTQUFPO0FBQ0xDLFVBQU0sY0FBU0MsS0FBVCxFQUFnQkMsT0FBaEIsRUFBeUJDLEtBQXpCLEVBQWdDO0FBQ3BDLFVBQUlDLFVBQVVMLE9BQU9JLE1BQU1DLE9BQWIsQ0FBZDtBQUNBOztBQUVBQyxRQUFFSCxPQUFGLEVBQVdJLEVBQVgsQ0FBYyxhQUFkLEVBQTZCLFVBQVNDLENBQVQsRUFBWTtBQUN2Q0EsWUFBSUYsRUFBRUUsRUFBRUMsTUFBSixFQUFZQyxNQUFaLEdBQXFCQyxJQUFyQixDQUEwQixvQkFBMUIsQ0FBSjs7QUFFQSxZQUFJQyxjQUFjSixFQUFFSyxJQUFGLENBQU8sTUFBUCxDQUFsQjs7QUFFQSxZQUFJUCxFQUFFTSxXQUFGLEVBQWVFLEVBQWYsQ0FBa0IsMkJBQWxCLENBQUosRUFBb0Q7QUFDbERSLFlBQUVNLFdBQUYsRUFBZUcsUUFBZixDQUF3QixTQUF4Qjs7QUFFQUMscUJBQVcsWUFBVztBQUNwQlYsY0FBRU0sV0FBRixFQUFlSyxXQUFmLENBQTJCLFNBQTNCO0FBQ0QsV0FGRCxFQUVHLEdBRkg7QUFHRDtBQUNGLE9BWkQ7O0FBY0FYLFFBQUVILE9BQUYsRUFBV0ksRUFBWCxDQUFjLGNBQWQsRUFBOEI7QUFDNUJGLGlCQUFTQTtBQURtQixPQUE5QixFQUVHLFVBQVNHLENBQVQsRUFBWTtBQUNiLFlBQUlBLEVBQUVVLElBQUYsQ0FBT2IsT0FBWCxFQUFvQjtBQUNsQkcsWUFBRVUsSUFBRixDQUFPYixPQUFQLENBQWVILEtBQWY7QUFDRDtBQUNGLE9BTkQ7O0FBUUFDLGNBQVFnQixLQUFSLENBQWMsVUFBU1gsQ0FBVCxFQUFZO0FBQ3hCQSxVQUFFWSxjQUFGO0FBQ0FkLFVBQUVILE9BQUYsRUFBV2tCLEdBQVgsQ0FBZSxNQUFmO0FBQ0QsT0FIRDtBQUlEO0FBL0JJLEdBQVA7QUFpQ0QsQ0FsQ21CLENBRHhCIiwiZmlsZSI6ImRpcmVjdGl2ZXMvcGctdGFiLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBEaXJlY3RpdmU6IHBnVGFiXG4gKiBNYWtlcyBCb290c3RyYXAgVGFicyBjb21wYXRpYmxlIHdpdGggQW5ndWxhckpTIGFuZCBhZGQgc2xpZGluZ1xuICogZWZmZWN0IGZvciB0YWIgdHJhbnNpdGlvbnMuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuZGlyZWN0aXZlKCdwZ1RhYicsIFsnJHBhcnNlJywgZnVuY3Rpb24oJHBhcnNlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICB2YXIgb25TaG93biA9ICRwYXJzZShhdHRycy5vblNob3duKTtcbiAgICAgICAgICAvLyBTbGlkaW5nIGVmZmVjdCBmb3IgdGFic1xuXG4gICAgICAgICAgJChlbGVtZW50KS5vbignc2hvdy5icy50YWInLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlID0gJChlLnRhcmdldCkucGFyZW50KCkuZmluZCgnYVtkYXRhLXRvZ2dsZT10YWJdJyk7XG5cbiAgICAgICAgICAgIHZhciBocmVmQ3VycmVudCA9IGUuYXR0cignaHJlZicpO1xuXG4gICAgICAgICAgICBpZiAoJChocmVmQ3VycmVudCkuaXMoJy5zbGlkZS1sZWZ0LCAuc2xpZGUtcmlnaHQnKSkge1xuICAgICAgICAgICAgICAkKGhyZWZDdXJyZW50KS5hZGRDbGFzcygnc2xpZGluZycpO1xuXG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJChocmVmQ3VycmVudCkucmVtb3ZlQ2xhc3MoJ3NsaWRpbmcnKTtcbiAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgICQoZWxlbWVudCkub24oJ3Nob3duLmJzLnRhYicsIHtcbiAgICAgICAgICAgIG9uU2hvd246IG9uU2hvd25cbiAgICAgICAgICB9LCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAoZS5kYXRhLm9uU2hvd24pIHtcbiAgICAgICAgICAgICAgZS5kYXRhLm9uU2hvd24oc2NvcGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZWxlbWVudC5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkKGVsZW1lbnQpLnRhYignc2hvdycpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1dKTtcbiJdfQ==
