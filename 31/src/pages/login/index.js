import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import user from "../../assets/images/user.png";
import lock from "../../assets/images/lock.png";
import login_bg from "../../assets/images/login_bg.png";
import { loginUser } from "../../utils/users";
import { useLoginMutation } from "../../redux/api";
import { toast } from "react-toastify";
const Loginpage = () => {
  const myStyle = {
    borderLeft: "1px solid",
    paddingLeft: "10px",
  };
  // form validation rules
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Enter valid Email")
      .email("Email is invalid")
      .trim(),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      )
      .trim(),
  });

  // functions to build form returned by useForm() hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "all",
  });
  const [dates] = useLoginMutation();
  async function onSubmit(data) {
    // loginUser({ ...data }, () => navigate("/profile"));
    const Logindata = await dates(data);
    console.log(Logindata);
    localStorage.setItem("accessToken", Logindata?.data?.accessToken);
    localStorage.setItem("refreshToken", Logindata?.data?.refreshToken);
    localStorage.setItem("loggedUserId", Logindata?.data?.id);
    if (Logindata.error) {
      toast.error("Invalid User");
    } else {
      toast.success("login successfully");
      navigate("/security");
    }
  }

  return (
    <div className="maincontent">
      <div className="pageContent">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="card mycard">
                <div className="card-body p-md-5 p-3">
                  <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8 col-sm-10">
                      <div className="text-center fs-36 fw-700 mb-4">Login</div>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group formInputs mb-4">
                          <div className="input-group iconinput">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <img alt="" src={user} />
                              </span>
                            </div>
                            <input
                              name="email"
                              type="text"
                              {...register("email")}
                              className={`form-control ${
                                errors.email ? "is-invalid" : ""
                              }`}
                              placeholder="Enter Your Email ID"
                            />
                            <div
                              className="invalid-feedback"
                              style={{
                                marginLeft: "12%",
                                fontFamily: "monospace",
                              }}
                            >
                              {errors.email?.message}
                            </div>
                          </div>
                        </div>
                        <div className="form-group formInputs mb-4">
                          <div className="input-group iconinput">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <img alt="" src={lock} />
                              </span>
                            </div>
                            <input
                              name="password"
                              type="password"
                              {...register("password")}
                              className={`form-control ${
                                errors.password ? "is-invalid" : ""
                              }`}
                              placeholder="Enter Your Password"
                            />
                            <div
                              className="invalid-feedback"
                              style={{
                                marginLeft: "12%",
                                fontFamily: "monospace",
                              }}
                            >
                              {errors.password?.message}
                            </div>
                          </div>
                        </div>
                        <div className="mb-5">
                          <div className="custom-control custom-checkbox custom-control-inline custom_checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck"
                              name="example1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck"
                            >
                              Remember me
                            </label>
                          </div>
                          <Link
                            to="/forgetpassword"
                            className="d-inline-block text-gray2"
                            style={myStyle}
                          >
                            Forgot password ?
                          </Link>
                        </div>
                        <div className="text-center mb-4">
                          <button
                            className="btn btn-primary fs-16 fw-400"
                            type="submit"
                          >
                            Login
                          </button>
                        </div>
                      </form>
                      <div className="text-gray2 text-center fs-15 fw-600">
                        Not a member ?{" "}
                        <Link
                          to="/register"
                          className="d-inline-block fw-700 text-primary"
                        >
                          Create Account
                        </Link>
                      </div>
                    </div>
                    <div className="col-lg-6 text-center d-none d-lg-block">
                      <img alt="" src={login_bg} className="img-fluid" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
