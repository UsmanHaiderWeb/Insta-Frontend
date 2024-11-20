import axios from 'axios';
import React, { memo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searchActions } from './ReduxStore/Store';
import AllSearchedUsers from './AllSearchedUsers';

const Search = () => {
    const dispatch = useDispatch();

    const search = useRef();

    const searches = useSelector(state => state.searches);

    const searchKaro = async () => {
        try {
            let token = localStorage.getItem('insta-token');
            if (token && token != '') {
                let response = await axios.post(`https://insta-backend-usman.vercel.app/api/search?token=${token}&search=${search.current.value}`)
                if (response.status == 200) {
                    dispatch(searchActions.update(response.data.users))
                }
            }
        } catch (error) {
            console.log('GETTING SEARCH RESULTS ERROR: ', error);
        }
    }

return (
    <div className='w-full md:w-[calc(100vw-620px)] sm:w-[calc(100vw-270px)] lgtab:w-[calc(100vw-90px)] tablet:w-[calc(100vw-90px)] flex justify-start items-center flex-col pt-10 mini:pt-5 mobile:pt-5 micro:pt-5 pb-14 mini:pb-32 mobile:pb-28 micro:pb-28'>
        <h1 className='text-[35px] tracking-wide font-[500]'>Search</h1>
        <form className='flex justify-center items-center w-[450px] xl:w-[450px] md:w-[90%] tablet:w-[400px] mini:w-[400px] mobile:w-[85vw] micro:w-[90vw]'>
            <label className='w-full flex justify-start items-center bg-[#eaeaea] py-3 pl-4 gap-x-5 rounded-md relative'>
                <div>
                    <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg>
                </div>
                <input ref={search} onInput={searchKaro} type="text" placeholder='Search People' className='w-[75%] mobile:w-[70%] micro:w-[65%] bg-transparent font-sans'/>
                <div className='w-6 h-6 flex justify-center items-center bg-[#cacaca] rounded-full'>
                    <svg className='w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>
                </div>
            </label>
        </form>
        <div className='w-[450px] xl:w-[450px] md:w-[90%] tablet:w-[400px] mini:w-[400px] mobile:w-[85vw] micro:w-[90vw] flex justify-center items-center gap-y-2 flex-col'>
            <div className='w-full my-2'>
                <h4>Searches you might like</h4>
            </div>
            <AllSearchedUsers />
        </div>
    </div>
  )
}

export default memo(Search)