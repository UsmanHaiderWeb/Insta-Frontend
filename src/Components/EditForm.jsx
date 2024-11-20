import React, { memo, useRef, useState } from 'react'
import SignupPhoto from './SignupPhoto'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginWaitingLoader from './LoginWaitingLoader';

const EditForm = () => {
    const [ isEditing, setEditState ] = useState(false);

    const [image, setImage] = useState(null);

    const navigate = useNavigate();

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const oldpassword = useRef();
    const message = useRef();


    const showError = async (text) => {
        message.current.textContent = text;
        message.current.style.opacity = 1;
        setTimeout(() => {
            message.current.style.opacity = 0
        }, 3000);
    }

    const submit = async () => {
        try {
            let token = localStorage.getItem('insta-token');
            if (token && token != '') {
                if (username.current.value != '' && email.current.value != '' && email.current.value.includes('@') && email.current.value.includes('.com') && password.current.value != '' && oldpassword.current.value != '' && image != null) {
                    setEditState(true);
        
                    let postData = await axios.post(`https://insta-backend-usman.vercel.app/api/editprofile?token=${token}`, {
                        image: image,
                        username: username.current.value,
                        email: email.current.value,
                        password: password.current.value,
                        oldpassword: oldpassword.current.value
                    })
                    if (postData.status == 200) {
                        setEditState(false);
                        navigate('/')
                    } else if (postData.status == 210) {
                        setEditState(false);
                        showError(postData.data.message);
                    }
                } else {
                    setEditState(false);
                    showError("All field are required");
                }
            }
        } catch (error) {
            setEditState(false);
            showError("Something went wrong.");
            console.log("EDITING USER DATA ERROR: ", error);
        }
    }


return (
    <form onSubmit={e => e.preventDefault()} className='flex justify-center items-center flex-col w-full gap-y-2 mt-3'>
        <SignupPhoto setImage={setImage} />
        <div ref={message} className='text-[12px] tracking-wider text-[#e40606] w-full opacity-0'>Something went wrong.</div>
        <input ref={username} className='w-full border-solid border-[1px] border-[#dadada] bg-[#eceaea54] inline-block py-2 pl-4 placeholder:text-[#333333] text-[13px] tracking-wide' type="text" placeholder='New User Name' />
        <input ref={email} className='w-full border-solid border-[1px] border-[#dadada] bg-[#eceaea54] inline-block py-2 pl-4 placeholder:text-[#333333] text-[13px] tracking-wide' type="email" placeholder='Enter new Email' />
        <input ref={password} className='w-full border-solid border-[1px] border-[#dadada] bg-[#eceaea54] inline-block py-2 pl-4 placeholder:text-[#333333] text-[13px] tracking-wide' type="password" placeholder='Enter new password' />
        <input ref={oldpassword} className='w-full border-solid border-[1px] border-[#dadada] bg-[#eceaea54] inline-block py-2 pl-4 placeholder:text-[#333333] text-[13px] tracking-wide' type="password" placeholder='Previous password' />
        {isEditing ?
            <LoginWaitingLoader />
        :
            <input type="submit" value="Edit changes" className='w-full bg-[#4DB5F9] py-1 text-white text-[14px] rounded-md mt-2' onClick={submit} />
        }
    </form>
  )
}

export default memo(EditForm)