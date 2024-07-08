import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { allUsersRoute, host } from '../utils/ApiRoutes'
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'
import './styles/ChatStyles.css'

import {io} from 'socket.io-client'
const Chat = () => {
  const socket = useRef()  // useRef means that the value of socket will persist between renders
  const [contacts,setContacts] = useState([])
  const [currentUser,setCurrentUser] = useState(undefined)
  const [currentChat,setCurrentChat] = useState(undefined)
  const [isloaded,setIsLoaded] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
        const checkUser = async () => {
            if (!localStorage.getItem('chat-app-user')) {
                navigate('/login');
            }else{
              const user = JSON.parse(localStorage.getItem('chat-app-user'));
              setCurrentUser(user)
              setIsLoaded(true)
            }
        };
        checkUser();
    }, []); 

  useEffect(()=>{
    const checkCurrentUser = () =>{
        if(currentUser){
          socket.current = io(host)  // this will connect to the server
          socket.current.emit('add-user',currentUser._id) // this will add user to the socket

        }
        return () => {
          socket.current.disconnect()
        }
      }
  checkCurrentUser()
  },[currentUser])


  useEffect(()=>{
    const checkCurrentUser = async() =>{
      if(currentUser){
        if(currentUser.isAvatarImageSet){
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
          setContacts(data.data)
        }else{
          navigate('/')
        }
      } 
    }
    checkCurrentUser();
  },[currentUser])

  const handleChatChange = (chat) =>{
    setCurrentChat(chat)
  }

  return (
    <>
    <div className='parent'>
      <div className="container">
         <Contacts contacts={contacts} 
         currentUser={currentUser} 
         changeChat = {handleChatChange}
         />{
          isloaded && currentChat === undefined 
          ?  
          <Welcome currentUser={currentUser}/>
         : 
         <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
         }
      </div>
    </div>
    </>
  )
}



export default Chat