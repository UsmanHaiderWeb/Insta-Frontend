import React, { memo } from 'react'
import { NavLink, useParams } from 'react-router-dom'

const ProfilePostNavigator = () => {
    const user_ID = useParams();

return (
    <div className='profilePostLinks w-full mt-14 border-t-[1px] border-t-[#dadada] flex justify-center micro:justify-evenly items-center gap-x-20 micro:gap-x-0'>
        <NavLink to={`/profile/${user_ID.id}`} end className='flex justify-center items-center gap-x-2 pt-5 -translate-y-[1px]'>
            <svg aria-label="Posts" height="24" role="img" viewBox="0 0 24 24" width="19">
                <rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect>
                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21"></line>
                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21"></line>
                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015"></line>
                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985"></line>
            </svg>
            <div>Posts</div>
        </NavLink>
        <NavLink to={`/profile/${user_ID.id}/saved-posts`} className='flex justify-center items-center gap-x-2 pt-5 -translate-y-[1px]'>
            <svg aria-label="Saved" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="19">
                <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon>
            </svg>
            <div>Saved</div>
        </NavLink>
    </div>
  )
}

export default memo(ProfilePostNavigator)