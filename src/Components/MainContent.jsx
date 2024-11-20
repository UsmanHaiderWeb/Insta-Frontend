import React, { memo, useEffect, useState } from 'react'
import ShowPosts from './ShowPosts'
import axios from 'axios';

const MainContent = () => {

  const [Posts, setPosts] = useState(null);

  useEffect(() => {
    ;(async function () {
      try {
        let token = localStorage.getItem('insta-token');
        if (token && token != '') {
          let allPosts = await axios.get(`https://insta-backend-usman.vercel.app/api/allposts?token=${token}`)
          if (allPosts.status === 200 && allPosts.data.isLoggedIn) {
            setPosts(allPosts.data.posts.reverse());
          }
        }
      } catch (error) {
        console.log("Fetching Post Data ON MainContent.jsx: ", (error.message && error));
      }
    })();
  }, [])


  return (
    <div className='w-full md:w-[calc(100vw-620px)] sm:w-[calc(100vw-270px)] lgtab:w-[calc(100vw-90px)] tablet:w-[calc(100vw-90px)] flex justify-start items-center flex-col py-14 mini:pb-36 mobile:pb-36 micro:pb-36'>
      <div className='flex justify-center items-center flex-col px-6'>
        <div>
          <img src="/tick.png" width={90} />
        </div>
        <h5 className='text-center text-[19px] leading-[19px] pt-4 tracking-wide'>You've all caught up</h5>
        <p className='text-center'>You'll see all the posts of your friends.</p>
      </div>
      <div className='w-[400px] mobile:w-[80vw] micro:w-[90vw] h-[1px] bg-[#dadada] mt-16 micro:mt-10 mb-6'></div>
      <div>
        <h4 className='text-[22px] tracking-wide opacity-70 text-center micro:px-6 pb-10'>Suggested Posts</h4>
      </div>
      <ShowPosts Posts={Posts} />
      {/* <div className='w-[450px] px-6 flex justify-center items-center'>
        <div className='w-full py-3' style={{boxShadow: "0px 0px 10px 1px #dadada"}}>
          <div className='flex justify-between items-center px-2'>
            <div className='flex justify-center items-center gap-x-2'>
              <div className='w-12 h-12 rounded-full overflow-hidden'>
                <img src="/product10.webp" className='w-full h-full object-cover object-center' />
              </div>
              <div>
                <div>m.tayab.m_10</div>
                <div>u969828</div>
              </div>
            </div>
            <div className='px-5 py-2 rounded-lg bg-[#dadada] hover:bg-[#cacaca]'>Follow</div>
          </div>
          <div className='py-2'>
            <img src="/pin20.jpg" className='w-full' />
          </div>
          <div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default memo(MainContent)