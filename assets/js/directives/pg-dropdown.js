/* ============================================================
 * Directive: pgDropdown
 * Prepare Bootstrap dropdowns to match Pages theme
 * ============================================================ */

'use strict';

angular.module('app').directive('pgDropdown', function () {
  return {
    restrict: 'A',
    link: function link(scope, element) {

      var btn = $(element).find('.dropdown-menu').siblings('.dropdown-toggle');
      var offset = 0;
      var menuWidth = $(element).find('.dropdown-menu').outerWidth();

      if (btn.outerWidth() < menuWidth) {
        btn.width(menuWidth - offset);
        $(element).find('.dropdown-menu').width(btn.outerWidth());
      } else {
        $(element).find('.dropdown-menu').width(btn.outerWidth());
      }
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvcGctZHJvcGRvd24uanMiXSwibmFtZXMiOlsiYW5ndWxhciIsIm1vZHVsZSIsImRpcmVjdGl2ZSIsInJlc3RyaWN0IiwibGluayIsInNjb3BlIiwiZWxlbWVudCIsImJ0biIsIiQiLCJmaW5kIiwic2libGluZ3MiLCJvZmZzZXQiLCJtZW51V2lkdGgiLCJvdXRlcldpZHRoIiwid2lkdGgiXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQUtBOztBQUVBQSxRQUFRQyxNQUFSLENBQWUsS0FBZixFQUNLQyxTQURMLENBQ2UsWUFEZixFQUM2QixZQUFXO0FBQ2xDLFNBQU87QUFDTEMsY0FBVSxHQURMO0FBRUxDLFVBQU0sY0FBU0MsS0FBVCxFQUFnQkMsT0FBaEIsRUFBeUI7O0FBRTdCLFVBQU1DLE1BQU1DLEVBQUVGLE9BQUYsRUFBV0csSUFBWCxDQUFnQixnQkFBaEIsRUFBa0NDLFFBQWxDLENBQTJDLGtCQUEzQyxDQUFaO0FBQ0EsVUFBTUMsU0FBUyxDQUFmO0FBQ0EsVUFBTUMsWUFBWUosRUFBRUYsT0FBRixFQUFXRyxJQUFYLENBQWdCLGdCQUFoQixFQUFrQ0ksVUFBbEMsRUFBbEI7O0FBRUEsVUFBSU4sSUFBSU0sVUFBSixLQUFtQkQsU0FBdkIsRUFBa0M7QUFDaENMLFlBQUlPLEtBQUosQ0FBVUYsWUFBWUQsTUFBdEI7QUFDQUgsVUFBRUYsT0FBRixFQUFXRyxJQUFYLENBQWdCLGdCQUFoQixFQUFrQ0ssS0FBbEMsQ0FBd0NQLElBQUlNLFVBQUosRUFBeEM7QUFDRCxPQUhELE1BR087QUFDTEwsVUFBRUYsT0FBRixFQUFXRyxJQUFYLENBQWdCLGdCQUFoQixFQUFrQ0ssS0FBbEMsQ0FBd0NQLElBQUlNLFVBQUosRUFBeEM7QUFDRDtBQUVGO0FBZkksR0FBUDtBQWlCRCxDQW5CTCIsImZpbGUiOiJkaXJlY3RpdmVzL3BnLWRyb3Bkb3duLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBEaXJlY3RpdmU6IHBnRHJvcGRvd25cbiAqIFByZXBhcmUgQm9vdHN0cmFwIGRyb3Bkb3ducyB0byBtYXRjaCBQYWdlcyB0aGVtZVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbid1c2Ugc3RyaWN0JztcblxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmRpcmVjdGl2ZSgncGdEcm9wZG93bicsIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcblxuICAgICAgICAgIGNvbnN0IGJ0biA9ICQoZWxlbWVudCkuZmluZCgnLmRyb3Bkb3duLW1lbnUnKS5zaWJsaW5ncygnLmRyb3Bkb3duLXRvZ2dsZScpO1xuICAgICAgICAgIGNvbnN0IG9mZnNldCA9IDA7XG4gICAgICAgICAgY29uc3QgbWVudVdpZHRoID0gJChlbGVtZW50KS5maW5kKCcuZHJvcGRvd24tbWVudScpLm91dGVyV2lkdGgoKTtcblxuICAgICAgICAgIGlmIChidG4ub3V0ZXJXaWR0aCgpIDwgbWVudVdpZHRoKSB7XG4gICAgICAgICAgICBidG4ud2lkdGgobWVudVdpZHRoIC0gb2Zmc2V0KTtcbiAgICAgICAgICAgICQoZWxlbWVudCkuZmluZCgnLmRyb3Bkb3duLW1lbnUnKS53aWR0aChidG4ub3V0ZXJXaWR0aCgpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJChlbGVtZW50KS5maW5kKCcuZHJvcGRvd24tbWVudScpLndpZHRoKGJ0bi5vdXRlcldpZHRoKCkpO1xuICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuIl19
