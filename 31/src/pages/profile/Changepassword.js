// import React, { useEffect, useState } from "react";

// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import userImg from "../../assets/images/userImg.png";
// import camera from "../../assets/images/camera.png";
// import user from "../../assets/images/user.png";
// import message from "../../assets/images/message.png";
// import phone from "../../assets/images/phone.png";
// import calendar from "../../assets/images/calendar.png";
// import location from "../../assets/images/location.png";
// import globallocate from "../../assets/images/global-locate.png";
// import lock from "../../assets/images/lock.png";
// // import ChangePassword from '../changePassword/ChangePassword';
// import { getProfileDetail, updateProfileDetail } from "../../utils/users.js";
// import { useChangePasswordUpdateMutation } from "../../redux/api.js";

// const Changepassword = () => {

//     const loggedUserId = localStorage.getItem('loggedUserId')

//     const Change = Yup.object().shape({
//         Oldpassword: Yup.string()
//             .required("Oldpassword is required")
//             .min(8, "Password must be at least 8 characters")
//             .matches(
//                 /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//                 "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
//             )
//             .trim(),
//         NewPassword: Yup.string()
//             .required("NewPassword is required")
//             .min(8, "Password must be at least 8 characters")
//             .matches(
//                 /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//                 "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
//             )
//             .trim(),

//         ConfirmPassword: Yup.string()
//             .required("ConfirmPassword is required")
//             .oneOf([Yup.ref("NewPassword"), null], "ConfirmPassword must match"),
//     })
//     const {
//         register: ReEnterRegister,
//         handleSubmit: ReEnterhandleSubmit,
//         reset: ReEnterreset,
//         formState: { errors: ReEntererrors },
//     } = useForm({
//         resolver: yupResolver(Change),
//         mode: "all",
//     });



//     const Rechangepassword = async (data) => {

//         // const loggedUserId = localStorage.getItem('loggedUserId')
//         // const [passwordChange] = useChangePasswordUpdateMutation()

//         // try {
//         //     const passwordResponce = await passwordChange({ id: loggedUserId, userPassword: data })

//         //     if (passwordResponce.error) {
//         //         toast.error(passwordResponce.error.data.message)

//         //     } else {
//         //         ReEnterreset()
//         //         toast.success(passwordResponce.data.message)

//         //     }
//         // } catch (error) {
//         //     console.log(error);
//         // }
//     };

//     return (
//         <div>
//             <form onSubmit={ReEnterhandleSubmit(Rechangepassword)} >
//                 <div className="fs-20 fw-700 mb-3">Change Password</div>
//                 <div className="row">
//                     <div className="col-md-6">
//                         <div className="form-group formInputs mb-4">
//                             <div className="input-group iconinput">
//                                 <div className="input-group-prepend">
//                                     <span className="input-group-text">
//                                         <img alt="" src={lock} />
//                                     </span>
//                                 </div>
//                                 <input
//                                     name="Oldpassword"
//                                     type="password"
//                                     {...ReEnterRegister("Oldpassword")}
//                                     className={`form-control ${ReEntererrors.Oldpassword ? "is-invalid" : ""
//                                         }`}
//                                     placeholder="Enter Your Old Password"
//                                 />
//                                 <div
//                                     className="invalid-feedback"
//                                     style={{ marginLeft: "10%", fontFamily: "monospace" }}
//                                 >
//                                     {ReEntererrors.Oldpassword?.message}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-md-6">
//                         <div className="form-group formInputs mb-4">
//                             <div className="input-group iconinput">
//                                 <div className="input-group-prepend">
//                                     <span className="input-group-text">
//                                         <img alt="" src={lock} />
//                                     </span>
//                                 </div>
//                                 <input
//                                     name="NewPassword"
//                                     type="password"
//                                     {...ReEnterRegister("NewPassword")}
//                                     className={`form-control ${ReEntererrors.NewPassword ? "is-invalid" : ""
//                                         }`}
//                                     placeholder="Enter Your New Password"
//                                 />
//                                 <div
//                                     className="invalid-feedback"
//                                     style={{ marginLeft: "10%", fontFamily: "monospace" }}
//                                 >
//                                     {ReEntererrors.NewPassword?.message}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-md-6">
//                         <div className="form-group formInputs mb-4">
//                             <div className="input-group iconinput">
//                                 <div className="input-group-prepend">
//                                     <span className="input-group-text">
//                                         <img alt="" src={lock} />
//                                     </span>
//                                 </div>
//                                 <input
//                                     name="ConfirmPassword"
//                                     type="password"
//                                     {...ReEnterRegister("ConfirmPassword")}
//                                     className={`form-control ${ReEntererrors.ConfirmPassword ? "is-invalid" : ""
//                                         }`}
//                                     placeholder="Enter Your Confirm Password"
//                                 />
//                                 <div
//                                     className="invalid-feedback"
//                                     style={{ marginLeft: "10%", fontFamily: "monospace" }}
//                                 >
//                                     {ReEntererrors.ConfirmPassword?.message}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="row mb-4">
//                     <div className="col-md-12">
//                         <button className="btn btn-primary" type="Sumbit">
//                             Submit
//                         </button>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default Changepassword

import React, { useState } from 'react'
import lock from '../../assets/images/lock.png';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaLockOpen } from "react-icons/fa";
import { useChangePasswordUpdateMutation } from '../../redux/api';


const schema = Yup.object().shape({
    oldPassword: Yup.string().required('oldPassword is required')
    ,
    newPassword: Yup.string().required('Password is required').matches(/[A-Z]/, 'Please Give One UpperCase Letter').matches(/[0-9]/, 'Please One Number').matches(/[-!$%^&*()_+|~=`{}[\]:/;<>?,.@#]/, 'Please Give Special Character.. like @#$').trim().min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords does not match')
        .required('Confirm Password is required').trim(),

});
const ChangePassword = () => {

    // localStorage
    const loggedUserId = localStorage.getItem('loggedUserId')
    // RTK Query
    const [changePasswordUpdate] = useChangePasswordUpdateMutation()
    // states
    const [oldPassword, setOldPassword] = useState(false)
    const [showPassWord, setShowPassword] = useState(false)
    const [showConfirmPassWord, setShowConfirmPassword] = useState(false)
    // hook-form 
    const { register, handleSubmit,reset,formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'all'

    });

    const handleChangePassword = async (data) => {
        try {
            const changePasswordResponse = await changePasswordUpdate({ id: loggedUserId, userPassword: data })
            if (changePasswordResponse.error) {
                return toast.error(changePasswordResponse.error.data.message, {
                    position: toast.POSITION.TOP_CENTER
                })
            }
            toast.success(changePasswordResponse.data.message, {
                position: toast.POSITION.TOP_CENTER
            })
            reset()
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <>
            <div className="fs-20 fw-700 mb-3">Change Password</div>
            <form onSubmit={handleSubmit(handleChangePassword)}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group formInputs mb-4">
                            <div className="input-group iconinput">
                                <div className="input-group-prepend">
                                    <span onClick={() => setOldPassword(!oldPassword)} className="input-group-text">
                                        {
                                            oldPassword ? <FaLockOpen /> : <img alt="" src={lock} />
                                        }
                                    </span>
                                </div>
                                <input
                                    className={`form-control py-0 ${errors.oldPassword ? 'is-invalid' : ''}`}
                                    type={oldPassword ? 'text' : 'password'}
                                    name="oldPassword"
                                    {...register('oldPassword')}
                                    placeholder="Enter Your Old Password" />
                                <div className="invalid-feedback ">
                                    <span style={{ margin: "13px" }}>{errors?.oldPassword?.message}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group formInputs mb-4">
                            <div className="input-group iconinput">
                                <div className="input-group-prepend">
                                    <span onClick={() => setShowPassword(!showPassWord)} className="input-group-text">
                                        {
                                            showPassWord ? <FaLockOpen /> : <img alt="" src={lock} />
                                        }
                                    </span>
                                </div>
                                <input
                                    className={`form-control  ${errors?.newPassword ? 'is-invalid' : ''}`}
                                    type={showPassWord ? 'text' : 'password'}
                                    name="newPassword"
                                    {...register('newPassword')}
                                    placeholder="Enter Your newPassword" />
                                <div className="invalid-feedback ">
                                    <span style={{ margin: "13px" }}>{errors?.newPassword?.message}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group formInputs mb-4">
                            <div className="input-group iconinput">
                                <div className="input-group-prepend">
                                    <span onClick={() => setShowConfirmPassword(!showConfirmPassWord)} className="input-group-text">
                                        {
                                            showConfirmPassWord ? <FaLockOpen /> : <img alt="" src={lock} />
                                        }
                                    </span>
                                </div>
                                <input
                                    className={`form-control  ${errors?.confirmPassword ? 'is-invalid' : ''}`} type={showConfirmPassWord ? 'text' : 'password'}
                                    {...register('confirmPassword')}
                                    name="confirmPassword"
                                    placeholder="Enter Your Confirm Password" />
                                <div className="invalid-feedback ">
                                    <span style={{ margin: "13px" }}>{errors?.confirmPassword?.message}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-md-12">
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default ChangePassword