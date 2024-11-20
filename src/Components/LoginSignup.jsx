import { useGSAP } from '@gsap/react';
import React, { memo, useEffect, useRef } from 'react'
import gsap from 'gsap'

const LoginSignup = () => {
    const image1 = useRef();
    const image2 = useRef();
    const image3 = useRef();
    const image4 = useRef();

    useGSAP(() => {
        const tl = gsap.timeline({
            delay: 2,
            repeat: -1
        })
        tl.to(image2.current, {
            opacity: 1,
            duration: 3,
        })
        tl.to(image3.current, {
            opacity: 1,
            duration: 3,
            onComplete: () => {
                image2.current.style.opacity = 0
            }
        })
        tl.to(image4.current, {
            opacity: 1,
            duration: 3,
            onComplete: () => {
                image3.current.style.opacity = 0
            }
        })
        tl.to(image4.current, {
            opacity: 0,
            duration: 3,
        })
    })

return (
    <div className='w-[60%] h-full hidden sm:flex justify-center items-center translate-y-5'>
        <img src="/loginBG.png" className='h-full' />
        <div ref={image1} className='absolute bottom-0 right-0 z-[1]'>
            <img src="/login1.png" className='-translate-y-16 md:-translate-x-[88px] sm:-translate-x-[72px] w-[240px] h-[520px]' />
        </div>
        <div ref={image2} className='absolute bottom-0 right-0 z-[2] opacity-0'>
            <img src="/login2.png" className='-translate-y-16 md:-translate-x-[88px] sm:-translate-x-[72px] w-[240px] h-[520px]' />
        </div>
        <div ref={image3} className='absolute bottom-0 right-0 z-[3] opacity-0'>
            <img src="/login3.png" className='-translate-y-16 md:-translate-x-[88px] sm:-translate-x-[72px] w-[240px] h-[520px]' />
        </div>
        <div ref={image4} className='absolute bottom-0 right-0 z-[4] opacity-0'>
            <img src="/login4.png" className='-translate-y-16 md:-translate-x-[88px] sm:-translate-x-[72px] w-[240px] h-[520px]' />
        </div>
    </div>
  )
}

export default memo(LoginSignup)