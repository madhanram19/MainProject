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
import { BiRightArrowAlt } from 'react-icons/bi'
import { ToastContainer, toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import PatternLock from 'react-pattern-lock'
import { useAdminloginDataMutation } from 'src/appstore_admin/service_admin/apiquery_admin'

const schema = yup.object().shape({
  email: yup.string().required('Email is required!').email('Invalid email'),
  password: yup.string().required('Password is required!'),
})

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [pattern, setPattern] = useState([])
  const [handleAdminlogin] = useAdminloginDataMutation()
  const navigate = useNavigate()
  // console.log(pattern);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  })
  const handlePatternComplete = (value) => {
    setPattern(value)
  }
  const resetPattern = () => {
    setPattern([])
  }

  const onSubmit = async (data) => {
    let admindata = {
      email: data.email,
      password: data.password,
      pattern,
    }
    const response = await handleAdminlogin(admindata)
    // console.log(response.data?.authVerify)

    if (response.error) {
      toast.error(response.error.data.message)
    } else {
      const twoFactorStatus = response.data.authVerify
      let AdminId = response.data.adminId
      let token = response.data.token
      JSON.stringify(localStorage.setItem('token', token))
      JSON.stringify(localStorage.setItem('AdminId', AdminId))

      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      })
      reset()
      resetPattern()
      if (!twoFactorStatus) {
        setTimeout(() => {
          navigate('/twofactor')
        }, 2600)
        return
      }

      setTimeout(() => {
        navigate('/dashboard')
      }, 2600)
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
                    <h2 className="text-primary">Admin-Login</h2>
                    <p className=" text-primary input-group-text">Sign In to your account</p>
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
                    <div className="">
                      <div className="">
                        <label className=" fs-5">Password</label>

                        <div className="input-group">
                          <input
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            {...register('password')}
                            placeholder="Password"
                          />
                          <span
                            className="input-group-text rounded-end-3"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <BsFillShieldFill /> : <BsFillShieldSlashFill />}
                          </span>
                          <div className="invalid-feedback">{errors?.password?.message}</div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group d-grid mt-4">
                      <button type="submit" className="btn btn-primary mr-1">
                        Login <BiRightArrowAlt />
                      </button>
                    </div>
                    <br />
                    <Link to="/passwordmail">Forgot password</Link>&nbsp;&nbsp;
                    <Link to="/patternmail">Forgot pattern</Link>
                  </form>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 mt-0" style={{ width: '44%' }}>
                <CCardBody className="text-center text-black">
                  <label className="fs-5 text-white ">Unlock your Pattern Lock</label>
                  <PatternLock
                    width={230}
                    pointSize={16}
                    size={3}
                    path={pattern}
                    onChange={(val) => handlePatternComplete(val)}
                    onFinish={() => {}}
                    className="bg-primary ms-3 mt-3 text-center"
                  />
                  <button
                    className="btn btn-input-group btn-primary text-white"
                    type="reset"
                    onClick={() => {
                      reset()
                      resetPattern()
                    }}
                  >
                    Reset <BiRightArrowAlt />
                  </button>
                </CCardBody>
              </CCard>
              <ToastContainer />
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
