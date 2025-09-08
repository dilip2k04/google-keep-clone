import React from "react";

export default function Navbar({ onLogout }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav style={styles.navbar}>
      <div style={styles.brand}>NotesApp</div>
      <div style={styles.userSection}>
        {user && <span style={styles.username}>Hello, {user.username}</span>}
        <button onClick={onLogout} style={styles.logoutBtn}>Logout</button>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 30px",
    backgroundColor: "#764ba2",
    color: "#fff",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  brand: {
    fontSize: "22px",
    fontWeight: "700",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  username: {
    fontSize: "16px",
    fontWeight: "500",
  },
  logoutBtn: {
    padding: "8px 16px",
    backgroundColor: "#fff",
    color: "#764ba2",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
};
