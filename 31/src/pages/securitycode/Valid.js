import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import locked_Img from "../../assets/images/locked_Img.png";
import { useHandleForgetPasswordOtpVerifyMutation } from "../../redux/api";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const Securitycode = () => {
    const [otp, setOtp] = useState({});
    // const [registerNewUser] = useRegisterMutation();
    const navigate = useNavigate();
    const user = localStorage.getItem('userId')
    const [verify] = useHandleForgetPasswordOtpVerifyMutation()
    const forgetUser = async (data) => {

        try {
            const verifydata = await verify({ otp: data.code, id: user })
            if (verifydata.error) {
                const errorMessage = verifydata.error.data.message
                toast.error(errorMessage)
                return
            }
            toast.success(verifydata.data.message)
            navigate('/resetpassword')
        } catch (err) {
            console.log(err.message);
        }
    }
    
        
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
                                            <form >
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
                                                        type="submit"
                                                        disabled={Object.values(otp)?.length !== 4}
                                                        onClick={onsubmit}
                                                    >
                                                        Send
                                                    </button>
                                                </div>
                                            </form>

                                            
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