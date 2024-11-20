import React, { memo, useEffect, useState } from 'react'
import ShowPosts from './ShowPosts'
import axios from 'axios';

const Explore = () => {
  const [ explore, setExplore ] = useState([]);

  useEffect(() => {
    ;(async function () {
      try {
        let token = localStorage.getItem('insta-token');
        if (token && token != '') {
          let response = await axios.get(`https://insta-backend-usman.vercel.app/api/explore?token=${token}`)
          if (response.status == 200) {
            setExplore(response.data.explorePosts);
          }
        }
      } catch (error) {
        console.log("GETTING EXPLORE DATA ERROR: ", error);
      }
    })();
  }, [])

  return (
    <div className='w-full md:w-[calc(100vw-620px)] sm:w-[calc(100vw-270px)] lgtab:w-[calc(100vw-90px)] tablet:w-[calc(100vw-90px)] flex justify-center items-center px-5 micro:px-0 mobile:px-0 md:px-5 xl:px-16 2xl:px-24 sm:px-7 py-14 mini:pb-36 mobile:pb-32 micro:pb-32'>
        <ShowPosts Posts={explore} />
    </div>
  )
}

export default memo(Explore)