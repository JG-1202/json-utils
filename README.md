# ts-workmate
TypeScript / JavaScript utilities library.
Simple solutions for every-day problems.

## Utilities
### chop
Chop Array `[]` or Object `{}` into pieces. Outputs an Array of Arrays in case input was an Array, or an Array of Objects when input was an Object.

## clone
Copies elements from Json ({} or []) recursively. Copies Objects, Arrays and Dates.

## deepParse
Parses input recursively
Attempts to parse any element that it encounters while recursively looping over elements
When parsed element is not a JSON (`{}` or `[]`), the original element will be preserved.

### isArray
Checks whether input variable is an Array `[]`.

### isJson
Checks whether input variable is either an Array  `[]` or an Object `{}`.

### isNumber
Checks whether input variable is a Number.

### isObject
Checks whether input variable is an Object `{}`.

### merge
Deep merges elements, while returning type based on input.
Objects `{}` and Arrays `[]` are merged, conflicting types will be overwritten. Overwriting and merging is based on the order of provided arguments, later elements will overwrite earlier elements.

### safeParse
Attempts to parse input to JSON. When parsed element is not a JSON (`{}` or `[]`), the original element will be returned on default. Callback `callbackOnFailure` is called when parsed value is not JSON.


## Services

### Logger
Logger with the possibility to set logLevel, add context and tags, and use a custom log entity (e.g. `console` or `winston`). Defaults to `console`. 

* `debug`: debug log if logLevel <= DEBUG
* `info`: info log if logLevel <= INFO
* `warn`: warn log if logLevel <= WARN
* `error`: error log
* `thowLoggedError`: error log + throws error
* `addContext`: adds context to logger, to be added in every log message
* `addTags`: adds tags to logger, to be added in every log message
* `extend`: returns a new Logger instance witth current context and tags.

## Contributing
Pull requests are welcome.

## License
[MIT](https://opensource.org/licenses/MIT)