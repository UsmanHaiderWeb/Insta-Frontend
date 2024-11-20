import axios from 'axios';
import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { followersActions, followingsActions, isAlreadyfollowedActions } from './ReduxStore/Store';
import { useParams } from 'react-router-dom';

const FollowUser = (i) => {
    const id = useParams();

    const dispatch = useDispatch();
    const [ userID, setUserID] = useState(null);

    const postData = useSelector(state => state.postData);
    
    useEffect(() => {
        if (postData != null && !i.profile) {
            setUserID(postData.createdBy._id);
        } else if (i.profile) {
            setUserID(id.id);
        }
    }, [postData])

    const isFollowed = useSelector(state => state.isAlreadyfollowed);

    const follow = async () => {
        if (userID != null) {
            try {
                let token = localStorage.getItem('insta-token');
                if (token && token != '') {
                    let response = await axios.post(`https://insta-backend-usman.vercel.app/api/follow?token=${token}&id=${userID}`)
                    if (response.status == 200) {
                        dispatch(isAlreadyfollowedActions.update(response.data.isFollowed))
                        dispatch(followersActions.update(response.data.totalFollowers))
                        dispatch(followingsActions.update(response.data.totalFollowings))
                    }
                }
            } catch (error) {
                console.log("FOLLOWING USER ERROR: ", error);
            }
        }
    }


  return (
    <div onClick={follow} className={`py-1 px-4 ${i.profile ? "py-1 px-4" : "micro:py-2 micro:px-2 micro:text-[14px]"} rounded-md cursor-pointer ${isFollowed ? "bg-black text-white" : "bg-[#dadada] hover:bg-[#cacaca]"}`}>{isFollowed ? "Followed" : "Follow"}</div>
  )
}

export default memo(FollowUser)