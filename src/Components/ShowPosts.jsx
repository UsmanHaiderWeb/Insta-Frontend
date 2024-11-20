import React, { memo, useEffect } from 'react'
import { Link } from 'react-router-dom'

const ShowPosts = (i) => {
  return (
    <div className='flex justify-center items-start gap-1 flex-wrap mb-10'>
      {i.Posts != null && i.Posts.map((post, idx) => (
        <Link to={`/posts/${post._id}`} key={`${post} and ${idx}`} className='2xl:w-[15vw] 2xl:h-[15vw] xl:w-[14vw] xl:h-[14vw] md:w-[18vw] md:h-[18vw] sm:w-[25vw] sm:h-[25vw] lgtab:w-[25vw] lgtab:h-[25vw] tablet:w-[33vw] tablet:h-[33vw] w-[30vw] h-[30vw] aspect-square overflow-hidden bg-neutral-100 cursor-pointer'>
          {post.isVideo ? 
            <video src={post.image} className='w-full h-full object-cover object-center cursor-pointer' autoPlay loop muted></video>
            :
            <img src={post.image} className='w-full h-full object-cover object-center cursor-pointer' />
          }
        </Link>
      ))}
    </div>
  )
}

export default memo(ShowPosts)