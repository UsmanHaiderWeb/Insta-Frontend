import React, { memo, useRef, useState } from 'react'
import SignupPhoto from './SignupPhoto'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginWaitingLoader from './LoginWaitingLoader';

const SignupForm = () => {
    const [isSigning, setSigningState] = useState(false);

    const [image, setImage] = useState(null)

    const navigate = useNavigate();

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const message = useRef();


    const showEror = async (text) => {
        message.current.textContent = text;
        message.current.style.opacity = 1;
        setTimeout(() => {
            message.current.style.opacity = 0
        }, 2000);
    }

    const submit = async () => {
        try {
            if (username.current.value != '' && email.current.value != '' && email.current.value.includes('@') && email.current.value.includes('.com') && password.current.value != '' && image != null) {
                setSigningState(true);
                const formData = new FormData();
                formData.append('image', image);
                formData.append('username', username.current.value);
                formData.append('email', email.current.value);
                formData.append('password', password.current.value);
    
                let postData = await axios.post('https://insta-backend-usman.vercel.app/api/signup', {
                    image: image,
                    username: username.current.value,
                    email: email.current.value,
                    password: password.current.value
                })
                if (postData.status == 200) {
                    localStorage.setItem("insta-token", postData.data.token);
                    setSigningState(false);
                    navigate('/')
                } else if (postData.status == 210) {
                    setSigningState(false);
                    showEror("Something went wrong.");
                }
            } else {
                setSigningState(false);
                showEror("All field are required");
            }
        } catch (error) {
            setSigningState(false);
            showEror("Something went wrong.")
            console.log("FAILED SIGN UP ERROR: ", error);
        }
    }


return (
    <form onSubmit={e => e.preventDefault()} className='flex justify-center items-center flex-col w-full gap-y-2 mt-3'>
        <SignupPhoto setImage={setImage} />
        <div ref={message} className='text-[12px] tracking-wider text-[#e40606] w-full opacity-0'>Something went wrong.</div>
        <input ref={username} className='w-full border-solid border-[1px] border-[#dadada] bg-[#eceaea54] inline-block py-2 pl-4 placeholder:text-[#333333] text-[13px] tracking-wide' type="text" placeholder='User Name' />
        <input ref={email} className='w-full border-solid border-[1px] border-[#dadada] bg-[#eceaea54] inline-block py-2 pl-4 placeholder:text-[#333333] text-[13px] tracking-wide' type="email" placeholder='Enter you Email' />
        <input ref={password} className='w-full border-solid border-[1px] border-[#dadada] bg-[#eceaea54] inline-block py-2 pl-4 placeholder:text-[#333333] text-[13px] tracking-wide' type="password" placeholder='Enter password' />
        {isSigning ?
            <LoginWaitingLoader />
        :
            <input type="submit" value="Signup" className='w-full bg-[#4DB5F9] py-1 text-white text-[14px] rounded-md mt-2' onClick={submit} />
        }
    </form>
  )
}

export default memo(SignupForm)