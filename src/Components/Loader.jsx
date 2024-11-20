import React, { memo, useEffect, useRef } from 'react'

const Loader = (i) => {
  const loader = useRef();

  useEffect(() => {
    let loaderInterval = setTimeout(() => {
      loader.current.style.display = 'none';
      window.scrollTo(0, 0);
    }, i.loaderTime);
    return () => clearTimeout(loaderInterval);
  }, [])

  return (
    <div ref={loader} className='w-full h-screen flex justify-center items-center fixed top-0 left-0 bg-white z-[111111111111]'>
      <div className='w-20 h-auto -translate-y-1/2'>
        <img src="/loader1.png" className='w-20' />
      </div>
      <div className='absolute bottom-10 left-1/2 -translate-x-1/2'>
        <img src="/loader2.png" className='w-20' />
      </div>
    </div>
  )
}

export default memo(Loader)