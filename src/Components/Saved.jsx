import React, { memo } from 'react'
import ShowPosts from './ShowPosts'
import { useSelector } from 'react-redux'
import ProfilePostNavigator from './ProfilePostNavigator';

const Saved = () => {
  const savedPosts = useSelector(state => state.savedPosts);


  return (<>
    <ProfilePostNavigator />
    <div className='w-[450px] flex justify-center items-center flex-col my-16'>
      <div>
        <svg className='w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] lgtab:w-[72px] lgtab:h-[72px]' aria-label="Save" height="72" role="img" viewBox="0 0 96 96" width="72">
          <circle cx="48" cy="48" fill="none" r="47" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle>
          <path d="M66 68.685 49.006 51.657a1.42 1.42 0 0 0-2.012 0L30 68.685V27h36Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
        </svg>
      </div>
      <h1 className='font-extrabold text-[30px] font-sans mt-3'>Save Posts</h1>
      <p className='font-sans text-[15px] opacity-90 max-w-[450px] mini:w-[80vw] mobile:w-[85vw] micro:w-[90vw] text-center'>Save photos and videosthat you want to see again. Only you can see what you save.</p>
    </div>
    <ShowPosts Posts={savedPosts} />
  </>)
}

export default memo(Saved)