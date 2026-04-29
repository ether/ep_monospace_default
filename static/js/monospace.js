'use strict';

exports.postAceInit = () => {
  // Wait until the niceSelect-wrapped option is in the DOM before
  // clicking it. Without the guard, clicking an empty jQuery selection
  // is a no-op but the modern niceSelect change handler is still
  // listening and tries to scroll the (undefined) selected option into
  // view, throwing `Cannot read properties of undefined (reading 'top')`
  // and tripping core's error_sanitization spec.
  const tryClick = (attempt = 0) => {
    const $opt = $('ul').find('[data-value=RobotoMono]');
    if ($opt.length) {
      $opt.click();
      return;
    }
    if (attempt < 50) setTimeout(() => tryClick(attempt + 1), 100);
  };
  tryClick();
};
