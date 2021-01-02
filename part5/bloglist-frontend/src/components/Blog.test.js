import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

test("Blog details are hidden initially and displayed after button click", () => {
  const blog = { author: "test", title: "testblog", url: "testurl", likes: 0 };
  const mockHandler = jest.fn();
  const component = render(
    <Blog blog={blog} onShowDetails={mockHandler}></Blog>
  );
  expect(component.container).toHaveTextContent("test");
  expect(component.container).toHaveTextContent("testblog");
  expect(component.container.querySelector(".details")).toBeNull();

  const button = component.container.querySelector(".showDetailsButton");
  fireEvent.click(button);
  expect(component.container).toHaveTextContent("testurl");
  expect(component.container).toHaveTextContent("Likes");
});

test("Likes are executed for each click", () => {
  const blog = { author: "test", title: "testblog", url: "testurl", likes: 0 };
  const mockHandler = jest.fn();
  const component = render(<Blog blog={blog} onLike={mockHandler}></Blog>);
  const button = component.container.querySelector(".showDetailsButton");
  fireEvent.click(button);
  const likeButton = component.container.querySelector(".likeButton");
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);
  expect(mockHandler.mock.calls).toHaveLength(2);
});
