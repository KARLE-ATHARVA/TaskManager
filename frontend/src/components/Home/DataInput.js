import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';

const DataInput = (props) => {
  const { updatedData, inputDiv, setInputDiv,setUpdatedData } = props;

  const [Data, setData] = useState({ title: '', description: '' });

  // Update Data state when updatedData prop changes
  useEffect(() => {
    setData({
      title: updatedData.title,
      description: updatedData.description
    });
  }, [updatedData]);

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  const handleSubmit = async () => {
    if (Data.title === '' || Data.description === '') {
      alert('All Fields Are Required.');
    } else {
      try {
        await axios.post('http://localhost:1000/task/create', Data, { headers });
        // Optionally, you can reset the form fields after successful submission
        setData({ title: '', description: '' });
        setInputDiv('hidden');
      } catch (error) {
        console.error('Error creating task:', error);
        // Handle error as needed (e.g., show error message to user)
      }
    }
  };
  const handleUpdate= async()=>{
    if (Data.title === '' || Data.description === '') {
      alert('All Fields Are Required.');
    } else {
      try {
        await axios.put(`http://localhost:1000/task/update/${updatedData.id}`, Data, { headers });
        // Optionally, you can reset the form fields after successful submission
        setUpdatedData({
          id: "",
          title: "",
          description:""
        })
        setData({ title: '', description: '' });
        setInputDiv('hidden');
      } catch (error) {
        console.error('Error creating task:', error);
        // Handle error as needed (e.g., show error message to user)
      }
    }

  }

  const cutOut = () => {
    setInputDiv('hidden');
    setData({
      title: "",
      description:""
    })
    setUpdatedData({
      id: "",
      title: "",
      description:""
    })
  };
  return (
    <>
      <div className={`${inputDiv} top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}></div>
      <div className={`${inputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>
        <div className="w-2/6 p-4 rounded bg-gray-900 flex flex-col justify-between">
          <button className="flex justify-end text-2xl hover:cursor-pointer" onClick={cutOut}>
            <IoClose />
          </button>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="px-3 py-2 rounded bg-gray-700 w-full my-2"
            value={Data.title}
            onChange={change}
          />
          <textarea
            cols="30"
            rows="10"
            placeholder="Description"
            name="description"
            className="px-3 py-2 rounded bg-gray-700 w-full my-3"
            value={Data.description}
            onChange={change}
          />
          {updatedData.title=== "" ? (<button
            className="px-3 py-2 rounded bg-blue-400 text-black text-xl hover:text-gray-300 hover:border-black"
            onClick={handleSubmit}
          >
            Submit
          </button> ):  (<button
            className="px-3 py-2 rounded bg-blue-400 text-black text-xl hover:text-gray-300 hover:border-black"
            onClick={handleUpdate}
          >
            Update
          </button>)
          }
        </div>
      </div>
    </>
  );
};

export default DataInput;
