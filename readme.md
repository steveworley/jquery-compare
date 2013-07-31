# jQuery Compare

This jQuery plugin helps with array and object literal comparisons with a few customisations to help get fine grained comparisions with a small amount of code. It supports callbacks and/or method chaining.

``` Javascript
$([mixed]).compare([mixed], {options}, callback);
```

## Options

`caseSensitive`

Type: _Boolean_, Default: `true`

Whether or not jQuery compare should attempt to match letter casing of your array values or object properties and values.

``` Javascript
$(['cat', 'dog', 'bird']).compare(['CAT', 'DOG', 'BIRD'], {
  caseSensitive: false
});
```

`fuzzy`
Type: _Boolean_, Default: `false`

Perform an exact match on the number of properties the array or object has.

``` Javascript
$([1, 2, 3]).compare([1, 2, 3, 4, 5], {
  fuzzy: true
});
```

`sort`
Type: _Boolean_, Default: `true`

Whether or not the array should be sorted prior to the comparison (this will not have any affect on the arrays your pass through to the function.) This option has no effect on objects.

``` Javascript
$([1, 2, 3]).compare([3, 2, 1], {
  sort: false
});
```

`success`

Type: _Function_, Default: `void`

A set of operations to perform if the comparison is successful. This function will be passed the matching array.

``` Javascript
$([1, 2, 3]).compare([1, 2, 3], {
  success: function(mixed) {alert('test')}
});
```

`error`
Type: _Function_, Default: `void `

A set of operations to perform if the comparison fails. This function will be passed the matching array.

``` Javascript
$([1, 2, 3]).compare([1, 2, 3], {
  error: function(mixed) {alert('test')}
});
```

`callback`

Type: _Function_, Default: `void`

A set of operations to perform if the comparison is successful. This function will be passed the matching array. The callback can be used as the second or third paramter to the `compare` function.

``` Javascript
$([1, 2, 3]).compare([1, 2, 3], function(mixed) { 
  alert('test') 
});
```