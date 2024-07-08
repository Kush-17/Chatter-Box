import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { loginRoute } from '../utils/ApiRoutes';
import './styles/LoginStyles.css'

const Login = () => {
    const navigate = useNavigate();
    const [values,setValues] = useState({
        username:'',
        password:'',
    })

     const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        //alert('Form submitted!');
        if(handleValidation()){
            //console.log("in validation",loginRoute)
            const { username, password} = values;
            const {data} = await axios.post(loginRoute,{
                username,
                password
            })
            if(data.status === false){
                toast.error(data.msg, toastOptions);
            }
            if(data.status === true){
                localStorage.setItem('chat-app-user',JSON.stringify(data.user));
                navigate('/chat');
            }
        }
    }

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const handleValidation = () => {
    const { password, username} = values;
    if (password === "") {
      toast.error(
        "Password should not be empty",
        toastOptions
      );
      return false;
    } else if (username === "") {
      toast.error(
        "Username should not be empty",
        toastOptions
      );
      return false;
    } 
    return true;
  };

  return (
    <>
        <div className='form-container'>
            <form onSubmit={(event)=>handleSubmit(event)}>
                    <img src={logo} alt="logo" />
                <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min={'3'}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login</button>
          <span>
            Don't have an account ? <Link to="/">Register.</Link>
          </span>
            </form>
        </div>
        <ToastContainer />
    </>
  )
}


export default Login;