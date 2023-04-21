import Card from "../components/Card";
import useFetch from "../utils/useFetch";

export default function ClientDashboard({ userInfo }) {
  const { data, isPending, error } = useFetch("http://192.168.1.41:8080/api/projects")
  console.log(data);
  return (
    <div>
      {isPending && <div className="d-flex align-items-center mt-5 p-3 bg-white">
        <strong>Loading...</strong>
        <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
      </div>}

      {data && !isPending && <Card userInfo={userInfo} data={data} />}
    </div>
  )
}
