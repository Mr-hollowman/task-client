import React, { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
  from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setUserInfo }) {
  const [isLogin, setIsLogin] = useState(true)
  const [credinals, setcredinals] = useState({})
  const navigate = useNavigate()

  const handleCredinals = (e) => {
    setcredinals((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    console.log(credinals.type,"type")
  }

  useEffect(() => {
    const isLoggedUser = localStorage.getItem("user")
    if (isLoggedUser) {
      navigate("/dashboard")
    }
  })

  const handleLogin = () => {
    if (JSON.stringify(credinals) === '{}') {
      alert("please fill the credinals")
    }
    else {
      axios({
        "Content-Type": "application/json",
        method: 'post',
        url: `http://192.168.1.41:8080/api/auth/${isLogin ? "signin" : "signup"}`,
        data: { ...credinals }
      }).then((response) => {
        if (response.status === 200) {
          localStorage.setItem("user", JSON.stringify(response.data))
          setUserInfo(response.data)
          navigate("/dashboard")
        }
      }).catch((err) => console.log(err.message))
    }
  }
  return (
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <h2 className="fw-bold mb-2 text-center">{isLogin ? "Sign in" : "Sign Up"}</h2>
              <p className="text-white-50 mb-3">Please enter your login and password!</p>

              <MDBInput onChange={handleCredinals} required name='userName' wrapperClass='mb-4 w-100' label='Email address' id='formControlLg' type='text' size="lg" />
              <MDBInput onChange={handleCredinals} required name='password' wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type='password' size="lg" />
              {
                !isLogin && <>
                  <MDBInput onChange={handleCredinals} required name='email' wrapperClass='mb-4 w-100' label='Email address' id='formControlLg' type='email' size="lg" />
                  <MDBInput onChange={handleCredinals} required name='phone' wrapperClass='mb-4 w-100' label='Phone number' id='formControlLg' type='number' size="lg" />
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
              <MDBBtn size='lg' onClick={handleLogin} >
                {isLogin ? "Login" : "Signup"}
              </MDBBtn>

              <hr className="my-4" />

              <MDBBtn className="mb-2 w-100" size="lg" style={{ backgroundColor: '#dd4b39' }}>
                <MDBIcon fab icon="google" className="mx-2" />
                Sign in with google
              </MDBBtn>

              <p style={{ cursor: "pointer" }} onClick={() => setIsLogin(!isLogin)} >already user? click <span style={{ color: "blue" }}>here</span> to login</p>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default Login;