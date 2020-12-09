const listHelper = require("../utils/list_helper");
const test_helper = require("./test_helper");

describe("mostLikes", () => {
  test("Empty returns empty object", () => {
    expect(listHelper.mostLikes([])).toEqual({});
  });

  test("Of a list with one element returns that element", () => {
    expect(listHelper.mostLikes(test_helper.listWithOneBlog)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  test("Of a longer list returns the most author with the most likes and their number", () => {
    expect(listHelper.mostLikes(test_helper.blogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
