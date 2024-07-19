import { FaFilter } from "react-icons/fa";
import AdoptionRandom from "../components/AdoptionPost/AdoptionRandom";
import UserNav from "../components/UserNav";
const ViewAdoptionPost = () => {
  return (
    <div>
      <UserNav />
      <div className="mt-20 p-10">
        <div className="flex">
          <label htmlFor="filter">
            <FaFilter size={25} />
          </label>

          <select id="filter">
            <option value="all">All</option>
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
          </select>
        </div>

        <AdoptionRandom />
      </div>
    </div>
  );
};

export default ViewAdoptionPost;
