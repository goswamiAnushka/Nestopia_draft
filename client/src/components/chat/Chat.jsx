import { useContext, useEffect, useRef, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { format } from "timeago.js";
import { SocketContext } from "../../context/SocketContext";
import { useNotificationStore } from "../../lib/notificationStore";
import { FaUpload } from "react-icons/fa"; // Removed the emoji import

function Chat({ chats }) {
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

  const messageEndRef = useRef();
  const [inputValue, setInputValue] = useState("");
  const [media, setMedia] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);

  const decrease = useNotificationStore((state) => state.decrease);

  useEffect(() => {
    if (socket && currentUser) {
      socket.emit("joinChat", currentUser.id);
    }
  }, [socket, currentUser]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest("/chats/" + id);
      if (!res.data.seenBy.includes(currentUser.id)) {
        decrease();
      }
      setChat({ ...res.data, receiver });
      setChatOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputValue.trim() && !media) return;

    try {
      const messageData = new FormData();
      messageData.append("text", inputValue);
      if (media) {
        const resizedImage = await resizeImage(media);
        messageData.append("media", resizedImage);
      }

      const res = await apiRequest.post("/messages/" + chat.id, messageData);
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      setInputValue("");
      setMedia(null);
      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("/chats/read/" + chat.id);
      } catch (err) {
        console.log(err);
      }
    };

    if (chat && socket) {
      socket.on("getMessage", (data) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      });
    }
    return () => {
      socket.off("getMessage");
    };
  }, [socket, chat]);

  const handleMediaChange = (e) => {
    setMedia(e.target.files[0]);
  };

  const resizeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 600;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            resolve(new File([blob], file.name, { type: file.type }));
          }, file.type);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chats?.map((c) => (
          <div
            className="message"
            key={c.id}
            style={{
              backgroundColor:
                c.seenBy.includes(currentUser.id) || chat?.id === c.id
                  ? "white"
                  : "#fecd514e",
            }}
            onClick={() => handleOpenChat(c.id, c.receiver)}
          >
            <img src={c.receiver?.avatar || "/noavatar.jpg"} alt="" />
            <span>{c.receiver?.username}</span>
            <p>{c.lastMessage}</p>
          </div>
        ))}
      </div>
      {chatOpen && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={chat.receiver?.avatar || "noavatar.jpg"} alt="" />
              {chat.receiver?.username}
            </div>
            <span className="close" onClick={() => setChatOpen(false)}>
              X
            </span>
          </div>
          <div className="center">
            {chat.messages.map((message) => (
              <div
                className={`chatMessage ${
                  message.userId === currentUser.id ? "own" : ""
                }`}
                key={message.id}
              >
                <p>{message.text}</p>
                {message.media && (
                  <img src={message.media} alt="media" className="media" />
                )}
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea
              name="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
            ></textarea>
            <label htmlFor="media-upload" className="media-upload-label">
              <FaUpload />
            </label>
            <input
              type="file"
              id="media-upload"
              className="media-upload-input"
              onChange={handleMediaChange}
              style={{ display: "none" }}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
      <div className="chatToggle">
        <button onClick={() => setChatOpen(!chatOpen)}>Open Chat</button>
      </div>
    </div>
  );
}

export default Chat;
