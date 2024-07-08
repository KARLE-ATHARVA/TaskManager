import React from 'react';
import { FaDeleteLeft } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import axios from 'axios';

const Cards = ({ home, setInputDiv, data ,setUpdatedData}) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };
  
  const handleCompleteTask = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/task/update/complete/${id}`,
        {},
        { headers }
      );
      alert(response.data.message); // Assuming response.data contains updated task information
      // Update the data state or re-fetch updated data from backend
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleImportantTask = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/task/update/important/${id}`,
        {},
        { headers }
      );
      alert(response.data.message); // Assuming response.data contains updated task information
      // Update the data state or re-fetch updated data from backend
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:1000/task/remove/${id}`,
        { headers }
      );
      alert(response.data.message); // Assuming response.data contains updated task information
      // Update the data state or re-fetch updated data from backend
    } catch (error) {
      console.log(error);
    }
   };
   const handleEdit = async (id, title, description) => {
    setInputDiv("fixed");
    setUpdatedData({
      id: id,
      title: title,
      description: description
    });
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4 p-4">
        {data &&
          data.map((items, i) => (
            <div key={items._id} className="bg-gray-800 flex flex-col justify-between rounded-sm p-4">
              <div>
                <div className="text-xl font-semibold">{items.title}</div>
                <div className="text-gray-300 my-2">{items.description}</div>
              </div>
              <div className="my-2 w-full flex items-center">
                <button
                  className={`rounded p-2 w-3/6 ${items.complete===false? "bg-red-600" : "bg-green-400"}`}
                  onClick={() => handleCompleteTask(items._id)}
                >
                  {items.complete===true ? "Completed" : "Incomplete"}
                </button>
                <div className="w-3/6 flex justify-around text-xl font-semibold p-2">
                  <button onClick={() => handleImportantTask(items._id)}>
                    {items.important === true? <FaHeart className="text-red-500"/>:<FaRegHeart />}
                  </button>
                 {home !=="false" && (<button onClick={()=>handleEdit(items._id,items.title,items.description)}>
                    <FaUserEdit />
                  </button>)}
                  <button onClick={() => handleDeleteTask(items._id)}>
                    <FaDeleteLeft />
                  </button>
                </div>
              </div>
            </div>
          ))}
        {home === "true" && (
          <button onClick={() => setInputDiv("fixed")} className="bg-gray-800 flex flex-col justify-center items-center rounded-sm p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300">
            <IoIosAddCircle className="text-5xl" />
            <h2 className="text-2xl font-semibold mt-4 my-3">Add Task</h2>
          </button>
        )}
      </div>
    </>
  );
};

export default Cards;
