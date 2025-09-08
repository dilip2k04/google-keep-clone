import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Register({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async e => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", { username, password });
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/");
    } catch (err) { alert("Registration failed"); }
  };

  return (
    <form onSubmit={handleRegister}>
      <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} required/>
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
      <button type="submit">Register</button>
    </form>
  );
}
