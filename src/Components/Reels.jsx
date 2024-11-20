import React, { memo } from 'react'

const Reels = () => {
  return (
    <div className='w-full md:w-[calc(100vw-620px)] sm:w-[calc(100vw-270px)] lgtab:w-[calc(100vw-90px)] tablet:w-[calc(100vw-90px)] min-h-screen flex justify-center items-center flex-col py-14 mini:pb-36 mobile:pb-36 micro:pb-36'>
        <h1 className='text-[35px] tracking-wide font-semibold'>No Reels</h1>
        <p className='lg:w-[400px] md:w-[90%] w-[400px] mobile:w-[85%] micro:w-[92%] text-center'>We dont have enough content to show you. Please contribute, we assure that the reels section will soon be available for use.</p>
    </div>
  )
}

export default memo(Reels)