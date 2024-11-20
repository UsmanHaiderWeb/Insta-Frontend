import axios from 'axios';
import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { isAlreadyLikedActions, totalLikesActions } from './ReduxStore/Store';

const LikePost = () => {
  const post_ID = useParams();

  const isLiked = useSelector(state => state.isAlreadyLiked);
  let dispatch = useDispatch();

  const like = async () => {
    try {
      let token = localStorage.getItem('insta-token');
      if (token && token != '') {
        let response = await axios.post(`https://insta-backend-usman.vercel.app/api/likepost?token=${token}&id=${post_ID.id}`)
        if (response.status == 200) {
          dispatch(isAlreadyLikedActions.update(response.data.isLiked))
          dispatch(totalLikesActions.update(response.data.totalLikes))
        }
      }
    } catch (error) {
      console.log("LIKE THE POST ERROR: ", error);
    }
  }

  return (
    <div onClick={like}>
      {
        isLiked ?
          <svg aria-label="Unlike" fill="#e40606" height="24" role="img" viewBox="0 0 48 48" width="24">
            <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
          </svg>
        :
          <svg xmlns="http://www.w3.org/2000/svg" width={25} viewBox="0 0 24 24" fill="black">
            <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z"></path>
          </svg>
      }
    </div>
  )
}

export default memo(LikePost)