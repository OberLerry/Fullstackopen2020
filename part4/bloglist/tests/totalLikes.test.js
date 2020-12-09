const listHelper = require("../utils/list_helper");
const test_helper = require("./test_helper");

describe("totalLikes", () => {
  test("of empty list is zero", () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });
  test("when list has only one blog equals the likes of that", () => {
    expect(listHelper.totalLikes(test_helper.listWithOneBlog)).toBe(5);
  });
  test("of a bigger list is calculated right", () => {
    expect(listHelper.totalLikes(test_helper.blogs)).toBe(36);
  });
});
