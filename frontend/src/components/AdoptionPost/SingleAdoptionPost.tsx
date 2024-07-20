import { useParams } from "react-router"
import UserNav from "../UserNav"

function SingleAdoptionPost() {
    const {id} =useParams()
    return (
        <div>
            <UserNav/>
            <div className="mt-20">
            {id}
            </div>
        </div>
    )
}

export default SingleAdoptionPost
