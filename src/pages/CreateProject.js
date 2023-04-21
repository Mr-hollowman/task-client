import { useEffect, useState } from "react";
import MyForm from "../components/common/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../config";

export default function CreateProject({ setToastHeading, setToastContent, toggleToast }) {
  const [data, setData] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem('email'))
    setData(prev => ({ ...prev, email }))
  }, [])

  const handleCreate = () => {
    axios({
      "Content-Type": "application/json",
      method: 'post',
      url: `${BaseUrl}/api/projects`,
      data: { ...data }
    }).then((res) => {
      navigate('/dashboard')

    }).catch(err => {
      setToastHeading("failed to create project")
      setToastContent(err.message)
      toggleToast()
    })
  }
  return (
    <div className="mt-5 d-flex flex-column justify-content-center align-items-center">
      <h3 className="mb-3">Create a new project</h3>
      <MyForm data={data} setData={setData} handleCreate={handleCreate} />
    </div>
  )
}
