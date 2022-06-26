# ts-workmate
TypeScript / JavaScript utilities library.
Simple solutions for every-day problems.

## Utilities
### chop
Chop Array `[]` or Object `{}` into pieces. Outputs an Array of Arrays in case input was an Array, or an Array of Objects when input was an Object.

### clone
Copies elements from Json ({} or []) recursively. Copies Objects, Arrays and Dates.

### dedpulicate
Dedpucliates input. Input may be any Array. It dedpulcites based on a deep comparison between the elements to check whether equals are found. Looks for strict equality and Object, Array, and Date equality.

### deepParse
Parses input recursively
Attempts to parse any element that it encounters while recursively looping over elements
When parsed element is not a JSON (`{}` or `[]`), the original element will be preserved.

### isArray
Checks whether input variable is an Array `[]`.

### isEqual
Tests whether `A` equals `B`.
Deep comparison between the two to check whether both are equal.
Checks strict equality and Object, Array, and Date equality.

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

### sleep
wait for x milliseconds .

### sortOnProperty
Sort Array on properties. Possible to sort on multiple keys. When keys input is an Array, the input Array will be first sorted on first element in keys, when input-element is equal it will be sorted on next keys-element.


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


### timeout
Add a timeout to a Promise. An error will be thrown when timeout is exceeded.

### retry
Retries any function until it is resolved, or maximum number of retries is reached. Use custom error-/retry callbacks, backoff settings and/or add a timeout to the function to be retried.

Settings:
* `retryCallback`: Function to be called on retry. `default: (details) => void details`,
* `errorCallback`: Function to be called on error. `default: (details) => void details`,
* `minimumBackoff`: minimum backoff in ms. This is the duration of the first backoff period. `default: 100`,
* `backoffExponent`: exponent to be used to calculate next backoff period `default: 1.5`,
* `maximumBackoff`:  minimum backoff in ms `default: 2000`,
* `maximumRetryCount`: maximum number of retries `default: 5`,
* `timeout`: maximum time allowed to resolve a single iteration (ms). When provided an attempt to resolve functionToCall will be considered as failed if the timeout is exceeded `default: null (no timeout)`,
* `fixedBackoff`: fixed backoff period (ms) `default: null (no fixed backoff period)`


## Types
### ArrayType
Is an Array `[]`, but not an Object `{}`.

### DeepPartial<T>
Recursively make all properties of `T` optional.

### DeepRequired<T>
Recursively make all properties of `T` required.

### JsonType
Is an Array `[]` or an Object `{}`.

### ObjectType
Is an Object `{}`, but not an Array `[]`.

## Contributing
Pull requests are welcome. Please make sure to update tests as appropriate.

## License
[MIT](https://opensource.org/licenses/MIT)