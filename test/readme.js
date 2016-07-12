var assert       = require("assert");
var path         = require("path");
var readmeTester = require("readme-tester");

describe("README.md", function () {
  it("should pass", function(done) {
    readmeTester(path.resolve(__dirname, "../"), function(err) {
      assert.ifError(err);
      done();
    });
  });
});
