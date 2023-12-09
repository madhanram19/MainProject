import React, { useEffect } from 'react'
import './bankdetails.scss';
import idcard from '../../assets/images/idcard.png';
import calendar from '../../assets/images/calendar.png';
import bank from '../../assets/images/bank.png';
import bank1 from '../../assets/images/bank1.png';
import bank2 from '../../assets/images/bank2.png';
import globallocate from '../../assets/images/global-locate.png';
import user from '../../assets/images/user.png';
import location from '../../assets/images/location.png';
import edit_blue from '../../assets/images/edit_blue.png';
import delete_blue from '../../assets/images/delete_blue.png';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAddBankDetailsMutation } from '../../redux/api';



const bankValidateSchema = Yup.object().shape({

    accountName: Yup.string()
        .required('UserName is required')
        .min(3, 'Please Enter Valid UserName')
        .matches(/[A-Za-z]+/, 'UserName should contain only letters')
        .trim(),

    accountNumber: Yup.string()
        .required('Account number is required')
        .matches(/^[0-9]*$/, 'Characters Not Allowed')
        .min(15, 'Please Enter Valid Account number')
        .trim(),

    IFSCCode: Yup.string()
        .required('IFSC Code is required')
        .matches(/^[A-Za-z]{4}\d{6,7}$/, 'Invalid IFSC Code')
        .trim(),
    selectCountry: Yup.string().required('Country is required'),

    selectBank: Yup.string().required('Bank is required'),

});

const AddBankAccount = () => {

    // local Storage
    const loggedUserId = localStorage.getItem('loggedUserId')

    // RTK bank Details
    const [addBankAccount] = useAddBankDetailsMutation()
    // functions to build the form returned by useForm() hook
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(bankValidateSchema),
        mode: 'all',
    });

    const addBankDetails = async (bankDetails) => {
        console.log(bankDetails);
        const addBankResponse = await addBankAccount({ id: loggedUserId, bankDetails })
    }

    return (
        <form onSubmit={handleSubmit(addBankDetails)}>
            <div class="fs-20 fw-600 mb-3">Add Bank Details</div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="card mycard">
                        <div class="card-body">
                            <div class="row justify-content-center">
                                <div class="col-lg-9">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group formInputs mb-4">
                                                <div class="input-group iconinput">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text">
                                                            <img src={globallocate} />
                                                        </span>
                                                    </div>
                                                    <select className={`form-control py-0 ${errors.selectCountry ? 'is-invalid' : ''
                                                        }`}
                                                        type="text"
                                                        name="selectCountry"
                                                        {...register('selectCountry')} placeholder="Select Your Country">

                                                        <option>INDIA</option>
                                                        <option>NEW ZEALAND</option>
                                                        <option>ENGLAND</option>
                                                        <option>SRI LANKA</option>
                                                    </select>
                                                    <div className="invalid-feedback ">
                                                        <span style={{ margin: "15%" }}>{errors?.selectCountry?.message}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group formInputs mb-4">
                                                <div class="input-group iconinput">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text">
                                                            <img src={bank} />
                                                        </span>
                                                    </div>
                                                    <select className={`form-control py-0 ${errors.selectBank ? 'is-invalid' : ''
                                                        }`} type="text"
                                                        {...register('selectBank')}
                                                        name="selectBank" placeholder="Select You Bank">
                                                        <option>SBI</option>
                                                        <option>ICICI</option>
                                                        <option>CANARA</option>
                                                        <option>BOI</option>
                                                    </select>
                                                    <div className="invalid-feedback ">
                                                        <span style={{ margin: "15%" }}>{errors?.selectBank?.message}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group formInputs mb-4">
                                                <div class="input-group iconinput">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text">
                                                            <img src={user} />
                                                        </span>
                                                    </div>
                                                    <input className={`form-control py-0 ${errors.accountName ? 'is-invalid' : ''
                                                        }`}
                                                        {...register('accountName')}
                                                        type="text"
                                                        name="accountName" placeholder="User Account Name" />
                                                    <div className="invalid-feedback ">
                                                        <span style={{ margin: "15%" }}>{errors?.accountName?.message}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group formInputs mb-4">
                                                <div class="input-group iconinput">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text">
                                                            <img src={user} />
                                                        </span>
                                                    </div>
                                                    <input className={`form-control py-0 ${errors.accountNumber ? 'is-invalid' : ''
                                                        }`}
                                                        type="text"
                                                        {...register('accountNumber')}
                                                        name="accountNumber" placeholder="User Account Number" />
                                                    <div className="invalid-feedback ">
                                                        <span style={{ margin: "10%" }}>{errors?.accountNumber?.message}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group formInputs mb-4">
                                                <div class="input-group iconinput">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text">
                                                            <img src={location} />
                                                        </span>
                                                    </div>
                                                    <input className={`form-control py-0 ${errors.IFSCCode ? 'is-invalid' : ''
                                                        }`}
                                                        type="text"
                                                        name="IFSCCode"
                                                        {...register('IFSCCode')} placeholder="NEFT Code / IFSC Code" />
                                                    <div className="invalid-feedback ">
                                                        <span style={{ margin: "20%" }}>{errors?.IFSCCode?.message}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                            <div class="text-center mt-3">
                                <button class="btn btn-primary" type="submit">Add Bank</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
                        

    );
}  
        

export default AddBankAccount