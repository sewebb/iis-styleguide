# Whois

Reference documentation for the current `whois` organism so the component can be understood without chat history.

## Main files

- [whois.hbs](/Users/robert.hedman/www/iis-styleguide/src/organisms/whois/whois.hbs)  
  Main markup for the search UI, result views, retailer view and inline i18n bootstrap.
- [whois.js](/Users/robert.hedman/www/iis-styleguide/src/organisms/whois/whois.js)  
  Main client-side behavior for search type switching, responsive defaults, validation and country select behavior.
- [whois.config.js](/Users/robert.hedman/www/iis-styleguide/src/organisms/whois/whois.config.js)  
  Fractal mock data, i18n seed data and all current view variants.
- [_whois.scss](/Users/robert.hedman/www/iis-styleguide/src/organisms/whois/_whois.scss)  
  Component-specific layout and styling.
- [whois-retailers.json](/Users/robert.hedman/www/iis-styleguide/src/organisms/whois/whois-retailers.json)  
  Retailer mock data.
- [whois-domain-dates-volvo.json](/Users/robert.hedman/www/iis-styleguide/src/organisms/whois/whois-domain-dates-volvo.json)
- [whois-domain-other-volvo.json](/Users/robert.hedman/www/iis-styleguide/src/organisms/whois/whois-domain-other-volvo.json)  
  Mock data for domain result tables.

## Related components

- `radiobutton-advanced` is now a molecule and is used as the search type selector.
- Normal table component is used for the current result tables.
- `table-advanced` / `whois-table.js` still exist in the repo, but they do not appear to be part of the current active Whois render path.

## Search types

The search form supports three radio options:

1. `first` = domain search
2. `second` = keyword search
3. `third` = organisation number search

These values are hardwired in [whois.js](/Users/robert.hedman/www/iis-styleguide/src/organisms/whois/whois.js) as:

- `DOMAIN_SEARCH_VALUE = 'first'`
- `KEYWORD_SEARCH_VALUE = 'second'`
- `ORGANISATION_SEARCH_VALUE = 'third'`

## Search form behavior

### Initial state

- If no search type is selected, the text input is disabled.
- The placeholder is `Välj först vad du vill söka efter...`.
- The submit button is disabled.

### Responsive default selection

For the plain interactive Whois form, the wrapper gets `data-responsive-default-search-type="true"`.

Behavior:

- desktop: at `min-width: 769px`, the first radio option (`Sök domän`) is auto-selected
- mobile: below that breakpoint, no option is preselected
- if the viewport crosses the breakpoint, the behavior updates live
- once the user has made a manual choice, that choice should not be overwritten by the responsive default logic

This is handled in `syncResponsiveSearchTypeSelection()` in [whois.js](/Users/robert.hedman/www/iis-styleguide/src/organisms/whois/whois.js).

### Search type changes

When the selected radio option changes:

- the input value is cleared
- the placeholder is updated from the radio button's `data-placeholder`
- the organisation country select is shown only for organisation-number search
- any visible validation state is cleared

## Country select for organisation number

### Purpose

The country select is metadata for the organisation-number search. It is not treated as proof that the entered number must literally begin with that code.

### Canonical values

The select now uses official `ISO 3166-1 alpha-2` country codes as canonical option values, for example:

- `SE`
- `NL`
- `DE`

The grouped selector data lives in [whois.config.js](/Users/robert.hedman/www/iis-styleguide/src/organisms/whois/whois.config.js).

### Important implementation detail

Each option has separate data for value and display:

- `value`: canonical ISO code
- `short_label`: short closed-state label, currently the same as the code
- `label`: full dropdown label, for example `SE - Sverige`

This means the component can:

- submit/store `SE`
- show `SE - Sverige` in the open dropdown
- show only `SE` in the closed state

This behavior is handled in `syncOrganisationCountrySelectLabels()` in [whois.js](/Users/robert.hedman/www/iis-styleguide/src/organisms/whois/whois.js).

### Completeness check

The grouped country list is treated as the complete selector dataset and is validated in config:

- expected unique code count: `249`
- source model: complete `ISO 3166-1 alpha-2` set for this selector

If the list drifts, [whois.config.js](/Users/robert.hedman/www/iis-styleguide/src/organisms/whois/whois.config.js) throws during load.

### Current grouping

The countries are grouped visually as:

- Nordiska länder
- Europa
- Afrika
- Antarktis
- Asien
- Nordamerika
- Oceanien
- Sydamerika

With extra UI prioritization for:

- `SE` first in the Nordic group
- `NL` first in Europe

## Validation

Validation is entirely in [whois.js](/Users/robert.hedman/www/iis-styleguide/src/organisms/whois/whois.js).

### Shared behavior

- Validation errors are delayed by `1500ms` while typing.
- Errors disappear while typing if the input becomes valid.
- Clicking submit with an empty field shows the empty-search error immediately.
- The submit button is:
  - disabled when no search type is selected
  - enabled once a search type is selected and there is no visible error
  - disabled again while an error is visible
- The error message lives under the text input only, not under the entire search row.

### Domain search

Rules:

- must end with `.se` or `.nu`
- only letters, digits, `-` and `.`

Current messages:

- `Sökningen måste sluta med .se eller .nu.`
- `Domännamn får bara innehålla bokstäver, siffror, bindestreck och punkt.`

### Keyword search

Rules:

- minimum `3` characters
- only letters and digits
- `.` is not allowed
- `-` is not allowed

Current messages:

- `Nyckelordet får bara innehålla bokstäver och siffror.`
- `Sökordet måste innehålla minst 3 tecken.`

### Organisation number search

#### Sweden (`SE`)

Swedish organisation-number validation is strict and includes:

1. format normalization
2. personnummer detection
3. date validation for personnummer-like input
4. Luhn check

Current Swedish patterns and logic:

- personal number regex: `^(18|19|20)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[-+]?\d{4}$`
- organisation-number normalization target: `^\d{2}[2-9]\d{7}$`
- accepted display format: `XXXXXX-XXXX`

If the input is a valid Swedish personal identity number, the component shows:

- `Du kan inte söka med ett personnummer här. Ange ett organisationsnummer i stället.`

If the value fails Swedish organisation-number validation, it shows:

- `Organisationsnumret måste anges i formatet XXXXXX-XXXX.`

#### Other countries

Outside `SE`, the current implementation uses a softer fallback validator instead of pretending there is one global organisation-number format.

Rules:

- `2` to `30` characters
- allowed characters: letters, digits, spaces, `.`, `/`, `-`
- first and last character must be a letter or digit

Current message:

- `Ange organisationsnummer med 2-30 tecken. Endast bokstäver, siffror, mellanslag, punkt, snedstreck och bindestreck är tillåtna.`

Important: this is a pragmatic international fallback, not a country-specific legal validation model.

## Accessibility

Current accessibility work includes:

- screen-reader friendly radio behavior in `radiobutton-advanced`
- visible mobile-collapse behavior without using `display: none` for hidden radio options
- input error feedback with `role="alert"` and `aria-live="polite"`
- invalid input state uses `aria-invalid` and `aria-describedby`
- keyboard-specific behavior for the advanced radio selector:
  - options stay open during keyboard navigation
  - `Escape` closes
  - `Enter` also closes

## i18n

Whois text strings used by JS are injected through:

```js
window.internetstiftelsen.i18n.whois
```

In [whois.hbs](/Users/robert.hedman/www/iis-styleguide/src/organisms/whois/whois.hbs), the config values are merged into that object with an inline script.

Runtime lookup order:

1. `window.internetstiftelsen.i18n.whois`
2. `DEFAULT_I18N` in [whois.js](/Users/robert.hedman/www/iis-styleguide/src/organisms/whois/whois.js)

So yes: `DEFAULT_I18N` is the fallback.

## View variants in Fractal

Current variants in [whois.config.js](/Users/robert.hedman/www/iis-styleguide/src/organisms/whois/whois.config.js):

- `domain-available`
- `domain-taken`
- `domain-taken-hidden-contact`
- `domain-taken-person`
- `domain-taken-person-hidden-contact`
- `domain-in-quarantine`
- `keyword-search`
- `organisation-number`
- `retailers`

### Domain result variants

The main domain-result family supports:

- normal registered domain
- registered domain with hidden legal-entity contact data
- registered domain owned by a private person
- registered domain owned by a private person with hidden contact data
- quarantine state
- available state

Special result notes:

- `domain-available` has no contact-info block
- quarantine view uses different dates/status values and reduced contact information
- private-person variants use `johndoe.se`
- legal-entity organisation numbers are displayed with `[SE]` prefix where applicable

### Keyword result

- three-column layout
- flat alphabetical domain listing
- no longer grouped by registrar

### Organisation-number result

- shows simplified organisation contact block above the tables
- uses `[SE]` prefix in displayed organisation number
- domain lists are grouped by registrar
- each registrar table contains domain, registry lock and DNSSEC columns

### Retailers result

- hides the standard search form
- uses retailer data from `whois-retailers.json`
- contains a design-only filter UI
- uses `a11y-toggle` for the “Mer info / Göm info” interaction
- feature lists are split into:
  - `Erbjuder`
  - `Erbjuder inte`

## Styling notes

Current notable styling decisions in [_whois.scss](/Users/robert.hedman/www/iis-styleguide/src/organisms/whois/_whois.scss):

- search input and submit are built as an input group
- organisation country select has fixed width `104px`
- selected country code is visually clipped to the short code in closed state
- retailer view uses transparent list styling instead of cards
- retailer rows use subtle separators and custom spacing
- retailer toolbar stacks on mobile and aligns horizontally from `md` and up

## Known implementation boundaries

- The organisation country select uses a complete ISO alpha-2 code set for country metadata, not a complete global organisation-number ruleset.
- Only Swedish organisation-number validation is country-specific today.
- International organisation-number validation is intentionally permissive.
- `whois.config.js` contains mock data and Fractal variants, not production logic.
- `whois.js` contains the actual UI behavior.

## Good places to edit next

If future work is needed, these are the usual entry points:

- change markup or conditional view logic: [whois.hbs](/Users/robert.hedman/www/iis-styleguide/src/organisms/whois/whois.hbs)
- change UI behavior or validation: [whois.js](/Users/robert.hedman/www/iis-styleguide/src/organisms/whois/whois.js)
- change Fractal data, i18n seed text or variants: [whois.config.js](/Users/robert.hedman/www/iis-styleguide/src/organisms/whois/whois.config.js)
- change layout/styling: [_whois.scss](/Users/robert.hedman/www/iis-styleguide/src/organisms/whois/_whois.scss)

## Last updated

This document reflects the component state as of `2026-06-29`.
