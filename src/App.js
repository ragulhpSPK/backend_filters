import "./App.css";
import { Table, Input } from "antd";
import Categories from "./Categories";
import SubCategories from "./SubCategories";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { isEmpty } from "lodash";
import { useReactToPrint } from "react-to-print";
import { DownloadTableExcel } from "react-export-table-to-excel";
import Print from "./print";

function App() {
  const componentPDF = useRef();
  const [user, setUser] = useState([]);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const tableRef = useRef(null);
  const [action, setAction] = useState([1]);

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

  const generatePDF = useReactToPrint({
    content: () => tableRef.current,
    documentTitle: "UserData",
    onafterprint: () => alert("Data Saved"),
  });

  // const { onDownload } = useDownloadExcel({
  //   currentTableRef: tableRef.current,
  //   filename: "Web Users",
  //   sheet: "Web Users",
  // });

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
      <DownloadTableExcel
        filename=" table"
        sheet="users"
        currentTableRef={tableRef.current}
      >
        <button className="text-white bg-green-400 px-3 py-1.5 text-center rounded-md float-right">
          Export excel
        </button>
      </DownloadTableExcel>

      <div ref={tableRef}>
        {action.map((res, index) => {
          return (
            <Table
              columns={columns}
              key={index}
              dataSource={isEmpty(searchResults) ? user : searchResults}
              className={`pt-4 ${action.length > 1 && "h-[100vh]"} `}
            />
          );
        })}
      </div>

      <button
        onClick={() => {
          setAction([1, 2, 3, 4]);
          setTimeout(() => {
            generatePDF();
          }, 1000);
          setTimeout(() => {
            setAction([1]);
          }, 1000);
        }}
        className="text-white bg-green-400 px-3 py-1 rounded-md  z-40 !cursor-pointer "
      >
        Download PDF
      </button>

      <div className="flex">
        <Categories />
      </div>
      <Print />
    </div>
  );
}

export default App;
