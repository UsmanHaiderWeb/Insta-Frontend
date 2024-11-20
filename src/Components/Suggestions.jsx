import axios from 'axios';
import React, { memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Suggestions = () => {
    const [ suggestedUsers, setUsers ] = useState([]);

    useEffect(() => {
        ;(async function () {
            try {
                let token = localStorage.getItem('insta-token');
                if (token && token != '') {
                    let response = await axios.get(`https://insta-backend-usman.vercel.app/api/suggestions?token=${token}`)
                    if (response && response.status === 200) {
                        setUsers(response.data.suggestedUsers);
                    }
                }
            } catch (error) {
                console.log("GETTING SUGGESTIONS ERROR: ", error);
            }
        })();
    }, [])

return (
    <div className='hidden md:block lg:w-[350px] md:w-[300px] h-full relative'>
        <div className='lg:w-[350px] md:w-[300px] h-screen fixed top-0 right-0 px-4 pt-5' style={{boxShadow: "0px 0px 20px 10px #dadada"}}>
            <h1 className='text-[25px] leading-[30px] tracking-wide mb-3'>Suggestions for you</h1>
            {suggestedUsers.map((user, udx) => (
                <div key={`${user}, ${udx}`} className='w-full flex justify-between items-center mb-3'>
                    <Link to={`/profile/${user._id}`} className='flex justify-between items-center gap-x-3'>
                        <div className='w-12 h-12 rounded-full overflow-hidden' style={{boxShadow: "0px 0px 5px 0.5px black"}}>
                            <img src={user.dp} className='w-full h-full object-cover object-center' />
                        </div>
                        <div>
                            <h5>{user.username}</h5>
                            <p className='text-[13px] opacity-75 tracking-wider'>{user.email}</p>
                        </div>
                    </Link>
                    <Link to={`/profile/${user._id}`} className='py-1 px-4 rounded-md bg-[#dadada] hover:bg-[#cacaca]'>View</Link>
                </div>
            ))}
        </div>
    </div>
  )
}

export default memo(Suggestions)