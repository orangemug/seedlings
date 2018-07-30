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
        "id": 1,
      },
      {
        "id": 1,
        "owner": 1
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
        "prefix": "prefix:1",
        "suffix": "1:suffix",
        "both":   "prefix:1:suffix",
      }
    ])
  });

  it("should accept multiple args", function() {
    var seeder = core();
    var out = seeder([
      {"test1": "{%tmp:a%}"},
      {"test2": "{%tmp:b%}"}
    ], [
      {"test3": "{%tmp:a%}"},
      {"test4": "{%tmp:c%}"}
    ])

    assert.deepEqual(out, [
      {"test1": 1},
      {"test2": 2},
      {"test3": 1},
      {"test4": 3}
    ])
  });

  it("should leave object uneffected", function() {
    var seeder = core();
    var out = seeder([
      {"test1": 1},
      {"test2": 2},
      {"test3": null}
    ])

    assert.deepEqual(out, [
      {"test1": 1},
      {"test2": 2},
      {"test3": null}
    ])
  });

})
