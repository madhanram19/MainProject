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
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsFillShieldFill, BsFillShieldSlashFill } from 'react-icons/bs'
import { BiRightArrowAlt } from "react-icons/bi"
import { ToastContainer, toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { useSetNewPasswordMutation } from 'src/appstore_admin/service_admin/apiquery_admin'


const schema = Yup.object().shape({
  password: Yup.string().required('Password is required').matches(/[A-Z]/, 'Please Give One UpperCase Letter').matches(/[0-9]/, 'Please One Number').matches(/[-!$%^&*()_+|~=`{}[\]:/;<>?,.@#]/, 'Please Give Special Character.. like @#$').trim().min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords does not match').required('Confirm Password is required'),
});


const Changepassword = () => {
 const [setNewPassword]= useSetNewPasswordMutation()
  const [showPassword, setShowPassword] = useState(false)
  const adminId=localStorage.getItem('AdminId')

  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  })


  const onSubmit = async(data) => {
    try {
      const response = await setNewPassword({ password: data.password, id: adminId })
      if (response.error) {
          return toast.error(response.error.data.message, {
              position: toast.POSITION.TOP_CENTER
          })
      }
      toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,autoClose:false
      })
      reset()
      setTimeout(() => {
        navigate('/')
      }, 2900);
  } catch (error) {

      console.log(error.message);
  }
   
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className='text-primary'>Reset password <MdOutlinePublishedWithChanges /></h2>
                    <p className=" text-primary input-group-text">Sign In to your account-Reset password</p>
                    <div className="form-row">
                     
                    </div>
                   
                        <label className=" fs-5"> Password</label>
                        <div className="input-group">
                          <input
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            {...register("password")}
                            placeholder="Password"
                          />
                          <span
                            className="input-group-text rounded-end-3"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <BsFillShieldFill /> : <BsFillShieldSlashFill />}
                          </span>
                          <div className="invalid-feedback">{errors?.password?.message}
                          </div>
                        </div>
                  
                
                    
                        <label className=" fs-5">Confirm New Password</label>
                        <div className="input-group">
                          <input
                            name="confirmPassword"
                            type={showPassword ? 'text' : 'password'}
                            // type='password'
                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                            {...register("confirmPassword")}
                            placeholder="Password"
                          />
                          <span
                            className="input-group-text rounded-end-3"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <BsFillShieldFill /> : <BsFillShieldSlashFill />}
                          </span>
                          <div className="invalid-feedback">{errors?.confirmPassword?.message}</div>
                        </div>
                    
                    <div className="form-group d-grid mt-4">
                      <button type="submit" className="btn btn-primary mr-1">
                       submit <BiRightArrowAlt />
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

export default Changepassword