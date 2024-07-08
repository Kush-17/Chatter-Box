import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import loader from '../assets/loading.gif';
import logo from '../assets/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { setAvatarRoute } from '../utils/ApiRoutes';
import { Buffer } from 'buffer';
import './styles/SetAvatarStyles.css'

const SetAvatar = () => {
    const apikey = "g9OaWqEnwJo3AR";
    const api = 'https://api.multiavatar.com/45678945';
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    };

    // Handle user authentication
    useEffect(() => {
        const checkUser = async () => {
            if (!localStorage.getItem('chat-app-user')) {
                navigate('/');
            }
        };
        checkUser();
    }, [navigate]);

    // Set profile picture
    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error('Please select an avatar', toastOptions);
        } else {
            const user = JSON.parse(localStorage.getItem('chat-app-user'));
            try {
                const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                    image: avatars[selectedAvatar],
                });

                if (data.isSet) {
                    user.isAvatarImageSet = true;
                    user.avatarImage = data.image;
                    localStorage.setItem('chat-app-user', JSON.stringify(user));
                    navigate('/login');
                } else {
                    toast.error('Failed to set avatar. Please try again later.', toastOptions);
                }
            } catch (error) {
                toast.error('An error occurred while setting the avatar. Please try again later.', toastOptions);
            }
        }
    };

    // Fetch avatars
    useEffect(() => {
        const fetchAvatars = async () => {
            try {
                const data = [];
                for (let i = 0; i < 20; i++) {
                    const response = await axios.get(`${api}/${Math.round(Math.random() * 1000)}?apikey=${apikey}`);
                    const buffer = Buffer.from(response.data);
                    data.push(buffer.toString('base64'));
                    // await new Promise(resolve => setTimeout(resolve, 500));
                }
                setAvatars(data);
            } catch (error) {
                console.error('Error fetching avatars:', error);
                toast.error('Failed to load avatars. Please try again later.', toastOptions);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAvatars();
    }, []);

    return (
        <>
            {isloading ? (
                <div className='container'>
                    <img src={logo} alt="logo" className="logo" />
                    <img src={loader} alt="loader" className="loader" />
                </div>
            ) : (
                <div className='container'>
                    <div className="title-container">
                        <h1>Pick an Avatar</h1>
                    </div>
                    <div className="avatars">
                        {avatars.map((avatar, index) => (
                            <div
                                key={index}
                                className={`avatar ${selectedAvatar === index ? 'selected' : ''}`}
                            >
                                <img
                                    src={`data:image/svg+xml;base64,${avatar}`}
                                    alt="avatar"
                                    onClick={() => setSelectedAvatar(index)}
                                />
                            </div>
                        ))}
                    </div>
                    <button className="submit-btn" onClick={setProfilePicture}>
                        Set Avatar
                    </button>
                </div>
            )}
            <ToastContainer />
        </>
    );
};


export default SetAvatar;
