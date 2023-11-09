import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
const AdminDashboard = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const navigate = useNavigate();

  const FetchPendingRequest = () => {
    const GetRequests = async () => {
      const config = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      try {
        const resp = await axios.get(
          "http://localhost:5000/api/admin/pendingRequests",
          config
        );
        const response = await resp.data;
        setPendingRequests(response["pendingRequests"]);
      } catch (err) {
        alert("You are not authorized..Please login");
        navigate("/login");
        console.log(err);
      }
    };
    GetRequests();
  };
  const HandleApproval = (id) => {
    const ApproveRequests = async () => {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/admin/approveRequests/${id}`,
          { ApprovalStatus: true },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        if (response.status === 200) {
          FetchPendingRequest();

          alert("You have approved the pending Request success");
        }
      } catch (err) {
        alert("Some Error Occured");
      }
    };
    ApproveRequests();
  };

  useEffect(() => {
    FetchPendingRequest();
  }, []);

  //   console.log(pendingRequests);
  //   console.log(typeof pendingRequests);
  //   console.log(pendingRequests.employeeId.Employee_no);
  const logout = () => {
    const LogoutCall = async () => {
      const resp = await axios.get("http://localhost:5000/api/employee/logout");
      localStorage.removeItem("token");
      navigate("/login");
    };

    LogoutCall();
  };
  console.log(pendingRequests);
  return (
    <>
      <nav className="bg-blue-500 p-4">
        <div className="container flex justify-around ">
          <div className="text-white text-3xl">Admin Dashboard</div>
          <div className="text-white text-2xl">Welcome Admin</div>
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
      <div className="container">
        <div className="mt-10 text-center">
          {pendingRequests.length != 0 ? (
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={FetchPendingRequest}
            >
              Pending Requests
            </button>
          ) : (
            <p>You don't have any requests to Approve</p>
          )}
        </div>
        {pendingRequests.length > 0 ? (
          <div className="mt-10 flex justify-center">
            <table className="w-[70%] text-sm text-left">
              <thead>
                <tr>
                  <th>Request No</th>
                  <th>Employee Name</th>
                  <th>Employee No</th>
                  <th>Request Status</th>
                </tr>
              </thead>
              <tbody>
                {pendingRequests.map((request) => {
                  return (
                    <tr
                      key={request.employeeId._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4">{request.requestNo}</td>
                      <td className="px-6 py-4">{request.employeeId.name}</td>
                      <td className="px-6 py-4">
                        {request.employeeId.Employee_no}
                      </td>
                      <td className="px-6 py-4">
                        {!request.employeeId.ApprovalStatus ? (
                          <button
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() =>
                              HandleApproval(request.employeeId._id)
                            }
                          >
                            Approve
                          </button>
                        ) : (
                          "Approved"
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default AdminDashboard;
