import axios from 'axios';
import React, { memo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { isAlreadySavedActions } from './ReduxStore/Store';

const SavePost = () => {
  const hid = useRef();

  const isSaved = useSelector(state => state.isAlreadySaved);

  const post_ID = useParams();
  const dispatch = useDispatch();


  const save = async () => {
    try {
      let token = localStorage.getItem('insta-token');
      if (token && token != '') {
        let response = await axios.post(`https://insta-backend-usman.vercel.app/api/savepost?token=${token}&id=${post_ID.id}`)
        if (response.status == 200) {
          dispatch(isAlreadySavedActions.update(response.data.isSaved))
        }
      }
    } catch (error) {
      console.log("SAVING POST ERROR: ", error.message || error);
    }
  }
  
  return (
    <div onClick={save}>
      {
        isSaved == true ?
          <svg aria-label="Remove" height="24" role="img" viewBox="0 0 24 24" width="24">
            <path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path>
          </svg>
        :
          <svg aria-label="Save" fill="black" height="24" role="img" viewBox="0 0 24 24" width="24">
              <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon>
          </svg>
      }
      <div ref={hid} className='hidden'>like</div>
    </div>
  )
}

export default memo(SavePost)