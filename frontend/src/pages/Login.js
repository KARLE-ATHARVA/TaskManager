import React ,{useState} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import {authActions} from "../store/auth"
import {useDispatch,useSelector} from 'react-redux'

const Login = () => {
  const history= useNavigate()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if(isLoggedIn === true){
    history('/')
  }
  const [Data, setData] = useState({ username: '', password: '' });
  const dispatch= useDispatch()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    if (Data.username === ''  || Data.password === '') {
      alert('All fields are required.');
    } else {
      try {
       
        const response = await axios.post('http://localhost:1000/user/login', Data);
        setData({ username: '', password: '' })
        
        //  console.log(response)
         localStorage.setItem("id",response.data.id)
        localStorage.setItem("token",response.data.token)// Log successful sign-up response
       dispatch(authActions.login())
      
        history("/")
        
      } catch (error) {
        console.error('Error logging up:', error);
        alert(error.response.data.error)
        // Handle error: show an alert or message to the user
      }
    }
  };
  return (
    <>
    <div className="h-[98vh] flex items-center justify-center">
        <div className="p-4 w-2/6 rounded bg-gray-800">
        <div className="text-2xl font-semibold flex justify-center">Login To Your Account</div>
        <input 
        type="username"
        placeholder="UserName"
        className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
        name="username"
        value={Data.username}
        onChange={handleChange} />
         <input
          type="password"
          placeholder="password"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          name="password"
          value={Data.password}
        onChange={handleChange}
          />
          <div className="flex items-cneter justify-between w-full">
          <button className="flex justify-end bg-blue-400 text-black px-3 py-2 rounded hover:text-white cursor-pointer" onClick={handleSubmit}>
            Login
          </button>
          <Link to="/signup" className="text-gray-400 hover:text-gray-200 cursor-pointer"> Not having an accout? Signup here</Link>
          </div>
        </div>

    </div>
    </>
  )
}

export default Login
