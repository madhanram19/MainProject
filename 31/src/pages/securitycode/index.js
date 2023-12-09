import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import locked_Img from "../../assets/images/locked_Img.png";
import { useRegisterMutation } from "../../redux/api";

const Securitycode = () => {
  const [searchParams] = useSearchParams();
  const isForgotPassword = searchParams.get("isForgotPassword");
  const [otp, setOtp] = useState({});
  const [registerNewUser] = useRegisterMutation();
  const navigate = useNavigate();
  const onSubmit = async () => {
    if (isForgotPassword) {
      const otpCode = sessionStorage.getItem("otpCode");
      let otpData = Object.values(otp).join("");
      if (otpData === otpCode) {
        navigate("/resetpassword");
      } else {
        alert("wrong otp");
      }
    } else {
      const cred = sessionStorage.getItem("loggedInCredentials");
      let otpData = Object.values(otp).join("");
      const response = await registerNewUser({
        ...(cred && JSON.parse(cred)),
        otp: otpData,
      });
      if (!response.error) {
        navigate("/");
      }
    }
  };
  const onChange = (key, value) => {
    setOtp({ ...otp, [key]: value });
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
                      <div className="text-center fs-36 fw-600 mb-4">
                        Enter Security Code
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-lg-10">
                          <div className="form-group formInputs row mb-5">
                            <div className="col">
                              <input
                                className="form-control"
                                type="number"
                                maxLength={1}
                                name=""
                                placeholder=" "
                                required
                                onChange={(e) => onChange(1, e.target.value)}
                              />
                            </div>
                            <div className="col">
                              <input
                                className="form-control"
                                type="number"
                                maxLength={1}
                                name=""
                                placeholder=" "
                                required
                                onChange={(e) => onChange(2, e.target.value)}
                              />
                            </div>
                            <div className="col">
                              <input
                                className="form-control"
                                type="number"
                                maxLength={1}
                                name=""
                                placeholder=" "
                                required
                                onChange={(e) => onChange(3, e.target.value)}
                              />
                            </div>
                            <div className="col">
                              <input
                                className="form-control"
                                type="number"
                                maxLength={1}
                                name=""
                                placeholder=" "
                                required
                                onChange={(e) => onChange(4, e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-center mb-4">
                        <button
                          className="btn btn-primary fs-16 fw-400"
                          type="button"
                          disabled={Object.values(otp)?.length !== 4}
                          onClick={onSubmit}
                        >
                          Send
                        </button>
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

export default Securitycode;
