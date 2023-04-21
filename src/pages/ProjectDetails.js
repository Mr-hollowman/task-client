import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'

export default function ProjectDetails() {
  const [userInfo, setUserInfo] = useState([])
  const [data, setData] = useState([])
  const [isPending, setIspending] = useState([])
  const [error, setError] = useState(false)
  const { id } = useParams()
  useEffect(() => {
    const info = JSON.parse(localStorage.getItem('user'))
    setUserInfo(info)
    setIspending(true)
    axios.get("http://192.168.1.41:8080/api/projects/" + id, { params: { id: id } })
      .then((res) => {
        if (res.status === 200) {
          setData(res.data)
          setIspending(false)
        }
      }).catch((err) => {
        setIspending(false)
        setError(err.message)
      })
  }, [])
  console.log(userInfo);
  return (
    <>
      {isPending && <div className="d-flex align-items-center mt-5 p-3 bg-white">
        <strong>Loading...</strong>
        <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
      </div>}

      {error && <span className="p-5 d-flex justify-content-center">{error}</span>}

      {!isPending && data && !error && <><div className='row m-1 text-white'>
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
      </>}
    </>
  )
}
