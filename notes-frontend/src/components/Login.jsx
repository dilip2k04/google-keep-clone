import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { username, password });
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      alert("Login failed. Check username and password.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.title}>Welcome Back</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Sign In
        </button>

        <p style={styles.signupText}>
          Don't have an account?{" "}
          <span style={styles.signupLink} onClick={() => navigate("/register")}>
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  form: {
    backgroundColor: "#fff",
    padding: "50px 40px",
    borderRadius: "15px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
    width: "350px",
    textAlign: "center",
  },
  title: {
    marginBottom: "30px",
    color: "#333",
    fontSize: "28px",
    fontWeight: "600",
  },
  input: {
    width: "100%",
    padding: "14px 15px",
    margin: "12px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
    transition: "all 0.3s ease",
  },
  button: {
    width: "100%",
    padding: "14px",
    marginTop: "20px",
    backgroundColor: "#764ba2",
    color: "#fff",
    fontSize: "18px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  signupText: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#555",
  },
  signupLink: {
    color: "#764ba2",
    fontWeight: "600",
    cursor: "pointer",
  },
};
