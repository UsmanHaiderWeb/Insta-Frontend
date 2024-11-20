import axios from 'axios';
import React, { memo, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { commentsActions } from './ReduxStore/Store';

const Comment = () => {
    const dispatch = useDispatch();

    const post_ID = useParams();
    const navigate = useNavigate();

    const des = useRef();

    const submit = async (e) => {
        e.preventDefault();
        try {
            let token = localStorage.getItem('insta-token');
            if (token && token != '' && des.current.value != '') {
                let comment = await axios.post(`https://insta-backend-usman.vercel.app/api/comment?token=${token}&id=${post_ID.id}`, {description: des.current.value});
                if (comment.status == 200) {
                    dispatch(commentsActions.update(comment.data.comments));
                    navigate(`/posts/${post_ID.id}`)
                }
            }
        } catch (error) {
            console.log("ADDING COMMENT ERROR: ", error);
        }
    }

return (
    <div className='w-screen h-screen fixed z-[80] flex justify-center items-center top-0 left-0 bg-black bg-opacity-30'>
        <form onSubmit={submit} className='bg-white w-[450px] mini:w-[90%] mobile:w-[95%] micro:w-[97%] mini:min-w-[400px] rounded-2xl px-4 micro:px-2 py-2'>
            <div className='flex justify-between items-center mb-1'>
                <h1 className='text-[25px]'>Add Comment</h1>
                <Link to={`/posts/${post_ID.id}`} className='w-6 h-6 p-1 micro:mr-2 rounded-full bg-black flex justify-center items-center flex-col relative cursor-pointer'>
                    <div className='absolute top-1/2 w-[60%] h-[1px] bg-white rotate-[-45deg] -translate-y-1/2 origin-center'></div>
                    <div className='absolute top-1/2 w-[60%] h-[1px] bg-white rotate-[45deg] translate-y-1/2 origin-center'></div>
                </Link>
            </div>
            <label htmlFor="comment">
                <textarea ref={des} rows="4" className='w-full border border-black resize-none border-opacity-30 px-3 py-1 rounded-lg outline-none' placeholder='Leave a Comment'></textarea>
            </label>
            <label htmlFor="add" className='flex justify-end items-center w-full gap-x-2'>
                <button className='px-3 py-2 rounded-lg w-[80px] cursor-pointer text-center text-white bg-black'>Add</button>
                <Link to={`/posts/${post_ID.id}`} className='px-3 py-2 rounded-lg w-[80px] cursor-pointer text-center bg-[#dadada] hover:bg-[#cacaca]'>Cancel</Link>
            </label>
        </form>
    </div>
  )
}

export default memo(Comment)