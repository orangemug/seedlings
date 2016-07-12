var assert = require("assert");
var core   = require("../../lib/core");


describe("core", function() {

  it("should take id generator type", function() {
    var seeder = core();
    var out = seeder([
      {
        "id": "{%users:id.1%}",
      },
      {
        "id": "{%posts:id.1%}",
        "owner": "{%users:id.1%}",
      }
    ])

    assert.deepEqual(out, [
      {
        "id": 0,
      },
      {
        "id": 1,
        "owner": 0
      }
    ])
  });

  it("should take not take id generator type if prefixed / suffixed", function() {
    var seeder = core();
    var out = seeder([
      {
        "prefix": "prefix:{%tmp:1%}",
        "suffix": "{%tmp:1%}:suffix",
        "both":   "prefix:{%tmp:1%}:suffix",
      }
    ])

    assert.deepEqual(out, [
      {
        "prefix": "prefix:0",
        "suffix": "0:suffix",
        "both":   "prefix:0:suffix",
      }
    ])
  });

  it("should accept multiple args", function() {
    var seeder = core();
    var out = seeder([
      {"test1": "{%tmp:1%}"}
    ], [
      {"test2": "{%tmp:1%}"}
    ])

    assert.deepEqual(out, [
      {"test1": 0},
      {"test2": 1}
    ])
  });

})
