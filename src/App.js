import "./App.css";
import { Table, Input } from "antd";
import Categories from "./Categories";
import SubCategories from "./SubCategories";
import { useEffect, useState } from "react";
import axios from "axios";
import { isEmpty } from "lodash";

function App() {
  const [user, setUser] = useState([]);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  console.log(process.env.URL, "pob");

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://backend-filters-frontend.vercel.app/getuser"
      );
      setUser(res.data);
    } catch (er) {
      console.log(er);
    }
  };

  // const getSearch = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:4001/search");
  //     console.log(res);
  //     setData(res.data);
  //   } catch (er) {
  //     console.log(er);
  //   }
  // };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a href="">{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];

  const handleChange = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    try {
      const res = await axios.get(
        `https://backend-filters-frontend.vercel.app/search?q=${value}`
      );
      setSearchResults(res.data.result);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="!text-red-500 !w-[80vw] m-auto pt-20">
      <div className="flex items-center justify-center">
        <Input
          placeholder="Search here"
          size="large"
          className="w-[50%] !m-auto py-3"
          onChange={handleChange}
          value={searchQuery}
        />
      </div>
      <Table
        columns={columns}
        dataSource={isEmpty(searchResults) ? user : searchResults}
        className="pt-4"
      />

      <div className="flex">
        <Categories />
      </div>
    </div>
  );
}

export default App;
