import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function ProjectDetails() {
  const [userInfo, setUserInfo] = useState([])
  const location = useLocation()
  const { data } = location.state
  console.log(data, "locationdata");
  useEffect(() => {
    const info = JSON.parse(localStorage.getItem('user'))
    setUserInfo(info)
  }, [])
  console.log(userInfo);
  return (
    <>
      <div className='row m-1 text-white'>
        <div className='mt-2 p-4 bg-primary d-flex justify-content-between '>
          <h3>{data.title}</h3>
          <span>Budget ₹ {data.startPrice} - {data.endPrice} INR</span>
        </div>
      </div>
      <div className='container mt-3 p-4 bg-white'>
        <p>Job Description:</p>
        <p className='mx-3 text-muted'>{data.description}</p>
        <p>Skills : <span className='text-primary'>{data.tag}</span></p>
        <p>About the client:</p>
        <div className='mx-3 d-flex flex-column'>
          <span>Name: {userInfo.userName}</span>
          <span>email Id: {userInfo.email}</span>
        </div>
        <p className='mt-3'>Project Id: {data._id}</p>
        <hr></hr>
      </div>
    </>
  )
}
