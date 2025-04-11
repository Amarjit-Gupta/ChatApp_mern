import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import TextArea from "./TextArea";
import Join from "./Join";
import Message from "./Message";
import { URL } from "../URL";

const Container = () => {

  const [user, setUser] = useState(localStorage.getItem("user12"));
  const [join, setJoin] = useState(localStorage.getItem("join34"));

  let image = localStorage.getItem("image");

  const socketIo = socketIOClient(URL);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (user && join) {
      socketIo.emit("joinId", join);
      socketIo.on("chat", (chats) => setChats(chats));
      socketIo.on("message", (msg) => setChats((prev) => [...prev, msg]));

      return () => {
        socketIo.off("chat");
        socketIo.off("message");
      };
    }
  }, [user, join]);

  const addMessage = (chat) => {
    const newChat = {
      username: user,
      message: chat,
      image: image,
      join,
    };
    socketIo.emit("newMessage", newChat);
  };

  const Logout = () => {
    localStorage.clear();
    setUser(null);
    setJoin(null);
  };

  return (
    <div>
      {user ? (
        <div className="main">
          <div className="main-child">
            <div className="user-container">
              <div className="user-name"><span>User:</span>&nbsp;&nbsp;<img src={image} alt="" />
                &nbsp;{user.length > 8 ? user.slice(0, 8) + "..." : user}</div>
              <div className="join-id"><span>Joining Id:</span>&nbsp;{join}</div>
            </div>
            <p className="logout" onClick={Logout}>
              <button>Logout</button>
            </p>
          </div>
          <Message chats={chats} />
          <TextArea addMessage={addMessage} />
        </div>
      ) : (
        <Join setUser={setUser} setJoin={setJoin} />
      )}
    </div>
  );
};

export default Container;