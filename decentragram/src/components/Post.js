import React from 'react'

import './css/Post.css'

import Avatar from '@mui/material/Avatar';

import Identicon from 'identicon.js';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { IconButton } from '@mui/material';

import Web3 from 'web3';

function Post({
    user,
    userid,
    postid,
    likes,
    description,
    imgHash,
    decentragram
}) {

    const likePost = () => {
        const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
        decentragram.methods.likePost(
            postid
        ).send({
            from:user,
            value: web3.utils.toWei('0.0','Ether')
        }).on('transactionHash', (hash) => {
           alert("POST LIKED");
        })
    }

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
                    @{userid}
                </div>
            </div>
            {/* PHOTO SECTION */}
            <div className='photo'>
                <img src={`https://ipfs.infura.io/ipfs/${imgHash}`} alt="" />
            </div>
            {/* LIKE DONATION SECTION */}
            <div className="like">
                <IconButton 
                    onClick = {() => {
                        likePost();
                    }}
                >
                    <FavoriteBorderIcon
                        fontSize='large'
                    />
                </IconButton>
                <div className="post-likes">
                    {likes}
                </div>
                <div className="description">
                    {description}
                </div>
            </div>
        </div>
    )
}

export default Post
