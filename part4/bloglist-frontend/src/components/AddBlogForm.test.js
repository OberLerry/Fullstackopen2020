import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import AddBlogForm from "./AddBlogForm";

test("AddBlogForm sends correct data", () => {
  const addBlog = jest.fn();
  const component = render(<AddBlogForm onSubmit={addBlog}></AddBlogForm>);
  const title = component.container.querySelector("#title");
  const author = component.container.querySelector("#author");
  const url = component.container.querySelector("#url");
  const form = component.container.querySelector("form");
  fireEvent.change(title, {
    target: { value: "Some blog" },
  });
  fireEvent.change(author, {
    target: { value: "Some author" },
  });
  fireEvent.change(url, {
    target: { value: "Some URL" },
  });
  fireEvent.submit(form);
  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0]).toBe("Some author");
  expect(addBlog.mock.calls[0][1]).toBe("Some blog");
  expect(addBlog.mock.calls[0][2]).toBe("Some URL");
});
