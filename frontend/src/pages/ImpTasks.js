import React,{useState,useEffect} from 'react'
import SideBar from '../components/Home/SideBar'
import Cards from '../components/Home/Cards'
import axios from 'axios'


const ImpTasks = () => {
  const [Data,setData]=useState()
  const headers ={
    id: localStorage.getItem("id"),
   authorization:`Bearer ${localStorage.getItem("token")}`
 }
  useEffect(()=>{
    const fetch= async()=>{
    const response= await axios.get("http://localhost:1000/task/all/important",{
       headers,
     });
     setData(response.data.data)
    };
    fetch()
    // eslint-disable-next-line
  })
  return (
    <div>
          <div className="flex h-[98vh] gap-4">
      <div className=" w-1/6 border border-gray-500 rounded-xl p-4  flex flex-col justify-between">
      <SideBar/>
      </div>
      <div className="w-5/6 border border-gray-500 rounded-xl p-4 ">
          <div className="text-xl font-semibold">Important Tasks:</div> 
           <Cards home={"false"} data={Data}/>
      </div>
    </div>
    </div>
  )
}

export default ImpTasks
