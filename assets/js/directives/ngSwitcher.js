'use strict';

/**
 * @ngdoc directive
 * @name Byggemappen.directive:ngSwitcher
 * @description
 * Form control directive to switch on/off
 * @scope
 * @restrict A
 * @priority 100
 * @param {Boolean} ngModel Model to bind to
 * @param {String} [textEnable] Text to disable for enable button
 * @param {String} [textDisable] Text to disable for disable button
 * @param {String} [class] Classes
 */

angular.module('app').directive('ngSwitcher', function () {
  return {
    scope: {
      model: '=ngModel',
      class: '@class',
      textEnable: '@',
      textDisable: '@'
    },
    replace: true,
    template: '\n<div class="btn-group" ng-class="class">\n    <button class="btn" ng-click="model=true" ng-class="{\'btn-success\': model,\'btn-default\': !model}">{[{textEnable || \'On\'}]}</button>\n    <button class="btn" ng-click="model=false" ng-class="{\'btn-danger\': !model, \'btn-default\': model}">{[{textDisable || \'Off\'}]}</button>\n</div>\n'
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvbmdTd2l0Y2hlci5qcyJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwiZGlyZWN0aXZlIiwic2NvcGUiLCJtb2RlbCIsImNsYXNzIiwidGV4dEVuYWJsZSIsInRleHREaXNhYmxlIiwicmVwbGFjZSIsInRlbXBsYXRlIl0sIm1hcHBpbmdzIjoiQUFBQzs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUFjQUEsUUFBUUMsTUFBUixDQUFlLEtBQWYsRUFBc0JDLFNBQXRCLENBQWdDLFlBQWhDLEVBQThDLFlBQVc7QUFDdkQsU0FBTztBQUNMQyxXQUFPO0FBQ0xDLGFBQU8sVUFERjtBQUVMQyxhQUFPLFFBRkY7QUFHTEMsa0JBQVksR0FIUDtBQUlMQyxtQkFBYTtBQUpSLEtBREY7QUFPTEMsYUFBUyxJQVBKO0FBUUxDO0FBUkssR0FBUDtBQWVELENBaEJEIiwiZmlsZSI6ImRpcmVjdGl2ZXMvbmdTd2l0Y2hlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiAndXNlIHN0cmljdCc7XG5cbiAvKipcbiAgKiBAbmdkb2MgZGlyZWN0aXZlXG4gICogQG5hbWUgQnlnZ2VtYXBwZW4uZGlyZWN0aXZlOm5nU3dpdGNoZXJcbiAgKiBAZGVzY3JpcHRpb25cbiAgKiBGb3JtIGNvbnRyb2wgZGlyZWN0aXZlIHRvIHN3aXRjaCBvbi9vZmZcbiAgKiBAc2NvcGVcbiAgKiBAcmVzdHJpY3QgQVxuICAqIEBwcmlvcml0eSAxMDBcbiAgKiBAcGFyYW0ge0Jvb2xlYW59IG5nTW9kZWwgTW9kZWwgdG8gYmluZCB0b1xuICAqIEBwYXJhbSB7U3RyaW5nfSBbdGV4dEVuYWJsZV0gVGV4dCB0byBkaXNhYmxlIGZvciBlbmFibGUgYnV0dG9uXG4gICogQHBhcmFtIHtTdHJpbmd9IFt0ZXh0RGlzYWJsZV0gVGV4dCB0byBkaXNhYmxlIGZvciBkaXNhYmxlIGJ1dHRvblxuICAqIEBwYXJhbSB7U3RyaW5nfSBbY2xhc3NdIENsYXNzZXNcbiAgKi9cblxuIGFuZ3VsYXIubW9kdWxlKCdhcHAnKS5kaXJlY3RpdmUoJ25nU3dpdGNoZXInLCBmdW5jdGlvbigpIHtcbiAgIHJldHVybiB7XG4gICAgIHNjb3BlOiB7XG4gICAgICAgbW9kZWw6ICc9bmdNb2RlbCcsXG4gICAgICAgY2xhc3M6ICdAY2xhc3MnLFxuICAgICAgIHRleHRFbmFibGU6ICdAJyxcbiAgICAgICB0ZXh0RGlzYWJsZTogJ0AnXG4gICAgIH0sXG4gICAgIHJlcGxhY2U6IHRydWUsXG4gICAgIHRlbXBsYXRlOiBgXG48ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCIgbmctY2xhc3M9XCJjbGFzc1wiPlxuICAgIDxidXR0b24gY2xhc3M9XCJidG5cIiBuZy1jbGljaz1cIm1vZGVsPXRydWVcIiBuZy1jbGFzcz1cInsnYnRuLXN1Y2Nlc3MnOiBtb2RlbCwnYnRuLWRlZmF1bHQnOiAhbW9kZWx9XCI+e1t7dGV4dEVuYWJsZSB8fCAnT24nfV19PC9idXR0b24+XG4gICAgPGJ1dHRvbiBjbGFzcz1cImJ0blwiIG5nLWNsaWNrPVwibW9kZWw9ZmFsc2VcIiBuZy1jbGFzcz1cInsnYnRuLWRhbmdlcic6ICFtb2RlbCwgJ2J0bi1kZWZhdWx0JzogbW9kZWx9XCI+e1t7dGV4dERpc2FibGUgfHwgJ09mZid9XX08L2J1dHRvbj5cbjwvZGl2PlxuYFxuICAgfTtcbiB9KTtcbiJdfQ==
