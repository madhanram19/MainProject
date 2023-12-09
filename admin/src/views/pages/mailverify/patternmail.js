import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useForm } from 'react-hook-form'
import { BiRightArrowAlt } from "react-icons/bi"
import { ToastContainer, toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForgetPasswordVerifymailMutation } from 'src/appstore_admin/service_admin/apiquery_admin'




const schema = yup.object().shape({
  email: yup.string().required('Email is required!').email('Invalid email'),
  
})

const Passwordmail = () => {
    const [verifyEmail]=useForgetPasswordVerifymailMutation()
    const navigate=useNavigate()
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  })
  ;

  const onSubmit = async(data) => {
    try {
        const response = await verifyEmail(data)
        console.log(response);
        if (response.error) {
            return toast.error(response.error.data.message, {
                position: toast.POSITION.TOP_CENTER,autoClose:false
            })
        }
        const twoFactorStatus = response.data.adminData.authVerify
        const adminId = await response.data.adminData._id
            localStorage.setItem("AdminId", adminId)
        if (!twoFactorStatus) {
           localStorage.setItem("forgotpattern","true")
           toast.warning('please complete two factor authentication')
           setTimeout(() => {
             navigate('/twofactor')
           }, 2500);
            return
        }
        navigate('/forgetPatternAuthCodeVerify')

    } catch (error) {
        console.log(error.message);
    }
}


  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className='text-primary'>Admin-Login Mail Verify</h2>
                    <p className=" text-primary input-group-text">Sign In to your account-mail verify</p>
                    <div className="form-row  ">
                      <div className="form-group col">
                        <label className="fs-5">Email</label>
                        <input
                          name="email"
                          type="text"
                          placeholder="you@mail.com"
                          {...register('email')}
                          className={`form-control  mb-3 ${errors.email ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.email?.message}</div>
                      </div>
                    </div>
                    <div className="form-group d-grid mt-4">
                      <button type="submit" className="btn btn-primary mr-1">
                       Submit<BiRightArrowAlt />
                      </button>
                    </div>
                    
                  </form>
                </CCardBody>
              </CCard>
              <ToastContainer/>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Passwordmail