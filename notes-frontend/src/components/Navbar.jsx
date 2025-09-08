import React from "react";

export default function Navbar({ onLogout }) {
  return <nav>
    <button onClick={onLogout}>Logout</button>
  </nav>;
}
