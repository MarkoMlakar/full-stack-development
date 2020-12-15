import React from "react";
import { render, waitFor, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ImageCard from "./imageCard";
import { AuthContext } from "../../contexts/authContext";

afterEach(cleanup);

test("sets the data to card", async () => {
  const imageMock = {
    id: 7,
    name: "Alpski volcin",
    latin_name: "Daphne alpina",
    sightings: 0,
    profile_picture:
      "//fullStack.s3.amazonaws.com/flowers/profile_pictures/000/000/007/medium/L_00010.jpg?1527514226",
    favorite: true,
  };

  const mockUserContext = {
    user: {
      valid: true,
    },
  };
  const { getByTestId } = render(
    <AuthContext.Provider value={mockUserContext}>
      <ImageCard image={imageMock} />
    </AuthContext.Provider>
  );

  const flowerName = getByTestId("card-title");
  const flowerLatinName = getByTestId("card-subtitle");
  const sightings = await waitFor(() => getByTestId("card-sightings"));

  expect(flowerName).toHaveTextContent("Alpski volcin");
  expect(flowerLatinName).toHaveTextContent("Daphne alpina");
  expect(sightings).toHaveTextContent("0 Sightings");
});
