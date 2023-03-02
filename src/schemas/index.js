import * as Yup from "yup";
export const signUpSchema = Yup.object({
  fname: Yup.string().min(2).max(25).required("Please enter your first name"),
  lname: Yup.string().min(2).max(25).required("Please enter your last name"),
  email: Yup.string().email().required("Please enter your email"),
  phone: Yup.string().min(11).max(11).required("Please enter your phone number"),
  password: Yup.string().min(4).required("Please enter your password"),
  about: Yup.string().min(2).max(100).required("Please enter your about"),
});
