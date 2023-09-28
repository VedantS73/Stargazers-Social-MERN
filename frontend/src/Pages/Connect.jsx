import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ResponsiveAppBar from '../Components/ResponsiveAppBar';

function getStoredToken() {
  return localStorage.getItem("jwtToken");
}

export default function Connect() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const token = getStoredToken();
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (!token) {
      navigate("/Login");
      return;
    }
  
    fetch("http://localhost:3001/userapi", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.ok ? response.json() : Promise.reject("Network response was not ok"))
      .then((data) => {
        setUserData(data);
        setUsername(data.username);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, [token]);

  return (
    <div style={{ width: '100%' }}>
      <ResponsiveAppBar />
      {/* <Chat /> */}
    </div>
  )
}