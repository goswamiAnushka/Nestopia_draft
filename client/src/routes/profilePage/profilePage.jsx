import React, { useRef, useContext } from "react";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { Suspense } from "react";
import { AuthContext } from "../../context/AuthContext";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../../lib/apiRequest";
import "./profilePage.scss";

function ProfilePage() {
  const data = useLoaderData(); // Load user data
  const { updateUser, currentUser } = useContext(AuthContext); // Auth context for current user data and update function
  const navigate = useNavigate();
  const chatContainerRef = useRef(null); // Ref to chat container

  // Handle user logout
  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // Smooth scrolling to chat container
  const scrollToChat = () => {
    chatContainerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          {/* User Information Section */}
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar: 
              <img src={currentUser.avatar || "noavatar.jpg"} alt="User Avatar" />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>

          {/* User Posts Section */}
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.userPosts} />}
            </Await>
          </Suspense>

          {/* Saved Posts Section */}
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.savedPosts} />}
            </Await>
          </Suspense>

          {/* Scroll to Chat Button */}
          <div className="title">
            <button onClick={scrollToChat}>Go to Chat</button>
          </div>
        </div>
      </div>

      {/* Chat Section */}
      <div className="chatContainer" ref={chatContainerRef}>
        <div className="wrapper">
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.chatResponse}
              errorElement={<p>Error loading chats!</p>}
            >
              {(chatResponse) => <Chat chats={chatResponse.data} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
