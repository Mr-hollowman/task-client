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

function Login({setUserInfo}) {
  const [credinals, setcredinals] = useState({})
  const navigate = useNavigate()

  console.log(credinals);
  const handleCredinals = (e) =>{
    setcredinals((prev)=>({...prev, [e.target.name]: e.target.value}))
  }

  useEffect(()=>{
    const isLoggedUser = localStorage.getItem("user")
    if(isLoggedUser){
      navigate("/dashboard")
    }
  })

  const handleLogin = ()=>{
    if(JSON.stringify(credinals) === '{}'){
      alert("please fill the credinals")
    }
    else{
      axios({
        "Content-Type":"application/json",
        method: 'post',
        url: "http://192.168.1.41:8080/api/auth/signin",
        data: {...credinals}
      }).then((response)=>{
        localStorage.setItem("user", JSON.stringify(response.data))
        setUserInfo(response.data)
        navigate("/dashboard")
      }).catch((err)=>console.log(err.message))
    }
  }
  return (
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <h2 className="fw-bold mb-2 text-center">Sign in</h2>
              <p className="text-white-50 mb-3">Please enter your login and password!</p>

              <MDBInput onChange={handleCredinals} name='userName' wrapperClass='mb-4 w-100' label='Email address' id='formControlLg' type='email' size="lg"/>
              <MDBInput onChange={handleCredinals} name='password' wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type='password' size="lg"/>

              <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />

              <MDBBtn size='lg' onClick={handleLogin} >
                Login
              </MDBBtn>

              <hr className="my-4" />

              <MDBBtn className="mb-2 w-100" size="lg" style={{backgroundColor: '#dd4b39'}}>
                <MDBIcon fab icon="google" className="mx-2"/>
                Sign in with google
              </MDBBtn>

              <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#3b5998'}}>
                <MDBIcon fab icon="facebook-f" className="mx-2"/>
                Sign in with facebook
              </MDBBtn>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default Login;