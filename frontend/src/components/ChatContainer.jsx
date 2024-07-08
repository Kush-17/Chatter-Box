import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Logout from './Logout';
import ChatInput from './ChatInput';
import axios from 'axios';
import { sendMessageRoute, getMessagesRoute } from '../utils/ApiRoutes';
import { v4 as uuidv4 } from 'uuid'

const ChatContainer = ({ currentChat, currentUser, socket }) => {
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                if (currentUser && currentChat) {
                    const response = await axios.get(getMessagesRoute, {
                        params: {
                            from: currentUser._id,
                            to: currentChat._id,
                        },
                    });
                    setMessages(response.data.messages);
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
        fetchMessages();
    }, [currentChat, currentUser]);

    const handleSendMessage = async (msg) => {
        if (currentUser && currentChat) {
            try {
                await axios.post(sendMessageRoute, {
                    from: currentUser._id,
                    to: currentChat._id,
                    message: msg
                });
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
        socket.current.emit('send-msg', {
            to: currentChat._id,
            from: currentUser._id,
            message: msg
        });

        const msgs = [...messages];
        msgs.push({ message: msg, fromSelf: true });
        setMessages(msgs);
    };

    useEffect(() => {
        const fetchMessages = () => {
            if (socket.current) {
                socket.current.on('receive-msg', (msg) => {
                    setArrivalMessage({
                        message: msg.message,
                        fromSelf: false
                    })
                })
            }
        }
        fetchMessages()
    }, [])

    useEffect(() => {
        const prevMsg = () => {
            arrivalMessage && setMessages((prevMsg) => [...prevMsg, arrivalMessage])
        }
        prevMsg()
    }, [arrivalMessage])

    useEffect(() => {
        const Scroll = () => {
            scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
        Scroll()
    }, [messages])

    return (
        <>
            {currentChat && (
                <Container>
                    <div className="chat-header">
                        <div className="user-details">
                            <div className="avatar">
                                <img
                                    src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                                    alt="avatar"
                                />
                            </div>
                            <div className="username">
                                <h3>{currentChat.username}</h3>
                            </div>
                        </div>
                        <Logout />
                    </div>
                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div ref={scrollRef} key={uuidv4()}>
                                <div key={index} className={`msg ${msg.fromSelf ? 'sended' : 'received'}`}>
                                    <div className="content">
                                        <p>{msg.message}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <ChatInput handleSendMessage={handleSendMessage} />
                </Container>
            )}
        </>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 1.3rem;
    background: rgba(108, 117, 125, 0.175);
    margin-left: 10px;
    &::-webkit-scrollbar {
        width: 0.3rem;
        &-thumb {
            background-color: #888;
            border-radius: 1rem;
        }
    }
    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 15px;
        background: rgba(0, 191, 255, 0.2);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border-bottom: 2px solid rgba(0, 191, 255, 0.7);
        .user-details {
            display: flex;
            align-items: center;
            .avatar {
                img {
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    border: 2px solid #00bfa6;
                    transition: transform 0.3s;
                    &:hover {
                        transform: scale(1.1);
                    }
                }
            }
            .username {
                margin-left: 10px;
                h3 {
                    font-size: 1.3rem;
                    font-weight: 600;
                    color: #00796b;
                    background: linear-gradient(to right, #00bfa6, #00796b);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            }
        }
    }
    .chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 15px;
    }

    .msg {
        display: flex;
        margin-bottom: 10px;
        &.sended {
            justify-content: flex-end;
            .content {
                background-color: #daf8e3;
                color: #333;
            }
        }
        &.received {
            justify-content: flex-start;
            .content {
                background-color: #f4f4f8;
                color: #333;
            }
        }
        .content {
            max-width: 65%;
            padding: 8px 16px;
            border-radius: 20px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
    }
`;

export default ChatContainer;
