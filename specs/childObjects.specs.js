var td = require("testdouble");
var Bowie = require("../lib");

describe("child objects", function(){

  describe("when assigning an object to an attribute", function(){
    var m;

    beforeEach(function(){
      m = new Bowie.Model();

      m.foo = {
        baz: "quux"
      };
    });

    it("should wrap the object in a Bowie Model", function(){
      expect(m.foo instanceof Bowie.Model).toBe(true);
    });

    it("should contain existing data from the object", function(){
      expect(m.foo.baz).toBe("quux");
    });
  });

  describe("when changing an attribute on a wrapped child object", function(){
    var change;

    beforeEach(function(){
      var m = new Bowie.Model();

      m.foo = {
        baz: "quux"
      };

      change = td.function("change:baz");
      m.foo.on("change:baz", change);

      m.foo.baz = "a change";
    });

    it("should trigger the child's change event", function(){
      td.verify(change("a change"));
    });
  });

  describe("when getting .toJSON of a model with child objects", function(){
    var json;

    beforeEach(function(){
      var m = new Bowie.Model();

      m.foo = {
        bar: "baz"
      };

      json = m.toJSON();
    });

    it("should include the child data", function(){
      expect(json.foo.bar).toBe("baz");
    });
  });

});
