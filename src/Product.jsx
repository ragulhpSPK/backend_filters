import React, { useEffect, useState } from "react";
import axios from "axios";
import { isEmpty } from "lodash";

function Product({ id, subId }) {
  const [products, setProducts] = useState([]);

  console.log(id, "id");
  console.log(subId, "subId");

  const fetchData = async () => {
    try {
      const result = await axios.get(
        `https://backend-filters-frontend.vercel.app/getpro?q=${id}&sub=${subId}`
      );
      setProducts(result.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, subId]);
  return (
    <div className="flex ">
      {products.map((data, i) => {
        return (
          <div
            key={i}
            className=" w-full flex justify-between  gap-10 p-2 text-black"
          >
            <div className="bg-white w-32 py-10 flex flex-col rounded-md items-center">
              <h1>{data.name}</h1>
              <p>{data.price}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Product;
