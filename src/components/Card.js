import moment from 'moment'
import { Link } from 'react-router-dom'
export default function Card({ data }) {
    return (
        <div>
            {data && data.map((item, index) => {
                return (
                    <Link to={`/dashboard/${item._id}`} key={index} class="card mt-3">
                        <img src={item.img} class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">{item.title}</h5>
                            <p class="card-text">{item.description}</p>
                            <p class="card-text"><small class="text-muted">{moment.utc(item.updatedAt).local().startOf('seconds').fromNow()}</small></p>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}
