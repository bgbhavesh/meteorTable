// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by meteortable.js.
import { name as packageName } from "meteor/bucky:meteortable";

// Write your tests here!
// Here is an example.
Tinytest.add('meteortable - example', function (test) {
  test.equal(packageName, "meteortable");
});
