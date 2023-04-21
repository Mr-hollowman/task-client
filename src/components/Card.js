import moment from 'moment'
import { Link } from 'react-router-dom'
export default function Card({ data, userInfo }) {
    const user = JSON.parse(localStorage.getItem("user"))
    const clientData = data && data.filter((item) => item.creator === user._id.toString())
    return (
        <div>
            {userInfo.type === 'client' ?
                clientData?.map((item, index) => {
                    return (
                        <Link to={`/dashboard/${item._id}`} key={index} className="card mt-3">
                            <img src={item.img} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">{item.description}</p>
                                <p className="card-text"><small className="text-muted">{moment.utc(item.updatedAt).local().startOf('seconds').fromNow()}</small></p>
                            </div>
                        </Link>
                    )
                }) : data && data?.map((item, index) => {
                    return (
                        <Link to={`/dashboard/${item._id}`} key={index} className="card mt-3">
                            <img src={item.img} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">{item.description}</p>
                                <p className="card-text"><small className="text-muted">{moment.utc(item.updatedAt).local().startOf('seconds').fromNow()}</small></p>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}
