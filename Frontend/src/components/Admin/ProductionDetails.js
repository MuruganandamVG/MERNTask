import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Chart from "./Chart";
import { useNavigate } from "react-router-dom";
const ProductionDetails = () => {
  const [Employee_No, setEmployee_No] = useState();
  const [ProductionData, setProductionData] = useState();
  const [fromdate, setFromdate] = useState();
  const [todate, setTodate] = useState();
  const navigate = useNavigate();
  console.log(Employee_No);
  console.log(fromdate);
  console.log(todate);

  const logout = () => {
    localStorage.removeItem("currentuser");
    localStorage.removeItem("token");
    navigate("/admin");
  };

  const GetData = (e) => {
    e.preventDefault();
    const FetchData = async () => {
      const QueryParams = {
        fromdate: String(fromdate),
        todate: String(todate),
      };
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/production/${Employee_No}`,
          {
            params: QueryParams,
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setProductionData(response.data);
      } catch (err) {
        navigate("/admin");

        console.log(err);
      }
    };
    FetchData();
  };
  console.log(ProductionData);
  return (
    <div>
      <nav className="bg-blue-500 p-4">
        <div className="container flex justify-around ">
          <div className="text-white text-3xl">
            Employee Performance Dashboard
          </div>
          <ul>
            <li className="text-white text-xl">
              <Link to="/productiondetails">productiondetails</Link>
            </li>
          </ul>
          <button
            class="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={logout}
          >
            logout
          </button>
        </div>
      </nav>

      <div className="container mt-10 mx-auto max-w-sm ">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={GetData}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="employee_no"
            >
              Employee No
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="emmployee_no"
              type="employee_mp"
              placeholder="Employee_No"
              value={Employee_No}
              onChange={(e) => setEmployee_No(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="fromdate"
            >
              From Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="fromdate"
              type="date"
              value={fromdate}
              onChange={(e) => setFromdate(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="todate"
            >
              To Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="todate"
              type="date"
              value={todate}
              onChange={(e) => setTodate(e.target.value)}
            />
          </div>
          <div className="text-center ">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Get Data
            </button>
          </div>
        </form>
      </div>
      {ProductionData && (
        <div className="container mx-auto max-w-lg">
          <div className="mt-10 mb-10 flex justify-center flex-col">
            <div className="text-xl text-center mb-10">
              <h1 className="text-blue-600">
                Employee Production During the Period
              </h1>
              <p className="text-orange-600 mt-10">
                Total Time Spent is{" "}
                {ProductionData && ProductionData.TotalTimeSpent}
              </p>
            </div>
            {ProductionData && <Chart data={ProductionData} />}
            <p className="text-center text-violet-900">
              Bike Modal Vs No of Bikes Assembled
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductionDetails;
