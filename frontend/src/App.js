import React, { useEffect} from 'react';
import { Routes, Route, useNavigate} from "react-router-dom";
import Home from './pages/Home';
import AllTasks from './pages/AllTasks';
import CompTasks from './pages/CompTasks';
import ImpTasks from './pages/ImpTasks';
import InCompTasks from './pages/InCompTasks';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { useSelector,useDispatch } from 'react-redux';
import { authActions } from './store/auth';

const App = () => {
  const navigate=useNavigate()
  const isLoggedIn= useSelector((state)=> state.auth.isLoggedIn);
  const dispatch= useDispatch()
  useEffect(()=>{
  if(localStorage.getItem("token") ){
    dispatch(authActions.login())
  }else  if(isLoggedIn === false){
    navigate("/signup")
  } // eslint-disable-next-line 
 },[])

  return (
    <>
      <div className="bg-gray-900 text-white h-screen p-2 relative">
      
        <Routes>
          <Route  path="/" element={<Home/>}/>
          <Route  index element={<AllTasks  />} />
          <Route  path="/CompTasks" element={<CompTasks/>} />
          <Route  path="/ImpTasks" element={<ImpTasks/>} />
          <Route  path="/InCompTasks" element={<InCompTasks/>} />
          <Route  path="/signup" element={<SignUp/>} />
          <Route  path="/login" element={<Login/>} />
        </Routes>
      </div>
      </>
  );
}

export default App;
