import React, { useState, useEffect } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import {
  useGetContentByIDQuery,
  useGetContentQuery,
  useUpdateContentByIdMutation,
} from 'src/appstore_admin/service_admin/apiquery_admin'

const CkEditor = () => {
  const navigate = useNavigate()
  const [isEditorEmpty, setIsEditorEmpty] = useState(true)
  const [content, setContent] = useState('')
  const { data, isLoading, isError } = useGetContentQuery()
  const [updateContent] = useUpdateContentByIdMutation()

  // right now, assumed it always has one document at a time
  // if needed, use getContentById api and change it accordingly if multiple documents needed
  const contentForEdit = data?.data?.[0].editorData

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
    const res = await updateContent({ id: data?.data?.[0]?._id, updatedData: content })

    if (!res.error) {
      Swal.fire({
        icon: 'success',
        title: 'Content Updated!',
        text: 'Your content has been updated successfully.',
      }).then(() => {
        // navigate('/sitesettings')
      })
    } else {
      toast.error(res.error.data.message)
    }
  }

  console.log({ data })
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
