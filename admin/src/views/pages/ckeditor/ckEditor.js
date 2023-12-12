import React, { useState, useEffect } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import {
  useGetContentByIDQuery,
  useUpdateContentByIdMutation,
} from 'src/appstore_admin/service_admin/apiquery_admin'

const CkEditor = () => {
  const [content, setContent] = useState(null)
  const navigate = useNavigate()
  const params = useParams()
  // console.log(params.id);
  const [isEditorEmpty, setIsEditorEmpty] = useState(true)
  const { data, isLoading, isError } = useGetContentByIDQuery(params.id)
  const [updateContent] = useUpdateContentByIdMutation()

  const contentForEdit = data?.data.editorData
  // console.log(contentForEdit);

  useEffect(() => {
    if (contentForEdit) {
      setContent(contentForEdit)
    }
  }, [contentForEdit])

  const handleData = (event, editor) => {
    const data = editor.getData()

    // console.log(data)
    setContent(data)
    setIsEditorEmpty(data.length === 0)
  }

  const handleSubmit = async () => {
    const res = await updateContent({ id: params.id, updatedData: content })

    if (!res.error) {
      Swal.fire({
        icon: 'success',
        title: 'Content Updated!',
        text: 'Your content has been updated successfully.',
      }).then(() => {
        navigate('/sitesettings')
      })
    } else {
      toast.error(res.error.data.message)
    }
  }

  return (
    <div id="editor-container">
      {' '}
      <CKEditor
        editor={ClassicEditor}
        data={content}
        style={{ height: '200px' }}
        onChange={handleData}
      />
      <button className="btn btn-primary my-3" onClick={handleSubmit} disabled={isEditorEmpty}>
        Submit
      </button>
    </div>
  )
}

export default CkEditor
