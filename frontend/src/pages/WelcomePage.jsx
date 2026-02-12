import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function WelcomePage() {
  const [passportId, setPassportId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { token: paramPassportId } = useParams();

  useEffect(() => {
    document.body.style.backgroundColor = "#FFF8E7";
    document.body.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    document.body.style.margin = 0;
    document.body.style.padding = 0;
    document.body.style.minHeight = "100vh";
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";

    if (paramPassportId) checkStatus(paramPassportId);
  }, [paramPassportId]);

  const checkStatus = async (idToCheck) => {
    if (!idToCheck) return setError("Please enter your Passport ID");

    try {
      const res = await fetch(`${API}/api/user/passport/${idToCheck}`);
      if (!res.ok) throw new Error("User not found");
      const user = await res.json();
      navigate(`/congratulation/${user.passport_id}`);
    } catch (err) {
      setError(err.message || "Error fetching user");
    }
  };

  const handleCheckStatus = () => checkStatus(passportId);

  /* ... styles here ... */

  return (
    <div style={{ width:"95%", maxWidth:"750px", backgroundColor:"#fff8e7", padding:"30px", borderRadius:"15px", boxShadow:"0 10px 25px rgba(0,0,0,0.2)", textAlign:"center", overflowY:"auto", maxHeight:"90vh", boxSizing:"border-box" }}>
      <img src="/images/kraftheinz.webp" alt="Kraft Heinz" style={{ width:"100%", borderRadius:"10px", marginBottom:"20px", height:"auto", objectFit:"cover" }}/>
      <h1 style={{ fontSize:"30px", fontWeight:"700", color:"#2C3E50", marginBottom:"20px" }}>Welcome to Kraft Heinz <img src="/images/caflag.webp" alt="Canada" width="40"/></h1>
      <p style={{ fontSize:"16px", color:"#34495e", lineHeight:"1.7", marginBottom:"20px" }}>This is your acceptance system. You can check your acceptance status below.</p>

      <input
        type="text"
        placeholder="Enter your Passport ID"
        value={passportId}
        onChange={(e)=>setPassportId(e.target.value)}
        style={{ width:"100%", maxWidth:"400px", padding:"12px", fontSize:"16px", borderRadius:"8px", border:"1px solid #2C3E50", outline:"none", marginBottom:"15px" }}
      />
      <button
        onClick={handleCheckStatus}
        style={{ padding:"12px 25px", fontSize:"16px", fontWeight:"600", borderRadius:"8px", border:"none", cursor:"pointer", backgroundColor:"#2980b9", color:"#fff", transition:"all 0.3s" }}
      >
        Check Status
      </button>

      {error && <p style={{ color:"#c0392b", fontWeight:"bold", marginTop:"12px" }}>{error}</p>}
    </div>
  );
}

export default WelcomePage;