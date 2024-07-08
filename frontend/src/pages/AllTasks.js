import React, {useState,useEffect} from 'react'
import SideBar from '../components/Home/SideBar'
import Cards from '../components/Home/Cards'
import { IoIosAddCircle } from "react-icons/io";
import DataInput from '../components/Home/DataInput';
import axios from 'axios';

const AllTasks = () => {
    const [inputDiv,setInputDiv]=useState("hidden")
    const addNote=()=>{
        setInputDiv("fixed")
    }
    const [Data,setData]=useState()
    const [updatedData,setUpdatedData]=useState({
      id: "",
      title: "",
      description:""
    })
    const headers ={
      id: localStorage.getItem("id"),
     authorization:`Bearer ${localStorage.getItem("token")}`
   }
    useEffect(()=>{
      
      const fetch= async()=>{
      const response= await axios.get("http://localhost:1000/task/all",{
         headers,
       });
       setData(response.data.data)
      };
      if(localStorage.getItem("id") && localStorage.getItem("token")){
        fetch()
      }
      
      // eslint-disable-next-line
    })
  return (
   <>
    <div>
          <div className="flex h-[98vh] gap-4">
      <div className=" w-1/6 border border-gray-500 rounded-xl p-4  flex flex-col justify-between">
         <SideBar/>
      </div>
      <div className="w-5/6 border border-gray-500 rounded-xl p-4">
      
      <div className="w-full flex justify-end px-4 py-2">
        <button onClick={addNote}>
            <IoIosAddCircle className="text-4xl text-gray-400 hover:text-gray-100 hover:cursor-pointer transition-all duration-300"/>
        </button>
        </div>
      
          {Data && (<Cards home={"true"}  setInputDiv={setInputDiv} data={Data.tasks} setUpdatedData={setUpdatedData}/>)}
      </div>
    </div>
    </div>
    
    <DataInput inputDiv={inputDiv} setInputDiv={setInputDiv} updatedData={updatedData} setUpdatedData={setUpdatedData}/>
    </>
  )
}

export default AllTasks
