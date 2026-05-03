'use strict';

// Default the pad font to RobotoMono for new sessions.
//
// Older revision: `$('ul').find('[data-value=RobotoMono]').click()` —
// this triggered the niceSelect dropdown's click cascade, which under
// the current Etherpad reads the font-menu's bounding rect via jQuery's
// trigger pipeline and threw `TypeError: Cannot read properties of
// undefined (reading 'top')` if the dropdown wasn't fully positioned at
// postAceInit time. The exception leaked into the global error gritter
// path, breaking error_sanitization.spec.ts.
//
// The same effect can be achieved without going through the click
// cascade: set the ace property + the select's value directly, then
// nudge niceSelect to redraw the visible label. This mirrors what
// padeditor.setViewOptions does internally for `padFontFamily`.
exports.postAceInit = (hook, context) => {
  const FONT = 'RobotoMono';
  const select = $('#viewfontmenu');
  if (select.find(`option[value=${FONT}]`).length === 0) return; // skin/build doesn't ship the font
  context.ace.setProperty('textface', FONT);
  select.val(FONT);
  if (select.niceSelect) select.niceSelect('update');
};
