const listHelper = require("../utils/list_helper");
const test_helper = require("./test_helper");

describe("mostBlogs", () => {
  test("Empty returns empty object", () => {
    expect(listHelper.mostBlogs([])).toEqual({});
  });

  test("Of a list with one element returns that element", () => {
    expect(listHelper.mostBlogs(test_helper.listWithOneBlog)).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1,
    });
  });

  test("Of a longer list returns the most author with the most blogs and their number", () => {
    expect(listHelper.mostBlogs(test_helper.blogs)).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});
