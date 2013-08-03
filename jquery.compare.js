/**
 * jQuery Compare
 * 
 * jQuery Compare is a simple jQuery plugin that helps compare array and object litterals. 
 *
 * version: 0.3.0
 * author: Steve Worley <sj.worley88@gmail.com>
 * url: http://steveworley.me/jquery-compare
 *
 * Copyright (C) 2013 Steve Worley.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

+function($) {
  $.fn.compare = function(compare, opts, cb) {
    var passed = true,
        isArray = $.isArray(compare),
        a = (isArray) ? this : this[0],
        b = (isArray) ? $.extend([], compare) : $.extend({}, compare),
        options = {};

    var defaults = {
      fuzzy: false,
      sort: true,
      caseSensitive: true,
      success: {},
      error: {}
    }

    cb = (arguments.length == 2 && typeof opts == 'function') ? opts : cb;

    // Set up options
    if (typeof opts == 'object') {
      $.extend(options, defaults, opts);
    } else {
      $.extend(options, defaults);
    }

    if (options.sort && isArray) {
      if (options.caseSensitive) {
        b.sort();
      } else {
        b.sort(function (a, b) {
            return a.toLowerCase().localeCompare(b.toLowerCase());
        })
      }
    }

    var lenA = $.map(a, function(n, i) { return i; }).length,
        lenB = $.map(b, function(n, i) { return i; }).length;

    if (lenA != lenB && !options.fuzzy) {
      passed = false;
    }

    if (isArray === false) {
      
      if (options.caseSensitive == false) {
        var newA = {}, newB = {};
        
        $.map(a, function(val, key) {
          newA[key.toLowerCase()] = val;
        });
        $.map(b, function(val, key) {
          newB[key.toLowerCase()] = val;
        });
        
        a = newA;
        b = newB;
      }
      
      for(var key in a) {
        if (typeof a[key] !== typeof b[key]) {
          passed = false;
        } else if (typeof a[key] == 'function') {
          passed = a[key].toString() == b[key].toString();
        } else if (a[key] instanceof Object && b[key] instanceof Object) {
          passed = $(a[key]).compare(b[key]);
        } else if (options.caseSensitive == false && typeof a[key] == 'string') {
          passed = a[key].toLowerCase() == b[key].toLowerCase();
        } else if (a[key] !== b[key]) {
          passed = false;
        }
        
        if (!passed) {
          break;
        }
      }
    } else {
      for(var i = 0; i < a.length; i++) {
        if (typeof a[i] == 'string' && !options.caseSensitive) {
          if (typeof b[i] != 'string' || a[i].toLowerCase() != b[i].toLowerCase()) {
            passed = false;
          }
        } else if  (a[i] != b[i]) {
          passed = false;
        }
      }
    }

    if (!passed) {
      callFn(options.error, $(a));
      return false;
    }

    if (typeof cb == 'function') {
      return cb($(a));
    }

    if (typeof options.success == 'function') {
      return options.success($(a));
    }

    return true;
  }

  var callFn = function(fn, params) {
    if (typeof fn == 'function') {
      fn(params);
    }
  }

}(jQuery);
