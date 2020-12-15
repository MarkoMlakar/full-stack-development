import React from "react";
import { render, waitFor, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UserModal from "./userModal";
import { AuthContext } from "../../contexts/authContext";
import axiosMock from "./__mocks__/axiosMock";
import { act } from "react-dom/test-utils";

let container;

// We need to create a container in which the modal will render
let modalRoot = document.getElementById("modal");
if (!modalRoot) {
  modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal");
  document.body.appendChild(modalRoot);
}

beforeEach(() => {
  container = document.createElement("modal");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

// Mock useContext
const mockUserContext = {
  user: {
    id: 1,
    first_name: "Marko",
    last_name: "Mlakar",
    dob: "April 3, 1996",
    email: "markomlakar2@gmail.com",
    sightings: 12,
  },
};
test("gets user information", async () => {
  //--> in case we want to call the api in userModal
  //   // Mock the axios API call
  //   // The actual /me endpoint doesn't actually
  //   axiosMock.get.mockResolvedValueOnce({
  //     user: {
  //   id: 1,
  //   first_name: "Marko",
  //   last_name: "Mlakar",
  //   dob: "April 3, 1996",
  //   email: "markomlakar2@gmail.com",
  //     },
  //   });

  const { getByTestId } = render(
    <AuthContext.Provider value={mockUserContext}>
      <UserModal showModal={true} />
    </AuthContext.Provider>
  );

  const firstName = await waitFor(() => getByTestId("first-name"));
  const lastName = await waitFor(() => getByTestId("last-name"));
  const dob = await waitFor(() => getByTestId("dob"));
  const email = await waitFor(() => getByTestId("email"));
  const sightings = await waitFor(() => getByTestId("sightings"));

  expect(firstName).toHaveTextContent("Marko");
  expect(lastName).toHaveTextContent("Mlakar");
  expect(dob).toHaveTextContent("April 3, 1996");
  expect(email).toHaveTextContent("markomlakar2@gmail.com");
  expect(sightings).toHaveTextContent("12 sightings");
});

test("renders correctly", () => {
  const tree = render(
    <AuthContext.Provider value={mockUserContext}>
      <UserModal showModal={true} />
    </AuthContext.Provider>
  );
  expect(tree).toMatchSnapshot();
});
