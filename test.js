// Arrays
var a = [1, 2, 3], b = [1, 2, 3], c = [2, 3, 4], d = [3, 2, 1], e = [1, 2, 3, 4];
var f = {a:1, b:2, c:3}, g = {a:1, b:2, c:3}, h = {b:2, c:3, d:4}, i = {c:3, b:2, a:1}, j = {a:1, b:2, c:3, d:4}, oa = {A:1, B:2, C:3}, ob = {a:'Cat', b:'Dog', c:'Lemon'}, oc = {A:'cat', B:'dog', C:'lemon'};

// Arrays with words
var k = ['cat', 'dog', 'lemon'],
    l = ['cat', 'dog', 'lemon'],
    m = ['Cat', 'Dog', 'Lemon'],
    n = ['Cat', 'dog', 'lemon'],
    o = ['dog', 'lemon', 'cat'],
    p = ['Dog', 'Lemon', 'cat'],
    q = ['cat', 'dog', 'lemon', 'orange', 'turtle'],
    r = ['Cat', 'Dog', 'lemon', 'orange', 'Turtle'];

test('Arrays with numbers', function() {
  ok($(a).compare(b), print_r('==', a, b));
  equal($(a).compare(c), false, print_r('!=', a, c));
  ok($(a).compare(d), print_r('==', a, d));
  equal($(a).compare(e), false, print_r('!=', a, e));
});

test('Arrays with words', function() {
  ok($(k).compare(l), print_r('==', k, l));                          // 1.
  equal($(k).compare(m), false, print_r('!=', k, m));                                  // 2.
  ok($(k).compare(m, {caseSensitive: false}), print_r('==', k, m));                    // 3.
  equal($(k).compare(n), false, print_r('!=', k, n));                                  // 4.
  ok($(k).compare(n, {caseSensitive: false}), print_r('==', k, n));                    // 5.
  ok($(k).compare(o), print_r('==', k, o));                                            // 6.
  equal($(k).compare(o, {sort: false}), false, print_r('!=', k, o));                   // 7.
  equal($(k).compare(p), false, print_r('!=', k, p));                                  // 8.
  ok($(k).compare(p, {caseSensitive: false}), print_r('==', k, p));                    // 9.
  equal($(k).compare(q), false, print_r('!=', k, q));                                  // 10.
  ok($(k).compare(q, {fuzzy: true}), print_r('*=', k, q));                          // 11.
  equal($(k).compare(r), false, print_r('!=', k, r));                                  // 12.
  equal($(k).compare(r, {caseSensitive: false}), false, print_r('!=', k, r));          // 13.
  equal($(k).compare(r, {fuzzy: true}), false, print_r('!=', k, r));                // 14.
  ok($(k).compare(r, {caseSensitive: false, fuzzy: true}), print_r('*=', k, r));    // 15.
})

test('Objects', function() {
  ok($(f).compare(g), print_r('==', f, g));
  equal($(f).compare(h), false, print_r('!=', f, h));
  ok($(f).compare(i), print_r('==', f, i));
  equal($(f).compare(j), false, print_r('!=', f, j));
  ok($(f).compare(j, {fuzzy: true}), print_r('*=', f, j));
  equal($(f).compare(oa), false, print_r('!=', f, oa));
  ok($(f).compare(oa, {caseSensitive: false}), print_r('==', f, oa));
  ok($(ob).compare(ob), print_r('==', ob, ob));
  equal($(ob).compare(oc), false, print_r('!=', ob, oc));
  ok($(ob).compare(oc, {caseSensitive: false}), print_r('==', ob, oc));
})

/* -------------------------------
Nested Objects
---------------------------------*/
var aa = {a: 1, b: { c: 2, d: 3 } }, ab = {a: 1, b: { c: 2, d: 3 } }, ac = {a: 1, b: 2, c: { d: 3 }};
test('Nested Objects', function() {
  ok($(aa).compare(ab), print_r('==', aa, ab));
  equal($(aa).compare(ac), false, print_r('!=', aa, ac));
});

/* -------------------------------
Scary objects!
--------------------------------*/
var ba = {a: function() { alert('test'); }, b: undefined, c: null}, bb = {a: function() { alert('test'); }, b: undefined, c: null}, bc = {a: "Cat", b: "Dog", c:"Lemon"}, bd = {a:"cat", b:"dog", c:"lemon"};
test('Scary Objects', function() {
  equal($(ba).compare(ba), true);
  equal($(ba).compare({}), false);
  equal($(ba).compare(bb), true);
  equal($(bc).compare(bd), false);
  equal($(bc).compare(bd, {caseSensitive: false}), true);
});

var print_r = function(operator) {
  var string = '', operator = operator, arrays = $.extend([], arguments);
  arrays.shift();
  for (var i = 0; i < arrays.length; i++) {
    string += JSON.stringify(arrays[i]);
    if (i < (arrays.length - 1)) {
      string += " " + operator + " ";
    }
  }
  return string;
}
