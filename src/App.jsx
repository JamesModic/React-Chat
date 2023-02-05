// ! Dependencies imported
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Authorization/Auth";
import MessageIndex from "./components/Messages/MessageIndex"
import ChatroomIndex from "./components/Chatroom/ChatroomIndex";

function App() {
  const [sessionToken, setSessionToken] = useState("");

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  //! Declaration of Routes to allow the user to signup/log in, see all the chatrooms and enter a specific chat room to post a message
  return (
    <div>
      <Routes>
        <Route path="/" element={<Auth updateToken={updateToken} />} />
        <Route path="/room" element={<ChatroomIndex token={sessionToken} />} />
        <Route
          path="/room/:id"
          element={<MessageIndex token={sessionToken} />}
        />
      </Routes>
    </div>
  );
}

export default App;
