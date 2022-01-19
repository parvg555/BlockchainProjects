import React, {useState} from 'react'

import './css/Posts.css'
import './css/Post.css'

import Avatar from '@mui/material/Avatar';
import Identicon from 'identicon.js';

import IPFSclient from './IpfsClient';


function Posting({
    userid,
    decentragram
}) {

    const [postDescription, setPostDescription] = useState("")
    const [uploadedImage, setUploadedImage] = useState()
    const [imageBuffer, setImageBuffer] = useState()
    const [loading, setLoading] = useState(false);

    const captureFile = (e) => {
        e.preventDefault()
        var image = URL.createObjectURL(e.target.files[0]);
        const file = e.target.files[0]
        setUploadedImage(image);
        const reader = new FileReader();
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
            setImageBuffer(reader.result);
        }
    }


    const uploadPost = async(e) => {
        e.preventDefault();
        try{
            const created = await IPFSclient.add(imageBuffer);
            decentragram.methods.uploadPost(
                created.path,
                postDescription
            ).send({
                from:userid
            }).on('transactionHash', (hash) => {
                setLoading(false);
                setPostDescription("");
                setImageBuffer();
                setUploadedImage();
            })
        }catch(error){
            alert(error);
            setLoading(false);
        }
    }

    return (
        <div className='posts'>
            <div className='post'>
                {/* USER SECTION */}
                <div className='user'>
                    <Avatar 
                        variant = {'rounded'}
                        src = {
                            `data:image/png;base64,${new Identicon(`${
                                userid?(userid):('abcdefghijklmnopqrstuvwxyz')
                            }`,420).toString()}`
                        }
                    />
                    <div className="post-username">
                        @{userid}
                    </div>
                </div>
                {/* PHOTO SECTION */}
                <div className='photo'>
                    <input 
                        className='select-image'
                        type="file"
                        accept='.jpg,.jpeg,.png'
                        onChange={(e) => {
                            captureFile(e);
                        }}
                    />
                    {uploadedImage?(
                        <img src={
                            uploadedImage
                        } alt="" />
                    ):('')}
                    
                </div>
                {/* LIKE DONATION SECTION */}
                <div className="like">
                    <input
                        value={postDescription}
                        onChange={(e) => {
                            setPostDescription(e.target.value)
                        }}
                        name="description" 
                        id="" 
                        placeholder='Description'
                    />
                </div>
                <div 
                    className='post-button'
                    onClick={async(e) => {
                        setLoading(true);
                        await uploadPost(e);
                    }}
                >
                    POST
                </div>
            </div>
            {loading?('posting...'):('')}
        </div>
    )
}

export default Posting
