// frontend/src/pages/DigitalIdPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/kraftheinz.webp";

function DigitalIdPage() {
  const { workId } = useParams(); // Must match the route param in App.js
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch user from backend using workId
        const res = await fetch(`https://kraft-heinz-digital-id.onrender.com/api/user/work/${workId}`);
        if (!res.ok) throw new Error("User not found");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message || "Error fetching user");
      }
    };
    if (workId) fetchUser(); // Only fetch if workId exists
  }, [workId]);

  /* ---------------- STYLES ---------------- */
  const pageStyle = {
    minHeight: "100vh",
    backgroundColor: "#f4f6f8",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Segoe UI, sans-serif",
    padding: "20px",
  };

  const idCard = {
    width: "100%",
    maxWidth: "700px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #dcdcdc",
    boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
    overflow: "hidden",
  };

  const header = {
    backgroundColor: "#0B3C5D",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    padding: "15px 20px",
    gap: "15px",
  };

  const logoStyle = {
    width: "60px",
    height: "60px",
    objectFit: "contain",
    backgroundColor: "#fff",
    borderRadius: "6px",
    padding: "5px",
  };

  const headerText = { textAlign: "left" };

  const body = { display: "flex", padding: "25px", gap: "25px" };

  const photoStyle = {
    width: "160px",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    border: "2px solid #0B3C5D",
  };

  const details = {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px 20px",
    fontSize: "15px",
    color: "#2c3e50",
  };

  const label = { fontWeight: "600", color: "#34495e" };

  const footer = {
    borderTop: "1px solid #eee",
    padding: "12px 20px",
    fontSize: "13px",
    color: "#555",
    textAlign: "center",
    backgroundColor: "#fafafa",
  };

  const buttonStyle = {
    marginTop: "25px",
    padding: "12px 30px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#0B3C5D",
    color: "#fff",
  };

  const hoverButton = (e) => (e.target.style.backgroundColor = "#07406a");
  const outButton = (e) => (e.target.style.backgroundColor = "#0B3C5D");

  /* ---------------- RENDER ---------------- */
  if (error)
    return (
      <div style={pageStyle}>
        <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
      </div>
    );

  if (!user)
    return (
      <div style={pageStyle}>
        <p>Loading Digital ID...</p>
      </div>
    );

  return (
    <div style={pageStyle}>
      <div style={idCard}>
        {/* HEADER */}
        <div style={header}>
          <img src={logo} alt="Kraft Heinz" style={logoStyle} />
          <div style={headerText}>
            <h2 style={{ margin: 0 }}>Kraft Heinz</h2>
            <p style={{ margin: 0, fontSize: "14px" }}>Official Employee Digital ID</p>
          </div>
        </div>

        {/* BODY */}
        <div style={body}>
          {user.photo && (
            <img
              src={`https://kraft-heinz-digital-id.onrender.com/uploads/${user.photo}`}
              alt={user.full_name}
              style={photoStyle}
            />
          )}
          <div style={details}>
            <span style={label}>Full Name</span>
            <span>{user.full_name}</span>
            <span style={label}>Passport ID</span>
            <span>{user.passport_id}</span>
            <span style={label}>Work ID</span>
            <span>{user.work_id}</span>
            <span style={label}>Work Type</span>
            <span>{user.work_type}</span>
            <span style={label}>Sex</span>
            <span>{user.sex}</span>
          </div>
        </div>

        {/* FOOTER */}
        <div style={footer}>
          This card is the property of Kraft Heinz. If found, please return to the company office.
        </div>
      </div>

      <button style={buttonStyle} onClick={() => window.print()} onMouseOver={hoverButton} onMouseOut={outButton}>
        Print Digital ID
      </button>
    </div>
  );
}

export default DigitalIdPage;