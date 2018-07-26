module.exports = function() {
  var idx = 1;
  var typeIdx = {}
  var store = {};
  return function(id, type) {
    var key = type+":"+id;

    if(store.hasOwnProperty(key)) {
      return store[key];
    }
    else {
      if(typeIdx.hasOwnProperty(type)) {
        typeIdx[type] += 1;
      }
      else {
        typeIdx[type] = 1;
      }

      return store[key] = typeIdx[type];
    }
  }
};
