import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { useNavigate, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function SinglePage() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [chatExists, setChatExists] = useState(false);

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  const initiateChat = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    try {
      // If no chat exists, initiate a new chat
      const newChat = await apiRequest.post("/chats", { receiverId: post.user.id });
      navigate('/profile');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const checkExistingChat = async () => {
      try {
        const response = await apiRequest.get('/chats');
        const chats = response.data;
        const existingChat = chats.find(chat => chat.receiver.id === post.user.id);
        setChatExists(!!existingChat);
      } catch (error) {
        console.log(error);
      }
    };

    checkExistingChat();
  }, [post.user.id]);

  return (
    <div className="singlePage">
      <div className="content">
        <Slider images={post.images} />
        <div className="item">
          <div className="left">
            <span className="cat">{post.category}</span>
            <h1>{post.title}</h1>
            <span className="price">{post.price}</span>
            <div
              className="desc"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.description),
              }}
            />
            <div className="location">
              <h2>Location</h2>
              <Map location={post.location} />
            </div>
          </div>
          <div className="right">
            <div className="user">
              <img
                src={post.user.avatar || "/img/noavatar.jpg"}
                alt=""
                className="avatar"
              />
              <div className="info">
                <span>{post.user.username}</span>
                <div className="stars">
                  {Array(post.user.rating)
                    .fill()
                    .map((_, i) => (
                      <img src="/img/star.png" alt="" key={i} />
                    ))}
                  <span>{post.user.rating}</span>
                </div>
                {!chatExists ? (
                  <button onClick={initiateChat}>Contact Seller</button>
                ) : (
                  <button disabled>Chat Already Exists</button>
                )}
              </div>
            </div>
            <div className="itemActions">
              <img
                src={saved ? "/img/saved.png" : "/img/save.png"}
                alt=""
                onClick={handleSave}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
