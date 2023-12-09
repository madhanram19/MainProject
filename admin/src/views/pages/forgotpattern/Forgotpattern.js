
import { CCard, CCardBody, CCardGroup, CCol, CContainer, CRow } from '@coreui/react'
import React, { useState } from 'react'
import PatternLock from 'react-pattern-lock/lib/components/PatternLock'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { useSetNewPatternMutation } from 'src/appstore_admin/service_admin/apiquery_admin';

const ForgotPattern = () => {
    const [newpattern, setNewPattern] = useState([])
    const [confirmPattern, setConfirmPattern] = useState([])
    const [forgotPattern] = useSetNewPatternMutation()
    const id = localStorage.getItem('AdminId')
    const navigate = useNavigate()

    const handleNewPatternComplete = (value) => {
        // Do something with the completed pattern (e.g., store it in state)
        setNewPattern(value)
    }
    const handleConfirmPatternComplete = (value) => {
        // Do something with the completed pattern (e.g., store it in state)
        setConfirmPattern(value)
    }
    const resetNewPattern = () => {
        setNewPattern([])
    }
    const resetConfirmPattern = () => {
        setConfirmPattern([])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (newpattern.length !== confirmPattern.length) {
                return toast.error('Pattern is MisMatching')
            }
            for (let i = 0; i < newpattern.length; i++) {
                if (newpattern[i] !== confirmPattern[i]) {
                    return toast.error('Pattern is Wrong')
                }
            }
            const response = await forgotPattern({ newpattern, id })
            if (response.error) {
                // console.log(response.error.data.message);

                toast.error(response.error.data.message, {
                    position: toast.POSITION.TOP_CENTER,
                });

            }
            else {
                // console.log(response.data.status);

                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_CENTER,
                });
                setNewPattern("")
                setConfirmPattern("")
                setTimeout(() => {
                    navigate('/')
                }, 2900);
               

            }
            // console.log(response)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div>
            <CContainer>
                <CRow className="justify-content-center align-items-center vh-100 ">
                    <CCol md={8}>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <CCardGroup>
                                <CCard
                                    className="text-white bg-primary py-5 me-3 rounded-3"
                                    style={{ width: '44%' }}
                                >
                                    <CCardBody className="text-center">
                                        <label className="fs-5">New Pattern</label>
                                        <PatternLock
                                            width={230}
                                            pointSize={10}
                                            size={3}
                                            path={newpattern}
                                            onChange={(val) => handleNewPatternComplete(val)}
                                            onFinish={() => {
                                                // Handle pattern completion if needed
                                            }}
                                            className="bg-primary ms-3 mt-3" // Add your custom clas
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary text-black "
                                            onClick={resetNewPattern}
                                        >
                                            Reset 
                                        </button>
                                    </CCardBody>
                                </CCard>
                                <CCard className="text-white bg-primary py-5 rounded-3" style={{ width: '44%' }}>
                                    <CCardBody className="text-center">
                                        <label className="fs-5"> Confirm Pattern</label>
                                        <PatternLock
                                            width={230}
                                            pointSize={10}
                                            size={3}
                                            path={confirmPattern}
                                            onChange={(val) => handleConfirmPatternComplete(val)}
                                            onFinish={() => {
                                                // Handle pattern completion if needed
                                            }}
                                            className="bg-primary ms-3 mt-3" // Add your custom clas
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary text-black "
                                            onClick={resetConfirmPattern}
                                        >
                                            Reset 
                                        </button>
                                    </CCardBody>
                                </CCard>
                            </CCardGroup>
                            <div className="d-grid mt-3">
                                <button type="submit" className="btn btn-outline-primary text-center">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </CCol>
                    <ToastContainer/>
                </CRow>
            </CContainer>
        </div>
    )
}

export default ForgotPattern
