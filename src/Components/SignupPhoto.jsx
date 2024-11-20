import React, { memo, useRef, useEffect } from 'react'

const SignupPhoto = (i) => {
    const file = useRef();
    const img = useRef();

    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
      cloudinaryRef.current = window.cloudinary;
      widgetRef.current = cloudinaryRef.current.createUploadWidget({
        cloudName: 'duffdfh2k',
        uploadPreset: 'g5nv0sry'
      }, function (err, result) {
        if (result.info.secure_url) {
            i.setImage(result.info.secure_url);
            img.current.src = result.info.secure_url;
        }
      })
    }, [])
    


return (
    <label htmlFor="file" className='px-5 flex justify-center items-center flex-col'>
        <input ref={file} id='file' type="button" className='hidden' onClick={() => widgetRef.current.open()} />
        <div className='flex justify-center items-center flex-col gap-y-3'>
            <div className='w-24 h-24 rounded-full overflow-hidden border-[1px] border-[#dadada]'>
                <img ref={img} className='w-full h-full border-none outline-none rounded-full object-cover object-center' />
            </div>
            <div className='text-[#643885]'>Choose Photo</div>
        </div>
    </label>
)}

export default memo(SignupPhoto)