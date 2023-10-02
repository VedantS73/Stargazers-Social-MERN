import React, { useState, useEffect } from 'react';
import './contact.css'

import ChatContainer from '../ChatContainer/ChatContainer'

export default function Chat() {
    const token = localStorage.getItem("jwtToken");
    const [userData, setUserData] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [currentChatUser, setCurrentChatUser] = useState();
    let debounceTimer;

    useEffect(() => {
        if (token) {
        fetch("http://localhost:3001/userapi", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
            })
            .then((data) => {
            setUserData(data);
            })
            .catch((error) => {
            console.error("Fetch error:", error);
            });
        }
    },[token]);

    // Function to handle input changes in the search bar
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);

        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            performSearch(event.target.value);
        }, 1000);
    };

    const performSearch = (query) => {
        if (query.trim() !== "") {
          fetch(`http://localhost:3001/api/users/search?query=${query}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              // Handle the API response data as needed
              setSearchResults(data);
            })
            .catch((error) => {
              console.error("Fetch error:", error);
            });
        }
      };
    
    const handleUser = (e) => {
        setCurrentChatUser(e)
    }

    return (
        <div className='mainContactContainer'>
      <div>
        <div style={{ width: "20pc", padding: "10px" }}>
          <input
            type="search"
            placeholder="Search or start new chat"
            className='searchBarContact'
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>
        <div className='userDetailContainer'>
          {searchResults.length === 0 ? ( // Check if there are no search results
            <p>No users found</p>
          ) : (
            // Render search results
            searchResults.map((user) => (
              <div key={user._id} className='userContainer' onClick={(e)=>handleUser(user)}>
                <img
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  alt="Avatar"
                  className='chatUserImg'
                />
                <div style={{ marginLeft: "10px" }}>
                  <p style={{ color: "white", textAlign: "start", marginTop: "5px", fontSize: "15px" }}>{user.username}</p>
                  <p style={{ color: "white", textAlign: "start", marginTop: "-16px", fontSize: "14px" }}>Open your message</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <ChatContainer userData={userData} currentChatUser={currentChatUser}/>
    </div>
    )
}