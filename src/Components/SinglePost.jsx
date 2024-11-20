import axios from 'axios';
import React, { memo, useEffect } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom';
import ALLComment from './ALLComment';
import SavePost from './SavePost';
import LikePost from './LikePost';
import { useDispatch, useSelector } from 'react-redux';
import { commentsActions, isAlreadyfollowedActions, isAlreadyLikedActions, isAlreadySavedActions, isRequestedUserExistActions, postDataActions, totalLikesActions } from './ReduxStore/Store';
import FollowUser from './FollowUser';
import PostVideoShow from './PostVideoShow';
import NotFoundRoute from './NotFoundRoute';
import Loader from './Loader';

const SinglePost = () => {
    const postData = useSelector(state => state.postData)
    const comments = useSelector(state => state.comments)
    const isAlreadySaved = useSelector(state => state.isAlreadySaved)
    const isAlreadyLiked = useSelector(state => state.isAlreadyLiked)
    const isAlreadyfollowed = useSelector(state => state.isAlreadyfollowed)
    const totalLikes = useSelector(state => state.totalLikesOnPost)
    const isRequestedUserExist = useSelector(state => state.isRequestedUserExist);

    const post_ID = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);

        ;(async function () {
            try {
                let token = localStorage.getItem('insta-token');
                if (token && token != '') {
                    let response = await axios.get(`https://insta-backend-usman.vercel.app/api/getsinglepost?token=${token}&id=${post_ID.id}`);
                    if (response.status == 200) {
                        dispatch(postDataActions.update(response.data.post))
                        dispatch(commentsActions.update(response.data.postComments))
                        dispatch(isAlreadySavedActions.update(response.data.isSaved))
                        dispatch(isAlreadyLikedActions.update(response.data.isLiked))
                        dispatch(isAlreadyfollowedActions.update(response.data.isFollowed))
                        dispatch(totalLikesActions.update(response.data.post.likes.length))
                        dispatch(isRequestedUserExistActions.update(true))
                    } else if (response.status == 204 || response.status == 210 || !response.data.dataFound) {
                        dispatch(isRequestedUserExistActions.update(false))
                    }
                }
            } catch (error) {
                console.log("GETTING SINGLE POST ERROR: ", error);
            }
        })();
    }, [])

return (<>
    <Loader loaderTime="1100" />
    {isRequestedUserExist ?
        <div className='w-full md:w-[calc(100vw-620px)] sm:w-[calc(100vw-270px)] lgtab:w-[calc(100vw-90px)] tablet:w-[calc(100vw-90px)] mini:w-screen mobile:w-screen micro:w-screen flex justify-start items-center flex-col pt-4 mini:pt-0 mobile:pt-0 micro:pt-0 px-5 micro:px-0 mobile:px-0 md:px-5 xl:px-16 2xl:px-24 sm:px-7 mini:pb-36 mobile:pb-32 micro:pb-32 sm:pb-20 overflow-hidden mobile:bg-[#edeae966] micro:bg-[#edeae966]'>
            <div className='w-[450px] lg:w-[450px] md:w-[98%] tablet:w-[410px] mini:w-[90%] mini:min-w-[400px] mobile:w-full micro:w-full overflow-hidden pt-2 micro:pt-4 mobile:pt-4 mini:pt-4 bg-[#edeae966]'>
                <div className='w-full flex justify-between items-center micro:items-start px-3'>
                    <Link to={postData != null && `/profile/${postData.createdBy._id}`} className='flex justify-between items-center gap-x-3'>
                        <div className='w-12 h-12 micro:mb-2 rounded-full overflow-hidden' style={{boxShadow: "0px 0px 5px 0.5px black"}}>
                            <img src={postData == null ? "" : postData.createdBy.dp} className='w-full h-full object-cover object-center' />
                        </div>
                        <div>
                            <h3 className='text-[17px] leading-[20px] font-semibold'>{postData == null ? "" : postData.createdBy.username}</h3>
                            <p className='text-[12px] opacity-75 text-wrap font-sans'>{postData == null ? "" : postData.createdBy.email}</p>
                        </div>
                    </Link>
                    <div className='flex justify-center items-center gap-x-3'>
                        <Link to={postData != null && `/profile/${postData.createdBy._id}`} className='hidden lgtab:block sm:block lg:block py-1 px-4 rounded-md bg-[#dadada] hover:bg-[#cacaca]'>View</Link>
                        <FollowUser />
                    </div>
                </div>
                <p className='leading-[20px] my-3 px-3'>{postData == null ? "" : postData.description}</p>
                <div className="min-h-10 relative">
                    {(postData != null && postData.isVideo && postData.isVideo == true) ?
                        <PostVideoShow image={postData.image} />
                        :
                        <img src={postData != null ? postData.image : ""} className={`w-full min-h-10 max-h-[550px] object-cover object-center bg-red-300`} />
                    }
                </div>
                <div className='w-full px-3 flex justify-between items-center py-3'>
                    <div className='flex justify-start items-center gap-x-3'>
                        <LikePost />
                        <svg aria-label="Share" fill="black" height="24" role="img" viewBox="0 0 24 24" width="24">
                            <line fill="none" stroke="black" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line>
                            <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="black" strokeLinejoin="round" strokeWidth="2"></polygon>
                        </svg>
                        <SavePost />
                    </div>
                    <Link to={`/posts/${post_ID.id}/comment`}>
                        <svg aria-label="Comment" fill="black" height="24" role="img" viewBox="0 0 24 24" width="24">
                            <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="black" strokeLinejoin="round" strokeWidth="2"></path>
                        </svg>
                    </Link>
                    <Outlet />
                </div>
                <div className='w-full mb-3 flex justify-between items-center px-3'>
                    <div className='flex justify-center items-center'>
                        <div className="flex justify-start items-center">
                            <img src="/bulb.svg" />
                            <img src="/thumb.svg" className='-translate-x-1' />
                            <img src="/heart.svg" className='-translate-x-2' />
                        </div>
                        <div>{totalLikes} likes</div>
                    </div>
                    <div>{comments.length} comments</div>
                </div>
                <ALLComment />
            </div>
        </div>
        :
        <NotFoundRoute />
    }
    </>)
}

export default memo(SinglePost)