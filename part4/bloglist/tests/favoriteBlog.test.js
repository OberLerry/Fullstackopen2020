const listHelper = require("../utils/list_helper");
const test_helper = require("./test_helper");

describe("favoriteBlog", () => {
  test("Empty returns empty object", () => {
    expect(listHelper.favoriteBlog([])).toEqual({});
  });

  test("Of a list with one element returns that element", () => {
    expect(listHelper.favoriteBlog(test_helper.listWithOneBlog)).toEqual(
      test_helper.listWithOneBlog[0]
    );
  });

  test("Of a longer list returns the most liked blog", () => {
    expect(listHelper.favoriteBlog(test_helper.blogs).likes).toBe(12);
  });
});
