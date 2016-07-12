var uuid = require("node-uuid");


module.exports = function(id, type) {
  var uid = 0;
  var lookup = {};

  return function(id, type) {
    function rng() {
      uid++;
      var out = [];
      for(var i=0; i<16; i++) {
        out[i] = uid;
      }
      return out;
    }

    var key = type+":"+id;
    if(!lookup.hasOwnProperty(key)) {
      lookup[key] = uuid.v4({
        random: rng()
      });
    }

    return lookup[key];
  }
}
