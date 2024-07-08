import React, { useEffect, useState } from 'react'
import { FaTasks } from "react-icons/fa";
import { BiTask } from "react-icons/bi";
import { MdOutlineAddTask } from "react-icons/md";
import { BiTaskX } from "react-icons/bi";
import { Link ,useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from "axios"


const SideBar = () => {
   const dispatch=useDispatch()
   const history=useNavigate()
    const data=[
        {
            title:"All Tasks",
            icon:<FaTasks />,
            Link:"/"
        },
        {
            title:"Complete Tasks",
            icon:<BiTask />,
            Link:"/CompTasks"

        },
        {
            title:"Important Tasks",
            icon:<MdOutlineAddTask />,
            Link:"/ImpTasks"

        },
        {
            title:"Incomplete Tasks",
            icon:<BiTaskX/>,
            Link:"/InCompTasks"
        }
    ]
    const [Data,setData]=useState()
    const logout = ()=>{
      dispatch(authActions.logout())
      localStorage.clear("id")
      localStorage.clear("token")
      history('/signup')
    }
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
   },[])
  return (
   <>
      {Data && <div>
        <h2 className="text-xl font-semibold">{Data.username}</h2>
        <h4 className="mb-1 text-gray-400">{Data.email}</h4>
        <hr/>
      </div> }
      <div>
       {data.map((items,i)=>(
         <Link to={items.Link} key={i} className="my-2 flex items-center hover:bg-gray-500  p-2 cursor-pointer rounded trasition-all duration-300">
            {items.icon}&nbsp;{items.title}</Link>
       ))}
      </div>
      <div>
        <button className=" p-2 text-center font-semibold bg-gray-600 w-full rounded" onClick={logout}>
            Log Out
        </button>
      </div>
    </>
  )
}

export default SideBar
