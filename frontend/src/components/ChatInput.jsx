import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPaperPlane } from 'react-icons/fa';
import { BsEmojiSmileFill } from 'react-icons/bs';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';


//import './pickerstyles.css'

const ChatInput = ({handleSendMessage}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState('');

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiSelect = (emoji) => {
    setMsg(msg + emoji.native);
    setShowEmojiPicker(false); // Hide the picker after selecting an emoji
  };

 const sendChat = (event) => {
    event.preventDefault()
    if(msg.length>0){
        handleSendMessage(msg)
        setMsg('')
    }
 }

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && (
            <div className="emoji-picker-container">
              <Picker
                data={data}
                previewPosition="none"
                onEmojiSelect={handleEmojiSelect}
                className="emoji-picker-react"
            />
            </div>
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(e)=>sendChat(e)}>
        <input
          type="text"
          placeholder="Type your message here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit">
          <FaPaperPlane />
        </button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background: linear-gradient(135deg, rgba(50, 50, 50, 0.3), rgba(30, 30, 30, 0.3));
  border-radius: 25px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(100, 100, 100, 0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  .button-container {
    display: flex;
    align-items: center;
    margin-right: 15px;

    .emoji {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    color: #fff;
    background: radial-gradient(circle, rgba(255, 255, 0, 0.8), rgba(200, 200, 0, 0.8));
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.3s ease;
    position: relative;
    width: 40px;
    height: 40px;
    
    
      .emoji-picker-container {
        position: absolute;
        top: -475px;
        left: 30px;
        .emoji-picker-react {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          border-radius: 10px;
        }
      }
    }

  }

  .input-container {
    display: flex;
    flex: 1;
    align-items: center;

    input {
      flex: 1;
      padding: 12px 18px;
      font-size: 1.1rem;
      border: none;
      border-radius: 25px;
      outline: none;
     
      color: #eee;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
      transition: box-shadow 0.3s ease, background 0.3s ease;

      &:focus {
        box-shadow: 0 0 8px rgba(255, 255, 255, 0.7);
        color: black;
      }

      &::placeholder {
        color: #666;
      }
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 10px;
      padding: 12px;
      font-size: 1.3rem;
      background: radial-gradient(circle, rgba(0, 255, 255, 0.8), rgba(0, 139, 139, 0.8));
      color: #fff;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      transition: background 0.3s ease, transform 0.3s ease;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);

      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 10px;
        font-size: 1.1rem;
      }

      &:hover {
        background: radial-gradient(circle, rgba(0, 255, 255, 1), rgba(0, 139, 139, 1));
        transform: scale(1.1);
      }

      &:active {
        background: radial-gradient(circle, rgba(100, 100, 100, 0.8), rgba(50, 50, 50, 0.8));
      }
    }
  }
`;

export default ChatInput;
