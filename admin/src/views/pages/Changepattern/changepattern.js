import React from 'react'
// import { useNavigate } from 'react-router-dom'
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
import { ToastContainer, toast } from 'react-toastify';
import PatternLock from 'react-pattern-lock'
import { useNewPatternMutation, useOldPatternMutation } from 'src/appstore_admin/service_admin/apiquery_admin'
import { useNavigate } from 'react-router-dom'



const Changepattern = () => {
 
  const [oldpattern, setoldPattern] = useState([])
  const [newpattern, setnewpattern]=useState([])
  const [confirmpattern, setconfirmpattern]=useState([])
  const adminId=localStorage.getItem('AdminId')
  const [sendOldPattern]=useOldPatternMutation()
  const [sendNewPattern]=useNewPatternMutation()
  const [status, setStatus] = useState(false)
  const navigate=useNavigate()
  
  
  const handlePatternComplete = (value) => {
    setoldPattern(value)
  }
  const handlenewpatterncomplete=(value)=>{
    setnewpattern(value)
  }
  const handleconfirmnewpattern=(value)=>{
    setconfirmpattern(value)
  }
  const oldresetPattern = () => {
    setoldPattern([]);
  };
  const newresetPattern = () => {
    setnewpattern([]);
  };
  const confirmnewresetPattern = () => {
    setconfirmpattern([]);
  };

  const SubmitOldPattern = async () => {
    const response = await sendOldPattern({ oldpattern, adminId })
    console.log(response);
    if (response.error) {
        toast.error(response.error.data.message, {
            position: toast.POSITION.TOP_CENTER,
        });
    }
    else {
        toast.success(response.data.message, {
            position: toast.POSITION.TOP_CENTER,
        });
        setStatus(!status)
    }  
}

const handlenewPattern = async () => {

    try {
        if (newpattern.length !== confirmpattern.length) {
            return toast.error('Pattern is MisMatching')
        }
        for (let i = 0; i < newpattern.length; i++) {
            if (newpattern[i] !== confirmpattern[i]) {
                return toast.error('Pattern is Wrong')
            }
        }
        const response = await sendNewPattern({ newpattern, adminId})
        console.log(response)
        if (response.error) {
            toast.error(response.error.data.message, {
                position: toast.POSITION.TOP_CENTER,
            });
        }
        else {

            toast.success(response.data.message, {
                position: toast.POSITION.TOP_CENTER,
            });
            confirmnewresetPattern("")
            newresetPattern ("")
            oldresetPattern('')
            setStatus(!status)
            setTimeout(() => {
                navigate('/dashboard')
            },2300);
            

        }
    } catch (error) {
        console.log(error.message)
    }
}


 
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
          <h2 className=' text-primary'>Change pattern</h2>
            <CCardGroup>
             
            {
                !status ? <>
                <CCard className="text-white bg-primary py-5 mt-0 " style={{ width: '44%' }}>
                    <div className=' row'>
                        <div className=' col-6 mx-auto'>
                        <CCardBody className="text-black">
                  <label className="fs-5 text-white text-center ms-5 "> your Old Pattern Lock</label>
                  <PatternLock
                    width={250}
                    pointSize={20}
                    size={3}
                    path={oldpattern}
                    onChange={(val) => handlePatternComplete(val)}
                    onFinish={() => {
                    
                    }}
                    className="bg-primary ms-3 mt-3 text-center"
                  />
                  
                </CCardBody>
                        </div>
                    </div>
                
              </CCard>
              <div className=' input-group d-flex justify-content-center btn '>
                   <button className='btn btn-outline-primary btn-lg text-primary' onClick={() => SubmitOldPattern()}>Submit</button>
                  <button className='btn btn-outline-primary btn-lg text-primary' type='reset' onClick={()=>oldresetPattern()} >Reset </button>
                  </div>
                </>:<>
                <CCard className="text-white bg-primary py-5 mt-0 d-flex justify-content-center" style={{ width: '44%' }}>
                <CCardBody className="text-center text-black ">
                  <label className="fs-5 text-white  "> your New Pattern Lock</label>
                  <PatternLock
                    width={230}
                    pointSize={16}
                    size={3}
                    path={newpattern}
                    onChange={(val) => handlenewpatterncomplete(val)}
                    onFinish={() => {
                    
                    }}
                    className="bg-primary ms-3 mt-3 text-center"
                  />
                  
                </CCardBody>
              </CCard>


              <CCard className="text-white bg-primary py-5 mt-0" style={{ width: '44%' }}>
                <CCardBody className="text-center text-black">
                  <label className="fs-5 text-white ">confirm new Pattern Lock</label>
                  <PatternLock
                    width={230}
                    pointSize={16}
                    size={3}
                    path={confirmpattern}
                    onChange={(val) => handleconfirmnewpattern(val)}
                    onFinish={() => {
                    
                    }}
                    className="bg-primary ms-3 mt-3 text-center"
                  />
                </CCardBody>
              </CCard>  
              <div className=' input-group d-flex justify-content-center btn '>
              <button className='btn btn-outline-primary btn-lg text-primary' type='reset' onClick={()=>{newresetPattern();confirmnewresetPattern();} }>Reset </button>
              <button className='btn btn-outline-primary text-primary btn-lg' onClick={() => handlenewPattern()}>submit</button>
                </div> 
                </>
            }

             
              <ToastContainer/>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Changepattern