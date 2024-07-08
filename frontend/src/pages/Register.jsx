import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { registerRoute } from '../utils/ApiRoutes';
import './styles/RegisterStyles.css'

const Register = () => {
    const navigate = useNavigate();
    const [values,setValues] = useState({
        username:'',
        email:'',
        password:'',
        confirmPassword:''
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
            //console.log("in validation",registerRoute)
            const { username, email, password} = values;
            const {data} = await axios.post(registerRoute,{
                username,
                email,
                password
            })
            if(data.status === false){
                toast.error(data.msg, toastOptions);
            }
            if(data.status === true){
                localStorage.setItem('chat-app-user',JSON.stringify(data.user));
                navigate('/setAvatar');
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
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and Confirm Password should be same",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be equal or greater than 3 characters",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }

    return true;
  };

  return (
    <>
        <div className='form-container'>
            <form onSubmit={(event)=>handleSubmit(event)}>
                
                    <img src={logo} alt='logo' />
                
                <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
            </form>
        </div>
        <ToastContainer />
    </>
  )
}


export default Register;