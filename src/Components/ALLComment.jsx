import React, { memo, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ALLComment = () => {
    const comments = useSelector(state => state.comments);

    
    const [ showcomment, toggleComment ] = useState(false);

    return (
        <div className='w-full px-3'>
            {comments.length == 0 ? 
                <div className='w-full text-center opacity-60'>No comment yet</div>
                : <>
                <div className={`${showcomment ? "flex" : "hidden"} w-full mb-2 justify-start items-start flex-col`}>
                    <h1 className='text-[18px] micro:text-[16px] tracking-wider font-semibold'>All Comments:</h1>
                    {comments.map((com, cdx) => (
                        <div key={`${com} ${cdx}`} className='w-full flex justify-start items-start gap-x-3 border-t-[1px] border-t-[#dadada] py-2'>
                            <Link to={`/profile/${com.commentBy._id}`} className='w-10 h-10 micro:w-8 micro:h-8 rounded-full overflow-hidden' style={{boxShadow: '0px 0px 10px #dadada'}}>
                                <img src={com.commentBy.dp} className='w-full h-full object-cover object-center' />
                            </Link>
                            <div className='w-[calc(100%-55px)]'>
                                <h3 className='font-semibold tracking-wider'>{com.commentBy.username}</h3>
                                <p className='text-[15px] leading-[20px] micro:text-[14px] micro:leading-[18px]'>{com.commentDes}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='text-blue-700 cursor-pointer mb-2' onClick={() => {toggleComment(!showcomment)}}>{showcomment ? "Show less ..." : "See all comments ..."}</div>
            </>}
        </div>
    )
}

export default memo(ALLComment)