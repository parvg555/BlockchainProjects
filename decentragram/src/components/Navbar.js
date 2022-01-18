import React from 'react'

import './css/Navbar.css'

import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';

import Identicon from 'identicon.js';

function Navbar({
    userid,
    setPosting,
    posting
}) {
    return (
        <div className='navbar'>
            <div className='nav-item'
                onClick = {() => {
                    setPosting(!posting);
                }}
            >
                <IconButton color='inherit'>
                    <CameraAltOutlinedIcon
                        fontSize='large'
                    />
                </IconButton>
            </div>
            <div className='nav-item heading'>Decentragram</div>
            <div className='nav-item'>
                <Avatar 
                    variant = {'rounded'}
                    src = {
                        `data:image/png;base64,${new Identicon(`${
                            userid?(userid):('abcdefghijklmnopqrstuvwxyz')
                        }`,420).toString()}`
                    }
                />
            </div>
        </div>
    )
}

export default Navbar
