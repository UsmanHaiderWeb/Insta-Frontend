import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Followers = () => {
    const allFollowers = useSelector(state => state.allFollowers)


return (
    <div className='w-full flex justify-start items-center flex-col mt-10'>
        <h1 className='text-[18px] font-semibold tracking-wider'>All Followers</h1>
        <div className='w-full flex justify-center items-center flex-wrap gap-y-0 gap-x-2 mt-3 border-t pt-5'>
            {allFollowers.map((user, udx) => (
                <div key={`${user._id}, ${Math.random() * 12234567899}`} className='w-[350px] xl:w-[300px] max-w-[350px] md:w-full sm:w-[400px] mobile:w-[90%] micro:w-[95%] flex justify-between items-center flex-wrap mb-3 px-2 pt-2'>
                    <div className='w-full flex justify-between items-center mb-3'>
                        <Link to={`/profile/${user._id}`} className='flex justify-between items-center gap-x-3'>
                            <div className='w-12 h-12 micro:w-10 micro:h-10 rounded-full overflow-hidden' style={{boxShadow: "0px 0px 5px 0.5px black"}}>
                                <img src={user.dp} className='w-full h-full object-cover object-center' />
                            </div>
                            <div>
                                <h5>{user.username}</h5>
                                <p className='text-[13px] micro:text-[12px] opacity-75 tracking-wider'>{user.email}</p>
                            </div>
                        </Link>
                        <Link to={`/profile/${user._id}`} className='py-1 px-4 micro:px-[10px] rounded-md bg-[#dadada] hover:bg-[#cacaca]'>View</Link>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default memo(Followers)