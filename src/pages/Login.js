import React, { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
}
  from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../config';

function Login({ setUserInfo, setToastHeading, setToastContent, toggleToast }) {
  const [isLogin, setIsLogin] = useState(true)
  const [credinals, setcredinals] = useState({})
  const navigate = useNavigate()

  const handleCredinals = (e) => {
    setcredinals((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  useEffect(() => {
    const isLoggedUser = localStorage.getItem("user")
    if (isLoggedUser) {
      navigate("/dashboard")
    }
  })

  const handleLogin = (e) => {
    e.preventDefault()
    if (JSON.stringify(credinals) === '{}') {
      alert("please fill the credinals")
    }
    else {
      axios({
        "Content-Type": "application/json",
        method: 'post',
        url: `${BaseUrl}/api/auth/${isLogin ? "signin" : "signup"}`,
        data: { ...credinals }
      }).then((response) => {
        if (response.status === 200) {
          if (isLogin) {
            localStorage.setItem("user", JSON.stringify(response.data))
            setUserInfo(response.data)
            navigate("/dashboard")
          }
          if (!isLogin) {
            setToastHeading("Signup Success")
            setToastContent("User created successfully, Please login with credinals")
            toggleToast()
            setIsLogin(!isLogin)
          }
        }
      }).catch((err) => {
        setToastHeading(isLogin ? "Login failed" : "Signup failed")
        setToastContent(err.message)
        toggleToast()
      })
    }
  }
  return (
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-4 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className='w-100 d-flex flex-column'>

              <h2 className="fw-bold mb-3 text-center">{isLogin ? "Sign in" : "Sign Up"}</h2>
              <form onSubmit={handleLogin}>
                <div className="form-floating mb-3">
                  <input required name="userName" type="text" className="form-control" id="floatingInput" placeholder="Enter Title" onChange={handleCredinals} />
                  <label for="floatingInput">UserName</label>
                </div>
                <div className="form-floating mb-3">
                  <input required name="password" type="password" className="form-control" id="floatingInput" placeholder="Enter Title" onChange={handleCredinals} />
                  <label for="floatingInput">Password</label>
                </div>
                {
                  !isLogin && <>
                    <div className="form-floating mb-3">
                      <input required name="email" type="email" className="form-control" id="floatingInput" placeholder="Enter Email" onChange={handleCredinals} />
                      <label for="floatingInput">Email</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input required name="phone" type="number" className="form-control" id="floatingInput" placeholder="Enter Number" onChange={handleCredinals} />
                      <label for="floatingInput">Phone Number</label>
                    </div>
                    <div className="form-floating mb-3">
                      <select name="type" className="form-select" required id="floatingSelect" aria-label="Floating label select example" onChange={handleCredinals}>
                        <option selected value=''>Please select user type</option>
                        <option value="client">Client</option>
                        <option value="user">FreeLauncer</option>
                      </select>
                      <label for="floatingSelect">User Type</label>
                    </div>
                  </>
                }
                <div className='text-center'>
                  <MDBBtn type='submit' size='lg' >
                    {isLogin ? "Login" : "Signup"}
                  </MDBBtn>
                </div>
              </form>

              <hr className="my-3" />

              <MDBBtn onClick={()=>alert("not implemented")} className="mb-2 w-100" size="lg" style={{ backgroundColor: '#dd4b39' }}>
                <MDBIcon fab icon="google" className="mx-2" />
                Sign in with google
              </MDBBtn>

              {isLogin && <p style={{ cursor: "pointer" }} onClick={() => setIsLogin(!isLogin)} >New user? click <span style={{ color: "blue" }}>here</span> to Signup</p>}
              {!isLogin && <p style={{ cursor: "pointer" }} onClick={() => setIsLogin(!isLogin)} >already user? click <span style={{ color: "blue" }}>here</span> to login</p>}

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default Login;