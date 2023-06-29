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

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="w-[80vw] flex flex-col gap-20 justify-start  text-black font-bold">
      <Select
        placeholder="Select SubCategory"
        size="large"
        className={`w-[100%] m-auto ${id == "" ? "hidden" : "block"}`}
        onChange={(e) => {
          setSubId(e || "");
        }}
        allowClear
        onBlur={() => {
          setSubId("");
        }}
      >
        {product.map((data, i) => {
          return <Option value={data._id}>{data.name}</Option>;
        })}
      </Select>

      <Select
        placeholder="Select SubCategory"
        size="large"
        className={`w-[100%] m-auto ${id == "" ? "block" : "hidden"}`}
        allowClear
      >
        <Option>All</Option>;
      </Select>

      <div className="pb-10">
        <Product id={id} subId={subId} />
      </div>
    </div>
  );
}

export default SubCategories;
