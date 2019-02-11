(function(root, factory) {
  if(typeof define === 'function' && define.amd) {
    define(['angular'], factory);
  } else if(typeof exports === 'object') {
    module.exports = factory(require('angular'));
  } else {
    factory(root.angular, 'ui.router');
  }
})(this, function(angular) {
  var callbackFunctionName;

  function ensureLoad(callback) {
    if(window.grecaptcha) {
      return callback(window.grecaptcha);
    }

    if(!callbackFunctionName) {
      callbackFunctionName = "onrecaptchaload";

      var script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.type = "text/javascript";
      script.src = "https://www.google.com/recaptcha/api.js?onload="+callbackFunctionName+"&render=explicit";
      
      var firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(script, firstScript);
    }

    var old_fnc = window[callbackFunctionName];
    window[callbackFunctionName] = function() {
      window[callbackFunctionName] = old_fnc;
      if(old_fnc) {
        old_fnc();
      }

      callback(window.grecaptcha);
    };
  }

  return angular
    .module('angular1-recaptcha', [])
    .directive('recaptcha', ['$injector', function($injector) {
      return {
        restrict: 'E',
        scope: {
          ngModel: '=',
          siteKey: '=',
          theme: '=',
          size: '='
        },
        link: function($scope, $element) {
          var options;

          if($injector.has('RECAPTCHA_SITE_KEY')) {
            options = $injector.get('RECAPTCHA_SITE_KEY');
          }

          ensureLoad(function(library) {
            var last_token;

            var id = library.render($element[0], {
              sitekey: $scope.siteKey || options,
              theme: $scope.theme || 'light',
              size: $scope.size || 'normal',
              callback: function(token) {
                $scope.ngModel = last_token = token;
              },
              'expired-callback': function() {
                $scope.ngModel = last_token = null;
              }
            });
    
            $scope.$watch('ngModel', function(data) {
              if(last_token != data) {
                $scope.ngModel = last_token = data = null;
                library.reset(id);
              }
            });
          });
        }
      };
    }])
    .name;
});