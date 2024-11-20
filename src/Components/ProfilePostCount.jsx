import React, { memo } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const ProfilePostCount = (i) => {
  const user_ID = useParams();

  const allFollowers = useSelector(state => state.allFollowers);
  const allFollowings = useSelector(state => state.allFollowings);
  const createdPosts = useSelector(state => state.createdPosts);

  return (
    <div className={`mt-5 items-center opacity-90 ${i.mobile ? 'w-full hidden lg:hidden md:flex mini:flex mobile:flex micro:flex justify-between lg:px-0 md:px-6' : 'flex lg:flex md:hidden mini:hidden mobile:hidden micro:hidden justify-start gap-x-7 tablet:gap-x-6 text-[18px] xl:text-[18px] lg:text-[15px] tablet:text-[16px] mini:text-[16px] micro:text-[14px]'}`}>
        <Link to={`/profile/${user_ID.id}`} className='flex justify-center items-center mini:flex-col mobile:flex-col micro:flex-col gap-x-2 gap-y-1 mini:w-[33vw] mobile:w-[33vw] micro:w-[33vw]'><span>{createdPosts.length}</span><span>posts</span></Link >
        <Link to={`/profile/${user_ID.id}/followers`} className='flex justify-center items-center mini:flex-col mobile:flex-col micro:flex-col gap-x-2 gap-y-1 mini:w-[33vw] mobile:w-[33vw] micro:w-[33vw]'><span>{allFollowers.length}</span><span>followers</span></Link>
        <Link to={`/profile/${user_ID.id}/followings`} className='flex justify-center items-center mini:flex-col mobile:flex-col micro:flex-col gap-x-2 gap-y-1 mini:w-[33vw] mobile:w-[33vw] micro:w-[33vw]'><span>{allFollowings.length}</span><span>followings</span></Link>
    </div>
  )
}

export default memo(ProfilePostCount)