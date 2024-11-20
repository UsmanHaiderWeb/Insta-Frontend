import axios from 'axios';
import React, { memo, useEffect, useRef, useState } from 'react'

const CreatePost = () => {
    const [image, setImage] = useState(null)

    const title = useRef();
    const des = useRef();
    const file = useRef();
    const ImageShower = useRef();
    const videoShower = useRef();
    const fake = useRef();
    const real = useRef();
    const loader = useRef();
    const click = useRef();
    
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        let token = localStorage.getItem('insta-token');
        if (token && token != '') {
            cloudinaryRef.current = window.cloudinary;
            widgetRef.current = cloudinaryRef.current.createUploadWidget({
                cloudName: 'duffdfh2k',
                uploadPreset: 'g5nv0sry'
            }, function(err, result) {
                if (result.info.secure_url && result.info.resource_type) {
                    if (result.info.resource_type == 'video') {
                        setImage({
                            URL: result.info.secure_url,
                            isVideo: true
                        });
                        videoShower.current.src = result.info.secure_url;
                        videoShower.current.style.display = 'block';
                        ImageShower.current.style.display = 'none';
                    } else {
                        setImage({
                            URL: result.info.secure_url,
                            isVideo: false
                        });
                        ImageShower.current.src = result.info.secure_url;
                        videoShower.current.style.display = 'none';
                        ImageShower.current.style.display = 'block';
                    }
                    real.current.style.display = "flex";
                    fake.current.style.display = "none";
                }
            })
        }
    }, [])
    

    const submit = async (e) => {
        e.preventDefault();
        try {
            let token = localStorage.getItem('insta-token');
            if (token && token != '' && title.current.value != '' && des.current.value != '' && image != null) {
                click.current.style.display = "none"
                loader.current.style.display = "flex"

                let creatingPostData = await axios.post(`https://insta-backend-usman.vercel.app/api/createpost?token=${token}`, {
                    image: image.URL,
                    isVideo: image.isVideo,
                    title: title.current.value,
                    description: des.current.value
                })
                if (creatingPostData.status == 200) {
                    title.current.value = ''
                    des.current.value = ''
                    fake.current.style.display = 'flex';
                    real.current.style.display = 'none';
                    setImage(null)
                }
                if (creatingPostData.status >= 200 && creatingPostData.status <= 300) {
                    click.current.style.display = "flex";
                    loader.current.style.display = "none";
                }
            }
        } catch (error) {
            click.current.style.display = "flex";
            loader.current.style.display = "none";
            console.log("Creating Post ERROR: ", error);
        }
    }
    
    return (
        <div className='w-full md:w-[calc(100vw-620px)] sm:w-[calc(100vw-270px)] lgtab:w-[calc(100vw-90px)] tablet:w-[calc(100vw-90px)] flex justify-start items-center flex-col pt-10 mini:pt-5 mobile:pt-5 micro:pt-5 pb-14 mini:pb-32 mobile:pb-28 micro:pb-28'>
        <h1 className='text-[35px] micro:text-[30px] font-semibold tracking-wide'>Create Post</h1>
        <form onSubmit={submit} className='w-[400px] mobile:w-[80vw] micro:w-[90vw] flex justify-evenly items-start flex-col gap-y-6 mt-5 micro:mt-0'>
            <label htmlFor='file' className='w-full border-[1px] border-[#cacaca] rounded-lg flex justify-center items-center flex-col overflow-hidden'>
                <input ref={file} type="button" className='hidden' id='file' name='file' onClick={() => widgetRef.current.open()}/>
                <div ref={fake} className='w-full h-80 flex justify-center items-center flex-col'>
                    <svg aria-label="Icon to represent media such as images or videos" height="77" role="img" viewBox="0 0 97.6 77.3" width="96">
                        <path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path>
                    </svg>
                    <div className='w-[50%] text-center opacity-70 mt-10'>Browse your photo or video that you want to post</div>
                    <div className='mt-2 text-[13px] text-blue-600'>Browse from your device</div>
                </div>
                <div ref={real} className='hidden w-full max-h-[500px] overflow-hidden'>
                    <img ref={ImageShower} className='w-full object-cover object-center' />
                    <video ref={videoShower} autoPlay loop muted className='hidden w-full object-cover object-center' />
                </div>
            </label>
            <label className='flex flex-col w-full'>
                <div className='text-[20px] font-semibold tracking-wider pl-2'>Title:</div>
                <input ref={title} type="text" className='w-full border-[1px] border-solid border-zinc-400 rounded-lg py-2 px-3' placeholder='Post Title' />
            </label>
            <label className='flex flex-col w-full'>
                <div className='text-[20px] font-semibold tracking-wider pl-2'>Description:</div>
                <textarea ref={des} type="text" rows="3" maxLength="150" className='w-full resize-none border-[1px] border-solid border-zinc-400 rounded-lg py-2 px-3' placeholder='Tell us more about this'></textarea>
            </label>
            <label ref={click} className='flex justify-center w-full'>
                <input type="submit" value='Create' className=' w-full px-5 py-2 rounded-lg bg-blue-600 text-white' />
            </label>
            <label ref={loader} className='hidden justify-center w-full'>
                <div className='flex justify-center items-center w-full px-5 py-2 rounded-lg bg-blue-600 text-white'>
                    <div className='w-6 h-6 border-[2px] border-white rounded-full opacity-80 border-b-transparent' style={{animation: 'loadingPost 1s infinite'}}></div>
                </div>
            </label>
        </form>
    </div>
  )
}

export default memo(CreatePost)