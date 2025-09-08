import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Register({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", { username, password });
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(to right, #6a11cb, #2575fc)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <form
        onSubmit={handleRegister}
        style={{
          backgroundColor: "#ffffff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          width: "350px",
          display: "flex",
          flexDirection: "column",
          gap: "15px"
        }}
      >
        <h2 style={{ textAlign: "center", color: "#2575fc", marginBottom: "20px" }}>Create Account</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "14px",
            outline: "none",
            transition: "0.3s",
          }}
          onFocus={(e) => e.target.style.borderColor = "#2575fc"}
          onBlur={(e) => e.target.style.borderColor = "#ccc"}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "14px",
            outline: "none",
            transition: "0.3s",
          }}
          onFocus={(e) => e.target.style.borderColor = "#2575fc"}
          onBlur={(e) => e.target.style.borderColor = "#ccc"}
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#2575fc",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
            transition: "0.3s"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#6a11cb"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#2575fc"}
        >
          Register
        </button>

        <p style={{ textAlign: "center", fontSize: "14px", color: "#555" }}>
          Already have an account? <span style={{ color: "#2575fc", cursor: "pointer" }} onClick={() => navigate("/login")}>Login</span>
        </p>
      </form>
    </div>
  );
}
