# IIS Styleguide

The styleguide is a set of components that follows the Atomic Design methodology and is powered by Fractal.
It is built to be fully modular so one can include only what is needed when using the styleguide.

## Usage

To use the styleguide in your website or interface you need to install the styleguide and then decide which components you need.

To install it, run `npm i git+ssh://git@github.com:sewebb/iis-styleguide.git`.

When that's done, you need to configure your build. So open up your main SCSS file add the components you need like this:

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

Peek into the [app.scss](https://github.com/sewebb/iis-styleguide/blob/master/src/app.scss) to see the full set of components.

For javascript it's basically the same thing. In a javascript file:

```js
// ES5 build version
import Button from 'iis-styleguide/dist/atoms/button/button';

// Standard ES6 version
import Button from 'iis-styleguide/src/atoms/button/button';
```

Depending on your browser requirements you may use the src version which is not transpiled to ES5.

## Development

Before you start, make sure you read and understand our coding [standards and conventions](https://github.com/sewebb/iis-start/wiki/IIS-standards-&-conventions).

1. Install dependencies with `npm install`.
2. Run `npm run dev`

This will watch the files you edit and automatically start the dev environment.
The code is validated and fixed on save using our coding standards and convention

## Deployment

There is no predefined or preferred way to deploy, that is handled outside this project.
To be able to deploy you need to build a static version of the styleguide.
The command `npm run build` will build the static site in the `build` directory in the root the your project.

```
$ npm run build
```
