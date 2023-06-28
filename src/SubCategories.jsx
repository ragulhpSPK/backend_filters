import React, { useEffect, useState } from "react";
import { Select } from "antd";
import axios from "axios";
import Product from "./Product";
import { isEmpty } from "lodash";

function SubCategories({ id }) {
  const [product, setproduct] = useState([]);
  const { Option } = Select;
  const [subId, setSubId] = useState([]);

  const fetchData = async () => {
    try {
      const result = await axios.get(`http://localhost:4001/subcat?q=${id}`);
      setproduct(result.data);
    } catch (e) {
      console.log(e);
    }
  };

  console.log(subId);

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="w-[60vw] flex flex-col gap-20 justify-start  text-black font-bold">
      <Select
        placeholder="Select SubCategory"
        size="large"
        className="w-[100%] m-auto "
        onChange={(e) => {
          setSubId(e || "");
        }}
        allowClear
      >
        {product.map((data, i) => {
          return <Option value={data.subcategory}>{data.name}</Option>;
        })}
      </Select>

      <div className="pb-10">
        <Product id={id} subId={subId} />
      </div>
    </div>
  );
}

export default SubCategories;
