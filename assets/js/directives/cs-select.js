/* ============================================================
 * Directive: csSelect
 * AngularJS directive for SelectFx jQuery plugin
 * https://github.com/codrops/SelectInspiration
 * ============================================================ */

'use strict';
/* global SelectFx */

angular.module('app').directive('csSelect', function ($compile) {
  return {
    restrict: 'A',
    link: function link(scope, element) {
      if (!window.SelectFx) {
        return;
      }

      var newElement = angular.element('<div class="cs-wrapper"></div>');

      element.wrap($compile(newElement)(scope));
      /* eslint-disable no-new */
      new SelectFx(element[0]);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvY3Mtc2VsZWN0LmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJkaXJlY3RpdmUiLCIkY29tcGlsZSIsInJlc3RyaWN0IiwibGluayIsInNjb3BlIiwiZWxlbWVudCIsIndpbmRvdyIsIlNlbGVjdEZ4IiwibmV3RWxlbWVudCIsIndyYXAiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFNQTtBQUNBOztBQUVBQSxRQUFRQyxNQUFSLENBQWUsS0FBZixFQUNLQyxTQURMLENBQ2UsVUFEZixFQUMyQixVQUFVQyxRQUFWLEVBQW9CO0FBQ3pDLFNBQU87QUFDTEMsY0FBVSxHQURMO0FBRUxDLFVBQU0sY0FBVUMsS0FBVixFQUFpQkMsT0FBakIsRUFBMEI7QUFDOUIsVUFBSSxDQUFDQyxPQUFPQyxRQUFaLEVBQXNCO0FBQUU7QUFBUzs7QUFFakMsVUFBTUMsYUFBYVYsUUFBUU8sT0FBUixDQUFnQixnQ0FBaEIsQ0FBbkI7O0FBRUFBLGNBQVFJLElBQVIsQ0FBYVIsU0FBU08sVUFBVCxFQUFxQkosS0FBckIsQ0FBYjtBQUNBO0FBQ0EsVUFBSUcsUUFBSixDQUFhRixRQUFRLENBQVIsQ0FBYjtBQUNEO0FBVkksR0FBUDtBQVlELENBZEwiLCJmaWxlIjoiZGlyZWN0aXZlcy9jcy1zZWxlY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIERpcmVjdGl2ZTogY3NTZWxlY3RcbiAqIEFuZ3VsYXJKUyBkaXJlY3RpdmUgZm9yIFNlbGVjdEZ4IGpRdWVyeSBwbHVnaW5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9jb2Ryb3BzL1NlbGVjdEluc3BpcmF0aW9uXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZ2xvYmFsIFNlbGVjdEZ4ICovXG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5kaXJlY3RpdmUoJ2NzU2VsZWN0JywgZnVuY3Rpb24gKCRjb21waWxlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICBpZiAoIXdpbmRvdy5TZWxlY3RGeCkgeyByZXR1cm47IH1cblxuICAgICAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoJzxkaXYgY2xhc3M9XCJjcy13cmFwcGVyXCI+PC9kaXY+Jyk7XG5cbiAgICAgICAgICBlbGVtZW50LndyYXAoJGNvbXBpbGUobmV3RWxlbWVudCkoc2NvcGUpKTtcbiAgICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1uZXcgKi9cbiAgICAgICAgICBuZXcgU2VsZWN0RngoZWxlbWVudFswXSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG4iXX0=
