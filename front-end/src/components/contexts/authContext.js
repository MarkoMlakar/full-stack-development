import { createContext } from "react";

export const AuthContext = createContext({
  first_name: "",
  last_name: "",
  valid: false,
  id: "",
  dob: "",
  sightings: 0,
  email: "",
});
