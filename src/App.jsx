import React, { memo, useEffect } from 'react'
import Header from './Components/Header'
import { Outlet, useNavigate } from 'react-router-dom'
import Suggestions from './Components/Suggestions'
import axios from 'axios'
import { Provider } from 'react-redux'
import ReduxStore from './Components/ReduxStore/Store'
import Loader from './Components/Loader'

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem('insta-token');
    if (token && token != '') {
      const checkIsLoggedIn = async () => {        
        let responsingData = await axios.get(`https://insta-backend-usman.vercel.app/api/r1?token=${token}`)
        if (!responsingData.data.isLoggedIn) {
          navigate('/login');
        }
      }
      checkIsLoggedIn()
    } else {
      navigate('/signup');
    }
  }, [])
  


  return (
    <Provider store={ReduxStore}>
      <div className='min-h-screen w-full flex justify-between items-start'>
        <Header />
        <Outlet />
        <Suggestions />
        <Loader loaderTime="2000" />
      </div>
    </Provider>
  )
}

export default memo(App)