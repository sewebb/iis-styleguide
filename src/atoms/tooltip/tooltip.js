import className from '../../assets/js/className';

const ROOT_SELECTOR = `.${className('a-tooltip')}`;
const TOOLTIP_SELECTOR = `.${className('a-tooltip__text')}`;
const VIEWPORT_PADDING = 12;
const TOOLTIP_GAP = 12;
const HIDE_DELAY = 40;
const ARROW_OFFSET = 18;
const VALID_PLACEMENTS = ['top', 'right', 'bottom', 'left'];
const PLACEMENT_FALLBACKS = {
	top: ['top', 'bottom', 'right', 'left'],
	right: ['right', 'left', 'bottom', 'top'],
	bottom: ['bottom', 'top', 'left', 'right'],
	left: ['left', 'right', 'top', 'bottom'],
};
const supportsAnchorPositioning = typeof CSS !== 'undefined'
	&& CSS.supports('anchor-name: --tooltip-anchor')
	&& CSS.supports('position-anchor: --tooltip-anchor')
	&& CSS.supports('top: anchor(top)');

const openTooltips = new Set();

let tooltipCounter = 0;
let viewportFrame = 0;

function ensureUniqueId(element, fallbackId) {
	const preferredId = element.id || fallbackId;
	let nextId = preferredId;
	let duplicate = document.getElementById(nextId);
	let suffix = 0;

	while (duplicate && duplicate !== element) {
		suffix += 1;
		nextId = `${preferredId}-${suffix}`;
		duplicate = document.getElementById(nextId);
	}

	element.id = nextId;

	return nextId;
}

function setDescribedByToken(element, token, shouldHaveToken) {
	if (!element || !token) {
		return;
	}

	const tokens = (element.getAttribute('aria-describedby') || '')
		.split(/\s+/)
		.filter(Boolean);
	const nextTokens = shouldHaveToken
		? Array.from(new Set([...tokens, token]))
		: tokens.filter((existingToken) => existingToken !== token);

	if (nextTokens.length) {
		element.setAttribute('aria-describedby', nextTokens.join(' '));
		return;
	}

	element.removeAttribute('aria-describedby');
}

function hasOwnVisibleText(element) {
	const clone = element.cloneNode(true);
	const clonedTooltip = clone.querySelector(TOOLTIP_SELECTOR);

	if (clonedTooltip) {
		clonedTooltip.remove();
	}

	return clone.textContent.trim().length > 0;
}

function getPreferredPlacement(element) {
	const placement = (element.getAttribute('data-tooltip-placement') || 'top').toLowerCase();

	return VALID_PLACEMENTS.includes(placement) ? placement : 'top';
}

function isVerticalPlacement(placement) {
	return placement === 'top' || placement === 'bottom';
}

function isNativeButtonLike(element) {
	return element.matches('button, a[href], input, select, textarea, summary');
}

function isMousePointerEvent(event) {
	return event.pointerType === 'mouse';
}

function getViewportSize() {
	return {
		width: window.visualViewport ? window.visualViewport.width : document.documentElement.clientWidth,
		height: window.visualViewport ? window.visualViewport.height : document.documentElement.clientHeight,
	};
}

function clamp(value, min, max) {
	if (max < min) {
		return min;
	}

	return Math.min(Math.max(value, min), max);
}

function getPlacementScore(placement, triggerRect, tooltipRect, viewport) {
	const centerX = triggerRect.left + (triggerRect.width / 2);
	const centerY = triggerRect.top + (triggerRect.height / 2);
	const inlineOverflow = placement === 'top' || placement === 'bottom'
		? Math.max(0, (tooltipRect.width / 2) - (centerX - VIEWPORT_PADDING))
			+ Math.max(0, (tooltipRect.width / 2) - (viewport.width - VIEWPORT_PADDING - centerX))
		: Math.max(0, (tooltipRect.height / 2) - (centerY - VIEWPORT_PADDING))
			+ Math.max(0, (tooltipRect.height / 2) - (viewport.height - VIEWPORT_PADDING - centerY));
	const blockSpace = {
		top: triggerRect.top - VIEWPORT_PADDING,
		right: viewport.width - triggerRect.right - VIEWPORT_PADDING,
		bottom: viewport.height - triggerRect.bottom - VIEWPORT_PADDING,
		left: triggerRect.left - VIEWPORT_PADDING,
	}[placement];
	const requiredSpace = placement === 'top' || placement === 'bottom'
		? tooltipRect.height + TOOLTIP_GAP
		: tooltipRect.width + TOOLTIP_GAP;
	const blockOverflow = Math.max(0, requiredSpace - blockSpace);

	return (blockOverflow * 1000) + inlineOverflow;
}

function choosePlacement(preferredPlacement, triggerRect, tooltipRect) {
	const viewport = getViewportSize();

	return PLACEMENT_FALLBACKS[preferredPlacement]
		.map((placement) => ({
			placement,
			score: getPlacementScore(placement, triggerRect, tooltipRect, viewport),
		}))
		.reduce((best, current) => (current.score < best.score ? current : best)).placement;
}

function updatePixelVar(element, name, value) {
	if (value === null) {
		element.style.removeProperty(name);
		return;
	}

	element.style.setProperty(name, `${Math.round(value)}px`);
}

function queueTooltipPlacementUpdate() {
	if (viewportFrame) {
		return;
	}

	viewportFrame = window.requestAnimationFrame(() => {
		viewportFrame = 0;
		openTooltips.forEach((tooltip) => {
			tooltip.updatePlacement();
		});
	});
}

class Tooltip {
	constructor(element) {
		this.root = element;
		this.tooltip = element.querySelector(TOOLTIP_SELECTOR);
		this.preferredPlacement = getPreferredPlacement(element);
		this.hideTimer = null;
		this.isHoveringTrigger = false;
		this.isHoveringTooltip = false;
		this.isPinned = false;

		if (!this.tooltip || element.dataset.tooltipInitialized === 'true') {
			return;
		}

		element.dataset.tooltipInitialized = 'true';

		this.onTriggerPointerEnter = this.onTriggerPointerEnter.bind(this);
		this.onTriggerPointerLeave = this.onTriggerPointerLeave.bind(this);
		this.onTriggerFocusIn = this.onTriggerFocusIn.bind(this);
		this.onTriggerFocusOut = this.onTriggerFocusOut.bind(this);
		this.onTriggerClick = this.onTriggerClick.bind(this);
		this.onTriggerKeydown = this.onTriggerKeydown.bind(this);
		this.onTooltipPointerEnter = this.onTooltipPointerEnter.bind(this);
		this.onTooltipPointerLeave = this.onTooltipPointerLeave.bind(this);

		this.setupAccessibility();
		this.bindEvents();
	}

	setupAccessibility() {
		tooltipCounter += 1;
		const anchorName = `--tooltip-anchor-${tooltipCounter}`;

		if (this.root.id && !this.tooltip.id) {
			this.tooltip.id = this.root.id;
			this.root.removeAttribute('id');
		}

		if (this.root.getAttribute('role') === 'tooltip') {
			this.root.removeAttribute('role');
		}

		if (
			!this.root.hasAttribute('aria-label')
			&& !this.root.hasAttribute('aria-labelledby')
			&& !hasOwnVisibleText(this.root)
		) {
			this.root.setAttribute(
				'aria-label',
				this.root.getAttribute('data-tooltip-label') || 'Visa mer information',
			);
		}

		if (!isNativeButtonLike(this.root)) {
			if (!this.root.hasAttribute('tabindex')) {
				this.root.setAttribute('tabindex', '0');
			}

			if (!this.root.hasAttribute('role')) {
				this.root.setAttribute('role', 'button');
			}
		}

		if (this.root.tagName === 'BUTTON' && !this.root.getAttribute('type')) {
			this.root.setAttribute('type', 'button');
		}

		this.tooltip.setAttribute('popover', 'manual');
		this.tooltip.setAttribute('role', 'tooltip');
		this.tooltip.hidden = true;
		this.tooltip.dataset.positioning = supportsAnchorPositioning ? 'anchor' : 'manual';
		this.tooltip.dataset.placement = this.preferredPlacement;

		if (supportsAnchorPositioning) {
			this.root.style.setProperty('anchor-name', anchorName);
			this.tooltip.style.setProperty('position-anchor', anchorName);
		} else {
			this.root.style.removeProperty('anchor-name');
			this.tooltip.style.removeProperty('position-anchor');
		}

		ensureUniqueId(this.tooltip, `tooltip-content-${tooltipCounter}`);
	}

	bindEvents() {
		this.root.addEventListener('pointerenter', this.onTriggerPointerEnter);
		this.root.addEventListener('pointerleave', this.onTriggerPointerLeave);
		this.root.addEventListener('focusin', this.onTriggerFocusIn);
		this.root.addEventListener('focusout', this.onTriggerFocusOut);
		this.root.addEventListener('click', this.onTriggerClick);
		this.root.addEventListener('keydown', this.onTriggerKeydown);
		this.tooltip.addEventListener('pointerenter', this.onTooltipPointerEnter);
		this.tooltip.addEventListener('pointerleave', this.onTooltipPointerLeave);
	}

	isOpen() {
		return this.tooltip.matches(':popover-open');
	}

	onTriggerPointerEnter(event) {
		if (!isMousePointerEvent(event)) {
			return;
		}

		this.isHoveringTrigger = true;
		this.show();
	}

	onTriggerPointerLeave(event) {
		if (!isMousePointerEvent(event)) {
			return;
		}

		this.isHoveringTrigger = false;
		this.scheduleHide();
	}

	onTriggerFocusIn() {
		this.show();
	}

	onTriggerFocusOut(event) {
		if (
			this.isPinned
			|| this.root.contains(event.relatedTarget)
			|| this.tooltip.contains(event.relatedTarget)
		) {
			return;
		}

		this.scheduleHide();
	}

	onTriggerClick(event) {
		if (this.tooltip.contains(event.target)) {
			return;
		}

		this.clearHideTimer();

		if (this.isPinned) {
			this.isPinned = false;
			this.hide();
			return;
		}

		this.isPinned = true;
		this.show();
	}

	onTriggerKeydown(event) {
		if ((event.key !== 'Enter' && event.key !== ' ') || isNativeButtonLike(this.root)) {
			return;
		}

		event.preventDefault();
		this.root.click();
	}

	onTooltipPointerEnter(event) {
		if (!isMousePointerEvent(event)) {
			return;
		}

		this.isHoveringTooltip = true;
		this.show();
	}

	onTooltipPointerLeave(event) {
		if (!isMousePointerEvent(event)) {
			return;
		}

		this.isHoveringTooltip = false;
		this.scheduleHide();
	}

	handleDocumentPointerDown(event) {
		if (!this.isPinned) {
			return;
		}

		if (this.root.contains(event.target) || this.tooltip.contains(event.target)) {
			return;
		}

		this.isPinned = false;
		this.hide();
	}

	clearHideTimer() {
		window.clearTimeout(this.hideTimer);
		this.hideTimer = null;
	}

	scheduleHide() {
		this.clearHideTimer();
		this.hideTimer = window.setTimeout(() => {
			if (
				this.isPinned
				|| this.isHoveringTrigger
				|| this.isHoveringTooltip
				|| this.root.matches(':focus-within')
			) {
				return;
			}

			this.hide();
		}, HIDE_DELAY);
	}

	show() {
		this.clearHideTimer();
		this.tooltip.hidden = false;

		if (!this.isOpen()) {
			this.tooltip.showPopover();
		}

		this.root.dataset.tooltipVisible = 'true';
		setDescribedByToken(this.root, this.tooltip.id, true);
		openTooltips.add(this);
		this.updatePlacement();
		queueTooltipPlacementUpdate();
	}

	hide() {
		this.clearHideTimer();

		if (this.isOpen()) {
			this.tooltip.hidePopover();
		}

		this.tooltip.hidden = true;
		this.root.removeAttribute('data-tooltip-visible');
		setDescribedByToken(this.root, this.tooltip.id, false);
		openTooltips.delete(this);
	}

	updatePlacement() {
		if (!this.isOpen()) {
			return;
		}

		const triggerRect = this.root.getBoundingClientRect();
		const tooltipRect = this.tooltip.getBoundingClientRect();
		const viewport = getViewportSize();
		const placement = choosePlacement(
			this.preferredPlacement,
			triggerRect,
			tooltipRect,
		);
		const centerX = triggerRect.left + (triggerRect.width / 2);
		const centerY = triggerRect.top + (triggerRect.height / 2);
		const isVertical = isVerticalPlacement(placement);

		this.tooltip.dataset.placement = placement;

		if (!supportsAnchorPositioning) {
			const idealCrossAxisOffset = isVertical
				? centerX - (tooltipRect.width / 2)
				: centerY - (tooltipRect.height / 2);
			const maxCrossAxisOffset = isVertical
				? viewport.width - tooltipRect.width - VIEWPORT_PADDING
				: viewport.height - tooltipRect.height - VIEWPORT_PADDING;
			const clampedCrossAxisOffset = clamp(idealCrossAxisOffset, VIEWPORT_PADDING, maxCrossAxisOffset);
			const top = placement === 'top'
				? triggerRect.top - tooltipRect.height - TOOLTIP_GAP
				: placement === 'bottom'
					? triggerRect.bottom + TOOLTIP_GAP
					: clampedCrossAxisOffset;
			const left = placement === 'left'
				? triggerRect.left - tooltipRect.width - TOOLTIP_GAP
				: placement === 'right'
					? triggerRect.right + TOOLTIP_GAP
					: clampedCrossAxisOffset;
			const maxTop = viewport.height - tooltipRect.height - VIEWPORT_PADDING;
			const maxLeft = viewport.width - tooltipRect.width - VIEWPORT_PADDING;
			const clampedTop = clamp(top, VIEWPORT_PADDING, maxTop);
			const clampedLeft = clamp(left, VIEWPORT_PADDING, maxLeft);
			const arrowOffset = clamp(
				(isVertical ? centerX - clampedLeft : centerY - clampedTop),
				ARROW_OFFSET,
				(isVertical ? tooltipRect.width : tooltipRect.height) - ARROW_OFFSET,
			);

			updatePixelVar(this.tooltip, '--tooltip-top', clampedTop);
			updatePixelVar(this.tooltip, '--tooltip-left', clampedLeft);
			updatePixelVar(this.tooltip, '--tooltip-shift-x', null);
			updatePixelVar(this.tooltip, '--tooltip-shift-y', null);
			updatePixelVar(this.tooltip, '--tooltip-arrow-x', isVertical ? arrowOffset : null);
			updatePixelVar(this.tooltip, '--tooltip-arrow-y', isVertical ? null : arrowOffset);
			return;
		}

		const idealOffset = isVertical
			? centerX - (tooltipRect.width / 2)
			: centerY - (tooltipRect.height / 2);
		const maxOffset = isVertical
			? viewport.width - tooltipRect.width - VIEWPORT_PADDING
			: viewport.height - tooltipRect.height - VIEWPORT_PADDING;
		const clampedOffset = clamp(idealOffset, VIEWPORT_PADDING, maxOffset);
		const arrowOffset = clamp(
			(isVertical ? centerX : centerY) - clampedOffset,
			ARROW_OFFSET,
			(isVertical ? tooltipRect.width : tooltipRect.height) - ARROW_OFFSET,
		);

		updatePixelVar(this.tooltip, '--tooltip-top', null);
		updatePixelVar(this.tooltip, '--tooltip-left', null);
		updatePixelVar(this.tooltip, '--tooltip-shift-x', isVertical ? clampedOffset - idealOffset : null);
		updatePixelVar(this.tooltip, '--tooltip-shift-y', isVertical ? null : clampedOffset - idealOffset);
		updatePixelVar(this.tooltip, '--tooltip-arrow-x', isVertical ? arrowOffset : null);
		updatePixelVar(this.tooltip, '--tooltip-arrow-y', isVertical ? null : arrowOffset);
	}
}

function initTooltips(root = document) {
	root.querySelectorAll(ROOT_SELECTOR).forEach((element) => {
		new Tooltip(element);
	});
}

document.addEventListener('pointerdown', (event) => {
	openTooltips.forEach((tooltip) => {
		tooltip.handleDocumentPointerDown(event);
	});
});

document.addEventListener('keydown', (event) => {
	if (event.key !== 'Escape') {
		return;
	}

	openTooltips.forEach((tooltip) => {
		tooltip.isPinned = false;
		tooltip.hide();
	});
});

window.addEventListener('scroll', queueTooltipPlacementUpdate, true);
window.addEventListener('resize', queueTooltipPlacementUpdate);

initTooltips();

export { Tooltip, initTooltips };
export default Tooltip;
