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

      // ✅ Redirect directly to Digital ID page
      navigate(`/digital-id/${user.work_id}`);
    } catch (err) {
      setError(err.message || "Error fetching user");
    }
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      
      {/* Header Logo */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <img
          src="/images/kraftheinz.webp"
          alt="Kraft Heinz"
          style={{ width: "200px", borderRadius: "10px" }}
        />
      </div>

      {/* Welcome Section */}
      <section style={{ textAlign: "center", margin: "40px 20px" }}>
        <h1 style={{ fontSize: "36px", color: "#2C3E50", marginBottom: "15px" }}>
          Welcome to Kraft Heinz
        </h1>
        <p style={{ fontSize: "18px", color: "#34495e", lineHeight: 1.6 }}>
          We are excited to have you on board! Explore our mission, vision, and values below.
        </p>
      </section>

      {/* Mission Section */}
      <section style={{ display: "flex", flexDirection: "row", gap: "20px", margin: "30px", flexWrap: "wrap", justifyContent: "center" }}>
        <div style={{ flex: "1 1 300px", textAlign: "center" }}>
          <img src="/images/mission.webp" alt="Mission" style={{ width: "100%", borderRadius: "10px" }} />
          <h3 style={{ marginTop: "10px", color: "#0B3C5D" }}>Our Mission</h3>
          <p>Delivering quality products that make a difference in people’s lives.</p>
        </div>
        <div style={{ flex: "1 1 300px", textAlign: "center" }}>
          <img src="/images/vision.webp" alt="Vision" style={{ width: "100%", borderRadius: "10px" }} />
          <h3 style={{ marginTop: "10px", color: "#0B3C5D" }}>Our Vision</h3>
          <p>Be the best food company in the world, for our people and communities.</p>
        </div>
      </section>

      {/* Passport ID Check */}
      <section style={{ textAlign: "center", margin: "50px 20px" }}>
        <p style={{ fontSize: "16px", color: "#34495e", marginBottom: "15px" }}>
          Enter your Passport ID to check your acceptance status.
        </p>
        <input
          type="text"
          placeholder="Enter your Passport ID"
          value={passportId}
          onChange={(e) => setPassportId(e.target.value)}
          style={{
            width: "250px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #2C3E50",
            marginRight: "10px",
          }}
        />
        <button
          onClick={checkStatus}
          style={{
            padding: "10px 20px",
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

        {error && (
          <p style={{ color: "#c0392b", fontWeight: "bold", marginTop: "12px" }}>
            {error}
          </p>
        )}
      </section>

      {/* About Company / Text Section */}
      <section style={{ margin: "40px 20px", textAlign: "center", lineHeight: 1.6, color: "#2c3e50" }}>
        <h2>About Kraft Heinz</h2>
        <p>
          Kraft Heinz is committed to providing high-quality food products that
          delight our consumers worldwide. We value innovation, integrity, and
          sustainability in everything we do.
        </p>
      </section>

    </div>
  );
}

export default WelcomePage;