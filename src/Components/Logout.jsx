import React, { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const [showLogout, toggleLogout] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    localStorage.removeItem('token');
    navigate('/signup');
  }

  return (
    <div className='sm:w-[calc(100%-32px)] mini:hidden mobile:hidden micro:hidden px-[10px] sm:px-3 py-3 rounded-lg hover:bg-[#dadada] flex justify-start items-center gap-x-5 absolute bottom-10 sm:left-0 sm:mx-4 cursor-pointer' onMouseEnter={() => toggleLogout(true)} onMouseLeave={() => toggleLogout(false)}>
        <svg width={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 4H21V6H3V4ZM9 11H21V13H9V11ZM3 18H21V20H3V18Z"></path></svg>
        <span className='hidden sm:block'>More</span>
        <div className='absolute left-3/4 sm:left-1/2 rounded-lg h-[130px]'>
          <div className={`${showLogout ? "flex" : "hidden"} text-[18px] px-4 py-[5px] rounded-lg bg-white cursor-pointer`} style={{boxShadow: "inset 0px 0px 5px 0px #00000088"}} onMouseEnter={() => toggleLogout(true)} onClick={() => logout()}>
            Logout
          </div>
        </div>
    </div>
  )
}

export default memo(Logout)