import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Components/Login.jsx'
import Signup from './Components/Signup.jsx'
import Profile from './Components/Profile.jsx'
import MainContent from './Components/MainContent.jsx'
import Posts from './Components/Posts.jsx'
import Saved from './Components/Saved.jsx'
import Search from './Components/Search.jsx'
import CreatePost from './Components/CreatePost.jsx'
import Explore from './Components/Explore.jsx'
import SinglePost from './Components/SinglePost.jsx'
import Comment from './Components/Comment.jsx'
import Edit from './Components/Edit.jsx'
import Followers from './Components/Followers.jsx'
import Followings from './Components/Followings.jsx'
import Reels from './Components/Reels.jsx'
import NotFoundRoute from './Components/NotFoundRoute.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <MainContent />
      },
      {
        path: '/search',
        element: <Search />
      },
      {
        path: '/createpost',
        element: <CreatePost />
      },
      {
        path: '/explore',
        element: <Explore />
      },
      {
        path: '/reels',
        element: <Reels />
      },
      {
        path: '/profile/:id',
        element: <Profile />,
        children: [
          {path: '/profile/:id/', element: <Posts />},
          {path: '/profile/:id/saved-posts', element: <Saved />},
          {path: '/profile/:id/followers', element: <Followers />},
          {path: '/profile/:id/followings', element: <Followings />},
        ]
      },
      {
        path: '/posts/:id',
        element: <SinglePost />,
        children: [
          {path: '/posts/:id/comment', element: <Comment />}
        ]
      }
    ]
  },
  {
    path: '/editprofile/:id',
    element: <Edit />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '*',
    element: <NotFoundRoute />
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>,
)
