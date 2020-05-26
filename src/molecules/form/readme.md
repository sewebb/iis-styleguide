<h1 align="center">Form</h1>
<p align="center">A simple ajax form component</p>

## Usage

Simply add the attribute `data-form="/wp-json/..."` to any form and it will automatically send
the form data to the defined endpoint. With additional markup you can control
error/success states and set validation rules.

## Success

The success message is defined with the attribute `data-form-success`. How the message looks is completely up to you.
You can use template tags that will be replaced with the data received from the API.

Like this:

```
<div data-form-success>
	The result was: {result}
</div>
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
