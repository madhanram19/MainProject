import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import locked_Img from "../../assets/images/locked_Img.png";
import message from "../../assets/images/message.png";
import { useHandleForgetPasswordMutation } from "../../redux/api";
const Forgetpassword = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email Id is required")
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Enter valid Email")
      .email("Email is invalid")
      .trim(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "all",
  });

  const [handleForgetPassword] = useHandleForgetPasswordMutation();

  // handle verify email
  const handleVerifyOtp = async (userEmail) => {
    try {
      const response = await handleForgetPassword(userEmail);
      console.log(response);
      if (response.error) {
        return toast.error(response.error.data.message);
      }
      const otpCode = response.data.otp.code;
      const getUserID = response.data._id;
      localStorage.setItem("userId", getUserID);
      sessionStorage.setItem("otpCode", otpCode);
      toast.info(`Your OTP ${otpCode}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 10000,
        closeOnClick: true,
      });
      navigate("/securitycode?isForgotPassword=true");
    } catch (error) {
      console.log(error.message);
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
                            Forget Password
                          </div>
                          <form onSubmit={handleSubmit(handleVerifyOtp)}>
                            <div className="form-group formInputs mb-5">
                              <div className="input-group iconinput">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">
                                    <img alt="" src={message} />
                                  </span>
                                </div>
                                <input
                                  name="email"
                                  type="text"
                                  {...register("email")}
                                  className={`form-control ${
                                    errors.email ? "is-invalid" : ""
                                  }`}
                                  placeholder="Enter Your Email Id"
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
                              <div className="text-center mb-4">
                                <button
                                  className="btn btn-primary fs-16 fw-400"
                                  type="submit"
                                >
                                  Send
                                </button>
                              </div>
                            </div>
                          </form>
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

export default Forgetpassword;
