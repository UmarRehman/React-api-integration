import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const form = { login: "", password: "" };
  const navigate = useNavigate();
 
  const { handleChange, handleBlur, values, handleSubmit, touched, errors } =
    useFormik({
      initialValues: form,
      validationSchema: Yup.object({
        login: Yup.string().email().required("Please enter your email"),
        password: Yup.string().min(8).required("Please enter your password"),
      }),
      onSubmit: async (values) => {
        console.log(values);
        let item = JSON.stringify({
          login: values.login,
          password: values.password,
        });
        let result = await fetch(
          "https://us-central1-user-management-api-888d4.cloudfunctions.net/app/login",
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
        navigate("/home");
      },
    });
  return (
    <div className="">
      <form className="container m-5" onSubmit={handleSubmit}>
        <div className="mb-3 ">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            name="login"
            onBlur={handleBlur}
            value={values.login}
            onChange={handleChange}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          {errors.login && touched.login ? (
            <p style={{ color: "red" }}>{errors.login}</p>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            onBlur={handleBlur}
            value={values.password}
            onChange={handleChange}
            name="password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />{" "}
          {errors.password && touched.password ? (
            <p style={{ color: "red" }}>{errors.password}</p>
          ) : null}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
