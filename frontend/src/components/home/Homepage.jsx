import React, { useEffect } from "react";
import { useState } from "react";
import * as FileStack from "filestack-js";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import style from "./main.module.css";
import axios from "axios";
const Homepage = () => {
  const [data, setData] = useState(null);
  function getData() {
    const email = localStorage.getItem("email");
    axios
      .post(
        "https://time-tracker-jw9p.onrender.com/employee/get-hour-tracker-history",
        { email: email }
      )
      .then((res) => {
        setData(res.data);
      });
  }
  useEffect(() => {
    getData();
  }, []);
  console.log(data);
  const [total, setTotal] = useState(0);
  const [excelUrl, setExcelUrl] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (data) => {
    const newTotal =
      parseFloat(data.fullTime || 0) +
      parseFloat(data.workFromHome || 0) +
      parseFloat(data.overTime || 0);
    if (newTotal === 0) {
      toast.error("please fill at least one time option");
    } else {
      setTotal(newTotal);
      localStorage.setItem("email", data.email);
      axios
        .post("https://time-tracker-jw9p.onrender.com/employee/add-employee", {
          name: data.name,
          email: data.email,
          fullTime: data.fullTime,
          workFromHome: data.workFromHome,
          overTime: data.overTime,
          excelUrl: excelUrl,
        })
        .then((res) => {
          toast.info(res.data);
          getData();
        });
    }
  };
  const handleError = (errors) => {};
  const registerOptions = {
    name: { required: "Name is required" },
    email: { required: "Email is required" },
  };
  function UploadFile(ev) {
    ev.preventDefault();
    const client = FileStack.init("Apuhmeux0SxyydZYZPpKnz");
    client
      .picker({
        maxFiles: 1,
        onUploadDone: async (res) => {
          const URL = res.filesUploaded[0].url;
          setExcelUrl(URL);
          toast.success("File uploaded successfully please click submit");
        },
      })
      .open();
  }
  return (
    <main className="flex min-h-screen items-center justify-center p-10">
      <div
        className={`${style.parent} flex flex-col justify-center items-center gap-5`}
      >
        <div className={`${style.home} rounded-lg w-full h-full p-6`}>
          <h1>Time Tracker</h1>
          <form
            className={` w-full w-100 h-full`}
            onSubmit={handleSubmit(onFormSubmit, handleError)}
          >
            <div className={`w-full w-100 flex flex-wrap -mx-3 mb-6 h-full`}>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Name
                </label>
                <input
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                    errors.name ? "border-red-500" : "border-gray-200"
                  } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                  id="grid-first-name"
                  type="text"
                  placeholder="Hamdy"
                  name="name"
                  {...register("name", registerOptions.name)}
                />
                <p className="text-red-500 text-xs italic">
                  {errors?.name && errors.name.message}
                </p>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Email
                </label>
                <input
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                    errors.email ? "border-red-500" : "border-gray-200"
                  }  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                  id="grid-last-name"
                  type="text"
                  placeholder="hamdy@gmail.com"
                  name="email"
                  {...register("email", registerOptions.email)}
                />
                <p className="text-red-500 text-xs italic">
                  {errors?.email && errors.email.message}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="full-time"
                >
                  Full Time
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="full-time"
                  type="text"
                  name="fullTime"
                  {...register("fullTime", registerOptions.fullTime)}
                  placeholder="Enter Your Working Hours"
                />
              </div>

              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="home-time"
                >
                  Working from Home
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="home-time"
                  type="text"
                  name="workFromHome"
                  {...register("workFromHome", registerOptions.workFromHome)}
                  placeholder="Enter Your Working Hours"
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="part-time"
                >
                  Over Time
                </label>
                <div className="relative">
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="part-time"
                    name="overTime"
                    type="text"
                    {...register("overTime", registerOptions.overTime)}
                    placeholder="Enter Your Working Hours"
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-row items-center justify-start mt-6 w-100 gap-4">
              <label
                className="block uppercase tracking-wide text-gray-700 text-lg font-bold "
                htmlFor="part-time"
              >
                Total working hours : {total} hours
              </label>
            </div>
            <div className="w-full flex flex-row items-center justify-end mt-10 w-100 gap-4">
              <button
                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                type="button"
                onClick={(ev) => UploadFile(ev)}
              >
                Upload Your Time Sheet
              </button>
              <button
                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className={`${style.home} rounded-lg w-full h-full p-6`}>
          <h1>Your Working History</h1>
          <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <tbody>
              <tr className="border-b">
                <th className="text-center p-3 px-5">Name</th>
                <th className="text-center p-3 px-5">Email</th>
                <th className="text-center p-3 px-5">Full Time</th>
                <th className="text-center p-3 px-5">work From Home</th>
                <th className="text-center p-3 px-5">over Time</th>
                <th className="text-center p-3 px-5">Total hours</th>
                <th className="text-center p-3 px-5 ">Excel sheet</th>
                <th className="text-center p-3 px-5">Date</th>
                <th className="text-center p-3 px-5 ">Status</th>
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
                      <label className="bg-transparent">
                        {employee.status}
                      </label>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Homepage;
