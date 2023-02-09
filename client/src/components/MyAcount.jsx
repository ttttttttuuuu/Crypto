import React from 'react'
import {Link} from 'react-router-dom'
const MyAcount = () => {
  return (
    <div className='h-screen mt-10 ml-10 bold divide-y-2'>
        <h1 className='text-3xl text-white'>Account Detail</h1>
        <Link to="/changepassword">  <p className='text-yellow-500 text-base mt-5'>
            ChangePassword?
        </p></Link>
      
    </div>
  )
}

export default MyAcount