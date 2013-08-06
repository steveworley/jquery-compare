# jQuery Compare

A lightweight jQuery plugin that helps with array and object comparisons. The plugin offers a few configurable options to help get the type of matching that you're after. It supports callbacks (error and succcess) and method chaining.

*Usage*

``` Javascript
$([mixed]).compare([mixed], {options}, callback);
```

## Options

### Chaining

``` Javascript
$(['cat', 'dog', 'bird'])
  .compare(['cat', 'dog', 'bird'], 
    function(array) { 
      alert('they match') 
    }
  )
  .compare(['fish', 'monkey', 'tiger'], {
    error: function(array) { 
      alert('The error callback is triggered');
    }
  });
  ```

#### caseSensitive

Type: _Boolean_, Default: `true`

Whether or not jQuery compare should attempt to match letter casing of your array values or object properties and values.

``` Javascript
$(['cat', 'dog', 'bird']).compare(['CAT', 'DOG', 'BIRD'], {
  caseSensitive: false
});
```

#### fuzzy

Type: _Boolean_, Default: `false`

Perform a "contains" search on a second array or object.

``` Javascript
$([1, 2, 3]).compare([1, 2, 3, 4, 5], {
  fuzzy: true
});
```

#### sort

Type: _Boolean_, Default: `true`

Whether or not the array should be sorted prior to the comparison (this will not have any affect on the arrays your pass through to the function.) This option has no effect on objects.

``` Javascript
var array1 = [1, 2, 3], array2 = [3, 2, 1];

$(array1).compare(array2, {
  sort: false
});

console.log(array1); // [1, 2, 3]
console.log(array2); // [3, 2, 1]
```

#### success

Type: _Function_, Default: `void`

A set of operations to perform if the comparison is successful. This function will be passed the matching array.

``` Javascript
$([1, 2, 3]).compare([1, 2, 3], {
  success: function(mixed) {alert('test')}
});
```

#### error

Type: _Function_, Default: `void `

A set of operations to perform if the comparison fails. This function will be passed the matching array.

``` Javascript
$([1, 2, 3]).compare([1, 2, 3], {
  error: function(mixed) {alert('test')}
});
```

#### callback

Type: _Function_, Default: `void`

A set of operations to perform if the comparison is successful. This function will be passed the matching array. The callback can be used as the second or third paramter to the `compare` function.

``` Javascript
$([1, 2, 3]).compare([1, 2, 3], function(mixed) { 
  alert('test') 
});
```

## Methods

### caseSort

Params: `string(a)`, `string(b)`

Is to be used as a case insensitive comparison tool. Attempts to return whether or not a string is alphabetically before another.

``` Javascript
if ($.fn.compare.caseSort('house', 'lamb')) {
  alert('I am technically ahead!');
}
```