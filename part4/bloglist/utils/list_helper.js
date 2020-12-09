const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, current) => total + current.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {};
  return blogs.reduce((previous, current) =>
    previous.likes > current.likes ? previous : current
  );
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};

  const o = {};
  for (i = 0; i < blogs.length; i++) {
    o[blogs[i].author] = o[blogs[i].author] ? o[blogs[i].author] + 1 : 1;
  }
  const pairs = Object.entries(o);
  pairs.sort((a, b) => b[1] - a[1]);
  return { author: pairs[0][0], blogs: pairs[0][1] };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {};

  const o = {};
  for (i = 0; i < blogs.length; i++) {
    o[blogs[i].author] = o[blogs[i].author]
      ? o[blogs[i].author] + blogs[i].likes
      : blogs[i].likes;
  }
  const pairs = Object.entries(o);
  pairs.sort((a, b) => b[1] - a[1]);
  return { author: pairs[0][0], likes: pairs[0][1] };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
