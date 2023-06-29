import React, { useEffect, useState } from "react";
import axios from "axios";
import { isEmpty } from "lodash";
import { Input } from "antd";

function Product({ id, subId }) {
  const [products, setProducts] = useState([]);
  const [searched, setSearched] = useState([]);

  const fetchData = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4001/getpro?q=${id}&sub=${subId}&search=${searched}`
      );
      setProducts(result.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, subId, searched]);
  const handleSearch = () => {
    // Perform search logic here

    // Clear input and remove focus
    setSearched("");
    document.activeElement.blur();
  };

  return (
    <div className="flex flex-col w-[80vw] pb-20">
      <Input
        placeholder="Search here"
        size="large"
        className="w-[50%] !m-auto py-3"
        onChange={(e) => {
          setSearched(e.target.value);
        }}
        value={searched}
        onBlur={() => setSearched("")}
      />
      <div className="flex flex-row w-[80vw] flex-wrap">
        {products.map((data, i) => {
          return (
            <div key={i} className=" pl-20  pt-20  p-2 text-black">
              <div className="bg-white w-32 py-10 flex flex-col  rounded-md items-center">
                <h1>{data.name}</h1>
                <p>{data.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Product;
