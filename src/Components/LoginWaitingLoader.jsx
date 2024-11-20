import React, { memo } from 'react'

const LoginWaitingLoader = () => {
  return (
    <div className='w-full bg-[#4DB5F9] py-1 text-white text-[14px] rounded-md mt-2 flex justify-center items-center'>
        <div className='w-5 h-5 rounded-full border-[#dadada] border-[2px] border-b-transparent' style={{animation: "loadingPost 2s infinite"}}></div>
    </div>
  )
}

export default memo(LoginWaitingLoader)