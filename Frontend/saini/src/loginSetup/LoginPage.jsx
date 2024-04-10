import axios from "axios";
import "../CSS/LoginPage.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const initialValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const onSubmit = (values) => {
    axios
      .post("http://localhost:1212/login", values)
      .then((result) => {
        console.log("successfully login", result.data.token);
        localStorage.setItem("token", result.data.token);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err, "error in login");
      });
  };

  const validate = (values) => {
    let errors = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  console.log(formik);
  return (
    <div className="containerLogin">
      <div className="login">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />

          {formik.errors.email ? <p>{formik.errors.email}</p> : null}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password ? <p>{formik.errors.password}</p> : null}
          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
