import { CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import config from '../../config/config'
import accessSavedToken from '../../utlis/accessSavedToken'
import LinkModal from '../modal/LinkModal'
const SendMail = () => {
    const [loading, setLoading]= useState(false)
    const [message, setMessage] = useState('')
    const [emails, setEmails] = useState('')
    const navigate =useNavigate()
    const {id,file_id}= useParams()

    const handleSubmit= (e:React.FormEvent<HTMLFormElement>)=>{
        const token = accessSavedToken()
        const sentEmailFunc= async()=>{
            const sentEmail= await fetch(`${config.userDataLink}/${id}/mails/${file_id}?accessToken=${token.accessToken}&refreshToken=${token.refreshToken}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({message,emails: [emails]})
            })
            const status= sentEmail.status
            const response= await sentEmail.json()
            console.log(response)
            if(status== 201){
                navigate(`/dashboard/users/${id}`)
            }
            
        }
        sentEmailFunc()
    }
  return (
    <>
        <LinkModal backLink={`/dashboard/users/${id}`}>
            <div className="mail-content">
            <div>
                <div className="file-preview"></div>
            </div>
            <div className="mail-entry">
                <form action="" onSubmit={handleSubmit}>
                <label htmlFor="email-collection">To:</label>
                <div className="textarea">
                    <textarea name="" id="email-collection" cols={30} rows={5} onChange={({target})=>setEmails(target.value)} value={emails}></textarea>
                </div>
                    <label htmlFor="message">Additional message (optional): </label>
                <div className="textarea">
                    <textarea name="" id="message" cols={30} rows={5} onChange={({target})=>setMessage(target.value)} value={message}></textarea>
                </div>

                <div className="button-group">
                    <span className="btn close-btn" onClick={()=>{setMessage(''); setEmails(''); navigate(`/dashboard/users/${id}`)}}>Close</span>
                    <button className="btn send-mail-btn">{ loading? <CircularProgress color='inherit' size='10px'/>:'Send'}</button>
                </div>
                </form>
            </div>
            </div>
        </LinkModal>
    </>
  )
}

export default SendMail