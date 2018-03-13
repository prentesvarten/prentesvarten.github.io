/* ============================================================
* Directive: ngFile
* Directive to display a file upload form control
* ============================================================ */

'use strict';
/* global FileReader */

angular.module('app').directive('ngFile', function () {
  return {
    scope: {
      ngFile: '=',
      ngFileName: '='
    },
    link: function link(scope, element) {
      element.bind('change', function (changeEvent) {
        var reader = new FileReader();

        reader.onload = function (loadEvent) {
          scope.$apply(function () {
            scope.ngFile = loadEvent.target.result;
            scope.ngFileName = changeEvent.target.files[0].name;
          });
        };
        reader.readAsDataURL(changeEvent.target.files[0]);
      });
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvbmdGaWxlRGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJkaXJlY3RpdmUiLCJzY29wZSIsIm5nRmlsZSIsIm5nRmlsZU5hbWUiLCJsaW5rIiwiZWxlbWVudCIsImJpbmQiLCJjaGFuZ2VFdmVudCIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJvbmxvYWQiLCJsb2FkRXZlbnQiLCIkYXBwbHkiLCJ0YXJnZXQiLCJyZXN1bHQiLCJmaWxlcyIsIm5hbWUiLCJyZWFkQXNEYXRhVVJMIl0sIm1hcHBpbmdzIjoiQUFBQzs7Ozs7QUFLRDtBQUNBOztBQUVBQSxRQUFRQyxNQUFSLENBQWUsS0FBZixFQUFzQkMsU0FBdEIsQ0FBZ0MsUUFBaEMsRUFBMEMsWUFBVztBQUNuRCxTQUFPO0FBQ0xDLFdBQU87QUFDTEMsY0FBUSxHQURIO0FBRUxDLGtCQUFZO0FBRlAsS0FERjtBQUtMQyxVQUFNLGNBQVVILEtBQVYsRUFBaUJJLE9BQWpCLEVBQTBCO0FBQzlCQSxjQUFRQyxJQUFSLENBQWEsUUFBYixFQUF1QixVQUFVQyxXQUFWLEVBQXVCO0FBQzVDLFlBQU1DLFNBQVMsSUFBSUMsVUFBSixFQUFmOztBQUVBRCxlQUFPRSxNQUFQLEdBQWdCLFVBQVVDLFNBQVYsRUFBcUI7QUFDbkNWLGdCQUFNVyxNQUFOLENBQWEsWUFBWTtBQUN2Qlgsa0JBQU1DLE1BQU4sR0FBZVMsVUFBVUUsTUFBVixDQUFpQkMsTUFBaEM7QUFDQWIsa0JBQU1FLFVBQU4sR0FBbUJJLFlBQVlNLE1BQVosQ0FBbUJFLEtBQW5CLENBQXlCLENBQXpCLEVBQTRCQyxJQUEvQztBQUNELFdBSEQ7QUFJRCxTQUxEO0FBTUFSLGVBQU9TLGFBQVAsQ0FBcUJWLFlBQVlNLE1BQVosQ0FBbUJFLEtBQW5CLENBQXlCLENBQXpCLENBQXJCO0FBQ0QsT0FWRDtBQVdEO0FBakJJLEdBQVA7QUFtQkQsQ0FwQkQiLCJmaWxlIjoiZGlyZWN0aXZlcy9uZ0ZpbGVEaXJlY3RpdmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBEaXJlY3RpdmU6IG5nRmlsZVxuICogRGlyZWN0aXZlIHRvIGRpc3BsYXkgYSBmaWxlIHVwbG9hZCBmb3JtIGNvbnRyb2xcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4ndXNlIHN0cmljdCc7XG4vKiBnbG9iYWwgRmlsZVJlYWRlciAqL1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwJykuZGlyZWN0aXZlKCduZ0ZpbGUnLCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICBzY29wZToge1xuICAgICAgbmdGaWxlOiAnPScsXG4gICAgICBuZ0ZpbGVOYW1lOiAnPSdcbiAgICB9LFxuICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCkge1xuICAgICAgZWxlbWVudC5iaW5kKCdjaGFuZ2UnLCBmdW5jdGlvbiAoY2hhbmdlRXZlbnQpIHtcbiAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGxvYWRFdmVudCkge1xuICAgICAgICAgIHNjb3BlLiRhcHBseShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzY29wZS5uZ0ZpbGUgPSBsb2FkRXZlbnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICAgIHNjb3BlLm5nRmlsZU5hbWUgPSBjaGFuZ2VFdmVudC50YXJnZXQuZmlsZXNbMF0ubmFtZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoY2hhbmdlRXZlbnQudGFyZ2V0LmZpbGVzWzBdKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn0pO1xuIl19
