import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";
import SubCategories from "./SubCategories";

function Categories() {
  const [categories, setCategories] = useState();
  const [id, setId] = useState([]);

  const fetchData = async () => {
    try {
      const result = await axios.get(
        "https://backend-filters-frontend.vercel.app/getcat"
      );
      setCategories(result.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = async (id) => {
    // try {
    //   const result = await axios.get(`http://localhost:4001/getpro?q=${id}`);
    //   console.log(result);
    // } catch (e) {
    //   console.log(e);
    // }
    setId(id);
  };

  return (
    <div className="flex flex-col ">
      <div className="w-[80vw] flex items-center justify-center pt-20 flex-wrap gap-40 text-white font-bold">
        <div
          className="bg-violet-400 py-1 px-3 rounded-md cursor-pointer"
          onClick={() => {
            setId("");
          }}
        >
          All
        </div>
        {categories?.map((data, i) => {
          return (
            <div
              key={i}
              className={`${
                data.name === "Mobiles"
                  ? "bg-green-400"
                  : data.name === "Earbuds"
                  ? "bg-red-400"
                  : data.name === "Laptops"
                  ? "bg-blue-400"
                  : "bg-pink-400"
              } py-1.5 px-3.5 rounded-md cursor-pointer`}
              onClick={() => {
                handleClick(data._id);
              }}
            >
              {data.name}
            </div>
          );
        })}
        <SubCategories id={id} />
      </div>
    </div>
  );
}

export default Categories;
