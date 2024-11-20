import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import ShowPosts from './ShowPosts'
import { useSelector } from 'react-redux';
import ProfilePostNavigator from './ProfilePostNavigator';

const Posts = () => {
  const allPosts = useSelector(state => state.createdPosts);

  return (<>
    <ProfilePostNavigator />
    <div className='w-[450px] mobile:w-[90vw] micro:w-[95vw] flex justify-center items-center flex-col my-16'>
        <Link to='/createpost'>
            <svg className='w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] lgtab:w-[72px] lgtab:h-[72px]' aria-label="When you share photos, they will appear on your profile." fill="currentColor" height="72" role="img" viewBox="0 0 96 96" width="72">
                <circle cx="48" cy="48" fill="none" r="47" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2"></circle>
                <ellipse cx="48.002" cy="49.524" fill="none" rx="10.444" ry="10.476" stroke="currentColor" strokeLinejoin="round" strokeWidth="2.095"></ellipse>
                <path d="M63.994 69A8.02 8.02 0 0 0 72 60.968V39.456a8.023 8.023 0 0 0-8.01-8.035h-1.749a4.953 4.953 0 0 1-4.591-3.242C56.61 25.696 54.859 25 52.469 25h-8.983c-2.39 0-4.141.695-5.181 3.178a4.954 4.954 0 0 1-4.592 3.242H32.01a8.024 8.024 0 0 0-8.012 8.035v21.512A8.02 8.02 0 0 0 32.007 69Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
        </Link>
        <h1 className='font-extrabold text-[30px] font-sans mt-3'>Share Photos</h1>
        <p className='font-sans text-[15px] opacity-90 text-center mini:w-[80vw] mobile:w-[85vw] micro:w-[90vw]'>When you share or post photos, they'll appear here.</p>
        <Link to='/createpost' className='text-[#4FB5D9] font-sans text-[13px] tracking-wide mt-5 text-center'>Share your first photo</Link>
    </div>
    <ShowPosts Posts={allPosts} />
  </>)
}

export default memo(Posts)