import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import locked_Img from "../../assets/images/locked_Img.png";
import lock from "../../assets/images/lock.png";
import { useSetNewPasswordMutation } from "../../redux/api";

// import message from '../../assets/images/message.png'

const Resetpassword = () => {
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      )
      .trim(),

    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
  const navigate = useNavigate();
  // functions to build form returned by useForm() hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "all",
  });
  const [Newpassword] = useSetNewPasswordMutation();
  const user = localStorage.getItem("userId");

  const setPassword = async (data) => {
    console.log(data);
    try {
      const Response = await Newpassword({ id: user, password: data.password });
      if (Response.error) {
        const errorMessage = Response.error.data.message;
        toast.error(errorMessage);
      } else {
        toast.success(Response.data.message);
        localStorage.removeItem("userId");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="maincontent">
      <div className="pageContent">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="card mycard">
                <div className="card-body p-md-5 p-3">
                  <div className="row justify-content-center align-items-center">
                    <div className="col-lg-6 col-md-8 col-sm-10">
                      <div className="row justify-content-center">
                        <div className="col-lg-10">
                          <div className="text-left fs-36 fw-600 mb-4">
                            Reset Password
                          </div>
                          <form
                            onSubmit={handleSubmit(setPassword)}
                            onReset={reset}
                          >
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
                                    marginLeft: "10%",
                                    fontFamily: "monospace",
                                  }}
                                >
                                  {errors.password?.message}
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
                                  name="confirmPassword"
                                  type="password"
                                  {...register("confirmPassword")}
                                  className={`form-control ${
                                    errors.confirmPassword ? "is-invalid" : ""
                                  }`}
                                  placeholder="Enter Your Confirm Password"
                                />
                                <div
                                  className="invalid-feedback"
                                  style={{
                                    marginLeft: "10%",
                                    fontFamily: "monospace",
                                  }}
                                >
                                  {errors.confirmPassword?.message}
                                </div>
                              </div>
                            </div>
                            <div className="text-center mb-4">
                              <button
                                className="btn btn-primary fs-16 fw-400"
                                type="submit"
                              >
                                Send
                              </button>
                            </div>
                          </form>

                          {/* <div className="form-group formInputs mb-5">
                                                                    <div className="input-group iconinput">
                                                                        <div className="input-group-prepend">
                                                                            <span className="input-group-text">
                                                                                <img alt="" src={message} />
                                                                            </span>
                                                                        </div>
                                                                        <input className="form-control py-0" type="text" name="" placeholder="Enter Your Email Id" />
                                                                    </div>
                                                            </div> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 text-center d-none d-lg-block">
                      <img alt="" src={locked_Img} className="img-fluid" />
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

export default Resetpassword;
