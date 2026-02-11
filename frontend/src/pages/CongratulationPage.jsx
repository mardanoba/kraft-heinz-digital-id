// frontend/src/pages/CongratulationPage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CongratulationPage() {
  // ✅ Match the route param name in App.js
  const { passportId } = useParams();
  const [user, setUser] = useState(null);
  const [workIdInput, setWorkIdInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!passportId) return;

        const res = await fetch(
          `https://kraft-heinz-digital-id.onrender.com/api/user/passport/${passportId}`
        );

        if (!res.ok) throw new Error("User not found");

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message || "Error fetching user");
      }
    };

    fetchUser();
  }, [passportId]);

  const handleCheckDigitalId = () => {
    if (!workIdInput) return setError("Please enter Work ID");
    navigate(`/digital-id/${workIdInput}`);
  };

  /* ---------------- STYLES ---------------- */
  const pageStyle = {
    minHeight: "100vh",
    backgroundColor: "#FFF8E7",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  };

  const container = {
    width: "100%",
    maxWidth: "650px",
    backgroundColor: "#fff8e7",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    textAlign: "center",
    margin: "10px",
  };

  const header = {
    fontSize: "28px",
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: "20px",
  };

  const photoStyle = {
    width: "100%",
    maxWidth: "200px",
    borderRadius: "10px",
    margin: "20px 0",
    border: "2px solid #2C3E50",
  };

  const detailStyle = {
    textAlign: "left",
    margin: "20px 0",
    color: "#34495e",
    fontSize: "16px",
    lineHeight: "1.6",
  };

  const input = {
    width: "100%",
    maxWidth: "300px",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #2C3E50",
    outline: "none",
    marginBottom: "10px",
  };

  const button = {
    padding: "12px 25px",
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#2980b9",
    color: "#fff",
    cursor: "pointer",
    marginTop: "10px",
  };

  const errorStyle = {
    color: "#c0392b",
    fontWeight: "bold",
    marginTop: "15px",
  };

  const hoverButton = (e) => (e.target.style.backgroundColor = "#1F618D");
  const outButton = (e) => (e.target.style.backgroundColor = "#2980b9");

  /* ---------------- RENDER ---------------- */
  if (error) {
    return (
      <div style={pageStyle}>
        <div style={container}>
          <h2 style={{ ...header, color: "#c0392b" }}>Error</h2>
          <p style={errorStyle}>{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={pageStyle}>
        <div style={container}>
          <p>Loading user details...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={container}>
        <h1 style={header}>Congratulations, {user.full_name}!</h1>
        <h2 style={{ color: "black" }}>
          You have been accepted to our company!
        </h2>

        {user.photo && (
          <img
            src={`https://kraft-heinz-digital-id.onrender.com/uploads/${user.photo}`}
            alt={user.full_name}
            style={photoStyle}
          />
        )}

        <div style={detailStyle}>
          <p><strong>Full Name:</strong> {user.full_name}</p>
          <p><strong>Passport ID:</strong> {user.passport_id}</p>
          <p><strong>Work ID:</strong> {user.work_id}</p>
          <p><strong>Work Type:</strong> {user.work_type}</p>
          <p><strong>Sex:</strong> {user.sex}</p>
        </div>

        <input
          type="text"
          placeholder="Enter your Work ID"
          value={workIdInput}
          onChange={(e) => setWorkIdInput(e.target.value)}
          style={input}
        />
        <br />
        <button
          onClick={handleCheckDigitalId}
          style={button}
          onMouseOver={hoverButton}
          onMouseOut={outButton}
        >
          Go
        </button>
      </div>
    </div>
  );
}

export default CongratulationPage;