import React from 'react'
import DataTable from 'react-data-table-component';
import { useUserregiterDataQuery } from 'src/appstore_admin/service_admin/apiquery_admin';




const columns = [
    {
      id: 1,
      name: "S.NO",
      selector: (row, index) => index + 1,
      reorder: true
    },
    {
      id: 2,
      name: "NAME",
      selector: (row) => row.Name,
      sortable: true,
      reorder: true
    },
    {
      id: 3,
      name: "EMAIL",
      selector: (row) => row.email,
      sortable: true,
      reorder: true
    },
    {
      id: 4,
      name: "REGISTER ON",
      selector: (row) => row.createdAt,
      sortable: true,
      reorder: true
    },
    
  ];



const RegisterList = () => {
const{isLoading, data, isSuccess,isError}=useUserregiterDataQuery()
// console.log(data);

let handleData;
  if (isLoading) {
    handleData = <p>Loading...</p>
  }

if (isSuccess) {
      handleData =
        <DataTable
          title="REGISTER_LIST"
          columns={columns}
          data={data.getAllUser}
          defaultSortFieldId={1}
          pagination
  
        />
    }

  return (
    <div className=' container-fluid'>
      <div className='row'>
        <div className='col-md-12 table table-dark table-striped '>
        {handleData}
        </div>
      </div>
    </div>


    
  )
  
  }
export default RegisterList