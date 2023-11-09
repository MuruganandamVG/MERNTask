import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const BikeAssembly = (props) => {
  const currentuser =
    props.currentuser || JSON.parse(localStorage.getItem("currentuser"));
  const [response, setResponse] = useState("");
  const [selectedBike, setSelectedBike] = useState();
  const [selectedDoc, setSelectedDoc] = useState();
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [bikeAssembletime, setBikeAssembletime] = useState();
  const navigate = useNavigate();

  let minutes = Math.floor(elapsedTime / 60);
  let seconds = elapsedTime % 60;

  useEffect(() => {
    const GetData = async () => {
      const config = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await axios.get(
        `http://localhost:5000/api/approvalstatus/${currentuser._id}`,
        config
      );
      setResponse(response.data);
    };
    GetData();
  }, [currentuser]);
  const SubmitRequest = () => {
    const PostRequest = async () => {
      const data = {
        employeeId: currentuser._id,
      };
      const response = await axios.post(
        "http://localhost:5000/api/admin/approval-request",
        data,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response) {
        alert(
          "Your request has been succesfully registered..Admin will approve it..Please wait for some time"
        );
        navigate("/");
      }
    };
    PostRequest();
  };
  const stopTimer = () => {
    console.log("Stop Timer called");
    setTimerRunning(false);
    clearInterval(window.mytimer); // Clear the interval
  };

  const startTimer = () => {
    if (!timerRunning) {
      setTimerRunning(true);
      window.mytimer = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
        if (minutes >= bikeAssembletime) {
          stopTimer(); // Check if the time has reached the limit and stop the timer
        }
      }, 1000);
    }
  };

  const SubmitBikeAssembleWork = () => {
    const SubmitWork = async () => {
      try {
        const data = {
          bikeModal: selectedBike,
          bikeId: selectedDoc._id,
          TimeTaken: bikeAssembletime,
        };

        const response = await axios.post(
          `http://localhost:5000/api/employee/bikeassemble/${currentuser._id}`,
          data
        );
        if (response.status == 201) {
          alert("You have submitted your work succesfully");
        }
      } catch (err) {
        console.log(err);
      }
    };
    SubmitWork();
  };

  const HandleSelectChange = (e) => {
    setSelectedBike(e.target.value);
    const selectedDoc = response.bikedetails.find(
      (bike) => bike.modal === e.target.value
    );
    setSelectedDoc(selectedDoc);
    if (selectedDoc) {
      setBikeAssembletime(selectedDoc.assemblyTime);
      setElapsedTime(0);
    }
  };

  const logout = () => {
    const LogoutCall = async () => {
      const resp = await axios.get("http://localhost:5000/api/employee/logout");
      localStorage.removeItem("token");
      navigate("/login");
    };

    LogoutCall();
  };
  console.log(minutes, bikeAssembletime);

  //   useEffect(() => {
  //     if (!timerRunning) {
  //       return () => {
  //         clearInterval(window.timer);
  //       };
  //     }
  //   }, [setTimerRunning]);
  console.log(currentuser);
  return (
    <>
      <nav className="bg-blue-500 p-4">
        <div className="container flex justify-around ">
          <div className="text-white text-3xl">Bike Assembling Unit</div>
          <div className="text-white text-2xl">
            Welcome {currentuser ? currentuser.name : null}
          </div>
          <button
            class="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={logout}
          >
            logout
          </button>
        </div>
      </nav>
      {response ? (
        <div className="container">
          <div>
            {!currentuser.ApprovalStatus ? (
              <h1 className="text-center text-2xl mt-11">
                {response ? response.message : null}
              </h1>
            ) : (
              <div className="mt-10 text-center">
                <h2 className="text-2xl">Select Bike to Assemble</h2>

                <select
                  defaultChecked="select a bike"
                  defaultValue="Select a bike"
                  value={selectedBike}
                  onChange={HandleSelectChange}
                  className="mt-10 "
                >
                  <option value="">Select a bike</option>
                  {response.bikedetails.map((bike) => {
                    return <option value={bike.modal}>{bike.modal}</option>;
                  })}
                </select>

                <p className="mt-10">TotalAssembly time :{bikeAssembletime}</p>

                <div className="mt-10">
                  {!timerRunning ? (
                    <button
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={startTimer}
                    >
                      Start Assemble
                    </button>
                  ) : minutes >= bikeAssembletime ? (
                    <div className=" mt-10 flex justify-center">
                      <p>
                        You have completed the task..Please submit your work
                      </p>
                    </div>
                  ) : (
                    <button
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={stopTimer}
                    >
                      Stop Timer
                    </button>
                  )}
                </div>
                {minutes < bikeAssembletime ? (
                  <div className="flex justify-center">
                    <div className="mt-10 text-center w-36 h-10 bg-orange-400">
                      <p>
                        {minutes} min {seconds} sec
                      </p>
                    </div>
                  </div>
                ) : null}

                {elapsedTime > 0 ? (
                  <div className="mt-10">
                    {minutes == bikeAssembletime ? (
                      <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={SubmitBikeAssembleWork}
                      >
                        Submit the work
                      </button>
                    ) : null}
                  </div>
                ) : null}
              </div>
            )}
          </div>

          <div className="mt-10 text-center">
            {response.message === "your need Admin Approval" && (
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={SubmitRequest}
              >
                Request Approval
              </button>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default BikeAssembly;
