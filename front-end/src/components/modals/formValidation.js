const FormValidation = (values, type) => {
  let errors = {};

  if (type === "login") {
    // Email
    if (!values.email.trim()) {
      errors.email = " required";
    }

    // Password
    if (!values.password.trim()) {
      errors.password = " required";
    } else if (values.password.length < 6) {
      errors.password = " needs to be 6 characters or more";
    }
  }

  if (type === "signup") {
    // First Name
    if (!values.firstName.trim()) {
      errors.firstName = " required";
    }
    // Last Name
    if (!values.lastName.trim()) {
      errors.lastName = " required";
    }
    // Date of birth
    if (!values.dob) {
      errors.dob = " required";
    }
    // Email
    if (!values.email.trim()) {
      errors.email = " required";
    }

    // Password
    if (!values.password.trim()) {
      errors.password = " required";
    } else if (values.password.length < 6) {
      errors.password = " needs to be 6 characters or more";
    }
  }

  return errors;
};

export default FormValidation;
