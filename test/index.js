var seedlings = require("../");


describe("seedlings", function() {

  it("should work", function() {
    var seeder = seedlings();
    var out = seeder([
      {
        "id": "{%users.id.1%}",
      },
      {
        "id": "{%posts.id.1%}",
        "owner": "{%users.id.1%}",
      }
    ])

    assert.deepEqual(out, [
      {
        "id": 1,
      },
      {
        "id": 2,
        "owner": 1,
      }
    ])
  });

})
