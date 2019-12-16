---
title: Internetstiftelsen Styleguide
---

## Welcome to our styleguide

## Introduction

The styleguide is a set of components that follows the Atomic Design methodology and is powered by Fractal.
It is built to be fully modular so one can include only what is needed when using the styleguide.

## Component statuses

The color codes indicates whether a component is ready for use.

<ul style="margin-bottom: 3rem;">
	<li style="display:flex;">
		<div class="Status-dots">
			<span class="Status-dot" style="border-color: #29CC29;background-color:#29CC29" title="Ready"></span>
		</div>&nbsp;&nbsp;
		<label class="Status-label" style="background-color: #29CC29; border-color: #29CC29;">Ready to implement</label>
	</li>
	<li style="display:flex;">
		<div class="Status-dots">
			<span class="Status-dot" style="border-color: #FF9233;background-color: #FF9233;" title="WIP"></span>
		</div>&nbsp;&nbsp;
		<label class="Status-label" style="background-color: #FF9233; border-color: #FF9233;">Work in progress, implement with caution</label>
	</li>
	<li style="display:flex;">
		<div class="Status-dots">
			<span class="Status-dot" style="border-color: #FF3333;background-color: #FF3333;" title="Prototype"></span>
		</div>&nbsp;&nbsp;
		<label class="Status-label" style="background-color: #FF3333; border-color: #FF3333;">Prototype, do not use</label>
	</li>
</ul>

## Usage

To use the styleguide in your website or interface you need to install the styleguide and then decide which components you need.

To install it, run `npm i git+ssh://git@github.com:sewebb/iis-styleguide.git`.

When that's done, you need to configure your build. So open up your main SCSS file,and add the components you need like this:

```scss
// Configurations, foundation, fonts, utilities etc..
@import '~iis-styleguide/src/globals';

// Set a project namespace for namespace prefixed classes
$namespace: 'mysite-';

// Configuration/Base components
@import '~iis-styleguide/src/configuration/grid/grid';
@import '~iis-styleguide/src/configuration/colors/colors';

// Atoms
@import '~iis-styleguide/src/atoms/button/button';
@import '~iis-styleguide/src/atoms/input/input';

// Molecules
@import '~iis-styleguide/src/molecules/card/card';

// Organisms
@import '~iis-styleguide/src/organisms/header/header';
```

### SCSS Mixins explained:
```scss
@include e(nested-element) {} // Element (.parent-element__nested-element{})
@include m(modifier-name) {} // Modifier (.parent-element--modifier-name{})
@include b(block-name) {} // Block (.block-name{})

```

Peek into the [app.scss](https://github.com/sewebb/iis-styleguide/blob/master/src/app.scss) to see the full set of components.

For javascript it's basically the same thing. In a javascript file:

```js
// ES5 build version
import Button from 'iis-styleguide/dist/atoms/button/button';

// Standard ES6 version
import Button from 'iis-styleguide/src/atoms/button/button';
```

Depending on your browser requirements you may use the src version which is not transpiled to ES5.

## Setup

Be sure to include the following features in your setup.

### A no-js/js class to the HTML-element

Add the class `no-js` as default and a javascript that switches that to `js` e.g. below. Some styles are relying on this class to properly display tab highlighting but of course it can be handy in many other cases too.
```
<html class="no-js"
```

```
<script type="text/javascript">
	document.querySelector('html').classList.remove('no-js');
	document.querySelector('html').className += 'js';
</script>
```

### Tab Highlighting

Add Tab Highlighting to your site. This ensures clear visual focus styles when navigating the site by tabbing.
https://github.com/sewebb/iis-styleguide/tree/master/src/utilities/tab-highlighting

### Skip navigation

Add a "skip navigation" to your site. This navigation should contain anchor links to allow users to easily skip to and passed repeating content that is included on every page such as header and main navigation.
https://styleguide.internetstiftelsen.se/components/detail/skip.html

## Development

Before you start, make sure you read and understand our coding [standards and conventions](https://github.com/sewebb/iis-start/wiki/IIS-standards-&-conventions).

1. Install dependencies with `npm install`.
2. Run `npm run dev`

This will watch the files you edit and automatically start the dev environment.
The code is validated and fixed on save using our coding standards and convention

## Deployment

To be able to deploy you need to build a static version of the styleguide.
The command `npm run build` will build the static site in the `build` directory in the root of the your project.
