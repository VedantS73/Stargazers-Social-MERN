import React, { useState, useEffect, useRef } from 'react';
import './chatcontainer.css';
import axios from 'axios';
import io from 'socket.io-client';

export default function Chat(props) {
    const token = localStorage.getItem("jwtToken");
    const currentChatUser = props.currentChatUser;
    const [userData, setUserData] = useState(props.userData);
    const [messages, setMessages] = useState(null);
    const [inputMessage, setInputMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const scrollRef = useRef();
    const socket = useRef();

    const fetchMessages = async (curuser, chatuser) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/messages/getchat/${curuser._id}/${chatuser._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessages(response.data);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    const sendMessage = async () => {
        console.log("x   function called.");
        const messagesnow = {
            myself: true,
            message: inputMessage,
        };

        socket.current.emit("send-msg", {
            to:currentChatUser._id,
            from:userData._id,
            message:inputMessage,
        })
        try {
            await fetch("http://localhost:3001/api/messages/createmessage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    from: userData._id,
                    to: currentChatUser._id,
                    message: inputMessage,
                }),
            });
            setMessages(messages.concat(messagesnow));
        } catch (error) {
            console.error("Send message error:", error);
        }
    };

    useEffect(() => {
        if (token && !userData) {
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

                    // Connect to the socket here after fetching user data
                    if (data._id) {
                        socket.current = io("http://localhost:3001");
                        socket.current.emit("addUser", data._id);

                        console.log("Socket connected : ", socket);
                    }
                })
                .catch((error) => {
                    console.error("Fetch error:", error);
                });
        }

        if (!userData || !currentChatUser) {
            console.log("No user data inside chat window because either user data or current chat user is null");
        } else {
            fetchMessages(userData, currentChatUser);
        }
    }, [userData, currentChatUser]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        console.log("Effect triggered");
        if(socket.current){
            socket.current.on("msg-receive", (msg) => {
                console.log("Received messagea:", msg);
                setArrivalMessage({
                    myself:false,
                    message:msg,
                })
            })
        }
    },[arrivalMessage]);

    useEffect(() => {
        arrivalMessage && setMessages((pre)=>[...pre,arrivalMessage])
    },[arrivalMessage])

    console.log(`Data fetching details:\nCurrent user: ${userData?.username}\nChat user: ${currentChatUser?.username}\nMessages fetched are:`, messages);

    if (!userData || !currentChatUser) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                <h2>Please select a chat</h2>
            </div>
        )
    }

    return (
        <div className='MainChatContainer'>
            <div className='msgContainer'>
                <div style={{ display: "flex", marginLeft: "30px", marginTop: "10px", width: "30pc", padding: "5px", borderRadius: "10px" }}>
                    <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" className='chatUserImg' />
                    <p style={{ marginTop: "10px", marginLeft: "10px" }}>{currentChatUser?.username}</p>
                </div>
                <div>
                    {
                        !messages ? (
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                                <h2>No messages</h2>
                            </div>
                        ) : (
                            messages.map((message) => (
                                <div ref={scrollRef}>
                                    {message.myself === false ?
                                        <div className="msg" key={message.id}>
                                        <img src='https://www.w3schools.com/howto/img_avatar.png' alt='Avatar' className='inchatUserImg' />
                                        <p className="msgText">{message.message}</p>
                                    </div> :
                                    <div className="msgmine" key={message.id}>
                                        <img src='https://www.w3schools.com/howto/img_avatar.png' alt='Avatar' className='inchatUserImg' />
                                        <p className="msgText">{message.message}</p>
                                    </div>
                                    }
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
            <div className='msgSenderContainer'>
                <input type='text' placeholder="Enter your Text here" name="message_text" id="message_text" className='msgInput' onChange={(e)=>setInputMessage(e.target.value)}/>
                <button className='msgButton' onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}