import { BaseUrl } from "../config";
import Card from "../components/Card";
import useFetch from "../utils/useFetch";

export default function Dashboard({ userInfo }) {
  const { data, isPending, error } = useFetch(`${BaseUrl}/api/projects`)
  return (
    <div className="container">
      {isPending && <div className="d-flex align-items-center mt-5 p-3 bg-white">
        <strong>Loading...</strong>
        <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
      </div>}
      {error && <span className="p-5 d-flex justify-content-center">{error.message}</span>}
      {data && !isPending && !error && <Card userInfo={userInfo} data={data} />}
    </div>
  )
}
