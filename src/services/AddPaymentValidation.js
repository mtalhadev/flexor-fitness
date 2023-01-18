import {
  isEmailValid,
  isEmpty,
  isMinLength,
  isNameValid,
  isPhoneNumberValid,
} from "./AuthValidation";

export const validateAddPayment = (formValues, formFields) => {
  console.log("formFieldsin validateAddPayment", formFields);
  // console.log("formFields", formFields);

  // for (const key of formFields) {
  //   console.log("extra key", key);
  //   if (key === "type" && isEmpty(formValues[key])) {
  //     console.log("type valid");
  //     alert("Type is required");
  //     return false;
  //   }
  //   if (key === "phone_number" && isEmpty(formValues[key])) {
  //     alert("Phone Number is required");
  //     return false;
  //   }
  //   console.log("return true");
  //   return true;
  // }
  for (const key of formFields) {
    if (key === "type" && isEmpty(formValues[key])) {
      alert("Type is required");
      return false;
    }
    // if (key === "contact" && isEmpty(formValues[key])) {
    //   console.log("conatct valid");
    //   alert("Conatct is required");
    //   return false;
    // }
    if (key === "phone_number" && !isPhoneNumberValid(formValues[key])) {
      alert("Phone Number is not valid");
      return false;
    }
    if (key === "email") {
      if (isEmpty(formValues[key])) {
        alert("Email address is required");
        return false;
      }
      if (!isEmailValid(formValues[key])) {
        alert("Please enter a valid email address");
        return false;
      }
    }
    if (key === "first_name") {
      if (isEmpty(formValues[key]) || "") {
        alert("First Name field is required");
        return false;
      }
      if (!isNameValid(formValues[key])) {
        alert("Please enter a valid name (alphabets only)");
        return false;
      }
    }
    if (key === "last_name") {
      if (isEmpty(formValues[key]) || "") {
        alert("Last Name field is required");
        return false;
      }
      if (!isNameValid(formValues[key])) {
        alert("Please enter a valid name (alphabets only)");
        return false;
      }
    }
    if (key === "mother_name") {
      if (isEmpty(formValues[key] || "")) {
        alert("Mother's Name field is required");
        return false;
      }
      if (!isNameValid(formValues[key])) {
        alert("Please enter a valid name (alphabets only)");
        return false;
      }
    }
    if (key === "contact_type" && isEmpty(formValues[key])) {
      alert("Contact Type is required");
      return false;
    }
    if (key === "line_1" && isEmpty(formValues[key])) {
      alert("line1 is required");
      return false;
    }
    // if (key === "line_2" && isEmpty(formValues[key])) {
    //   alert("line2 is required");
    //   return false;
    // }
    if (key === "state" && isEmpty(formValues[key])) {
      alert("State is required");
      return false;
    }
    console.log(
      "key === zip && isMinLength(formValues[key], 4",
      key === "zip" && isMinLength(formValues[key], 4)
    );
    if (key === "zip") {
      if (!isMinLength(formValues[key], 4)) {
        alert("Zip Code min length should be 4");
        return false;
      }
    }
    if (key === "country" && isEmpty(formValues[key])) {
      alert("Country is required");
      return false;
    }
  }
  return true;
};
