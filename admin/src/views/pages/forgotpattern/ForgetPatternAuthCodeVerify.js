import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import otpImg from '../../../assets/images/react.jpg'
import useClipboard from "react-use-clipboard";
import { FaRegCopy } from "react-icons/fa";
import OTPInput, { ResendOTP } from "otp-input-react";
import { useLoginTwoFactorVerifyMutation } from 'src/appstore_admin/service_admin/apiquery_admin';
// schema OTP validation


const ForgetPatternAuthCodeVerify = () => {
    const navigate = useNavigate()
    
    const adminId = localStorage.getItem('AdminId')
    // RTK
    const [loginTwoFactorVerify] = useLoginTwoFactorVerifyMutation()
    const [OTP, setOTP] = useState("");

    // verify Fuction
    const verifyAuthCode = async (e) => {
        e.preventDefault()
        try {
            const response = await loginTwoFactorVerify({ id: adminId, token: OTP })
            // console.log(response);
            if (response.error) {
                return toast.error(response.error.data.message, {
                    position: toast.POSITION.TOP_CENTER
                })
            }
            toast.success(response.data.message, {
                position: toast.POSITION.TOP_CENTER
            })
            setTimeout(() => {
                navigate('/forgotpattern')
            }, 2600);

        } catch (error) {
            console.log(error.message);
        }

    }
    return (

        <>
            <div className='p-5 twoFactor-Bg bg-dark' style={{ minHeight: "100vh" }}>
                <h1 className='text-center mb-5 text-primary' >Security</h1>
                <div className='row'>
                    <div className='col-lg-5'>
                        <form onSubmit={verifyAuthCode}>
                            <div className='mb-5'>
                                <div>
                                    <>
                                        <h5 className='mt-5 mb-3 text-primary'>Enter Your Authetication Key</h5>
                                        <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} />
                                    </>
                                </div>
                                <button className='btn mt-4 btn-primary btn-lg ' type="submit">Verify</button>
                            </div>

                        </form>

                    </div>

                    <div className='col-lg-7'>
                        <img src={otpImg} className='img-fluid' alt="" />
                    </div>
                    <ToastContainer/>
                </div>
            </div>
        </>


    );
}

export default ForgetPatternAuthCodeVerify
