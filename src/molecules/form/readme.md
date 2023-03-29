<h1 align="center">Form</h1>
<p align="center">A simple ajax form component</p>

## Usage

Simply add the attribute `data-form="/wp-json/..."` to any form and it will automatically send
the form data to the defined endpoint. With additional markup you can control
error/success states and set validation rules.

## Success

The success response is handled via an EJS template a `data-form-success` element.

Like this:

```html
<div role="alert" data-form-success="locations" class="m-alert m-alert--success is-hidden"></div>

<script type="iis/template" id="locations">
	<% locations.forEach(function (location) { %><li><%- location.city %> (<%- location.country %>)</li><% }); %>
</script>
```

## Error

The error message is defined with the attribute `data-form-error`. The error message is set
automatically depending on what happened. If the API returned an error message, that message will be used.
If validation failed, relevant validation messages will be showed. Finally, if the component, for any reason failed to do what was expected, an exception will be displayed.

## Validation

You can validate the input on the client side by adding a meta element with the name `form-validation`.
The content is the rules and should look like this: `input-name=rule:data`. For example:

```
<meta name="form-validation" content="domain=required,min:3">
```

__Available rules__:

| Name | Data | Description |
| ---- | ---- | ----------- |
| required | - | The field must exist |
| min | numeric | Checks if the value of the field is at least N characters |

## Events

All form elements (`data-form`) has the actual form component attached to it. You can access it like this:

```javascript
const form = document.querySelector('[data-form]').form;
```

The form component has a few events you can listen to:

| Name | Description |
| ---- | ----------- |
| success | The form was successfully submitted |
| error | The form failed to submit |

You can listen to these events like this:

```javascript
form.events.on('success', (data) => {
	console.log('Form was successfully submitted', data);
});
```

This can be used for tracking and other things.
