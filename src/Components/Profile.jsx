import React, { memo, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import ProfilePostCount from './ProfilePostCount'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { createdPostsActions, editableActions, followersActions, followingsActions, isAlreadyfollowedActions, isRequestedUserExistActions, savedPostsActions } from './ReduxStore/Store'
import FollowUser from './FollowUser'
import NotFoundRoute from './NotFoundRoute'
import Loader from './Loader'

const Profile = () => {
    const [ userData, setData ] = useState(null);

    const user_ID = useParams();

    const isProfileEditable = useSelector(state => state.isProfileEditable);
    const isRequestedUserExist = useSelector(state => state.isRequestedUserExist);
    const dispatch = useDispatch();

    const [showLogout, toggleLogout] = useState(false);
    const navigate = useNavigate();
  
    const logout = async () => {
      localStorage.removeItem('token');
      navigate('/signup');
    }



    useEffect(() => {
        window.scrollTo(0, 0);

        ;(async function() {
            try {
                let token = localStorage.getItem('insta-token');
                if (token && token != '') {
                    let profiledata = await axios.get(`https://insta-backend-usman.vercel.app/api/profile?token=${token}&id=${user_ID.id}`)
                    if (profiledata.status == 200) {
                        dispatch(savedPostsActions.update(profiledata.data.user.savedPosts));
                        dispatch(createdPostsActions.update(profiledata.data.user.posts));
                        dispatch(editableActions.update(profiledata.data.editable))
                        dispatch(followersActions.update(profiledata.data.user.followers))
                        dispatch(followingsActions.update(profiledata.data.user.followings))
                        dispatch(isRequestedUserExistActions.update(true))
                        if (!profiledata.data.editable) {
                            dispatch(isAlreadyfollowedActions.update(profiledata.data.isFollowed))
                        }
                        setData(profiledata.data.user);
                    } else if (profiledata.data.dataFound == false) {
                        dispatch(isRequestedUserExistActions.update(false))
                    }
                }
            } catch (error) {
                console.log("GETTING PROFILE DATA ERROR: ", error);
            }
        })();
    }, [user_ID.id])

return (<>
    <Loader loaderTime="1100" />
    {isRequestedUserExist ?
        <div className='w-full md:w-[calc(100vw-620px)] sm:w-[calc(100vw-270px)] lgtab:w-[calc(100vw-90px)] tablet:w-[calc(100vw-90px)] mini:w-screen mobile:w-screen micro:w-screen flex justify-start items-center flex-col pt-14 mini:pt-6 mobile:pt-6 micro:pt-6 px-5 micro:px-0 mobile:px-0 md:px-5 xl:px-16 2xl:px-24 sm:px-7 mini:pb-36 mobile:pb-32 micro:pb-32 sm:pb-20 overflow-hidden'>
            <div className='w-full flex justify-center items-center lg:items-start lgtab:items-start micro:flex-col md:flex-col lg:flex-row gap-x-5 md:gap-x-10 xl:gap-x-10 lg:gap-x-5'>
                <div className='xl:w-40 xl:h-40 lg:w-32 lg:h-32 md:w-40 md:h-40 sm:w-36 sm:h-36 lgtab:w-36 lgtab:h-36 tablet:w-32 tablet:h-32 mini:w-32 mini:h-32 mobile:w-28 mobile:h-28 micro:w-28 micro:h-28 rounded-full border-[1px] overflow-hidden'>
                    <img src={userData == null? "" : userData.dp} className='w-full h-full object-cover object-center rounded-full' />
                </div>
                <div className='pt-5 flex justify-center items-start micro:items-center md:items-center lg:items-start flex-col gap-x-14'>
                    <div className='flex justify-center items-start xl:items-center lg:items-start md:items-center micro:items-center lgtab:items-center flex-col md:flex-col  xl:flex-row lgtab:flex-row gap-x-14 gap-y-3'>
                        <div>
                            <h1 className='micro:text-center text-[35px] leading-[40px] xl:text-[35px] xl:leading-[40px] lg:text-[30px] lg:leading-[35px] tablet:text-[30px] tablet:leading-[35px] mini:text-[25px] mini:leading-[30px] mobile:text-[25px] mobile:leading-[30px] micro:text-[25px] micro:leading-[30px]'>{userData == null? "" : userData.username}</h1>
                            <p className='micro:text-center'>{userData == null? "" : userData.email}</p>
                        </div>
                        <div className='flex justify-start items-center gap-x-2'>
                            {isProfileEditable ? <>
                                <Link to={`/editprofile/${userData == null? "" : userData._id}`} className='micro:text-center bg-[#dadada] hover:bg-[#cacaca] px-3 pb-1 pt-[6px] text-[14px] rounded-md overflow-hidden text-nowrap whitespace-nowrap'>Edit Profile</Link>
                                <button className='hidden mini:block mobile:block micro:block micro:text-center bg-[#dadada] hover:bg-[#cacaca] px-3 pb-1 pt-[6px] text-[14px] rounded-md overflow-hidden text-nowrap whitespace-nowrap' onClick={() => logout()}>Logout</button>
                            </> :
                                <FollowUser profile={true} />
                            }
                        </div>
                    </div>
                    <div className="micro:hidden mini:hidden mobile:hidden">
                        <ProfilePostCount mobile={false} />
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center items-center micro:block mini:block mobile:block">
                <ProfilePostCount mobile={true}/>
            </div>
            <div className='w-full flex justify-center items-center flex-col'>
                <Outlet />
            </div>
        </div>
        :
        <NotFoundRoute />
    }
    {/* <Loader /> */}
</>)}

export default memo(Profile)