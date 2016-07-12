var assert      = require("assert");
var idGenerator = require("../../generators/uuid");


describe("uuid", function() {

  it("should work", function() {
    var idGen = idGenerator();
    assert.equal(idGen("a", "users"), "01010101-0101-4101-8101-010101010101");
    assert.equal(idGen("a", "users"), "01010101-0101-4101-8101-010101010101");
    assert.equal(idGen("b", "users"), "02020202-0202-4202-8202-020202020202");
    assert.equal(idGen("c", "users"), "03030303-0303-4303-8303-030303030303");
    assert.equal(idGen("a", "posts"), "04040404-0404-4404-8404-040404040404");
  });

});
