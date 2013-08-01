---------------------
Changelog
---------------------

- 02/08/2013
  - Updated object comparisons, there was a bug that prevented every property of an object from being tested. If The first key matched it would return `true` which would give poor results.
  - Updated caseSensitive, this will now work on object values.
  - Updated caseSensitive, this will now work on object properties.