import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import { BaseUrl } from '../config'

export default function ProjectDetails() {
  const [userInfo, setUserInfo] = useState([])
  const [data, setData] = useState(null)
  const [isPending, setIspending] = useState([])
  const [error, setError] = useState(false)
  const [bitValue, setBitValue] = useState(null)
  const { id } = useParams()
  console.log(data, "after add bit")
  console.log(userInfo, "userinfo")
  useEffect(() => {
    const info = JSON.parse(localStorage.getItem('user'))
    setUserInfo(info)
    setIspending(true)
    axios.get(`${BaseUrl}/api/projects/` + id, { params: { id: id } })
      .then((res) => {
        if (res.status === 200) {
          setData(res.data)
          setIspending(false)
        }
      }).catch((err) => {
        setIspending(false)
        setError(err.message)
      })
    // alreadySubscribed()
  }, [])
  // console.log(data);

  const submitBit = () => {
    axios({
      method: "POST",
      url: `${BaseUrl}/api/projects/` + id,
      params: { id: id },
      data: { ...userInfo, bitValue }
    }).then((res) => {
      setData(res.data)
    })
  }

  const alreadySubscribed = () => {
    const isSubscribed = data && data.bits.length > 0 && data.bits.filter((item) => item._id === userInfo._id)
    return isSubscribed
  }
  const isAlreadySubscribed = useMemo(() => alreadySubscribed(), [data])


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
          <p className='mx-3 w-80 text-muted'>{data.description}</p>
          <p>Skills : <span className='text-primary'>{data.tag}</span></p>
          <p>About the client:</p>
          <div className='mx-3 d-flex flex-column'>
            <span>Name: {userInfo.userName}</span>
            <span>email Id: {userInfo.email}</span>
          </div>
          <p className='mt-3'>Project Id: {data._id}</p>
          <hr></hr>
          {
            userInfo?.type === 'user' ? !isAlreadySubscribed ? <div className="form-floating mb-3">
              <input name="bitValue" type="number" className="form-control" id="floatingInput" placeholder="Enter bit value" onChange={(e) => setBitValue(e.target.value)} />
              <label for="floatingInput">Title</label>
              <button className='btn btn-primary' onClick={submitBit}>Submit bit</button>
            </div> : <div>You already raised bit</div> :
              <div>
                <h5>Subscribed Users</h5>
                <p>Total Subscribers : {data && data.bits.length}</p>
                {
                  data && data.bits.length > 0 && data?.bits.map((item, index) => {
                    return (<div className='list-group list-group-light border p-2 mb-2' key={index}>
                      <span className=''>Name: {item.userName}</span>
                      <span className=''>Email: {item.email}</span>
                      <span className=''>Phone: {item.phone}</span>
                      <span className=''>bit Value: ₹{item.bitValue}</span>
                      <span className='text-muted'>to Make a call click <a className='text-primary' href={`tel:+91${item.phone}`}>here</a></span>
                      <span className='text-muted'>to send email <a className='text-primary' href={`mailto:${item.email}`}>here</a></span>
                    </div>)
                  })
                }
              </div>
          }
        </div>
      </>}
    </>
  )
}
