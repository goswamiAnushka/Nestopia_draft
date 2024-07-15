import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiRequest from "../../lib/apiRequest";

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [typedText, setTypedText] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const text = "Create an Account";
    let index = 0;
    const intervalId = setInterval(() => {
      if (index <= text.length) {
        setTypedText(text.substring(0, index));
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 100); // Adjust typing speed here (milliseconds per character)

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>{typedText}</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg7.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
