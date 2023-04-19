import { useEffect, useState } from "react";
import Form from "../components/common/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateProject() {
  const [data, setData] = useState({})
  const navigate = useNavigate()

  useEffect(()=>{
    const email = JSON.parse(localStorage.getItem('email'))
    setData(prev=>({...prev, email}))
  },[])

  const handleCreate = () =>{
    axios({
      "Content-Type":"application/json",
        method: 'post',
        url: "http://192.168.1.41:8080/api/projects",
        data: {...data}
    }).then((res)=>{
      navigate('/dashboard')
    })
  }
  return (
      <div className="mt-5 d-flex flex-column justify-content-center align-items-center">
        <h3 className="mb-3">Create a new project</h3>
        <Form data={data} setData={setData} handleCreate={handleCreate} />
      </div>
  )
}
