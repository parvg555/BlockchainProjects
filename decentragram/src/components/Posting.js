import React, {useState} from 'react'

import './css/Posts.css'
import './css/Post.css'

import Post from './Post'

import sampleImage from '../assets/img/sample.jpg'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Avatar from '@mui/material/Avatar';
import Identicon from 'identicon.js';
import { IconButton } from '@mui/material';


function Posting({
    userid
}) {

    const [postDescription, setPostDescription] = useState("")
    const [uploadedImage, setUploadedImage] = useState()

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
                            var image = URL.createObjectURL(e.target.files[0]);
                            setUploadedImage(image);
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
                <div className='post-button'>
                    POST
                </div>
            </div>
        </div>
    )
}

export default Posting
