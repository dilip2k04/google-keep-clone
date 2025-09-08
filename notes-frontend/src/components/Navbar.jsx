import React from "react";

export default function Navbar({ onLogout }) {
  return (
    <nav>
      <h2>Notes App</h2>
      <button onClick={onLogout}>Logout</button>
    </nav>
  );
}
