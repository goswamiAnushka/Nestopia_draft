import React, { useContext, useState } from "react";
import "./contact.scss";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Contact = () => {
  const { currentUser } = useContext(AuthContext);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8800/api/tickets", {
        userId: currentUser.id,
        category,
        description,
        feedback,
      });
      alert(`Ticket submitted successfully! Ticket ID: ${response.data.ticketNumber}`);
    } catch (error) {
      console.error("Error submitting ticket", error);
      alert("Failed to submit the ticket. Please try again later.");
    }
  };
  
  
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Issue Category
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select a category</option>
            <option value="website">Website</option>
            <option value="buyer-related">Buyer Related</option>
            <option value="seller-related">Seller Related</option>
            <option value="others">Others</option>
          </select>
        </label>
        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </label>
        <div className="feedback">
          <label>Feedback</label>
          <div className="emojis">
            <span className={feedback === "satisfied" ? "selected" : ""} onClick={() => setFeedback("satisfied")}>
              😊
            </span>
            <span className={feedback === "neutral" ? "selected" : ""} onClick={() => setFeedback("neutral")}>
              😐
            </span>
            <span className={feedback === "angry" ? "selected" : ""} onClick={() => setFeedback("angry")}>
              😡
            </span>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
