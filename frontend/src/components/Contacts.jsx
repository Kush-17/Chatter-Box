import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.png'

const Contacts = ({ contacts, currentUser, changeChat }) => {
    const [currentUserName, setCurrentUserName] = useState(undefined)
    const [currenstUserImage, setCurrentUserImage] = useState(undefined)
    const [currentSelected, setCurrentSelected] = useState(undefined)

    useEffect(() => {
        if (currentUser) {
            setCurrentUserName(currentUser.username)
            setCurrentUserImage(currentUser.avatarImage)
        }
    }, [currentUser])

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index)
        changeChat(contact)
    }

    return (
        <>
            {currenstUserImage && currentUserName && (
                <Container>
                    <div className='initials'>
                        <img src={logo} alt="logo" />
                        <h2>Chatter-Box</h2>
                    </div>
                    <div className="contacts">
                        {contacts.map((contact, index) => {
                            return (
                                <div
                                    className={`contact ${index === currentSelected ? 'selected' : ''}`}
                                    key={index}
                                    onClick={() => changeCurrentChat(index, contact)}
                                >
                                    <div className="avatar">
                                        <img
                                            src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                            alt="avatar"
                                        />
                                    </div>
                                    <div className='username'>
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="current-user">
                        <div className="avatar">
                            <img
                                src={`data:image/svg+xml;base64,${currenstUserImage}`}
                                alt="avatar"
                            />
                        </div>
                        <div className='username'>
                            <h2>{currentUserName}</h2>
                        </div>
                    </div>
                </Container>
            )}
        </>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 12.5% 77.5% 10%;
    overflow: hidden;
    border-radius: 0.8rem;
    height: 100%;
    background: #4CA1AF;
    background: -webkit-linear-gradient(to top, #C4E0E5, #4CA1AF); 
    background: linear-gradient(to top, #C4E0E5, #4CA1AF); 

    .initials{
      justify-content: center;
      align-items: center;
      display: flex;
      gap: 0.5rem;
      img{
        height: 4rem;
        width: 4.5rem;
        margin-right: 0.5rem;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
      }
        background-color: #444;
        h2 {
            color: white;
            font-family: 'Montserrat', sans-serif;
            font-size: 1.5rem;
            text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        } 
    }
  

    .contacts {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 0.5rem;
        &::-webkit-scrollbar {
            width: 0.4rem;
            &-thumb {
                background-color: #888;
                border-radius: 1rem;
            }
        }
        overflow: auto;
        align-items: center;
        .contact {
            display: flex;
            align-items: center;
            flex-direction: row;
            min-height: 4rem;
            width: 90%;
            justify-content: center;
            gap: 0.8rem;
            padding: 0.8rem;
            border-radius: 0.8rem;
            cursor: pointer;
            transition: all 0.3s;
            background-color: #2c2c2c;
            &:hover {
                background-color: #444;
            }
            .avatar {
                img {
                    height: 1.8rem;
                    border-radius: 50%;
                    border: 0.1rem solid cyan;
                }
            }
            .username {
                h3 {
                    color: white;
                }
            }
        }
        .selected {
            background-color: #444;
        }
    }

    .current-user {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        border-radius: 0.8rem;
        background-color: #444;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        gap: 0.8rem;
        transition: transform 0.3s;
        &:hover {
            transform: scale(1.05);
        }
        .avatar {
            img {
                height: 3rem; /* Reduced the avatar size */
                border-radius: 50%;
                border: 0.2rem solid cyan;
                box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
            }
        }
        .username {
            h2 {
                color: white;
                font-family: 'Montserrat', sans-serif;
                font-size: 1rem; /* Reduced the font size */
                text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            }
        }
    }
`;

export default Contacts
