import Card from "../components/Card";
import { useState } from "react";
import { getAllHouses } from './../../lib/allHouses';

export const getServerSideProps = async() =>{
  
  const houses = await getAllHouses();
  return {
    props:{
      houses,
    }
  }
}

const House = ({houses}) => {
  const [search, setSearch] = useState("");
  return (
    <div className="h-full bg-gray-100">
      <div className="flex flex-col items-center justify-center">
        <input
          className=" p-3 border-2 border-gray-200 rounded-lg w-96 m-2"
          type="search"
          placeholder="Search Location"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="mt-10 grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-y-10">
        {[
          houses
            .filter((house) => {
              if (search == "") return house;
              if (
                house.location
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase())
              )
                return house;
            })
            .map((house) => <Card details={house} key={house.id} />),
        ]}
      </div>
    </div>
  );
};
export default House;

