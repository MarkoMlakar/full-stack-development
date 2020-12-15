import { UnsplashAxios } from "./API";

export const GetImages = async (term) => {
  try {
    const response = await UnsplashAxios.get("/search/photos", {
      params: { query: term },
    });
    return response;
  } catch (err) {
    console.log({
      status: false,
      message: "Error while fetching images",
      error: err,
    });
  }
};
