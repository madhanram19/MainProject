import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetContentQuery } from 'src/appstore_admin/service_admin/apiquery_admin'

const SiteSetting = () => {
  const navigate = useNavigate()
  const { data, isLoading, isError } = useGetContentQuery()
  const contents = data?.data
  console.log(contents)

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <div>
        <h3>Add Content</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/addcontent')}>
          Add Content
        </button>
      </div>
      <div className="mt-5">
        <h2>Contents Table</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Content ID</th>
              <th scope="col">Content</th>
              <th scope="col">Data</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {contents?.map((content, index) => (
              <tr key={content?._id}>
                <td className="serial-no py-3">{index + 1}</td>
                <td className="py-3">{content?._id}</td>
                <td className="py-3">{content?.content}</td>
                <td className="py-3" dangerouslySetInnerHTML={{ __html: content?.editorData }} />
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/ckeditor/${content?._id}`)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default SiteSetting
