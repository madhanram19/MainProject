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
import message from "../../assets/images/message.png";
import { sendOtp } from "../../utils/users";
import { useRegisterMutation, useSendOtpMutation } from "../../redux/api";

const Registerpage = () => {
    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required(" Name is required")
            .matches(
                /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
                "Name is Should be characters only"
            )
            .trim(),

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

        confirmPassword: Yup.string()
            .required("Confirm Password is required")
            .oneOf([Yup.ref("password"), null], "Passwords must match"),
        acceptTerms: Yup.bool().oneOf([true], "Accept TC & DPG is required"),
    });

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
    const [sendOtp] = useSendOtpMutation();
    async function onSubmit(data) {
        console.log(data);
        sessionStorage.setItem("loggedInCredentials", JSON.stringify(data));
        const response = await sendOtp(data);
        if (!response.error) {
            navigate("/securitycode");
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
                                            <div className="text-center fs-36 fw-700 mb-4">
                                                Register
                                            </div>
                                            <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
                                                <div className="form-group formInputs mb-4">
                                                    <div className="input-group iconinput">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                                <img alt="" src={user} />
                                                            </span>
                                                        </div>
                                                        <input
                                                            name="name"
                                                            type="text"
                                                            {...register("name")}
                                                            className={`form-control ${errors.name ? "is-invalid" : ""
                                                                }`}
                                                            placeholder="Enter Your Name"
                                                        />
                                                        <div
                                                            className="invalid-feedback"
                                                            style={{
                                                                marginLeft: "10%",
                                                                fontFamily: "monospace",
                                                            }}
                                                        >
                                                            {errors.name?.message}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group formInputs mb-4">
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
                                                            className={`form-control ${errors.email ? "is-invalid" : ""
                                                                }`}
                                                            placeholder="Enter Your Email Id"
                                                        />
                                                        <div
                                                            className="invalid-feedback"
                                                            style={{
                                                                marginLeft: "10%",
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
                                                            className={`form-control ${errors.password ? "is-invalid" : ""
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
                                                            className={`form-control ${errors.confirmPassword ? "is-invalid" : ""
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
                                                <div className="mb-5">
                                                    <div className="custom-control custom-checkbox custom-control-inline custom_checkbox">
                                                        <input
                                                            name="acceptTerms"
                                                            type="checkbox"
                                                            {...register("acceptTerms")}
                                                            id="acceptTerms"
                                                            className={`custom-control-input ${errors.acceptTerms ? "is-invalid" : ""
                                                                }`}
                                                        />
                                                        <label
                                                            className="custom-control-label fs-12 fw-300 pt-1 lh-15 text-black"
                                                            for="acceptTerms"
                                                        >
                                                            I agree to our
                                                            <Link
                                                                to="/terms"
                                                                className="d-inline-block text-primary"
                                                            >
                                                                {" "}
                                                                Terms and Conditions
                                                            </Link>
                                                            &nbsp;and&nbsp;
                                                            <Link
                                                                to="/"
                                                                className="d-inline-block text-primary"
                                                            >
                                                                Data Protection Guidelines.
                                                            </Link>
                                                        </label>
                                                        <div
                                                            className="invalid-feedback"
                                                            style={{
                                                                marginLeft: "10%",
                                                                fontFamily: "monospace",
                                                            }}
                                                        >
                                                            {errors.acceptTerms?.message}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-center mb-4">
                                                    <button
                                                        className="btn btn-primary fs-16 fw-400"
                                                        type="submit"
                                                    >
                                                        Register
                                                    </button>
                                                </div>
                                            </form>
                                            <div className="text-gray2 text-center fs-15 fw-600">
                                                Already have an account{" "}
                                                <Link
                                                    to="/"
                                                    className="d-inline-block fw-700 text-primary"
                                                >
                                                    Login
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

export default Registerpage;