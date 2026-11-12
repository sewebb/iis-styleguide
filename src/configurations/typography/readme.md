# Typography

## Blockquote
Blockquote icon can use any of the base colors. This is set by using class ```.colorname``` on the blockquote tag itself. If color is not set manually it will default to colors.$color-black. For a list of color names, see [Color component](/components/detail/colors)

## Bullet-list variants

Use `bullet-list--quote`, `bullet-list--arrow-right-variant`, `bullet-list--heart-variant`, `bullet-list--check-variant`, or `bullet-list--close-variant` on a `ul` to use the matching icon as its bullet. Icons accept the same base-color classes as blockquotes and default to black.

Apply a color class directly to an item to override only that bullet's color, without changing its icon.

```html
<ul class="bullet-list--quote jade">
	<li>First item</li>
	<li>Second item</li>
</ul>

<ul class="bullet-list--arrow-right-variant ruby">
	<li>First item</li>
	<li>Second item</li>
</ul>

<ul class="bullet-list--heart-variant ruby">
	<li>First item</li>
	<li>Second item</li>
</ul>

<ul class="bullet-list--quote jade">
	<li>First item</li>
	<li class="ruby">Second item</li>
</ul>

<ul class="bullet-list--check-variant jade">
	<li>First item</li>
	<li class="bullet-list--close-variant ruby">Second item</li>
</ul>

<ul class="bullet-list--close-variant ruby">
	<li>First item</li>
	<li class="bullet-list--check-variant jade">Second item</li>
</ul>
```
