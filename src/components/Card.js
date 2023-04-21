import moment from 'moment'
import { Link } from 'react-router-dom'
export default function Card({ data, userInfo }) {
    const user = JSON.parse(localStorage.getItem("user"))
    const clientData = data && data.filter((item) => item.creator === user._id.toString())
    console.log(clientData);
    return (
        <div>
            {clientData.length === 0 && <span className='p-5 d-flex justify-content-center'>No projects to show, please create new project or try after sometimes</span> }
            {userInfo.type === 'client' ?
                clientData?.map((item, index) => {
                    return (
                        <Link to={`/dashboard/${item._id}`} state={{ data: item }} key={index} className="card mt-3">
                            {/* <img src={item.img} className="card-img-top" style={{width:"100%", height:"150px"}} alt="..." /> */}
                            <div className="card-body border-primary">
                                <div className='d-flex justify-content-between align-items-center mb-2'>
                                <h5 className="card-title">{item.title}</h5>
                                <span>Value ₹ <span className='font-bold blockquote'>{item.price}</span></span>
                                </div>
                                <p className="card-text text-muted">{item.description}</p>
                                <p className="card-text"><small className="text-muted">{moment.utc(item.updatedAt).local().startOf('seconds').fromNow()}</small></p>
                                <p className="card-text" style={{ color: "blue" }}>{item.tag}</p>
                            </div>
                        </Link>
                    )
                }) : data && data?.map((item, index) => {
                    return (
                        <Link to={`/dashboard/${item._id}`} state={{ data: item }}  key={index} className="card mt-3">
                            {/* <img src={item.img} className="card-img-top" alt="..." /> */}
                            <div className="card-body border-primary">
                                <div className='d-flex justify-content-between align-items-start mb-2'>
                                <h5 className="card-title">{item.title}</h5>
                                <span className="card-title">Value ₹ <span className='mark'>{item.price}</span></span>
                                </div>
                                <p className="card-text text-muted">{item.description}</p>
                                <p className="card-text"><small className="text-muted">{moment.utc(item.updatedAt).local().startOf('seconds').fromNow()}</small></p>
                                <p className="card-text" style={{ color: "blue" }}>{item.tag}</p>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}
