// src/pages/WelcomePage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function WelcomePage() {
  const [passportId, setPassportId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const checkStatus = async () => {
    if (!passportId) return setError("Please enter your Passport ID");

    try {
      const res = await fetch(`${API}/api/user/passport/${passportId}`);
      if (!res.ok) throw new Error("User not found");

      const user = await res.json();

      // ✅ Redirect directly to Digital ID page using work_id
      navigate(`/digital-id/${user.work_id}`);
    } catch (err) {
      setError(err.message || "Error fetching user");
    }
  };

  return (
    <div
      style={{
        width: "95%",
        maxWidth: "750px",
        backgroundColor: "#fff8e7",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        textAlign: "center",
      }}
    >
      {/* Logo image */}
      <img
        src="/images/kraftheinz.webp"
        alt="Kraft Heinz"
        style={{ width: "100%", borderRadius: "10px", marginBottom: "20px" }}
      />

      {/* Heading */}
      <h1
        style={{
          fontSize: "30px",
          fontWeight: "700",
          color: "#2C3E50",
          marginBottom: "20px",
        }}
      >
        Welcome to Kraft Heinz
      </h1>

      {/* Instruction text */}
      <p style={{ fontSize: "16px", color: "#34495e", marginBottom: "20px" }}>
        Enter your Passport ID to check your acceptance status.
      </p>

      {/* Passport ID input */}
      <input
        type="text"
        placeholder="Enter your Passport ID"
        value={passportId}
        onChange={(e) => setPassportId(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "12px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #2C3E50",
          marginBottom: "15px",
        }}
      />

      {/* Check Status button */}
      <button
        onClick={checkStatus}
        style={{
          padding: "12px 25px",
          fontSize: "16px",
          fontWeight: "600",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          backgroundColor: "#2980b9",
          color: "#fff",
        }}
      >
        Check Status
      </button>

      {/* Error message */}
      {error && (
        <p style={{ color: "#c0392b", fontWeight: "bold", marginTop: "12px" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default WelcomePage;