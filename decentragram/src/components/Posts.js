import React from 'react'

import './css/Posts.css'

import Post from './Post'

function Posts({
    user,
    posts,
    postCount,
    decentragram
}) {
    return (
        <div className='posts'>
            {/* <div>TOTAL POSTS: {postCount}</div> */}
            {
                posts.map((item,i) => (
                    <Post 
                        user = {user}
                        userid={item.author}
                        likes = {item.likes}
                        description={item.description}
                        imgHash={item.hash}
                        decentragram = {decentragram}
                        postid = {item.id}
                    />
                ))
            }
        </div>
    )
}

export default Posts
