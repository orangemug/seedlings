var incrementalIdGenerator = require("../generators/incremental");


var REGEXP = /^(.*)(\{%([0-9A-Za-z_-]+):([\.0-9A-Za-z_-]+)%\})(.*)$/;

function seedlings(idGenerator) {
  idGenerator = idGenerator || incrementalIdGenerator
  idGenerator = idGenerator();

  return function(data) {
    var rslt = [];
    for(var i=0; i<arguments.length; i++) {
      var items = arguments[i].map(function mapFn(item) {
        if(typeof(item) !== "object" || item == null) {
          return item;
        }

        if(Array.isArray(item)) {
          return item.map(mapFn);
        }
        else {
          var out = {};

          for(var k in item) {
            var v = item[k];

            if(typeof(v) === "string" && v.match(REGEXP)) {
              var prefix = RegExp.$1;
              var match  = RegExp.$2;
              var type   = RegExp.$3;
              var id     = RegExp.$4;
              var suffix = RegExp.$5;

              var id = idGenerator(id, type);

              if(
                   prefix === ""
                && suffix === ""
              ) {
                v = id;
              }
              else {
                v = v.replace(match, id);
              }
            }
            else if(Array.isArray(v)) {
              v = v.map(mapFn);
            }
            else if(typeof(v) === "object") {
              v = mapFn(v);
            }

            out[k] = v;
          }

          return out;
        }

      })

      rslt = rslt.concat(items);
    }
    return rslt;
  }
}


module.exports = seedlings;
