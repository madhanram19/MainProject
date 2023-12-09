import React, { useEffect, useState } from 'react';
import './bankdetails.scss';
import idcard from '../../assets/images/idcard.png';
import calendar from '../../assets/images/calendar.png';
import DropFileInput from '../../component/drop-file-input/DropFileInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import location from '../../assets/images/location.png';
import edit_blue from '../../assets/images/edit_blue.png';
import delete_blue from '../../assets/images/delete_blue.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFetchKycDataMutation, useKycVerifiedUpdateMutation } from '../../redux/api';
import { MdPendingActions } from "react-icons/md";
// import AddBankAccount from './addBankAccount';
import { FaXmark } from "react-icons/fa6";
import { useFetchBankDetailsMutation } from '../../redux/api';
import bank1 from '../../assets/images/bank1.png';
import bank2 from '../../assets/images/bank2.png';
import AddBankAccount from './addbankdetails';
// schema Validation

const kycSchema = Yup.object().shape({

    selectCountry: Yup.string().required('Country is required'),

    aadharName: Yup.string()
        .required('aadharName is required')
        .min(3, 'Please Enter Valid Name')
        .matches(/[A-Za-z]+/, 'Name should contain only letters')
        .trim(),

    aadharNumber: Yup.string()
        .required('Aadhar Number is required')
        .matches(
            /^[0-9]{16}$/g,
            "Enter valid Aadhar Number"
        )
        .trim(),

    DoB: Yup.string().required('Date of Birth is required'),


    //   aadharFront: Yup.mixed().required('Aadhar front image is required').test(
    //     'fileSize',
    //     'File size is too large (max 5MB)',
    //     value => value && value[0] && value[0].size <= 5000000
    // ).test(
    //     'fileFormat',
    //     'Unsupported file format',
    //     value => value && value[0] && ['image/jpeg', 'image/png'].includes(value[0].type)
    // ),
    // aadharBack: Yup.mixed().required('Aadhar back image is required').test(
    //     'fileSize',
    //     'File size is too large (max 5MB)',
    //     value => value && value[0] && value[0].size <= 5000000
    // ).test(
    //     'fileFormat',
    //     'Unsupported file format',
    //     value => value && value[0] && ['image/jpeg', 'image/png'].includes(value[0].type)
    // ),

});



const BankDetailspage = () => {
    const loggedUserId = localStorage.getItem('loggedUserId')

    const navigate = useNavigate()
    // states
    const [waitingStatus, setWaitingStatus] = useState(false)
    const [bankWaitingStatus, setBankWaitingStatus] = useState(false)
    const [bankverifyStatus, setBankverifyStatus] = useState(false)
    const [kycStatus, setKycStatus] = useState(false)

    const [kycDisplayForm, setKycDisplayForm] = useState(false)
    const [bankDisplayForm, setBankDisplayForm] = useState(false)

    const [aadharFront, setAadharFront] = useState('')
    const [aadharBack, setAadharBack] = useState('')

    // RTK Query
    const [handleKycVerifiy] = useKycVerifiedUpdateMutation()
    const [fetchKycDetails] = useFetchKycDataMutation()
    const [fetchingBankDetails] = useFetchBankDetailsMutation()


    // UseEffect

    useEffect(() => {
        const fetchKycData = async () => {
            try {
                const kycReposne = await fetchKycDetails({ id: loggedUserId })
                console.log(kycReposne);
                const kycDetails = kycReposne.data.kycDetails
                if (kycDetails === null) {
                    setKycDisplayForm(true)
                    return
                }
                setKycStatus(kycDetails.kycVerifiy)
                setWaitingStatus(kycDetails.waitingStatus)

            } catch (error) {
                console.log(error);
            }
        }
        fetchKycData()

        // bankDetails
        const bankDetailsFetch = async () => {
            try {
                const userDetails = await fetchingBankDetails({ id: loggedUserId })
                const bankStatus = userDetails.data.bankDetails
                if (bankStatus === null) {
                    setBankDisplayForm(true)
                    return
                }
                setBankverifyStatus(bankStatus.bankAccountVerified)
                setBankWaitingStatus(bankStatus.waitingStatus)

            } catch (error) {
                console.log(error.message);
            }
        }
        bankDetailsFetch()

    }, [])



    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(kycSchema),
        mode: 'all',
    });



    const frontSideImage = (files) => {
        setAadharFront(files[0])
    }

    const backSideImage = (files) => {
        setAadharBack(files[0])
    }


    const handleKycVerifycation = async (data) => {
        const formData = new FormData()
        formData.append("aadharName", data.aadharName)
        formData.append("aadharNumber", data.aadharNumber)
        formData.append('aadharFront', aadharFront)
        formData.append('aadharBack', aadharBack)
        formData.append('id', loggedUserId)
        formData.append("selectCountry", data.selectCountry)
        try {
            const kycReponse = await handleKycVerifiy(formData)
            if (kycReponse.error) {
                return toast.error(kycReponse.error.data.message, {
                    position: toast.POSITION.TOP_CENTER
                })
            }
            const waitingStatus = kycReponse.data.kycDetails.waitingStatus
            setWaitingStatus(waitingStatus)
            const kycStatus = kycReponse.data.kycDetails.kycVerifiy
            setKycStatus(kycStatus)
            navigate('/profile')
            toast.success(kycReponse.data.message, {
                position: toast.POSITION.TOP_CENTER
            })
        } catch (error) {
            console.log(error)

        }

    }


    return (
        <div className="py-4 pageContent">
            <div className="container-fluid">

                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div>
                            <ul className="steps">
                                <li className="steplevel"><span>ID Proof 1</span></li>
                                <li className="steplevel processing"><span>ID Proof 2</span></li>
                                <li className="steplevel "><span>Bank Details</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                        <div class="row justify-content-center mt-4">
                            <div class="col-lg-9">
                                <form onSubmit={handleSubmit(handleKycVerifycation)}>
                                    <div class="IDproof_sec">
                                        <div class="fs-20 fw-600 mb-3">KYC Verfications
                                        </div>


                                        <div class="row">
                                            <div class="col-lg-4">

                                                <div class="form-inline mb-5">
                                                    <label class="mr-3 text-gray fs-16 fw-400">Select Country</label>
                                            <select
                                                className={`form-control py-0 ${errors.selectCountry ? 'is-invalid' : ''
                                                    }`}
                                                type="text"
                                                name="selectCountry"
                                                {...register('selectCountry')}
                                                class="custom-select" style={{ minWidth: "230px", height: "50px" }}>
                                                <option>India</option>
                                                <option>NEW ZEALAND</option>
                                                <option>ENGLAND</option>
                                                <option>SRI LANKA</option>
                                            </select>
                                            <div className="invalid-feedback ">
                                                <span style={{ margin: "15%" }}>{errors?.selectCountry?.message}</span>
                                            </div>
                                                </div>
                                                <div>
                                                    <div class="fs-18 fw-600 mb-4">Aadhar card</div>
                                                    <div class="form-group formInputs mb-4">
                                                        <div class="input-group iconinput">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text">
                                                                    <img src={idcard} />
                                                                </span>
                                                            </div>
                                                            <input name="aadharName" type="text"{...register('aadharName')} className={`form-control ${errors.aadharName ? 'is-invalid' : ''}`} placeholder="Enter your Name as per your aadhar card" />
                                                            <div className="invalid-feedback" style={{ marginLeft: '10%', fontFamily: "monospace" }}>{errors.aadharName?.message}</div>
                                                        </div>
                                                    </div>
                                                    <div class="form-group formInputs mb-4">
                                                        <div class="input-group iconinput">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text">
                                                                    <img src={idcard} />
                                                                </span>
                                                            </div>
                                                            <input name="aadharNumber" type="text"{...register('aadharNumber')} className={`form-control ${errors.aadharNumber ? 'is-invalid' : ''}`} placeholder="Enter your aadhar card Number" />
                                                            <div className="invalid-feedback" style={{ marginLeft: '10%', fontFamily: "monospace" }}>{errors.aadharNumber?.message}</div>
                                                        </div>
                                                    </div>
                                                    <div class="form-group formInputs mb-4">
                                                        <div class="input-group iconinput">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text">
                                                                    <img src={calendar} />
                                                                </span>
                                                            </div>
                                                            <input name="DoB" type="date"{...register('DoB')} className={`form-control ${errors.DoB ? 'is-invalid' : ''}`} placeholder="Date of Birth" />
                                                            <div className="invalid-feedback" style={{ marginLeft: '10%', fontFamily: "monospace" }}>{errors.DoB?.message}</div>

                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                            <div class="col-lg-8">
                                                <div class="fs-16 fw-600 mb-2">Upload Aadhar Card</div>
                                                <div class="fs-14 fw-400 text-gray mb-4">* Format: JPEG (.jpg or .jpeg) or PNG format, Size: less than 5MB</div>
                                                <div class="card mycard border-radius-20">
                                                    <div class="card-body px-5 pt-4 pb-0">
                                                        <div className='row'>
                                                            <div className='col-md-6'>
                                                                <DropFileInput onFileChange={(files) => frontSideImage(files)} />
                                                            </div>
                                                            <div className='col-md-6'>
                                                                <DropFileInput onFileChange={(files) => backSideImage(files)} />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="text-center fs-14 fw-400 text-gray mb-4">
                                            <span class="text-primary">Note</span>
                                            To change the country later, you can raise a ticket to and ask us to reset your KYC.
                                        </div>
                                        <div class="text-center">
                                            <button class="btn btn-primary" type="submit">Submit</button>
                                        </div>
                                    </div>
                                </form>

                                <div class="bank-details_sec">
                                    <div class="fs-20 fw-600 mb-3">Bank Details</div>

                                    <div class="row">
                                        <div class="col-lg-3">
                                            <div class="card mycard border-radius-20 mb-4">
                                                <div class="card-body">
                                                    <div class="d-flex">
                                                        <div class="">
                                                            <img src={bank1} class="img-w57 mr-3" />
                                                        </div>
                                                        <div>
                                                            <div class="fs-18 fw-700 mb-2">Peter park</div>
                                                            <div class="fs-14 fw-400">1000004350435435</div>
                                                            <div class="fs-14 fw-400">IFSC code  KVB0002342</div>

                                                            <div class="text-green my-2">Verfied</div>
                                                            <button class="btn bg-transparent fs-14 fw-400" type="button"><img src={edit_blue} /> Edit</button>
                                                            <button class="btn bg-transparent fs-14 fw-400" type="button"><img src={delete_blue} /> Delete</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-3">
                                            <div class="card mycard border-radius-20 mb-4">
                                                <div class="card-body">
                                                    <div class="d-flex">
                                                        <div class="">
                                                            <img src={bank2} class="img-w57 mr-3" />
                                                        </div>
                                                        <div>
                                                            <div class="fs-18 fw-700 mb-2">Peter park</div>
                                                            <div class="fs-14 fw-400">1000004350435435</div>
                                                            <div class="fs-14 fw-400">IFSC code  KVB0002342</div>

                                                            <div class="text-warning my-2">Pending</div>
                                                            <button class="btn bg-transparent fs-14 fw-400" type="button"><img src={edit_blue} /> Edit</button>
                                                            <button class="btn bg-transparent fs-14 fw-400" type="button"><img src={delete_blue} /> Delete</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                            
                        </div>

                        {/* bank details  */}


                        {/* bank Details */}

                        <div className="bank-details_sec">
                            <div className="fs-20 fw-600 mb-3">Bank Details
                                <p>
                                    {
                                        bankDisplayForm ?
                                            <span className='small d-inline-block mt-2 ms-2 text-red'>
                                                <FaXmark />Unverified
                                            </span>
                                            :
                                            <>
                                                {
                                                    bankverifyStatus ? ''
                                                        :
                                                        <span className='small d-inline-block mt-2 ms-2 text-primary'>
                                                            <MdPendingActions /> Pending (waiting for apporoved)
                                                        </span>
                                                }
                                            </>

                                    }
                                </p>

                            </div>

                            {/* Bank Details Lisiting */}

                            {
                                bankverifyStatus ?
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="card mycard border-radius-20 mb-4">
                                                <div className="card-body">
                                                    <div className="d-flex">
                                                        <div className="">
                                                                    <img src={bank1} className="img-w57 mr-3" />
                                                        </div>
                                                        <div>
                                                            <div className="fs-18 fw-700 mb-2">Peter park</div>
                                                            <div className="fs-14 fw-400">1000004350435435</div>
                                                            <div className="fs-14 fw-400">IFSC code  KVB0002342</div>

                                                            <div className="text-green my-2">Verfied</div>
                                                            {/* <button className="btn bg-transparent fs-14 fw-400" type="button"><img src={edit_blue} /> Edit</button>
                                                <button className="btn bg-transparent fs-14 fw-400" type="button"><img src={delete_blue} /> Delete</button> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div className="col-lg-6">
                <div className="card mycard border-radius-20 mb-4">
                    <div className="card-body">
                        <div className="d-flex">
                            <div className="">
                                <img src={bank2} className="img-w57 mr-3" />
                            </div>
                            <div>
                                <div className="fs-18 fw-700 mb-2">Peter park</div>
                                <div className="fs-14 fw-400">1000004350435435</div>
                                <div className="fs-14 fw-400">IFSC code  KVB0002342</div>

                                <div className="text-warning my-2">Pending</div>
                                <button className="btn bg-transparent fs-14 fw-400" type="button"><img src={edit_blue} /> Edit</button>
                                <button className="btn bg-transparent fs-14 fw-400" type="button"><img src={delete_blue} /> Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

                                    </div> : ''
                            }


                            {
                                bankWaitingStatus ? '' :
                                    (
                                        <>
                                            <div className="fs-20 fw-600 mb-3">Add Bank Details</div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="card mycard">
                                                        <div className="card-body">
                                                            <AddBankAccount />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                            }

                        </div>


                    </div>
                </div>

                
                </div>
        </div>
        

    );
}

export default BankDetailspage;