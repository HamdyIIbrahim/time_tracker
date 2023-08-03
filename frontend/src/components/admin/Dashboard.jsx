import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
const Dashboard = () => {
  const [data, setData] = useState(null);
  function getData() {
    axios
      .get("https://time-tracker-jw9p.onrender.com/tracker/all-Tracks")
      .then((res) => {
        setData(res.data);
      });
  }
  useEffect(() => {
    getData();
  }, []);

  function confirm(id, status) {
    axios
      .put("https://time-tracker-jw9p.onrender.com/tracker/update-status", {
        id: id,
        status: status,
      })
      .then((res) => {
        toast.success(res.data);
        getData();
      });
  }
  return (
    <div className="parentCard text-gray-900 bg-gray-200 h-100">
      <div className="p-4 flex">
        <h1 className="text-3xl">ALL Employees Time Trackers</h1>
      </div>
      <div className="px-3 py-4 flex justify-center">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <tbody>
            <tr className="border-b">
              <th className="text-center p-3 px-5">Name</th>
              <th className="text-center p-3 px-5">Email</th>
              <th className="text-center p-3 px-5">Full Time</th>
              <th className="text-center p-3 px-5">work From Home</th>
              <th className="text-center p-3 px-5">over Time</th>
              <th className="text-center p-3 px-5">Total hours</th>
              <th className="text-center p-3 px-5">Excel sheet</th>
              <th className="text-center p-3 px-5">Date</th>
              <th className="text-center p-3 px-5">Status</th>
              <th></th>
            </tr>
            {data?.map((employee) => {
              return (
                <tr
                  className="border-b hover:bg-orange-100 bg-gray-100"
                  key={employee._id}
                >
                  <td className="p-3 px-5 text-center">
                    <label className="bg-transparent">
                      {employee.userId.name}
                    </label>
                  </td>
                  <td className="p-3 px-5 text-center">
                    <label className="bg-transparent">
                      {employee.userId.email}
                    </label>
                  </td>
                  <td className="p-3 px-5 text-center">
                    <label className="bg-transparent">
                      {employee.fullTime}
                    </label>
                  </td>
                  <td className="p-3 px-5 text-center">
                    <label className="bg-transparent">
                      {employee.workFromHome}
                    </label>
                  </td>
                  <td className="p-3 px-5 text-center">
                    <label className="bg-transparent">
                      {employee.overTime}
                    </label>
                  </td>
                  <td className="p-3 px-5 text-center">
                    <label className="bg-transparent">
                      {+employee.fullTime +
                        +employee.workFromHome +
                        +employee.overTime}
                    </label>
                  </td>
                  <td className="p-3 px-5 text-center">
                    <label className="bg-transparent">
                      {employee?.excelUrl && (
                        <a href={employee.excelUrl}>Click to Download</a>
                      )}
                    </label>
                  </td>
                  <td className="p-3 px-5 text-center text-sm font-bold">
                    <label className="bg-transparent">{employee.date}</label>
                  </td>
                  <td className="p-3 px-5 text-center text-lg text-orange-500 font-bold">
                    <label className="bg-transparent">{employee.status}</label>
                  </td>
                  <td className="p-3 px-5 flex justify-end">
                    <button
                      type="button"
                      className="mr-3 text-lg bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => confirm(employee._id, "approved")}
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      className="text-lg bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => confirm(employee._id, "declined")}
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
