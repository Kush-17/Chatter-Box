import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { FaSignOutAlt } from 'react-icons/fa';

const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        localStorage.clear();
        navigate('/login');
    }
  return (
    <div>
        <Button onClick={handleLogout}>
            <FaSignOutAlt className="icon" />
            Logout
        </Button>
    </div>
  )
}

const Button = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    background-color: #ff5252;
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    
    &:hover {
        background-color: #ff1744;
        transform: scale(1.05);
    }

    &:active {
        background-color: #d50000;
    }

    .icon {
        margin-right: 10px;
        font-size: 1.2rem;
    }
`;

export default Logout