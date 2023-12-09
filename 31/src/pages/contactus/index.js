import React from 'react';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import user from '../../assets/images/user.png';
import message from '../../assets/images/message.png';
import phone from '../../assets/images/phone.png';
import CombinedIcon from '../../assets/images/CombinedIcon.png';
import contactus from '../../assets/images/contactus.png';
import { useAddContactDetailsMutation } from '../../redux/api';


const ContactusPage = () => {
    const validationSchema = Yup.object().shape({
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
        selectOption: Yup.string().required('Select Option is required'),
        textArea: Yup.string().required('Text Area is required'),
                
    });
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "all",
    });
    const loggedUserId = localStorage.getItem('loggedUserId')
    const [addContactus] = useAddContactDetailsMutation()
        
    const addcontactDetails = async (contactDetails) => {
        console.log(contactDetails);
        try {
            const addContactResponse = await addContactus({ id: loggedUserId, contactDetails })
            if (addContactResponse.error) {
                return toast.error(addContactResponse.error.data.message)
            }
            toast.success(addContactResponse.data.message)
            reset()

        } catch (error) {
            console.log(error);
        }

    }
    
    return ( 
        <div className="maincontent homepage">
    <div className="pageContent">
                <div className="container mb-5">
            <form onSubmit={handleSubmit(addcontactDetails)}>
            <div className="row justify-content-center">
                <div className="col-lg-12">
                    <div className="fs-36 fw-600 text-color text-center mb-4">Contact Us</div>
                    <div className="row justify-content-center">
                        <div className="col-lg-5">
                            <div className="form-group formInputs mb-4">
                                <div className="input-group iconinput">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <img src={user} alt=''/>
                                        </span>
                                    </div>
                                            <input name="Name"
                                                type="text"
                                                {...register("Name")}
                                                className={`form-control ${errors.Name ? "is-invalid" : ""
                                                    }`} placeholder="Enter Your Name" />
                                            <div
                                                className="invalid-feedback"
                                                style={{ marginLeft: "10%", fontFamily: "monospace" }}
                                            >
                                                {errors.Name?.message}
                                            </div>
                                </div>
                            </div>
                            <div className="form-group formInputs mb-4">
                                <div className="input-group iconinput">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <img src={message} alt='' />
                                        </span>
                                    </div>
                                            <input name="email"
                                                type="text"
                                                {...register("email")}
                                                className={`form-control ${errors.email ? "is-invalid" : ""
                                                    }`} placeholder="Enter Your E-mail" />
                                            <div
                                                className="invalid-feedback"
                                                style={{ marginLeft: "10%", fontFamily: "monospace" }}
                                            >
                                                {errors.email?.message}
                                            </div>
                                </div>
                            </div>
                            <div className="form-group formInputs mb-4">
                                <div className="input-group iconinput">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <img src={phone} alt='' />
                                        </span>
                                    </div>
                                            <input name="Number"
                                                type="text"
                                                {...register("Number")}
                                                className={`form-control ${errors.Number ? "is-invalid" : ""
                                                    }`} placeholder="Enter Your Phone Number" />
                                            <div
                                                className="invalid-feedback"
                                                style={{ marginLeft: "10%", fontFamily: "monospace" }}
                                            >
                                                {errors.Number?.message}
                                            </div>
                                </div>
                            </div>
                            <div className="form-group formInputs mb-4">
                                <div className="input-group iconinput">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <img src={CombinedIcon} alt='' />
                                        </span>
                                    </div>
                                            <select className={`form-control py-0 ${errors.selectOption ? 'is-invalid' : ''
                                                }`}
                                                type="text"
                                                name="selectOption"
                                                {...register('selectOption')} placeholder="Select Subject">
                                        <option>Select Option</option>
                                        <option>Select Option 01</option>
                                        <option>Select Option 02</option>
                                        <option>Select Option 03</option>
                                            </select>
                                            <div className="invalid-feedback" style={{ marginLeft: '12%', fontFamily: "revert" }}>{errors.selectOption?.message}</div>
                                </div>
                            </div>
                            <div className="form-group formInputs mb-4">
                                        <textarea name="textArea" type="text"{...register('textArea')} className={`form-control ${errors.textArea ? 'is-invalid' : ''}`} rows="5" placeholder="Write Messsage" style={{ borderRadius: "20px" }}></textarea>
                                        <div className="invalid-feedback" style={{ marginLeft: '12%', fontFamily: "revert" }}>{errors.textArea?.message}</div>
                            </div>
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </div>
                        <div className="col-lg-4 offset-lg-1">
                            <div>
                                <img src={contactus} className="img-fluid" />
                            </div> 
                        </div>
                    </div>
                </div>
                        </div>
                    </form>
        </div>
    </div>
</div>
     );
}
 
export default ContactusPage;