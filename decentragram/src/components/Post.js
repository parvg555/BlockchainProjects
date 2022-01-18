import React from 'react'

import './css/Post.css'

import Avatar from '@mui/material/Avatar';

import Identicon from 'identicon.js';

import sampleImage from '../assets/img/sample.jpg'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';

function Post({userid}) {
    return (
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
                    @asduasdjansjkdnakjsdn
                </div>
            </div>
            {/* PHOTO SECTION */}
            <div className='photo'>
                <img src={sampleImage} alt="" />
            </div>
            {/* LIKE DONATION SECTION */}
            <div className="like">
                <IconButton>
                    <FavoriteBorderIcon
                        fontSize='large'
                    />
                </IconButton>
                <div className="post-likes">
                    12121
                </div>
                <div className="description">
                    Hello, this is a caption
                </div>
            </div>
        </div>
    )
}

export default Post
