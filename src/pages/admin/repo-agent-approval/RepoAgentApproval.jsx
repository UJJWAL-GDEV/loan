import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../../main";
import axios from "axios";
import Pagination from "../../../components/utils/Pagination";
import CustomTable2 from "../../../components/utils/CustomTable2";

function RepoAgentApproval() {
  const [repoAgents, setRepoAgents] = useState([]);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");


  const apiUrl = `${BASE_URL}/get-all-repo-agents`;
  const token = localStorage.getItem("token");

  const fetchData = async (currentPage) => {
    try {
      const response = await axios.get(`${apiUrl}/?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRepoAgents(response.data.agents);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChangeDevice = async (data) => {
    console.log(data);
    try {
      const response = await axios.put(
        `${BASE_URL}/change-agent-device/${data._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API Response:", response.data);
      //   toast.success("Status successfully");
    } catch (error) {
      console.error("API Request Error:", error);

      if (error.response) {
        console.error("Server responded with:", error.response.data.error);
        // const errorMessage =
        //   error.response.data.error || "An Error occured. Please try Again!";
        // toast.error(errorMessage);
      } else if (error.request) {
        console.error("No response received:", error.request);
        // toast.error("Server didn't respond. Please try again!");
      } else {
        console.error("Error setting up the request:", error.message);
        // toast.error("Something went wrong :(");
      }
    }
  };

  const handleChangePassword = async () => {
    try {
      const response = await axios.put(
        `${BASE_URL}/change-agent-password/${selectedAgent._id}`,
        { password: newPassword, confirmPassword: confirmPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API Response:", response.data);
      setShowPasswordPopup(false);
      // toast.success("Status successfully");
    } catch (error) {
      console.error("API Request Error:", error);

      if (error.response) {
        console.error("Server responded with:", error.response.data.error);
        // const errorMessage =
        //   error.response.data.error || "An Error occured. Please try Again!";
        // toast.error(errorMessage);
      } else if (error.request) {
        console.error("No response received:", error.request);
        // toast.error("Server didn't respond. Please try again!");
      } else {
        console.error("Error setting up the request:", error.message);
        // toast.error("Something went wrong :(");
      }
    }
  };

  const handlePopupClose = () => {
    setShowPasswordPopup(false);
    setSelectedAgent(null);
    setNewPassword("");
    setConfirmPassword("");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData = async (currentPage, search) => {
      try {
        const response = await axios.get(
          `${apiUrl}/?page=${currentPage}&search=${search}`,
          {
            headers:{
              Authorization: `Bearer ${token}`
            }
          }
        );
        setRepoAgents(response.data.agents);
      } catch (error) {
        console.error("Error fetching data:", error);
        return {
          data: [],
          totalPages: 0,
        };
      }
    };

    fetchData(currentPage, search);
  }, [search, currentPage]);


  useEffect(() => {
    fetchData(currentPage);
  }, [apiUrl, currentPage]);

  const columns = [
    { Header: "Seezer Id", accessor: "agentId" },
    { Header: "Name", accessor: "name" },
    { Header: "Mobile No.", accessor: "mobile" },
    { Header: "Pan Card", accessor: "panCard" },
    { Header: "Aadhaar card", accessor: "aadharCard" },
    { Header: "Username", accessor: "username" },
    {
      Header: "Status",
      Cell: ({ row }) => (
        <div className="px-2 py-1 font-extrabold text-center border border-black rounded-lg">
          {row.original.status}
        </div>
      ),
    },
    {
      Header: "Change Device",
      Cell: ({ row }) => (
        <button
          onClick={() => handleChangeDevice(row.original)}
          className="px-1 py-1 bg-green-500 text-white hover:bg-green-700 rounded-lg"
        >
          Change Device
        </button>
      ),
    },
    {
      Header: "Change Password",
      Cell: ({ row }) => (
        <button
          onClick={() => {
            setSelectedAgent(row.original);
            setShowPasswordPopup(true);
          }}
          className="px-1 py-1 font-extrabold text-center border bg-white border-black hover:bg-slate-300 rounded-lg"
        >
          Change Password
        </button>
      ),
    },
  ];

  return (
    <div className="container bg-gray-600 text-white  my-4">
      <h2 className="text-2xl font-bold mb-4">Repo Agents Approval</h2>

      <div className="w-full h-full p-4">
      <div className="mb-10">
        <div className="relative  w-full ">
          <input
            type="text"
            className="border-0.5 p-2 m-2 rounded-xl border-gray-300"
            placeholder="Search..."
            value={search || ""}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <CustomTable2 columns={columns} data={repoAgents} filterEnabled={false} />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

    </div>

      {showPasswordPopup && selectedAgent && (
        <div className="fixed top-0 left-[35%] max-w-md max-h-md flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <span
              className="close text-black text-2xl absolute top-2 right-2 cursor-pointer"
              onClick={handlePopupClose}
            >
              X
            </span>
            <h2 className="text-2xl text-black font-bold mb-4">
              Enter New Password
            </h2>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mb-4 px-3 py-2 border rounded-md w-full"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mb-4 px-3 py-2 border rounded-md w-full"
            />
            <button
              onClick={handleChangePassword}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Change Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RepoAgentApproval;
