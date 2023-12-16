import React, { useState } from 'react'
import {
  useGetUsersKycQuery,
  useUpdateAllRecordsInKycMutation,
  useUpdateSingeRecordInKycMutation,
} from 'src/appstore_admin/service_admin/apiquery_admin'
import { ToastContainer, toast } from 'react-toastify'

const VerifyKyc = () => {
  const { data: allRecords, isLoading, isError, refetch } = useGetUsersKycQuery()
  const [updateSingleRecord] = useUpdateSingeRecordInKycMutation()
  const [updateAllRecord] = useUpdateAllRecordsInKycMutation()
  const [input, setInput] = useState({})

  const updateKycDetails = async (data, isApprove, isAll) => {
    const message = input?.[data?.userId]?.[isAll || data?.field] || ''
    try {
      let res
      if (isAll) {
        res = await updateAllRecord({ ...data, message, status: isApprove })
      } else {
        res = await updateSingleRecord({ ...data, message, status: isApprove })
      }
      console.log({ res })
      toast.success(res.data.message)
      refetch()
    } catch (error) {
      console.error(error)
    }
  }

  const updateKyc = (data, isAll) => {
    // disabling button
    const userRecord = allRecords.filter((record) => record?.userId === data?.userId)
    const errorStatus = userRecord?.[0]?.errorStatus
    // for all option, not disabling the button
    const isUpdated = isAll
      ? false
      : errorStatus?.filter((record) => record?.field === data?.field)?.[0]?.isUpdated

    let isApproved
    if (isAll) {
      isApproved = userRecord?.[0]?.kycVerifiy
    } else {
      isApproved = errorStatus?.filter((record) => record?.field === data?.field)?.[0]?.status
    }
    return (
      <>
        <input
          onChange={(e) =>
            setInput({
              ...input,
              [data?.userId]: {
                ...(input?.[data?.userId] || []),
                [data.field || 'all']: e.target.value,
              },
            })
          }
          type="text"
          className="mt-2"
          placeholder="enter rejection detail"
        />
        <button
          disabled={isUpdated && isApproved}
          className="approve mt-2"
          onClick={() => updateKycDetails(data, true, isAll)}
        >
          Approve {isAll ? 'All' : ''}
        </button>{' '}
        <br />
        <button
          disabled={isUpdated && !isApproved}
          className="reject mt-2"
          onClick={() => updateKycDetails(data, false, isAll)}
        >
          Reject {isAll ? 'All' : ''}
        </button>
      </>
    )
  }
  const imgPath = 'http://localhost:4500/'
  return (
    <div className="mt-5">
      <ToastContainer />
      <h2>Verify Users Kyc</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">aadharName</th>
            <th scope="col">aadharNumber</th>
            <th scope="col">selectCountry</th>
            <th scope="col">aadharFront</th>
            <th scope="col">aadharBack</th>
            <th scope="col">Update All</th>
          </tr>
        </thead>
        <tbody>
          {allRecords?.map((data, index) => (
            <tr key={data?.userId}>
              <td>
                {data?.aadharName} {updateKyc({ field: 'aadharName', userId: data?.userId })}
              </td>
              <td>
                {data?.aadharNumber} {updateKyc({ field: 'aadharNumber', userId: data?.userId })}
              </td>
              <td>
                {data?.selectCountry} {updateKyc({ field: 'selectCountry', userId: data?.userId })}
              </td>
              <td>
                <img
                  style={{ width: '120px' }}
                  src={imgPath + data?.aadharFront}
                  alt="aadhar front"
                />{' '}
                {updateKyc({ field: 'aadharFront', userId: data?.userId })}
              </td>
              <td>
                <img
                  style={{ width: '120px' }}
                  src={imgPath + data?.aadharBack}
                  alt="aadhar back"
                />{' '}
                {updateKyc({ field: 'aadharBack', userId: data?.userId })}
              </td>
              <td>{updateKyc(data, 'all')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default VerifyKyc
