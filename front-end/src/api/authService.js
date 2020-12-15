import { PublicAxios } from "./API";

export const UserRegister = async (
  firstName,
  lastName,
  dateOfBirth,
  email,
  password
) => {
  try {
    // TODO: Refactor this
    const response = await PublicAxios.post("/api/register", {
      email: email,
      password: password,
      username: firstName + lastName + Math.floor(Math.random() * 10000),
      name: firstName,
      surname: lastName,
      description: "null",
      age: 0,
      gender: 0,
      profession: "null",
    });
    return response;
  } catch (err) {
    return err.response;
  }
};

export const UserLogin = async (email, password) => {
  try {
    const response = await PublicAxios.post("/api/login", {
      email: email,
      password: password,
    });
    return response;
  } catch (err) {
    return err.response;
  }
};

export const UserLogout = async () => {
  try {
    const response = await PublicAxios.get("/api/logout");
    return response;
  } catch (err) {
    return err.response;
  }
};
