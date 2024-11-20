import axios from 'axios';
import React, { memo, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

const ProfilePhoto = () => {
    const [userData, setData] = useState(null)

    useEffect(() => {
        ;(async function () {
            try {
                let token = localStorage.getItem('insta-token');
                if (token && token != '') {
                    let profileData = await axios.get(`https://insta-backend-usman.vercel.app/api/profiledata?token=${token}`)
                    if (profileData.status == 200) {
                        setData(profileData.data.user)
                    }
                }
            } catch (error) {
                console.log('GETTING PROFILE DATA FROM HEADER: ', error);
            }
        })();
    }, [])


return (
    <NavLink to={userData == null ? "" : `/profile/${userData._id}`} end className='w-full mini:w-[max-content] mobile:w-[max-content] micro:w-[max-content] flex justify-start items-center gap-x-5 px-[10px] sm:px-3 py-3 rounded-lg sm:hover:bg-[#dadada]'>
        <div className='w-7 h-7 overflow-hidden rounded-full'>
            <img src={userData == null ? "/profileLogo.jpg" : userData.dp} className='w-full h-full rounded-full object-center object-cover' style={{boxShadow: "0px 0px 10px 1px #aaaaaa"}} />
        </div>
        <div className='sm:block hidden'>Profile</div>
    </NavLink>
)}

export default memo(ProfilePhoto)