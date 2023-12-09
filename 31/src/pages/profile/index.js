import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userImg from "../../assets/images/userImg.png";
import camera from "../../assets/images/camera.png";
import user from "../../assets/images/user.png";
import message from "../../assets/images/message.png";
import phone from "../../assets/images/phone.png";
import calendar from "../../assets/images/calendar.png";
import location from "../../assets/images/location.png";
import globallocate from "../../assets/images/global-locate.png";
import lock from "../../assets/images/lock.png";
// import ChangePassword from '../changePassword/ChangePassword';
import { getProfileDetail, updateProfileDetail } from "../../utils/users.js";
import { useGetProfileDetailsMutation, useProfileDetailsUpdateMutation, useChangePasswordUpdateMutation } from "../../redux/api.js";
import Changepassword from "./Changepassword.js";


const Profilepage = () => {

  const loggedUserId = localStorage.getItem('loggedUserId')
  // profileUpdate RTK

  const [userProfileUpdate] = useProfileDetailsUpdateMutation()
  const [userProfileDetails] = useGetProfileDetailsMutation()


  // state Handles
  const [dobInfo, setDobInfo] = useState(null)
  const [profileImg, setProfileImg] = useState()


  const validationSchema = Yup.object().shape({
    profileImg: Yup.mixed(),
    Name: Yup.string()
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

    Number: Yup.string()
      .required("Number is required")
      .min(10, "Number should have 10 digits only")
      .max(10, "Number should be in 10 digits")
      .matches(/^[6-9]\d{9}$/, "Enter valid number")
      .trim(),

    DOB: Yup.string()
      .required("DOB is required")
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Enter valid DOB")
      .trim(),


    State: Yup.string()
      .required(" State is required")
      .matches(
        /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
        "State is Should be characters only"
      )
      .trim(),

    City: Yup.string()
      .required(" City is required")
      .matches(
        /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
        "City is Should be characters only"
      )
      .trim(),

    Code: Yup.string()
      .required("Code is required")
      .matches(/^[0-9]{6}$/g, "mobile number should be in numeric value")
      .min(6, "Number should have 6 digits only")
      .max(6, "Number should be in 6 digits")

      .trim(),

    Country: Yup.string()
      .required(" Country is required")
      .matches(
        /^[_A-zA-Z]*((-|\s)*[_A-zA-Z])*$/g,
        "Country is Should be characters only"
      )
      .trim(),

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


  // const updateProfile = () => {
  //   // bind form data and trigger on onSubmit
  //   const payload = {
  //     name: "madhan",
  //     city: "srivilliputtur",
  //     state: "dsf",
  //     zipCode: 123,
  //     country: "sdf",
  //   };
  //   updateProfileDetail(payload, getProfile);
  // };

  const changePassword = () => {
    // bind new password data and trigger on submit
    const payload = {
      password: "srivilliputtur",
    };
    // right now password update also in same api, if needed create another api and also restrict it from update from this api
    updateProfileDetail(payload, getProfile);
  };

  const getProfile = () => {
    getProfileDetail((data) => {
      console.log(data); // bind it to form
    });
  };

  useEffect(() => {
    // getProfile();
    // updateProfile();
    // changePassword();
  }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const profileUpdateReponse = await userProfileDetails({ id: loggedUserId })
        const userData = profileUpdateReponse.data.getUserDetails
        // console.log(userData);
        reset({
          Name: userData.name,
          Number: userData.phoneNo,
          email: userData.email,
          State: userData.state,
          City: userData.city,
          Code: userData.zipCode,
          Country: userData.country,
          DOB: userData.DOB,
        })
        setProfileImg(userData.profileImg)
        // setDobInfo(userData.personalInfo.DOB)
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchUserData()
  }, [dobInfo, profileImg])


  const handleUserDataDetails = async (data) => {
    console.log(data);
    const imageFile = data.profileImg[0]
    console.log(imageFile);
    const formData = new FormData()
    try {
      formData.append("profileImg", imageFile)
      formData.append("Name", data.Name);
      formData.append("email", data.email);
      formData.append("DOB", data.DOB);
      formData.append("country", data.Country);
      formData.append("city", data.City);
      formData.append("state", data.State);
      formData.append("phoneno", data.Number);
      formData.append("zipCode", data.Code);
      formData.append("id", loggedUserId);
      // formData.append('id', loggedUserId)



      const profileUpdateReponse = await userProfileUpdate(formData)
      if (profileUpdateReponse.error) {
        toast.error('Profile Error', {
          position: toast.POSITION.TOP_CENTER
        })
        return
      }
      toast.success(profileUpdateReponse.data.message, {
        position: toast.POSITION.TOP_CENTER
      })
    } catch (error) {

      //toast.error(error.data.message)
      console.error('Error updating item:', error);
      // You can add further error handling logic here, such as displaying an error message to the user.
    }
  };






  return (
    <div className="py-4 pageContent">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="row">
              <div className="col-lg-3">
                <div className="text-center mt-4">
                  <div className="pro_img">
                    <img alt="" src={`http://localhost:4500/${profileImg}`} className="img-fluid" />
                    <input
                      type="file"
                      name="profileImg"
                      id="Profileimg"
                      {...register('profileImg')}
                      className="hiddenInputfile"
                    />
                    <label className="uploadprofile" for="Profileimg">
                      <img alt="" src={camera} />
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="fs-20 fw-700 mb-3">Profile Details</div>
                <form onSubmit={handleSubmit(handleUserDataDetails)}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group formInputs mb-4">
                        <div className="input-group iconinput">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <img alt="" src={user} />
                            </span>
                          </div>
                          <input
                            name="Name"
                            type="text"
                            {...register("Name")}
                            className={`form-control ${errors.Name ? "is-invalid" : ""
                              }`}
                            placeholder="Enter Your Name"
                          />
                          <div
                            className="invalid-feedback"
                            style={{ marginLeft: "10%", fontFamily: "monospace" }}
                          >
                            {errors.Name?.message}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
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
                            placeholder="Enter Your E-mail"
                          />
                          <div
                            className="invalid-feedback"
                            style={{ marginLeft: "10%", fontFamily: "monospace" }}
                          >
                            {errors.email?.message}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group formInputs mb-4">
                        <div className="input-group iconinput">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <img alt="" src={phone} />
                            </span>
                          </div>
                          <input
                            name="Number"
                            type="text"
                            {...register("Number")}
                            className={`form-control ${errors.Number ? "is-invalid" : ""
                              }`}
                            placeholder="Enter Your Phone Number"
                          />
                          <div
                            className="invalid-feedback"
                            style={{ marginLeft: "10%", fontFamily: "monospace" }}
                          >
                            {errors.Number?.message}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group formInputs mb-4">
                        <div className="input-group iconinput">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <img alt="" src={calendar} />
                            </span>
                          </div>
                          <input
                            name="DOB"
                            type="date"
                            {...register("DOB")}
                            className={`form-control ${errors.DOB ? "is-invalid" : ""
                              }`}
                            placeholder="Date of Birth"

                          />
                          <div
                            className="invalid-feedback"
                            style={{ marginLeft: "10%", fontFamily: "monospace" }}
                          >
                            {errors.DOB?.message}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group formInputs mb-4">
                        <div className="input-group iconinput">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <img alt="" src={location} />
                            </span>
                          </div>
                          <input
                            name="State"
                            type="text"
                            {...register("State")}
                            className={`form-control ${errors.State ? "is-invalid" : ""
                              }`}
                            placeholder="Enter Your State"
                          />
                          <div
                            className="invalid-feedback"
                            style={{ marginLeft: "10%", fontFamily: "monospace" }}
                          >
                            {errors.State?.message}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group formInputs mb-4">
                        <div className="input-group iconinput">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <img alt="" src={location} />
                            </span>
                          </div>
                          <input
                            name="City"
                            type="text"
                            {...register("City")}
                            className={`form-control ${errors.City ? "is-invalid" : ""
                              }`}
                            placeholder="Enter Your City"
                          />
                          <div
                            className="invalid-feedback"
                            style={{ marginLeft: "10%", fontFamily: "monospace" }}
                          >
                            {errors.City?.message}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group formInputs mb-4">
                        <div className="input-group iconinput">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <img alt="" src={location} />
                            </span>
                          </div>
                          <input
                            name="Code"
                            type="text"
                            {...register("Code")}
                            className={`form-control ${errors.Code ? "is-invalid" : ""
                              }`}
                            placeholder="Enter Your Zip Code"
                          />
                          <div
                            className="invalid-feedback"
                            style={{ marginLeft: "10%", fontFamily: "monospace" }}
                          >
                            {errors.Code?.message}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group formInputs mb-4">
                        <div className="input-group iconinput">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <img alt="" src={globallocate} />
                            </span>
                          </div>
                          <input
                            name="Country"
                            type="text"
                            {...register("Country")}
                            className={`form-control ${errors.Country ? "is-invalid" : ""
                              }`}
                            placeholder="Enter Your Country"
                          />
                          <div
                            className="invalid-feedback"
                            style={{ marginLeft: "10%", fontFamily: "monospace" }}
                          >
                            {errors.Country?.message}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-12">
                      <button className="btn btn-primary" type="Submit">
                        Submit
                      </button>
                      <button
                        className="btn btn-outline-primary fs-16 fw-600 ml-3"
                        type="submit"
                      >
                        Reset
                      </button>
                    </div>

                  </div>
                </form>


                <Changepassword />

                <div className="fs-20 fw-700 mb-3">Notification Settings</div>
                <div className="row">
                  <div className="col-12">
                    <div className="d-flex mb-2">
                      <div className="mr-auto">
                        <label className="fs-16 fw-400" for="Emailswitch">
                          Email Notification
                        </label>
                      </div>
                      <div className="custom-control custom-switch">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="Emailswitch"
                        />
                        <label
                          className="custom-control-label"
                          for="Emailswitch"
                        ></label>
                      </div>
                    </div>
                    <div className="d-flex mb-2">
                      <div className="mr-auto">
                        <label className="fs-16 fw-400" for="SMSswitch">
                          SMS Notification
                        </label>
                      </div>
                      <div className="custom-control custom-switch">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="SMSswitch"
                        />
                        <label
                          className="custom-control-label"
                          for="SMSswitch"
                        ></label>
                      </div>
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

export default Profilepage;
