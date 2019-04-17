(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function () {
  'use strict';

  var internalId = 0;
  var togglesMap = {};
  var targetsMap = {};

  function $ (selector, context) {
    return Array.prototype.slice.call(
      (context || document).querySelectorAll(selector)
    );
  }

  function getClosestToggle (element) {
    if (element.closest) {
      return element.closest('[data-a11y-toggle]');
    }

    while (element) {
      if (element.nodeType === 1 && element.hasAttribute('data-a11y-toggle')) {
        return element;
      }

      element = element.parentNode;
    }

    return null;
  }

  function handleToggle (toggle) {
    var target = toggle && targetsMap[toggle.getAttribute('aria-controls')];

    if (!target) {
      return false;
    }

    var toggles = togglesMap['#' + target.id];
    var isExpanded = target.getAttribute('aria-hidden') === 'false';

    target.setAttribute('aria-hidden', isExpanded);
    toggles.forEach(function (toggle) {
      toggle.setAttribute('aria-expanded', !isExpanded);
    });
  }

  var initA11yToggle = function (context) {
    togglesMap = $('[data-a11y-toggle]', context).reduce(function (acc, toggle) {
      var selector = '#' + toggle.getAttribute('data-a11y-toggle');
      acc[selector] = acc[selector] || [];
      acc[selector].push(toggle);
      return acc;
    }, togglesMap);

    var targets = Object.keys(togglesMap);
    targets.length && $(targets).forEach(function (target) {
      var toggles = togglesMap['#' + target.id];
      var isExpanded = target.hasAttribute('data-a11y-toggle-open');
      var labelledby = [];

      toggles.forEach(function (toggle) {
        toggle.id || toggle.setAttribute('id', 'a11y-toggle-' + internalId++);
        toggle.setAttribute('aria-controls', target.id);
        toggle.setAttribute('aria-expanded', isExpanded);
        labelledby.push(toggle.id);
      });

      target.setAttribute('aria-hidden', !isExpanded);
      target.hasAttribute('aria-labelledby') || target.setAttribute('aria-labelledby', labelledby.join(' '));

      targetsMap[target.id] = target;
    });
  };

  document.addEventListener('DOMContentLoaded', function () {
    initA11yToggle();
  });

  document.addEventListener('click', function (event) {
    var toggle = getClosestToggle(event.target);
    handleToggle(toggle);
  });

  document.addEventListener('keyup', function (event) {
    if (event.which === 13 || event.which === 32) {
      var toggle = getClosestToggle(event.target);
      if (toggle && toggle.getAttribute('role') === 'button') {
        handleToggle(toggle);
      }
    }
  });

  window && (window.a11yToggle = initA11yToggle);
})();

},{}],2:[function(require,module,exports){
var tabbable = require('tabbable');
var xtend = require('xtend');

var activeFocusTraps = (function() {
  var trapQueue = [];
  return {
    activateTrap: function(trap) {
      if (trapQueue.length > 0) {
        var activeTrap = trapQueue[trapQueue.length - 1];
        if (activeTrap !== trap) {
          activeTrap.pause();
        }
      }

      var trapIndex = trapQueue.indexOf(trap);
      if (trapIndex === -1) {
        trapQueue.push(trap);
      } else {
        // move this existing trap to the front of the queue
        trapQueue.splice(trapIndex, 1);
        trapQueue.push(trap);
      }
    },

    deactivateTrap: function(trap) {
      var trapIndex = trapQueue.indexOf(trap);
      if (trapIndex !== -1) {
        trapQueue.splice(trapIndex, 1);
      }

      if (trapQueue.length > 0) {
        trapQueue[trapQueue.length - 1].unpause();
      }
    }
  };
})();

function focusTrap(element, userOptions) {
  var doc = document;
  var container =
    typeof element === 'string' ? doc.querySelector(element) : element;

  var config = xtend(
    {
      returnFocusOnDeactivate: true,
      escapeDeactivates: true
    },
    userOptions
  );

  var state = {
    firstTabbableNode: null,
    lastTabbableNode: null,
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: false,
    paused: false
  };

  var trap = {
    activate: activate,
    deactivate: deactivate,
    pause: pause,
    unpause: unpause
  };

  return trap;

  function activate(activateOptions) {
    if (state.active) return;

    updateTabbableNodes();

    state.active = true;
    state.paused = false;
    state.nodeFocusedBeforeActivation = doc.activeElement;

    var onActivate =
      activateOptions && activateOptions.onActivate
        ? activateOptions.onActivate
        : config.onActivate;
    if (onActivate) {
      onActivate();
    }

    addListeners();
    return trap;
  }

  function deactivate(deactivateOptions) {
    if (!state.active) return;

    removeListeners();
    state.active = false;
    state.paused = false;

    activeFocusTraps.deactivateTrap(trap);

    var onDeactivate =
      deactivateOptions && deactivateOptions.onDeactivate !== undefined
        ? deactivateOptions.onDeactivate
        : config.onDeactivate;
    if (onDeactivate) {
      onDeactivate();
    }

    var returnFocus =
      deactivateOptions && deactivateOptions.returnFocus !== undefined
        ? deactivateOptions.returnFocus
        : config.returnFocusOnDeactivate;
    if (returnFocus) {
      delay(function() {
        tryFocus(state.nodeFocusedBeforeActivation);
      });
    }

    return trap;
  }

  function pause() {
    if (state.paused || !state.active) return;
    state.paused = true;
    removeListeners();
  }

  function unpause() {
    if (!state.paused || !state.active) return;
    state.paused = false;
    addListeners();
  }

  function addListeners() {
    if (!state.active) return;

    // There can be only one listening focus trap at a time
    activeFocusTraps.activateTrap(trap);

    updateTabbableNodes();

    // Delay ensures that the focused element doesn't capture the event
    // that caused the focus trap activation.
    delay(function() {
      tryFocus(getInitialFocusNode());
    });
    doc.addEventListener('focusin', checkFocusIn, true);
    doc.addEventListener('mousedown', checkPointerDown, true);
    doc.addEventListener('touchstart', checkPointerDown, true);
    doc.addEventListener('click', checkClick, true);
    doc.addEventListener('keydown', checkKey, true);

    return trap;
  }

  function removeListeners() {
    if (!state.active) return;

    doc.removeEventListener('focusin', checkFocusIn, true);
    doc.removeEventListener('mousedown', checkPointerDown, true);
    doc.removeEventListener('touchstart', checkPointerDown, true);
    doc.removeEventListener('click', checkClick, true);
    doc.removeEventListener('keydown', checkKey, true);

    return trap;
  }

  function getNodeForOption(optionName) {
    var optionValue = config[optionName];
    var node = optionValue;
    if (!optionValue) {
      return null;
    }
    if (typeof optionValue === 'string') {
      node = doc.querySelector(optionValue);
      if (!node) {
        throw new Error('`' + optionName + '` refers to no known node');
      }
    }
    if (typeof optionValue === 'function') {
      node = optionValue();
      if (!node) {
        throw new Error('`' + optionName + '` did not return a node');
      }
    }
    return node;
  }

  function getInitialFocusNode() {
    var node;
    if (getNodeForOption('initialFocus') !== null) {
      node = getNodeForOption('initialFocus');
    } else if (container.contains(doc.activeElement)) {
      node = doc.activeElement;
    } else {
      node = state.firstTabbableNode || getNodeForOption('fallbackFocus');
    }

    if (!node) {
      throw new Error(
        "You can't have a focus-trap without at least one focusable element"
      );
    }

    return node;
  }

  // This needs to be done on mousedown and touchstart instead of click
  // so that it precedes the focus event.
  function checkPointerDown(e) {
    if (container.contains(e.target)) return;
    if (config.clickOutsideDeactivates) {
      deactivate({
        returnFocus: !tabbable.isFocusable(e.target)
      });
    } else {
      e.preventDefault();
    }
  }

  // In case focus escapes the trap for some strange reason, pull it back in.
  function checkFocusIn(e) {
    // In Firefox when you Tab out of an iframe the Document is briefly focused.
    if (container.contains(e.target) || e.target instanceof Document) {
      return;
    }
    e.stopImmediatePropagation();
    tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
  }

  function checkKey(e) {
    if (config.escapeDeactivates !== false && isEscapeEvent(e)) {
      e.preventDefault();
      deactivate();
      return;
    }
    if (isTabEvent(e)) {
      checkTab(e);
      return;
    }
  }

  // Hijack Tab events on the first and last focusable nodes of the trap,
  // in order to prevent focus from escaping. If it escapes for even a
  // moment it can end up scrolling the page and causing confusion so we
  // kind of need to capture the action at the keydown phase.
  function checkTab(e) {
    updateTabbableNodes();
    if (e.shiftKey && e.target === state.firstTabbableNode) {
      e.preventDefault();
      tryFocus(state.lastTabbableNode);
      return;
    }
    if (!e.shiftKey && e.target === state.lastTabbableNode) {
      e.preventDefault();
      tryFocus(state.firstTabbableNode);
      return;
    }
  }

  function checkClick(e) {
    if (config.clickOutsideDeactivates) return;
    if (container.contains(e.target)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
  }

  function updateTabbableNodes() {
    var tabbableNodes = tabbable(container);
    state.firstTabbableNode = tabbableNodes[0] || getInitialFocusNode();
    state.lastTabbableNode =
      tabbableNodes[tabbableNodes.length - 1] || getInitialFocusNode();
  }

  function tryFocus(node) {
    if (node === doc.activeElement) return;
    if (!node || !node.focus) {
      tryFocus(getInitialFocusNode());
      return;
    }

    node.focus();
    state.mostRecentlyFocusedNode = node;
    if (isSelectableInput(node)) {
      node.select();
    }
  }
}

function isSelectableInput(node) {
  return (
    node.tagName &&
    node.tagName.toLowerCase() === 'input' &&
    typeof node.select === 'function'
  );
}

function isEscapeEvent(e) {
  return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
}

function isTabEvent(e) {
  return e.key === 'Tab' || e.keyCode === 9;
}

function delay(fn) {
  return setTimeout(fn, 0);
}

module.exports = focusTrap;

},{"tabbable":3,"xtend":5}],3:[function(require,module,exports){
var candidateSelectors = [
  'input',
  'select',
  'textarea',
  'a[href]',
  'button',
  '[tabindex]',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
];
var candidateSelector = candidateSelectors.join(',');

var matches = typeof Element === 'undefined'
  ? function () {}
  : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

function tabbable(el, options) {
  options = options || {};

  var elementDocument = el.ownerDocument || el;
  var regularTabbables = [];
  var orderedTabbables = [];

  var untouchabilityChecker = new UntouchabilityChecker(elementDocument);
  var candidates = el.querySelectorAll(candidateSelector);

  if (options.includeContainer) {
    if (matches.call(el, candidateSelector)) {
      candidates = Array.prototype.slice.apply(candidates);
      candidates.unshift(el);
    }
  }

  var i, candidate, candidateTabindex;
  for (i = 0; i < candidates.length; i++) {
    candidate = candidates[i];

    if (!isNodeMatchingSelectorTabbable(candidate, untouchabilityChecker)) continue;

    candidateTabindex = getTabindex(candidate);
    if (candidateTabindex === 0) {
      regularTabbables.push(candidate);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        node: candidate,
      });
    }
  }

  var tabbableNodes = orderedTabbables
    .sort(sortOrderedTabbables)
    .map(function(a) { return a.node })
    .concat(regularTabbables);

  return tabbableNodes;
}

tabbable.isTabbable = isTabbable;
tabbable.isFocusable = isFocusable;

function isNodeMatchingSelectorTabbable(node, untouchabilityChecker) {
  if (
    !isNodeMatchingSelectorFocusable(node, untouchabilityChecker)
    || isNonTabbableRadio(node)
    || getTabindex(node) < 0
  ) {
    return false;
  }
  return true;
}

function isTabbable(node, untouchabilityChecker) {
  if (!node) throw new Error('No node provided');
  if (matches.call(node, candidateSelector) === false) return false;
  return isNodeMatchingSelectorTabbable(node, untouchabilityChecker);
}

function isNodeMatchingSelectorFocusable(node, untouchabilityChecker) {
  untouchabilityChecker = untouchabilityChecker || new UntouchabilityChecker(node.ownerDocument || node);
  if (
    node.disabled
    || isHiddenInput(node)
    || untouchabilityChecker.isUntouchable(node)
  ) {
    return false;
  }
  return true;
}

var focusableCandidateSelector = candidateSelectors.concat('iframe').join(',');
function isFocusable(node, untouchabilityChecker) {
  if (!node) throw new Error('No node provided');
  if (matches.call(node, focusableCandidateSelector) === false) return false;
  return isNodeMatchingSelectorFocusable(node, untouchabilityChecker);
}

function getTabindex(node) {
  var tabindexAttr = parseInt(node.getAttribute('tabindex'), 10);
  if (!isNaN(tabindexAttr)) return tabindexAttr;
  // Browsers do not return `tabIndex` correctly for contentEditable nodes;
  // so if they don't have a tabindex attribute specifically set, assume it's 0.
  if (isContentEditable(node)) return 0;
  return node.tabIndex;
}

function sortOrderedTabbables(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
}

// Array.prototype.find not available in IE.
function find(list, predicate) {
  for (var i = 0, length = list.length; i < length; i++) {
    if (predicate(list[i])) return list[i];
  }
}

function isContentEditable(node) {
  return node.contentEditable === 'true';
}

function isInput(node) {
  return node.tagName === 'INPUT';
}

function isHiddenInput(node) {
  return isInput(node) && node.type === 'hidden';
}

function isRadio(node) {
  return isInput(node) && node.type === 'radio';
}

function isNonTabbableRadio(node) {
  return isRadio(node) && !isTabbableRadio(node);
}

function getCheckedRadio(nodes) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked) {
      return nodes[i];
    }
  }
}

function isTabbableRadio(node) {
  if (!node.name) return true;
  // This won't account for the edge case where you have radio groups with the same
  // in separate forms on the same page.
  var radioSet = node.ownerDocument.querySelectorAll('input[type="radio"][name="' + node.name + '"]');
  var checked = getCheckedRadio(radioSet);
  return !checked || checked === node;
}

// An element is "untouchable" if *it or one of its ancestors* has
// `visibility: hidden` or `display: none`.
function UntouchabilityChecker(elementDocument) {
  this.doc = elementDocument;
  // Node cache must be refreshed on every check, in case
  // the content of the element has changed. The cache contains tuples
  // mapping nodes to their boolean result.
  this.cache = [];
}

// getComputedStyle accurately reflects `visibility: hidden` of ancestors
// but not `display: none`, so we need to recursively check parents.
UntouchabilityChecker.prototype.hasDisplayNone = function hasDisplayNone(node, nodeComputedStyle) {
  if (node.nodeType !== Node.ELEMENT_NODE) return false;

    // Search for a cached result.
    var cached = find(this.cache, function(item) {
      return item === node;
    });
    if (cached) return cached[1];

    nodeComputedStyle = nodeComputedStyle || this.doc.defaultView.getComputedStyle(node);

    var result = false;

    if (nodeComputedStyle.display === 'none') {
      result = true;
    } else if (node.parentNode) {
      result = this.hasDisplayNone(node.parentNode);
    }

    this.cache.push([node, result]);

    return result;
}

UntouchabilityChecker.prototype.isUntouchable = function isUntouchable(node) {
  if (node === this.doc.documentElement) return false;
  var computedStyle = this.doc.defaultView.getComputedStyle(node);
  if (this.hasDisplayNone(node, computedStyle)) return true;
  return computedStyle.visibility === 'hidden';
}

module.exports = tabbable;

},{}],4:[function(require,module,exports){
/**
 * van11y-accessible-accordion-aria - ES2015 accessible accordion system, using ARIA (compatible IE9+ when transpiled)
 * @version v3.0.1
 * @link https://van11y.net/accessible-accordion/
 * @license MIT : https://github.com/nico3333fr/van11y-accessible-accordion-aria/blob/master/LICENSE
 */
"use strict";function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var _extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},loadConfig=function(){var e={},t=function(t,r){e[t]=r},r=function(t){return e[t]},n=function(t){return e[t]};return{set:t,get:r,remove:n}},DATA_HASH_ID="data-hashaccordion-id",pluginConfig=loadConfig(),findById=function(e,t){return document.querySelector("#"+e+"["+DATA_HASH_ID+'="'+t+'"]')},addClass=function(e,t){e.classList?e.classList.add(t):e.className+=" "+t},removeClass=function(e,t){e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\b)"+t.split(" ").join("|")+"(\\b|$)","gi")," ")},hasClass=function(e,t){return e.classList?e.classList.contains(t):new RegExp("(^| )"+t+"( |$)","gi").test(e.className)},setAttributes=function(e,t){Object.keys(t).forEach(function(r){e.setAttribute(r,t[r])})},searchParentHashId=function(e,t){for(var r=!1,n=e;1===n.nodeType&&n&&r===!1;)n.hasAttribute(t)===!0?r=!0:n=n.parentNode;return r===!0?n.getAttribute(t):""},searchParent=function(e,t,r){for(var n=!1,A=e;A&&n===!1;)hasClass(A,t)===!0&&A.getAttribute(DATA_HASH_ID)===r?n=!0:A=A.parentNode;return n===!0?A.getAttribute("id"):""},unSelectHeaders=function(e,t){e.forEach(function(e){setAttributes(e,_defineProperty({},t,"false"))})},selectHeader=function(e,t){e.setAttribute(t,!0)},selectHeaderInList=function(e,t,r){var n=void 0;e.forEach(function(e,t){"true"===e.getAttribute(r)&&(n=t)}),"next"===t&&(selectHeader(e[n+1]),setTimeout(function(){e[n+1].focus()},0)),"prev"===t&&(selectHeader(e[n-1]),setTimeout(function(){e[n-1].focus()},0))},plugin=function(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=_extends({ACCORDION_JS:"js-accordion",ACCORDION_JS_HEADER:"js-accordion__header",ACCORDION_JS_PANEL:"js-accordion__panel",ACCORDION_DATA_PREFIX_CLASS:"data-accordion-prefix-classes",ACCORDION_DATA_OPENED:"data-accordion-opened",ACCORDION_DATA_MULTISELECTABLE:"data-accordion-multiselectable",ACCORDION_DATA_COOL_SELECTORS:"data-accordion-cool-selectors",ACCORDION_PREFIX_IDS:"accordion",ACCORDION_BUTTON_ID:"_tab",ACCORDION_PANEL_ID:"_panel",ACCORDION_STYLE:"accordion",ACCORDION_TITLE_STYLE:"accordion__title",ACCORDION_HEADER_STYLE:"accordion__header",ACCORDION_PANEL_STYLE:"accordion__panel",ACCORDION_ROLE_TABLIST:"tablist",ACCORDION_ROLE_TAB:"tab",ACCORDION_ROLE_TABPANEL:"tabpanel",ATTR_ROLE:"role",ATTR_MULTISELECTABLE:"aria-multiselectable",ATTR_EXPANDED:"aria-expanded",ATTR_LABELLEDBY:"aria-labelledby",ATTR_HIDDEN:"aria-hidden",ATTR_CONTROLS:"aria-controls",ATTR_SELECTED:"aria-selected"},e),r=Math.random().toString(32).slice(2,12);pluginConfig.set(r,t);var n=function(){var e=arguments.length<=0||void 0===arguments[0]?document:arguments[0];return[].slice.call(e.querySelectorAll("."+t.ACCORDION_JS))},A=function(e){n(e).forEach(function(e){var n="z"+Math.random().toString(32).slice(2,12),A=e.hasAttribute(t.ACCORDION_DATA_PREFIX_CLASS)===!0?e.getAttribute(t.ACCORDION_DATA_PREFIX_CLASS)+"-":"",a=e.hasAttribute(t.ACCORDION_DATA_COOL_SELECTORS)===!0;"none"===e.getAttribute(t.ACCORDION_DATA_MULTISELECTABLE)?e.setAttribute(t.ATTR_MULTISELECTABLE,"false"):e.setAttribute(t.ATTR_MULTISELECTABLE,"true"),e.setAttribute(t.ATTR_ROLE,t.ACCORDION_ROLE_TABLIST),e.setAttribute("id",n),e.setAttribute(DATA_HASH_ID,r),addClass(e,A+t.ACCORDION_STYLE);var i=[].slice.call(e.querySelectorAll("."+t.ACCORDION_JS_HEADER));i.forEach(function(i,_){var o,T;if(i.parentNode===e||a!==!1){var E=_+1,s=i.nextElementSibling,C=i.innerHTML,c=document.createElement("BUTTON"),D=i.hasAttribute(t.ACCORDION_DATA_OPENED)===!0?i.getAttribute(t.ACCORDION_DATA_OPENED):"";c.innerHTML=C,addClass(c,t.ACCORDION_JS_HEADER),addClass(c,A+t.ACCORDION_HEADER_STYLE),setAttributes(c,(o={},_defineProperty(o,t.ATTR_ROLE,t.ACCORDION_ROLE_TAB),_defineProperty(o,"id",t.ACCORDION_PREFIX_IDS+n+t.ACCORDION_BUTTON_ID+E),_defineProperty(o,t.ATTR_CONTROLS,t.ACCORDION_PREFIX_IDS+n+t.ACCORDION_PANEL_ID+E),_defineProperty(o,t.ATTR_SELECTED,"false"),_defineProperty(o,"type","button"),_defineProperty(o,DATA_HASH_ID,r),o)),i.innerHTML="",i.appendChild(c),addClass(i,A+t.ACCORDION_TITLE_STYLE),removeClass(i,t.ACCORDION_JS_HEADER),addClass(s,A+t.ACCORDION_PANEL_STYLE),setAttributes(s,(T={},_defineProperty(T,t.ATTR_ROLE,t.ACCORDION_ROLE_TABPANEL),_defineProperty(T,t.ATTR_LABELLEDBY,t.ACCORDION_PREFIX_IDS+n+t.ACCORDION_BUTTON_ID+E),_defineProperty(T,"id",t.ACCORDION_PREFIX_IDS+n+t.ACCORDION_PANEL_ID+E),_defineProperty(T,DATA_HASH_ID,r),T)),"true"===D?(c.setAttribute(t.ATTR_EXPANDED,"true"),i.removeAttribute(t.ACCORDION_DATA_OPENED),s.setAttribute(t.ATTR_HIDDEN,"false")):(c.setAttribute(t.ATTR_EXPANDED,"false"),s.setAttribute(t.ATTR_HIDDEN,"true"))}})})};return{attach:A}},main=function(){return["click","keydown","focus"].forEach(function(e){document.body.addEventListener(e,function(t){var r=searchParentHashId(t.target,DATA_HASH_ID);""!==r&&!function(){var n=pluginConfig.get(r);hasClass(t.target,n.ACCORDION_JS_HEADER)===!0&&"focus"===e&&!function(){var e=t.target,A=findById(searchParent(e,n.ACCORDION_JS,r),r),a=A.hasAttribute(n.ACCORDION_DATA_COOL_SELECTORS)===!0,i=[].slice.call(A.querySelectorAll("."+n.ACCORDION_JS_HEADER));a===!1&&(i=i.filter(function(e){return e.parentNode.parentNode===A})),unSelectHeaders(i,n.ATTR_SELECTED),selectHeader(e,n.ATTR_SELECTED)}(),hasClass(t.target,n.ACCORDION_JS_HEADER)===!0&&"click"===e&&!function(){var e=t.target,A=findById(searchParent(e,n.ACCORDION_JS,r),r),a=A.hasAttribute(n.ACCORDION_DATA_COOL_SELECTORS)===!0,i=[].slice.call(A.querySelectorAll("."+n.ACCORDION_JS_HEADER)),_=A.getAttribute(n.ATTR_MULTISELECTABLE),o=findById(e.getAttribute(n.ATTR_CONTROLS),r),T=e.getAttribute(n.ATTR_EXPANDED);a===!1&&(i=i.filter(function(e){return e.parentNode.parentNode===A})),"false"===T?(e.setAttribute(n.ATTR_EXPANDED,!0),o.removeAttribute(n.ATTR_HIDDEN)):(e.setAttribute(n.ATTR_EXPANDED,!1),o.setAttribute(n.ATTR_HIDDEN,!0)),"false"===_&&i.forEach(function(t){var A=findById(t.getAttribute(n.ATTR_CONTROLS),r);t!==e?(t.setAttribute(n.ATTR_SELECTED,!1),t.setAttribute(n.ATTR_EXPANDED,!1),A.setAttribute(n.ATTR_HIDDEN,!0)):t.setAttribute(n.ATTR_SELECTED,!0)}),setTimeout(function(){e.focus()},0),t.preventDefault()}(),hasClass(t.target,n.ACCORDION_JS_HEADER)===!0&&"keydown"===e&&!function(){var e=t.target,A=searchParent(e,n.ACCORDION_JS,r),a=findById(A,r),i=a.hasAttribute(n.ACCORDION_DATA_COOL_SELECTORS)===!0,_=[].slice.call(a.querySelectorAll("."+n.ACCORDION_JS_HEADER));i===!1&&(_=_.filter(function(e){return e.parentNode.parentNode===a})),36===t.keyCode?(unSelectHeaders(_,n.ATTR_SELECTED),selectHeader(_[0],n.ATTR_SELECTED),setTimeout(function(){_[0].focus()},0),t.preventDefault()):35===t.keyCode?(unSelectHeaders(_,n.ATTR_SELECTED),selectHeader(_[_.length-1],n.ATTR_SELECTED),setTimeout(function(){_[_.length-1].focus()},0),t.preventDefault()):37!==t.keyCode&&38!==t.keyCode||t.ctrlKey?40!==t.keyCode&&39!==t.keyCode||t.ctrlKey||("true"===_[_.length-1].getAttribute(n.ATTR_SELECTED)?(unSelectHeaders(_,n.ATTR_SELECTED),selectHeader(_[0],n.ATTR_SELECTED),setTimeout(function(){_[0].focus()},0),t.preventDefault()):(selectHeaderInList(_,"next",n.ATTR_SELECTED),t.preventDefault())):"true"===_[0].getAttribute(n.ATTR_SELECTED)?(unSelectHeaders(_,n.ATTR_SELECTED),selectHeader(_[_.length-1],n.ATTR_SELECTED),setTimeout(function(){_[_.length-1].focus()},0),t.preventDefault()):(selectHeaderInList(_,"prev",n.ATTR_SELECTED),t.preventDefault())}()}()},!0)}),plugin};window.van11yAccessibleAccordionAria=main();var onLoad=function e(){var t=window.van11yAccessibleAccordionAria();t.attach(),document.removeEventListener("DOMContentLoaded",e)};document.addEventListener("DOMContentLoaded",onLoad);
},{}],5:[function(require,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],6:[function(require,module,exports){
const createFocusTrap = require('focus-trap');
const megaMenu = require('./organisms/mega-menu/mega-menu');

class ContainerToggle {
	constructor(element) {
		this.element = element;
		this.targetContainer = this.element.getAttribute('data-a11y-toggle');
		this.containerElement = document.getElementById(this.targetContainer);
		this.focusTrap = createFocusTrap(`#${this.targetContainer}`, { clickOutsideDeactivates: true });

		this.attach();
	}

	attach() {
		this.element.addEventListener('click', this.handleFocusTrap.bind(this));
		window.addEventListener('mouseup', this.closeSearch.bind(this));

		document.addEventListener('keydown', (e) => {
			if (this.element.getAttribute('aria-expanded') === 'true') {
				return;
			}

			if (e.keyCode === 9) {
				this.containerElement.tabIndex = -1;
			}
		}, { once: true });
	}

	handleFocusTrap() {
		setTimeout(() => {
			if (this.element.getAttribute('aria-expanded') === 'true') {
				this.containerElement.tabIndex = 0;
				this.focusTrap.activate();

				megaMenu.hide();
			} else {
				this.focusTrap.deactivate();
				this.containerElement.addEventListener('transitionend', () => {
					this.containerElement.tabIndex = -1;
				}, { once: true });
			}
		}, 10);
	}

	closeSearch(e) {
		if (e.target !== this.containerElement
			&& e.target.parentNode !== this.containerElement
			&& !this.containerElement.contains(e.target)
			&& e.target !== this.element
			&& this.element.getAttribute('aria-expanded') === 'true') {
			window.a11yToggle(this.containerElement);
		}
	}
}

module.exports = element => new ContainerToggle(element);

},{"./organisms/mega-menu/mega-menu":17,"focus-trap":2}],7:[function(require,module,exports){
require('./atoms/grid-toggle/grid-toggle');
require('./components');

const Button = require('./atoms/button/button');

const demoButtons = document.querySelectorAll('button.a-button.has-loader');

if (demoButtons.length) {
	demoButtons.forEach((button) => {
		const b = new Button(button);

		button.addEventListener('click', () => {
			if (b.isLoading()) {
				return;
			}

			b.start();

			setTimeout(() => {
				b.stop();
			}, 2000);
		});
	});
}

},{"./atoms/button/button":8,"./atoms/grid-toggle/grid-toggle":9,"./components":11}],8:[function(require,module,exports){
class Button {
	constructor(button, disabled = true) {
		this.button = button;
		this.disabled = disabled;

		this.build();
	}

	build() {
		const className = this.button.classList.item(0);
		const html = `
			<svg class="icon ${className}__spinner">
				<use xlink:href="#icon-spinner-white"></use>
			</svg>
		`;

		this.button.appendChild(document.createRange().createContextualFragment(html));
	}

	isLoading() {
		return this.button.classList.contains('is-loading');
	}

	start() {
		if (this.disabled) {
			this.button.setAttribute('disabled', 'disabled');
		}

		this.button.classList.add('is-loading');
	}

	stop() {
		if (this.disabled) {
			this.button.removeAttribute('disabled');
		}

		this.button.classList.remove('is-loading');
	}
}

module.exports = Button;

},{}],9:[function(require,module,exports){
const element = document.querySelector('.grid-toggle');

function classToggle() {
	const body = document.querySelector('body');
	body.classList.toggle('baseline-grid');
}

if (element) {
	document.querySelector('.grid-toggle').addEventListener('click', classToggle);
}

},{}],10:[function(require,module,exports){
const toolTip = document.querySelector('[role="tooltip"]');
const toolTipText = document.querySelector('[data-tooltip]');

function isInViewport(elem) {
	const distance = elem.getBoundingClientRect();
	return (
		distance.top >= 30
		&& distance.left >= 30
		&& distance.bottom <= (window.innerHeight || document.documentElement.clientHeight)
		&& distance.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}

function positionToolTip() {
	if (isInViewport(toolTip)) {
		toolTipText.classList.remove('down');
	} else {
		toolTipText.classList.add('down');
	}
}

if (toolTip) {
	positionToolTip();
	window.addEventListener('scroll', positionToolTip);
}

},{}],11:[function(require,module,exports){
require('./utilities/tab-highlighting/tab-highlighting');
require('./molecules/system-error/system-error');
require('a11y-toggle');
require('./vendor/toggle/a11y.toggle-switcher');
require('./molecules/cookie-disclaimer/cookie-disclaimer');
require('./organisms/accordion/accordion');
require('./organisms/domain-search/domain-search');
require('./organisms/mega-menu/mega-menu');
require('./molecules/share/share');
require('./atoms/tooltip/tooltip');

},{"./atoms/tooltip/tooltip":10,"./molecules/cookie-disclaimer/cookie-disclaimer":12,"./molecules/share/share":13,"./molecules/system-error/system-error":14,"./organisms/accordion/accordion":15,"./organisms/domain-search/domain-search":16,"./organisms/mega-menu/mega-menu":17,"./utilities/tab-highlighting/tab-highlighting":18,"./vendor/toggle/a11y.toggle-switcher":19,"a11y-toggle":1}],12:[function(require,module,exports){
const cookieBar = document.querySelector('.js-cookie-disclaimer');
const visibleClass = 'is-visible';
const cookieName = 'internetstiftelsen-cookie-consent';
const acceptButton = document.getElementById('js-accept-cookies');
// const declineButton = document.getElementById('js-decline-cookies');

function setCookie(name, value, days) {
	const d = new Date();
	d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
	document.cookie = `${name}=${value};path=/;expires=${d.toGMTString()}`;
}

function getCookie(name) {
	const v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
	return v ? v[2] : null;
}

// No cookie set? Show cookie disclaimer bar
if (!getCookie(cookieName)) {
	if (cookieBar) {
		cookieBar.classList.add(visibleClass);
	}
}

function acceptCookies() {
	setCookie(cookieName, 'YES', 365);
	if (cookieBar) {
		cookieBar.classList.remove(visibleClass);
	}
}

if (acceptButton) {
	acceptButton.addEventListener('click', acceptCookies);
}

// ## Don't use this for now

// function deleteCookie(name) { setCookie(name, '', -1); }

// function declineCookies() {
// 	deleteCookie(cookieName); // Delete cookie if set before
// 	if (cookieBar) {
// 		cookieBar.classList.remove(visibleClass);
// 	}
// }


// if (declineButton) {
// 	declineButton.addEventListener('click', declineCookies);
// }

},{}],13:[function(require,module,exports){
function openPopup(e) {
	e.preventDefault();

	const width = 500;
	const height = 550;
	const left = window.innerWidth / 2 - width / 2;
	const top = window.innerHeight / 2 - height / 2;
	const url = this.href;
	const opts = `${'status=1'
				+ ',width='}${width
	},height=${height
	},top=${top
	},left=${left}`;
	window.open(url, 'socialMedia', opts);

	return false;
}

const popupButtons = Array.prototype.slice.call(
	document.querySelectorAll('.js-share-popup'),
);

if (popupButtons) {
	popupButtons.forEach((popup) => {
		popup.addEventListener('click', openPopup);
	});
}

},{}],14:[function(require,module,exports){
const element = document.querySelector('.js-history');

function goBack(e) {
	e.preventDefault();
	window.history.go(-1);
}

if (element) {
	element.addEventListener('click', goBack);
}

},{}],15:[function(require,module,exports){
require('van11y-accessible-accordion-aria');

const className = 'o-accordion';
const accordionElement = document.querySelector(`.js-${className}`);
let oAccordion = null;

function attachAccordion() {
	if (!oAccordion) {
		const namespace = getComputedStyle(accordionElement, ':before').content.replace(/["']/g, '');

		oAccordion = window.van11yAccessibleAccordionAria({
			ACCORDION_PREFIX_IDS: className,
			ACCORDION_JS: `js-${className}`,
			ACCORDION_STYLE: `${namespace}${className}`,
			ACCORDION_TITLE_STYLE: `${namespace}${className}__title`,
			ACCORDION_HEADER_STYLE: `${namespace}${className}__header`,
			ACCORDION_PANEL_STYLE: `${namespace}${className}__panel`,
		});
	}

	oAccordion.attach();
}

if (accordionElement) {
	attachAccordion();
}

const debounce = (func, delay) => {
	let inDebounce;

	return (...args) => {
		const context = this;
		clearTimeout(inDebounce);
		inDebounce = setTimeout(() => func.apply(context, args), delay);
	};
};

const checkElements = debounce(() => {
	const accordionElementFresh = document.querySelector(`.js-${className}`);

	if (accordionElementFresh) {
		attachAccordion();
	}
}, 50);

const observeHandler = (mutationsList) => {
	mutationsList.forEach((mutation) => {
		if (mutation.type !== 'childList') {
			return;
		}

		checkElements();
	});
};

const observer = new MutationObserver(observeHandler);

observer.observe(document.body, { childList: true, subtree: true });

},{"van11y-accessible-accordion-aria":4}],16:[function(require,module,exports){
const containerToggle = require('../../ContainerToggle');

const domainSearchButton = document.querySelector('.js-toggle-domain-search');

if (domainSearchButton) {
	containerToggle(domainSearchButton);
}

},{"../../ContainerToggle":6}],17:[function(require,module,exports){
const createFocusTrap = require('focus-trap');
/**
 * Collect the needed elements.
 */
const html = document.querySelector('html');
const megaMenuButton = document.querySelector('.js-toggle-mega-menu');
const megaMenu = document.getElementById('megaMenu');
const content = document.getElementById('siteMain');
const header = document.getElementById('siteHeader');
const footer = document.getElementById('siteFooter');
const focusTrap = createFocusTrap(megaMenu);
const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

/**
 * Check if the element is in the viewport
 *
 * @param {Element} element
 * @returns {boolean}
 */
function isInViewport(element) {
	const rect = element.getBoundingClientRect();

	// Very simple since we only use it for the footer atm
	return (
		rect.top <= window.innerHeight
	);
}

/**
 * Before the animations start we need to change how certain elements
 * are placed. The visual result should be exactly the same as before these changes.
 */
function prepareAnimation() {
	const scrollTop = window.scrollY || document.body.scrollTop;
	const contentRect = content.getBoundingClientRect();
	const inViewport = isInViewport(footer);

	header.style.flex = '1 0 auto';

	if (!isIE11) {
		const initialFooterTop = footer.getBoundingClientRect().top;
		megaMenu.style.cssText = 'display: block; flex: 1';

		content.style.cssText = `
	        position: absolute;
	        top: ${scrollTop + contentRect.top}px;
	        left: 0;
	        right: 0;
	        bottom: 0;
	        overflow: hidden;
	    `;

		if (!inViewport) {
			footer.style.transform = 'translateY(100%)';
		} else {
			requestAnimationFrame(() => {
				const newFooterTop = footer.getBoundingClientRect().top;

				if (newFooterTop > initialFooterTop) {
					footer.style.transform = `translateY(-${newFooterTop - initialFooterTop}px)`;
				}
			});
		}
	}
}

/**
 * Removes all changes to all elements that took part in the animations.
 */
function removeAnimationPreparations() {
	content.removeAttribute('style');
	footer.removeAttribute('style');
	header.removeAttribute('style');
	megaMenu.removeAttribute('style');
}

/**
 * Animate the mega menu and footer into the view
 */
function animateIn() {
	megaMenuButton.setAttribute('aria-expanded', 'true');
	megaMenu.setAttribute('aria-hidden', 'false');
	if (!isIE11) {
		footer.style.cssText = 'transform: translateY(0); transition: transform 0.25s ease-in-out;';
		footer.classList.add('is-animated');
	}
}

/**
 * Preparations before the hide animation starts.
 * The visual result should be exactly the same as before these changes.
 */
function prepareOutAnimation() {
	const headerRect = megaMenu.getBoundingClientRect();
	const initialFooterTop = footer.getBoundingClientRect().top;

	megaMenu.style.cssText = `
        position: absolute;
        top: ${headerRect.top}px;
        left: 0;
        right: 0;
        display: block;
	`;

	content.removeAttribute('style');
	header.removeAttribute('style');

	if (!isIE11) {
		requestAnimationFrame(() => {
			const newFooterTop = footer.getBoundingClientRect().top;

			footer.style.transition = 'none';

			if (initialFooterTop > newFooterTop) {
				footer.style.transform = `translateY(${initialFooterTop - newFooterTop}px)`;
			} else if (newFooterTop > initialFooterTop) {
				footer.style.transform = `translateY(-${newFooterTop - initialFooterTop}px)`;
			}
		});
	}
}

/**
 * Start the animation that hides the mega menu and footer.
 */
function animateOut() {
	megaMenuButton.setAttribute('aria-expanded', 'false');
	megaMenu.setAttribute('aria-hidden', 'true');

	if (!isIE11) {
		footer.addEventListener('transitionend', removeAnimationPreparations, { once: true });
		footer.style.transition = '0.25s ease-in-out';
		footer.classList.remove('is-animated');

		setTimeout(() => {
			if (!isInViewport(footer)) {
				footer.style.transform = 'translateY(100%)';
			} else {
				footer.style.transform = 'translateY(0)';
			}
		}, 4);
	}
}

/**
 * Hide the mega menu (and footer)
 */
function hideMegaMenu() {
	if (megaMenu.getAttribute('aria-hidden') === 'true') {
		return;
	}

	prepareOutAnimation();

	setTimeout(() => {
		requestAnimationFrame(animateOut);
		if (html.classList.contains('tab-highlight')) {
			focusTrap.deactivate();
		}
	}, 50);
}

/**
 * Show the mega menu (and footer)
 */
function showMegaMenu() {
	if (megaMenu.getAttribute('aria-hidden') === 'false') {
		return;
	}

	prepareAnimation();

	setTimeout(() => {
		requestAnimationFrame(animateIn);
		if (html.classList.contains('tab-highlight')) {
			focusTrap.activate();
		}
	}, 50);
}

/**
 * Toggle the mega menu
 * @param {MouseEvent} e
 */
function toggleMegaMenu(e) {
	e.preventDefault();

	if (megaMenu.getAttribute('aria-hidden') === 'false') {
		hideMegaMenu();
	} else {
		showMegaMenu();
	}
}

if (megaMenuButton && megaMenu) {
	megaMenuButton.addEventListener('click', toggleMegaMenu);
}

module.exports = {
	show: showMegaMenu,
	hide: hideMegaMenu,
};

},{"focus-trap":2}],18:[function(require,module,exports){
// Add class to html-element on tab click

const element = document.getElementsByTagName('html')[0];
const highLightClass = 'tab-highlight';

function onKeyDown(e) {
	const event = e;
	if (!event) { window.event = event; }

	const keyCode = event.keyCode || event.which;
	const tabKey = 9;

	if (keyCode === tabKey) {
		this.classList.add(highLightClass);
	}
}

// Remove class on mouse click
function onMouseDown() {
	this.classList.remove(highLightClass);
}

// Run on events

element.addEventListener('keydown', onKeyDown);
element.addEventListener('mousedown', onMouseDown);

},{}],19:[function(require,module,exports){
// Only allow one panel to be opened at a time.
function collapse(toggle) {
	const id = toggle.getAttribute('data-a11y-toggle');
	const collapsibleBox = document.getElementById(id);
	collapsibleBox.setAttribute('aria-hidden', true);
	toggle.setAttribute('aria-expanded', false);
}

const toggles = Array.prototype.slice.call(
	document.querySelectorAll('[data-a11y-toggle]'),
);

function collapseAll(event) {
	toggles
		.filter(toggle => toggle !== event.target)
		.forEach(collapse);
}

toggles.forEach((toggle) => {
	toggle.addEventListener('click', collapseAll);
});

},{}]},{},[7]);
