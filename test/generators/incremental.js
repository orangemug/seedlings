var assert      = require("assert");
var idGenerator = require("../../generators/incremental");


describe("incremental", function() {

  it("should work", function() {
    var idGen = idGenerator();
    assert.equal(idGen("a", "users"), 0);
    assert.equal(idGen("a", "users"), 0);
    assert.equal(idGen("b", "users"), 1);
    assert.equal(idGen("c", "users"), 2);
    assert.equal(idGen("a", "posts"), 0);
  });

});
