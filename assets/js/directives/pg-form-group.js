/* ============================================================
 * Directive: pgFormGroup
 * Apply Pages default form effects
 * ============================================================ */

'use strict';

angular.module('app').directive('pgFormGroup', function ($timeout) {
  return {
    restrict: 'A',
    link: function link(scope, element) {
      $timeout(function () {
        $(element).find(':input').on('focus', function () {
          $('.form-group.form-group-default').removeClass('focused');
          $(element).addClass('focused');
        });
        $(element).find(':input').on('blur', function () {
          $(element).removeClass('focused');
          if ($(this).val()) {
            $(element).find('label').addClass('fade');
          } else {
            $(element).find('label').removeClass('fade');
          }
        });
        $(element).find('.checkbox, .radio').hover(function () {
          $(this).parents('.form-group').addClass('focused');
        }, function () {
          $(this).parents('.form-group').removeClass('focused');
        });
      });
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvcGctZm9ybS1ncm91cC5qcyJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwiZGlyZWN0aXZlIiwiJHRpbWVvdXQiLCJyZXN0cmljdCIsImxpbmsiLCJzY29wZSIsImVsZW1lbnQiLCIkIiwiZmluZCIsIm9uIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsInZhbCIsImhvdmVyIiwicGFyZW50cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0FBS0E7O0FBRUFBLFFBQVFDLE1BQVIsQ0FBZSxLQUFmLEVBQ0tDLFNBREwsQ0FDZSxhQURmLEVBQzhCLFVBQVNDLFFBQVQsRUFBbUI7QUFDM0MsU0FBTztBQUNMQyxjQUFVLEdBREw7QUFFTEMsVUFBTSxjQUFTQyxLQUFULEVBQWdCQyxPQUFoQixFQUF5QjtBQUM3QkosZUFBUyxZQUFVO0FBQ2pCSyxVQUFFRCxPQUFGLEVBQVdFLElBQVgsQ0FBZ0IsUUFBaEIsRUFBMEJDLEVBQTFCLENBQTZCLE9BQTdCLEVBQXNDLFlBQVc7QUFDL0NGLFlBQUUsZ0NBQUYsRUFBb0NHLFdBQXBDLENBQWdELFNBQWhEO0FBQ0FILFlBQUVELE9BQUYsRUFBV0ssUUFBWCxDQUFvQixTQUFwQjtBQUNELFNBSEQ7QUFJQUosVUFBRUQsT0FBRixFQUFXRSxJQUFYLENBQWdCLFFBQWhCLEVBQTBCQyxFQUExQixDQUE2QixNQUE3QixFQUFxQyxZQUFXO0FBQzlDRixZQUFFRCxPQUFGLEVBQVdJLFdBQVgsQ0FBdUIsU0FBdkI7QUFDQSxjQUFJSCxFQUFFLElBQUYsRUFBUUssR0FBUixFQUFKLEVBQW1CO0FBQ2pCTCxjQUFFRCxPQUFGLEVBQVdFLElBQVgsQ0FBZ0IsT0FBaEIsRUFBeUJHLFFBQXpCLENBQWtDLE1BQWxDO0FBQ0QsV0FGRCxNQUVPO0FBQ0xKLGNBQUVELE9BQUYsRUFBV0UsSUFBWCxDQUFnQixPQUFoQixFQUF5QkUsV0FBekIsQ0FBcUMsTUFBckM7QUFDRDtBQUNGLFNBUEQ7QUFRQUgsVUFBRUQsT0FBRixFQUFXRSxJQUFYLENBQWdCLG1CQUFoQixFQUFxQ0ssS0FBckMsQ0FBMkMsWUFBVztBQUNwRE4sWUFBRSxJQUFGLEVBQVFPLE9BQVIsQ0FBZ0IsYUFBaEIsRUFBK0JILFFBQS9CLENBQXdDLFNBQXhDO0FBQ0QsU0FGRCxFQUVHLFlBQVc7QUFDWkosWUFBRSxJQUFGLEVBQVFPLE9BQVIsQ0FBZ0IsYUFBaEIsRUFBK0JKLFdBQS9CLENBQTJDLFNBQTNDO0FBQ0QsU0FKRDtBQUtELE9BbEJEO0FBbUJEO0FBdEJJLEdBQVA7QUF3QkQsQ0ExQkwiLCJmaWxlIjoiZGlyZWN0aXZlcy9wZy1mb3JtLWdyb3VwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBEaXJlY3RpdmU6IHBnRm9ybUdyb3VwXG4gKiBBcHBseSBQYWdlcyBkZWZhdWx0IGZvcm0gZWZmZWN0c1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbid1c2Ugc3RyaWN0JztcblxuYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmRpcmVjdGl2ZSgncGdGb3JtR3JvdXAnLCBmdW5jdGlvbigkdGltZW91dCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgJChlbGVtZW50KS5maW5kKCc6aW5wdXQnKS5vbignZm9jdXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgJCgnLmZvcm0tZ3JvdXAuZm9ybS1ncm91cC1kZWZhdWx0JykucmVtb3ZlQ2xhc3MoJ2ZvY3VzZWQnKTtcbiAgICAgICAgICAgICAgJChlbGVtZW50KS5hZGRDbGFzcygnZm9jdXNlZCcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKGVsZW1lbnQpLmZpbmQoJzppbnB1dCcpLm9uKCdibHVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICQoZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2ZvY3VzZWQnKTtcbiAgICAgICAgICAgICAgaWYgKCQodGhpcykudmFsKCkpIHtcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLmZpbmQoJ2xhYmVsJykuYWRkQ2xhc3MoJ2ZhZGUnKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLmZpbmQoJ2xhYmVsJykucmVtb3ZlQ2xhc3MoJ2ZhZGUnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKGVsZW1lbnQpLmZpbmQoJy5jaGVja2JveCwgLnJhZGlvJykuaG92ZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICQodGhpcykucGFyZW50cygnLmZvcm0tZ3JvdXAnKS5hZGRDbGFzcygnZm9jdXNlZCcpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICQodGhpcykucGFyZW50cygnLmZvcm0tZ3JvdXAnKS5yZW1vdmVDbGFzcygnZm9jdXNlZCcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG4iXX0=
