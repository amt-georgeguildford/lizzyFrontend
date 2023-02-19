import React, { useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import config from '../../../config/config'
import accessSavedToken from '../../../utlis/accessSavedToken'
import Admin from '../Admin'

const Upload = () => {
    const [file, setFile] = useState <File | null>(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const {id}= useParams()
    const handleSubmit= (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
       let formData= new FormData()
       console.log(description)
       formData.append('title',title);
       formData.append('description',description)
       formData.append('file', file!)
       const uploadFileFunc= async ()=>{
        const token= accessSavedToken()
        const uploadFile= await fetch(`${config.adminDataLink}/${id}/dataEntry?accessToken=${token.accessToken}&refreshToken=${token.refreshToken}`,{
            method: 'POST',
            body: formData
        })
        const response = await uploadFile.json()
        const status= uploadFile.status
        if(status==201){
            alert('Upload Succesful')
        }
        else{
            alert(response.message)
        }
        setTitle('')
        setDescription('')
        setFile(null)
       }
       uploadFileFunc()
    }
  return (
    <Admin>
        <div className="view">
                <span className="page-view">UPLOAD</span>
                <span className="active-page">Files</span>
        </div>
        <div className="upload-content">
            <form action="" encType="multipart/form" onSubmit={handleSubmit}>
                <div className="file-select">
                    <input type="file" name="file" id="file" onChange={({target})=>setFile(target.files![0])} accept='image/*, .pdf,.doc,.docx,.ppt,.pptx,.txt,.xls,.xlsx'/>
                    <div className="file-upload-info">
                        <span className='icon'><FaCloudUploadAlt /></span>
                        <p>Select a file to upload</p>
                        <small>or drag and drop it here</small>
                    </div>
                </div>
                <div className="file-upload-content">
                    <div className="input-wrapper">
                        <label htmlFor="title">Title</label><br />
                        <input type="text" id= 'title' value={title} onChange={({target})=>setTitle(target.value)}/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="description">Description</label>
                        <div className="textarea">
                            <textarea name="" id="description" cols={30} rows={5} placeholder= 'Describe the file' onChange={({target})=>setDescription(target.value)} value={description}></textarea>
                        </div>
                    </div>

                    <button className="btn green-btn submit-btn">Submit</button>
                </div>
            </form>
        </div>
    </Admin>
  )
}

export default Upload