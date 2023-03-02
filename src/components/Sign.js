import React, { useState } from "react";
import { useFormik } from "formik";
import { signUpSchema } from "../schemas";
import { useNavigate } from "react-router-dom";
const Sign = () => {
  const [baseimg, setBaseimg] = useState("");
  const navigate = useNavigate();
  const form = {
    fname: "",
    lname: "",
    phone: "",
    about: "",
    email: "",
    password: "",
    img: "",
  };
  const {
    handleBlur,
    handleChange,
    setFieldValue,
    touched,
    errors,
    values,
    handleSubmit,
  } = useFormik({
    initialValues: form,
    validationSchema: signUpSchema,
    onSubmit:  async(values) => {
      let item = JSON.stringify({
        firstname: values.fname,
        lastname: values.lname,
        phoneno: values.phone,
        email: values.email,
        password: values.password,
        about: values.about,
        photo: values.img,
      });
      console.log(values);

      let result = await fetch(
        "https://us-central1-user-management-api-888d4.cloudfunctions.net/app/signup",
        {
          method: "POST",
          body: item,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      result = await result.json();
      console.log(result);
      navigate("/login");
    },
  });

  const upload = async (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseimg(base64);
    setFieldValue("img", baseimg);
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} className="container m-5">
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              First Name
            </label>
            <input
              name="fname"
              onBlur={handleBlur}
              value={values.fname}
              onChange={handleChange}
              type="text"
              className="form-control"
              id="fname"
            />
            {errors.fname && touched.fname ? (
              <p style={{ color: "red" }}>{errors.fname}</p>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Last Name
            </label>
            <input
              name="lname"
              onBlur={handleBlur}
              value={values.lname}
              onChange={handleChange}
              type="text"
              className="form-control"
              id="lname"
            />
            {errors.lname && touched.lname ? (
              <p style={{ color: "red" }}>{errors.lname}</p>
            ) : null}
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              name="email"
              onBlur={handleBlur}
              value={values.email}
              onChange={handleChange}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            {errors.email && touched.email ? (
              <p style={{ color: "red" }}>{errors.email}</p>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Phone Number
            </label>
            <input
              name="phone"
              onBlur={handleBlur}
              value={values.phone}
              onChange={handleChange}
              type="tell"
              className="form-control"
              id="phone"
            />
            {errors.phone && touched.phone ? (
              <p style={{ color: "red" }}>{errors.phone}</p>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              name="password"
              onBlur={handleBlur}
              value={values.password}
              onChange={handleChange}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
            {errors.password && touched.password ? (
              <p style={{ color: "red" }}>{errors.password}</p>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              About
            </label>
            <input
              name="about"
              onBlur={handleBlur}
              value={values.about}
              onChange={handleChange}
              type="text"
              className="form-control"
              id="about"
            />
            {errors.about && touched.about ? (
              <p style={{ color: "red" }}>{errors.about}</p>
            ) : null}
          </div>
          <div className="mb-3">
            <input
              type="file"
              name="img"
              onChange={(e) => {
                upload(e);
              }}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sign;
