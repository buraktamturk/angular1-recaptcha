# angular1-recaptcha

AngularJS 1.x directive that provides support for Google's ReCaptcha v2 Checkbox validation.

## Usage

1. Install with npm
```
npm install --save angular1-recaptcha
```

2. Include on your app definition and put your site key

```javascript
angular
.module('app', [
    // ...
    require('angular1-recaptcha')
])
.constant('RECAPTCHA_SITE_KEY', "YOUR-SITE-KEY") // this step is optional
// if you provide later in your template
```

3. Use the directive on your template
```html
<recaptcha ng-model="ctrl.recaptcha"></recaptcha>
```
You can optionally provide data-theme="dark" (the default is light) or data-site-key="YOUR-SITE-KEY" (the default is the one you provided as a constant on Step 1).

ng-model is where the token received from the recaptcha library is stored. You can set it to null to reset the recaptcha, or you can put ng-disabled="!ctrl.recaptcha" on your button to prevent the form beign submitted without a valid captcha token.

## Recaptcha Library Dependency

You do not have to include Google's Recaptcha script. This library includes asynchronous & deffered way to include it if the library itself is not found. Multiple instances of the directive does not lead to recaptcha library is beign included twice.

## Server-Side validation

Please see the [Google's documentation](https://developers.google.com/recaptcha/docs/verify) about the validation that needs to be occur in the server-side.
