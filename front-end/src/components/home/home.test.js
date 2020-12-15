import React from "react";
import { render, waitFor, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "./home";

afterEach(cleanup);

test("renders correctly", () => {
  const tree = render(<Home />);
  expect(tree).toMatchSnapshot();
});
