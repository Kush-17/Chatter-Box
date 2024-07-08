import React from 'react';
import styled from 'styled-components';
import Robot from '../assets/robot.gif';

const Welcome = ({ currentUser }) => {
    return (
        <Container>
            <img src={Robot} alt='robot' />
            <h1>
                Welcome, <span>{currentUser.username}!</span>
            </h1>
            <h3>Start chatting with your friends</h3>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border-radius: 1.3rem;
    margin-left: 10px;
    background: linear-gradient(135deg, #1f1c2c, #928dab);
    color: #ffffff;
    font-family: 'Montserrat', sans-serif;
    height: 100%;

    img {
        height: 15rem;
        border-radius: 0.8rem;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s;
        &:hover {
            transform: scale(1.05);
        }
    }

    h1 {
        margin-top: 1.5rem;
        font-size: 2rem;
        text-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        span {
            color: #00bfa6;
            text-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        }
    }

    h3 {
        margin-top: 0.8rem;
        font-size: 1.2rem;
        color: #e1e1e1;
        text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }
`;

export default Welcome;
