'use strict';

/**
 * @ngdoc directive
 * @name app.directive:passwordInput
 * @description
 * Directive to display password input with preview button
 * @scope
 * @priority 100
 * @param {String} ngModel Password value
 * @param {String} label Input label
 * @param {String} [help] Help text
 * @param {String} [passwordStrengthEnabled] Show password strength
 * @param {String} id Identifier
 * @param {String} name Input name
 * @param {Number} size Input size
 * @param {String} class Input classes
 * @param {String} placeholder Input placeholder
 * @param {String} style Input CSS styles
 * @param {Number} tabindex Input tabindex
 * @restrict AE
 */

angular.module('app').directive('passwordInput', function () {

  var strength = {

    /**
     * Checks for repetition of characters in
     * a string
     *
     * @private
     * @param {Number} rLen Repetition length.
     * @param {String} str The string to be checked.
     * @return {String} String of repeated characters
     */
    checkRepetition: function checkRepetition(rLen, str) {
      var res = '',
          repeated = false;

      for (var i = 0; i < str.length; i++) {
        repeated = true;
        for (var j = 0; j < rLen && j + i + rLen < str.length; j++) {
          repeated = repeated && str.charAt(j + i) === str.charAt(j + i + rLen);
        }
        if (i < rLen) {
          repeated = false;
        }
        if (repeated) {
          i += rLen - 1;
          repeated = false;
        } else {
          res += str.charAt(i);
        }
      }
      return res;
    },

    /**
     * Returns a value between -2 and 100 to score
     * the user's password.
     *
     * @private
     * @param  {String} password The password to be checked.
     * @param  {Number} minimumLength Minimum length
     * @return {Number} Score (between -2 and 100)
     */
    getPercentage: function getPercentage(password, minimumLength) {
      var percentage = 0;

      // password < minimumLength
      if (password.length < minimumLength) {
        return -1;
      }

      // password length
      percentage += password.length * 4;
      percentage += strength.checkRepetition(1, password).length - password.length;
      percentage += strength.checkRepetition(2, password).length - password.length;
      percentage += strength.checkRepetition(3, password).length - password.length;
      percentage += strength.checkRepetition(4, password).length - password.length;

      // password has 3 numbers
      if (password.match(/(.*[0-9].*[0-9].*[0-9])/)) {
        percentage += 5;
      }

      // password has at least 2 symbols
      var symbols = '.*[!,@,#,$,%,^,&,*,?,_,~]';

      symbols = new RegExp('(' + symbols + symbols + ')');
      if (password.match(symbols)) {
        percentage += 5;
      }

      // password has Upper and Lower chars
      if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
        percentage += 10;
      }

      // password has number and chars
      if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) {
        percentage += 15;
      }

      // password has number and symbol
      if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([0-9])/)) {
        percentage += 15;
      }

      // password has char and symbol
      if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([a-zA-Z])/)) {
        percentage += 15;
      }

      // password is just numbers or chars
      if (password.match(/^\w+$/) || password.match(/^\d+$/)) {
        percentage -= 10;
      }

      if (percentage > 100) {
        percentage = 100;
      }

      if (percentage < 0) {
        percentage = 0;
      }

      return percentage;
    }
  };

  /**
   * Main return function
   */
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    require: 'ngModel',
    templateUrl: 'assets/js/templates/passwordInput.tpl.html',
    link: function link(scope, elem, attrs, ngModel) {

      scope.password = {
        label: attrs.label,
        help: attrs.help,
        visible: false,
        inputType: 'password',
        minLength: attrs.ngMinlength || 0,
        strength: {
          enabled: attrs.passwordStrengthEnabled,
          percentage: null,
          score: null,
          maxScore: 3,
          minScore: 1
        },

        // standard <input> attributes
        id: attrs.id,
        placeholder: attrs.placeholder,
        name: attrs.name,
        class: attrs.class,
        size: attrs.size,
        style: attrs.style,
        tabindex: attrs.tabindex
      };

      // remove standard <input> attributes from root element
      elem.removeAttr('id');
      elem.removeAttr('placeholder');
      elem.removeAttr('name');
      elem.removeAttr('class');
      elem.removeAttr('size');
      elem.removeAttr('style');
      elem.removeAttr('tabindex');

      scope.$watch('password.model', function () {

        // update ngModel based on UI change
        ngModel.$setViewValue(scope.password.model);

        // calculate password strength, if enabled
        if (scope.password.strength.enabled && scope.password.model) {
          scope.password.strength.percentage = strength.getPercentage(scope.password.model, scope.password.minLength);
          scope.password.strength.score = Math.round(2 * scope.password.strength.percentage / 100);
        }
      });

      /**
       * Toggle password visibility
       * @return {void}
       */
      scope.togglePasswordVisibility = function () {
        scope.password.visible = !scope.password.visible;
        scope.password.inputType = scope.password.visible ? 'text' : 'password';
      };
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvcGFzc3dvcmRJbnB1dERpcmVjdGl2ZS5qcyJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwiZGlyZWN0aXZlIiwic3RyZW5ndGgiLCJjaGVja1JlcGV0aXRpb24iLCJyTGVuIiwic3RyIiwicmVzIiwicmVwZWF0ZWQiLCJpIiwibGVuZ3RoIiwiaiIsImNoYXJBdCIsImdldFBlcmNlbnRhZ2UiLCJwYXNzd29yZCIsIm1pbmltdW1MZW5ndGgiLCJwZXJjZW50YWdlIiwibWF0Y2giLCJzeW1ib2xzIiwiUmVnRXhwIiwicmVzdHJpY3QiLCJyZXBsYWNlIiwic2NvcGUiLCJyZXF1aXJlIiwidGVtcGxhdGVVcmwiLCJsaW5rIiwiZWxlbSIsImF0dHJzIiwibmdNb2RlbCIsImxhYmVsIiwiaGVscCIsInZpc2libGUiLCJpbnB1dFR5cGUiLCJtaW5MZW5ndGgiLCJuZ01pbmxlbmd0aCIsImVuYWJsZWQiLCJwYXNzd29yZFN0cmVuZ3RoRW5hYmxlZCIsInNjb3JlIiwibWF4U2NvcmUiLCJtaW5TY29yZSIsImlkIiwicGxhY2Vob2xkZXIiLCJuYW1lIiwiY2xhc3MiLCJzaXplIiwic3R5bGUiLCJ0YWJpbmRleCIsInJlbW92ZUF0dHIiLCIkd2F0Y2giLCIkc2V0Vmlld1ZhbHVlIiwibW9kZWwiLCJNYXRoIiwicm91bmQiLCJ0b2dnbGVQYXNzd29yZFZpc2liaWxpdHkiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkFBLFFBQVFDLE1BQVIsQ0FBZSxLQUFmLEVBQXNCQyxTQUF0QixDQUFnQyxlQUFoQyxFQUFpRCxZQUFZOztBQUUzRCxNQUFNQyxXQUFXOztBQUVmOzs7Ozs7Ozs7QUFTQUMscUJBQWlCLHlCQUFVQyxJQUFWLEVBQWdCQyxHQUFoQixFQUFxQjtBQUNwQyxVQUFJQyxNQUFNLEVBQVY7QUFBQSxVQUFjQyxXQUFXLEtBQXpCOztBQUVBLFdBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJSCxJQUFJSSxNQUF4QixFQUFnQ0QsR0FBaEMsRUFBcUM7QUFDbkNELG1CQUFXLElBQVg7QUFDQSxhQUFLLElBQUlHLElBQUksQ0FBYixFQUFnQkEsSUFBSU4sSUFBSixJQUFhTSxJQUFJRixDQUFKLEdBQVFKLElBQVQsR0FBaUJDLElBQUlJLE1BQWpELEVBQXlEQyxHQUF6RCxFQUE4RDtBQUM1REgscUJBQVdBLFlBQWFGLElBQUlNLE1BQUosQ0FBV0QsSUFBSUYsQ0FBZixNQUFzQkgsSUFBSU0sTUFBSixDQUFXRCxJQUFJRixDQUFKLEdBQVFKLElBQW5CLENBQTlDO0FBQ0Q7QUFDRCxZQUFJSSxJQUFJSixJQUFSLEVBQWM7QUFDWkcscUJBQVcsS0FBWDtBQUNEO0FBQ0QsWUFBSUEsUUFBSixFQUFjO0FBQ1pDLGVBQUtKLE9BQU8sQ0FBWjtBQUNBRyxxQkFBVyxLQUFYO0FBQ0QsU0FIRCxNQUdPO0FBQ0xELGlCQUFPRCxJQUFJTSxNQUFKLENBQVdILENBQVgsQ0FBUDtBQUNEO0FBQ0Y7QUFDRCxhQUFPRixHQUFQO0FBQ0QsS0E5QmM7O0FBZ0NmOzs7Ozs7Ozs7QUFTQU0sbUJBQWUsdUJBQVNDLFFBQVQsRUFBbUJDLGFBQW5CLEVBQWtDO0FBQy9DLFVBQUlDLGFBQWEsQ0FBakI7O0FBRUE7QUFDQSxVQUFJRixTQUFTSixNQUFULEdBQWtCSyxhQUF0QixFQUFxQztBQUNuQyxlQUFPLENBQUMsQ0FBUjtBQUNEOztBQUVEO0FBQ0FDLG9CQUFjRixTQUFTSixNQUFULEdBQWtCLENBQWhDO0FBQ0FNLG9CQUFjYixTQUFTQyxlQUFULENBQXlCLENBQXpCLEVBQTRCVSxRQUE1QixFQUFzQ0osTUFBdEMsR0FBK0NJLFNBQVNKLE1BQXRFO0FBQ0FNLG9CQUFjYixTQUFTQyxlQUFULENBQXlCLENBQXpCLEVBQTRCVSxRQUE1QixFQUFzQ0osTUFBdEMsR0FBK0NJLFNBQVNKLE1BQXRFO0FBQ0FNLG9CQUFjYixTQUFTQyxlQUFULENBQXlCLENBQXpCLEVBQTRCVSxRQUE1QixFQUFzQ0osTUFBdEMsR0FBK0NJLFNBQVNKLE1BQXRFO0FBQ0FNLG9CQUFjYixTQUFTQyxlQUFULENBQXlCLENBQXpCLEVBQTRCVSxRQUE1QixFQUFzQ0osTUFBdEMsR0FBK0NJLFNBQVNKLE1BQXRFOztBQUVBO0FBQ0EsVUFBSUksU0FBU0csS0FBVCxDQUFlLHlCQUFmLENBQUosRUFBK0M7QUFDN0NELHNCQUFjLENBQWQ7QUFDRDs7QUFFRDtBQUNBLFVBQUlFLFVBQVUsMkJBQWQ7O0FBRUFBLGdCQUFVLElBQUlDLE1BQUosQ0FBVyxNQUFNRCxPQUFOLEdBQWdCQSxPQUFoQixHQUEwQixHQUFyQyxDQUFWO0FBQ0EsVUFBSUosU0FBU0csS0FBVCxDQUFlQyxPQUFmLENBQUosRUFBNkI7QUFDM0JGLHNCQUFjLENBQWQ7QUFDRDs7QUFFRDtBQUNBLFVBQUlGLFNBQVNHLEtBQVQsQ0FBZSwrQkFBZixDQUFKLEVBQXFEO0FBQ25ERCxzQkFBYyxFQUFkO0FBQ0Q7O0FBRUQ7QUFDQSxVQUFJRixTQUFTRyxLQUFULENBQWUsWUFBZixLQUFnQ0gsU0FBU0csS0FBVCxDQUFlLFNBQWYsQ0FBcEMsRUFBK0Q7QUFDN0RELHNCQUFjLEVBQWQ7QUFDRDs7QUFFRDtBQUNBLFVBQUlGLFNBQVNHLEtBQVQsQ0FBZSwyQkFBZixLQUErQ0gsU0FBU0csS0FBVCxDQUFlLFNBQWYsQ0FBbkQsRUFBOEU7QUFDNUVELHNCQUFjLEVBQWQ7QUFDRDs7QUFFRDtBQUNBLFVBQUlGLFNBQVNHLEtBQVQsQ0FBZSwyQkFBZixLQUErQ0gsU0FBU0csS0FBVCxDQUFlLFlBQWYsQ0FBbkQsRUFBaUY7QUFDL0VELHNCQUFjLEVBQWQ7QUFDRDs7QUFFRDtBQUNBLFVBQUlGLFNBQVNHLEtBQVQsQ0FBZSxPQUFmLEtBQTJCSCxTQUFTRyxLQUFULENBQWUsT0FBZixDQUEvQixFQUF3RDtBQUN0REQsc0JBQWMsRUFBZDtBQUNEOztBQUVELFVBQUlBLGFBQWEsR0FBakIsRUFBc0I7QUFDcEJBLHFCQUFhLEdBQWI7QUFDRDs7QUFFRCxVQUFJQSxhQUFhLENBQWpCLEVBQW9CO0FBQ2xCQSxxQkFBYSxDQUFiO0FBQ0Q7O0FBRUQsYUFBT0EsVUFBUDtBQUNEO0FBdkdjLEdBQWpCOztBQTBHQTs7O0FBR0EsU0FBTztBQUNMSSxjQUFVLElBREw7QUFFTEMsYUFBUyxJQUZKO0FBR0xDLFdBQU8sSUFIRjtBQUlMQyxhQUFTLFNBSko7QUFLTEMsaUJBQWEsNENBTFI7QUFNTEMsVUFBTSxjQUFVSCxLQUFWLEVBQWlCSSxJQUFqQixFQUF1QkMsS0FBdkIsRUFBOEJDLE9BQTlCLEVBQXVDOztBQUUzQ04sWUFBTVIsUUFBTixHQUFpQjtBQUNmZSxlQUFPRixNQUFNRSxLQURFO0FBRWZDLGNBQU1ILE1BQU1HLElBRkc7QUFHZkMsaUJBQVMsS0FITTtBQUlmQyxtQkFBVyxVQUpJO0FBS2ZDLG1CQUFXTixNQUFNTyxXQUFOLElBQXFCLENBTGpCO0FBTWYvQixrQkFBVTtBQUNSZ0MsbUJBQVNSLE1BQU1TLHVCQURQO0FBRVJwQixzQkFBWSxJQUZKO0FBR1JxQixpQkFBTyxJQUhDO0FBSVJDLG9CQUFVLENBSkY7QUFLUkMsb0JBQVU7QUFMRixTQU5LOztBQWNmO0FBQ0FDLFlBQUliLE1BQU1hLEVBZks7QUFnQmZDLHFCQUFhZCxNQUFNYyxXQWhCSjtBQWlCZkMsY0FBTWYsTUFBTWUsSUFqQkc7QUFrQmZDLGVBQU9oQixNQUFNZ0IsS0FsQkU7QUFtQmZDLGNBQU1qQixNQUFNaUIsSUFuQkc7QUFvQmZDLGVBQU9sQixNQUFNa0IsS0FwQkU7QUFxQmZDLGtCQUFVbkIsTUFBTW1CO0FBckJELE9BQWpCOztBQXdCQTtBQUNBcEIsV0FBS3FCLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDQXJCLFdBQUtxQixVQUFMLENBQWdCLGFBQWhCO0FBQ0FyQixXQUFLcUIsVUFBTCxDQUFnQixNQUFoQjtBQUNBckIsV0FBS3FCLFVBQUwsQ0FBZ0IsT0FBaEI7QUFDQXJCLFdBQUtxQixVQUFMLENBQWdCLE1BQWhCO0FBQ0FyQixXQUFLcUIsVUFBTCxDQUFnQixPQUFoQjtBQUNBckIsV0FBS3FCLFVBQUwsQ0FBZ0IsVUFBaEI7O0FBRUF6QixZQUFNMEIsTUFBTixDQUFhLGdCQUFiLEVBQStCLFlBQU07O0FBRW5DO0FBQ0FwQixnQkFBUXFCLGFBQVIsQ0FBc0IzQixNQUFNUixRQUFOLENBQWVvQyxLQUFyQzs7QUFFQTtBQUNBLFlBQUk1QixNQUFNUixRQUFOLENBQWVYLFFBQWYsQ0FBd0JnQyxPQUF4QixJQUFtQ2IsTUFBTVIsUUFBTixDQUFlb0MsS0FBdEQsRUFBNkQ7QUFDM0Q1QixnQkFBTVIsUUFBTixDQUFlWCxRQUFmLENBQXdCYSxVQUF4QixHQUFxQ2IsU0FBU1UsYUFBVCxDQUF1QlMsTUFBTVIsUUFBTixDQUFlb0MsS0FBdEMsRUFBNkM1QixNQUFNUixRQUFOLENBQWVtQixTQUE1RCxDQUFyQztBQUNBWCxnQkFBTVIsUUFBTixDQUFlWCxRQUFmLENBQXdCa0MsS0FBeEIsR0FBZ0NjLEtBQUtDLEtBQUwsQ0FBVyxJQUFJOUIsTUFBTVIsUUFBTixDQUFlWCxRQUFmLENBQXdCYSxVQUE1QixHQUF5QyxHQUFwRCxDQUFoQztBQUNEO0FBQ0YsT0FWRDs7QUFZQTs7OztBQUlBTSxZQUFNK0Isd0JBQU4sR0FBaUMsWUFBVztBQUMxQy9CLGNBQU1SLFFBQU4sQ0FBZWlCLE9BQWYsR0FBeUIsQ0FBQ1QsTUFBTVIsUUFBTixDQUFlaUIsT0FBekM7QUFDQVQsY0FBTVIsUUFBTixDQUFla0IsU0FBZixHQUE0QlYsTUFBTVIsUUFBTixDQUFlaUIsT0FBZixHQUF5QixNQUF6QixHQUFrQyxVQUE5RDtBQUNELE9BSEQ7QUFLRDtBQTlESSxHQUFQO0FBZ0VELENBL0tEIiwiZmlsZSI6ImRpcmVjdGl2ZXMvcGFzc3dvcmRJbnB1dERpcmVjdGl2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBAbmdkb2MgZGlyZWN0aXZlXG4gKiBAbmFtZSBhcHAuZGlyZWN0aXZlOnBhc3N3b3JkSW5wdXRcbiAqIEBkZXNjcmlwdGlvblxuICogRGlyZWN0aXZlIHRvIGRpc3BsYXkgcGFzc3dvcmQgaW5wdXQgd2l0aCBwcmV2aWV3IGJ1dHRvblxuICogQHNjb3BlXG4gKiBAcHJpb3JpdHkgMTAwXG4gKiBAcGFyYW0ge1N0cmluZ30gbmdNb2RlbCBQYXNzd29yZCB2YWx1ZVxuICogQHBhcmFtIHtTdHJpbmd9IGxhYmVsIElucHV0IGxhYmVsXG4gKiBAcGFyYW0ge1N0cmluZ30gW2hlbHBdIEhlbHAgdGV4dFxuICogQHBhcmFtIHtTdHJpbmd9IFtwYXNzd29yZFN0cmVuZ3RoRW5hYmxlZF0gU2hvdyBwYXNzd29yZCBzdHJlbmd0aFxuICogQHBhcmFtIHtTdHJpbmd9IGlkIElkZW50aWZpZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIElucHV0IG5hbWVcbiAqIEBwYXJhbSB7TnVtYmVyfSBzaXplIElucHV0IHNpemVcbiAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzcyBJbnB1dCBjbGFzc2VzXG4gKiBAcGFyYW0ge1N0cmluZ30gcGxhY2Vob2xkZXIgSW5wdXQgcGxhY2Vob2xkZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHlsZSBJbnB1dCBDU1Mgc3R5bGVzXG4gKiBAcGFyYW0ge051bWJlcn0gdGFiaW5kZXggSW5wdXQgdGFiaW5kZXhcbiAqIEByZXN0cmljdCBBRVxuICovXG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAnKS5kaXJlY3RpdmUoJ3Bhc3N3b3JkSW5wdXQnLCBmdW5jdGlvbiAoKSB7XG5cbiAgY29uc3Qgc3RyZW5ndGggPSB7XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgZm9yIHJlcGV0aXRpb24gb2YgY2hhcmFjdGVycyBpblxuICAgICAqIGEgc3RyaW5nXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSByTGVuIFJlcGV0aXRpb24gbGVuZ3RoLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIHN0cmluZyB0byBiZSBjaGVja2VkLlxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gU3RyaW5nIG9mIHJlcGVhdGVkIGNoYXJhY3RlcnNcbiAgICAgKi9cbiAgICBjaGVja1JlcGV0aXRpb246IGZ1bmN0aW9uIChyTGVuLCBzdHIpIHtcbiAgICAgIGxldCByZXMgPSAnJywgcmVwZWF0ZWQgPSBmYWxzZTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVwZWF0ZWQgPSB0cnVlO1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJMZW4gJiYgKGogKyBpICsgckxlbikgPCBzdHIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICByZXBlYXRlZCA9IHJlcGVhdGVkICYmIChzdHIuY2hhckF0KGogKyBpKSA9PT0gc3RyLmNoYXJBdChqICsgaSArIHJMZW4pKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA8IHJMZW4pIHtcbiAgICAgICAgICByZXBlYXRlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXBlYXRlZCkge1xuICAgICAgICAgIGkgKz0gckxlbiAtIDE7XG4gICAgICAgICAgcmVwZWF0ZWQgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXMgKz0gc3RyLmNoYXJBdChpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHZhbHVlIGJldHdlZW4gLTIgYW5kIDEwMCB0byBzY29yZVxuICAgICAqIHRoZSB1c2VyJ3MgcGFzc3dvcmQuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gcGFzc3dvcmQgVGhlIHBhc3N3b3JkIHRvIGJlIGNoZWNrZWQuXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBtaW5pbXVtTGVuZ3RoIE1pbmltdW0gbGVuZ3RoXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBTY29yZSAoYmV0d2VlbiAtMiBhbmQgMTAwKVxuICAgICAqL1xuICAgIGdldFBlcmNlbnRhZ2U6IGZ1bmN0aW9uKHBhc3N3b3JkLCBtaW5pbXVtTGVuZ3RoKSB7XG4gICAgICBsZXQgcGVyY2VudGFnZSA9IDA7XG5cbiAgICAgIC8vIHBhc3N3b3JkIDwgbWluaW11bUxlbmd0aFxuICAgICAgaWYgKHBhc3N3b3JkLmxlbmd0aCA8IG1pbmltdW1MZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfVxuXG4gICAgICAvLyBwYXNzd29yZCBsZW5ndGhcbiAgICAgIHBlcmNlbnRhZ2UgKz0gcGFzc3dvcmQubGVuZ3RoICogNDtcbiAgICAgIHBlcmNlbnRhZ2UgKz0gc3RyZW5ndGguY2hlY2tSZXBldGl0aW9uKDEsIHBhc3N3b3JkKS5sZW5ndGggLSBwYXNzd29yZC5sZW5ndGg7XG4gICAgICBwZXJjZW50YWdlICs9IHN0cmVuZ3RoLmNoZWNrUmVwZXRpdGlvbigyLCBwYXNzd29yZCkubGVuZ3RoIC0gcGFzc3dvcmQubGVuZ3RoO1xuICAgICAgcGVyY2VudGFnZSArPSBzdHJlbmd0aC5jaGVja1JlcGV0aXRpb24oMywgcGFzc3dvcmQpLmxlbmd0aCAtIHBhc3N3b3JkLmxlbmd0aDtcbiAgICAgIHBlcmNlbnRhZ2UgKz0gc3RyZW5ndGguY2hlY2tSZXBldGl0aW9uKDQsIHBhc3N3b3JkKS5sZW5ndGggLSBwYXNzd29yZC5sZW5ndGg7XG5cbiAgICAgIC8vIHBhc3N3b3JkIGhhcyAzIG51bWJlcnNcbiAgICAgIGlmIChwYXNzd29yZC5tYXRjaCgvKC4qWzAtOV0uKlswLTldLipbMC05XSkvKSkge1xuICAgICAgICBwZXJjZW50YWdlICs9IDU7XG4gICAgICB9XG5cbiAgICAgIC8vIHBhc3N3b3JkIGhhcyBhdCBsZWFzdCAyIHN5bWJvbHNcbiAgICAgIGxldCBzeW1ib2xzID0gJy4qWyEsQCwjLCQsJSxeLCYsKiw/LF8sfl0nO1xuXG4gICAgICBzeW1ib2xzID0gbmV3IFJlZ0V4cCgnKCcgKyBzeW1ib2xzICsgc3ltYm9scyArICcpJyk7XG4gICAgICBpZiAocGFzc3dvcmQubWF0Y2goc3ltYm9scykpIHtcbiAgICAgICAgcGVyY2VudGFnZSArPSA1O1xuICAgICAgfVxuXG4gICAgICAvLyBwYXNzd29yZCBoYXMgVXBwZXIgYW5kIExvd2VyIGNoYXJzXG4gICAgICBpZiAocGFzc3dvcmQubWF0Y2goLyhbYS16XS4qW0EtWl0pfChbQS1aXS4qW2Etel0pLykpIHtcbiAgICAgICAgcGVyY2VudGFnZSArPSAxMDtcbiAgICAgIH1cblxuICAgICAgLy8gcGFzc3dvcmQgaGFzIG51bWJlciBhbmQgY2hhcnNcbiAgICAgIGlmIChwYXNzd29yZC5tYXRjaCgvKFthLXpBLVpdKS8pICYmIHBhc3N3b3JkLm1hdGNoKC8oWzAtOV0pLykpIHtcbiAgICAgICAgcGVyY2VudGFnZSArPSAxNTtcbiAgICAgIH1cblxuICAgICAgLy8gcGFzc3dvcmQgaGFzIG51bWJlciBhbmQgc3ltYm9sXG4gICAgICBpZiAocGFzc3dvcmQubWF0Y2goLyhbISxALCMsJCwlLF4sJiwqLD8sXyx+XSkvKSAmJiBwYXNzd29yZC5tYXRjaCgvKFswLTldKS8pKSB7XG4gICAgICAgIHBlcmNlbnRhZ2UgKz0gMTU7XG4gICAgICB9XG5cbiAgICAgIC8vIHBhc3N3b3JkIGhhcyBjaGFyIGFuZCBzeW1ib2xcbiAgICAgIGlmIChwYXNzd29yZC5tYXRjaCgvKFshLEAsIywkLCUsXiwmLCosPyxfLH5dKS8pICYmIHBhc3N3b3JkLm1hdGNoKC8oW2EtekEtWl0pLykpIHtcbiAgICAgICAgcGVyY2VudGFnZSArPSAxNTtcbiAgICAgIH1cblxuICAgICAgLy8gcGFzc3dvcmQgaXMganVzdCBudW1iZXJzIG9yIGNoYXJzXG4gICAgICBpZiAocGFzc3dvcmQubWF0Y2goL15cXHcrJC8pIHx8IHBhc3N3b3JkLm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgICBwZXJjZW50YWdlIC09IDEwO1xuICAgICAgfVxuXG4gICAgICBpZiAocGVyY2VudGFnZSA+IDEwMCkge1xuICAgICAgICBwZXJjZW50YWdlID0gMTAwO1xuICAgICAgfVxuXG4gICAgICBpZiAocGVyY2VudGFnZSA8IDApIHtcbiAgICAgICAgcGVyY2VudGFnZSA9IDA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwZXJjZW50YWdlO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogTWFpbiByZXR1cm4gZnVuY3Rpb25cbiAgICovXG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBRScsXG4gICAgcmVwbGFjZTogdHJ1ZSxcbiAgICBzY29wZTogdHJ1ZSxcbiAgICByZXF1aXJlOiAnbmdNb2RlbCcsXG4gICAgdGVtcGxhdGVVcmw6ICdhc3NldHMvanMvdGVtcGxhdGVzL3Bhc3N3b3JkSW5wdXQudHBsLmh0bWwnLFxuICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbSwgYXR0cnMsIG5nTW9kZWwpIHtcblxuICAgICAgc2NvcGUucGFzc3dvcmQgPSB7XG4gICAgICAgIGxhYmVsOiBhdHRycy5sYWJlbCxcbiAgICAgICAgaGVscDogYXR0cnMuaGVscCxcbiAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgIGlucHV0VHlwZTogJ3Bhc3N3b3JkJyxcbiAgICAgICAgbWluTGVuZ3RoOiBhdHRycy5uZ01pbmxlbmd0aCB8fCAwLFxuICAgICAgICBzdHJlbmd0aDoge1xuICAgICAgICAgIGVuYWJsZWQ6IGF0dHJzLnBhc3N3b3JkU3RyZW5ndGhFbmFibGVkLFxuICAgICAgICAgIHBlcmNlbnRhZ2U6IG51bGwsXG4gICAgICAgICAgc2NvcmU6IG51bGwsXG4gICAgICAgICAgbWF4U2NvcmU6IDMsXG4gICAgICAgICAgbWluU2NvcmU6IDFcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBzdGFuZGFyZCA8aW5wdXQ+IGF0dHJpYnV0ZXNcbiAgICAgICAgaWQ6IGF0dHJzLmlkLFxuICAgICAgICBwbGFjZWhvbGRlcjogYXR0cnMucGxhY2Vob2xkZXIsXG4gICAgICAgIG5hbWU6IGF0dHJzLm5hbWUsXG4gICAgICAgIGNsYXNzOiBhdHRycy5jbGFzcyxcbiAgICAgICAgc2l6ZTogYXR0cnMuc2l6ZSxcbiAgICAgICAgc3R5bGU6IGF0dHJzLnN0eWxlLFxuICAgICAgICB0YWJpbmRleDogYXR0cnMudGFiaW5kZXgsXG4gICAgICB9O1xuXG4gICAgICAvLyByZW1vdmUgc3RhbmRhcmQgPGlucHV0PiBhdHRyaWJ1dGVzIGZyb20gcm9vdCBlbGVtZW50XG4gICAgICBlbGVtLnJlbW92ZUF0dHIoJ2lkJyk7XG4gICAgICBlbGVtLnJlbW92ZUF0dHIoJ3BsYWNlaG9sZGVyJyk7XG4gICAgICBlbGVtLnJlbW92ZUF0dHIoJ25hbWUnKTtcbiAgICAgIGVsZW0ucmVtb3ZlQXR0cignY2xhc3MnKTtcbiAgICAgIGVsZW0ucmVtb3ZlQXR0cignc2l6ZScpO1xuICAgICAgZWxlbS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgZWxlbS5yZW1vdmVBdHRyKCd0YWJpbmRleCcpO1xuXG4gICAgICBzY29wZS4kd2F0Y2goJ3Bhc3N3b3JkLm1vZGVsJywgKCkgPT4ge1xuXG4gICAgICAgIC8vIHVwZGF0ZSBuZ01vZGVsIGJhc2VkIG9uIFVJIGNoYW5nZVxuICAgICAgICBuZ01vZGVsLiRzZXRWaWV3VmFsdWUoc2NvcGUucGFzc3dvcmQubW9kZWwpO1xuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSBwYXNzd29yZCBzdHJlbmd0aCwgaWYgZW5hYmxlZFxuICAgICAgICBpZiAoc2NvcGUucGFzc3dvcmQuc3RyZW5ndGguZW5hYmxlZCAmJiBzY29wZS5wYXNzd29yZC5tb2RlbCkge1xuICAgICAgICAgIHNjb3BlLnBhc3N3b3JkLnN0cmVuZ3RoLnBlcmNlbnRhZ2UgPSBzdHJlbmd0aC5nZXRQZXJjZW50YWdlKHNjb3BlLnBhc3N3b3JkLm1vZGVsLCBzY29wZS5wYXNzd29yZC5taW5MZW5ndGgpO1xuICAgICAgICAgIHNjb3BlLnBhc3N3b3JkLnN0cmVuZ3RoLnNjb3JlID0gTWF0aC5yb3VuZCgyICogc2NvcGUucGFzc3dvcmQuc3RyZW5ndGgucGVyY2VudGFnZSAvIDEwMCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvKipcbiAgICAgICAqIFRvZ2dsZSBwYXNzd29yZCB2aXNpYmlsaXR5XG4gICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICovXG4gICAgICBzY29wZS50b2dnbGVQYXNzd29yZFZpc2liaWxpdHkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgc2NvcGUucGFzc3dvcmQudmlzaWJsZSA9ICFzY29wZS5wYXNzd29yZC52aXNpYmxlO1xuICAgICAgICBzY29wZS5wYXNzd29yZC5pbnB1dFR5cGUgPSAoc2NvcGUucGFzc3dvcmQudmlzaWJsZSA/ICd0ZXh0JyA6ICdwYXNzd29yZCcpO1xuICAgICAgfTtcblxuICAgIH1cbiAgfTtcbn0pO1xuIl19
