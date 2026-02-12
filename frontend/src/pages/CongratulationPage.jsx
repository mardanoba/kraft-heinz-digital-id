import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function CongratulationPage() {
  const { passportId } = useParams(); 
  const [user, setUser] = useState(null);
  const [workIdInput, setWorkIdInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!passportId) return;

      const url = `${API}/api/user/passport/${passportId}`;
      console.log("Fetching user from:", url);

      try {
        const res = await fetch(url, { headers: { "Content-Type": "application/json" } });
        if (!res.ok) throw new Error("User not found");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Error fetching user");
      }
    };

    fetchUser();
  }, [passportId]);

  const handleCheckDigitalId = () => {
    if (!workIdInput) return setError("Please enter Work ID");
    navigate(`/digital-id/${workIdInput}`);
  };

  /* ... styles here ... */

  return user ? (
    <div style={{ minHeight:"100vh", display:"flex", justifyContent:"center", alignItems:"center", padding:"20px", backgroundColor:"#FFF8E7" }}>
      <div style={{ width:"100%", maxWidth:"650px", backgroundColor:"#fff8e7", padding:"30px", borderRadius:"15px", boxShadow:"0 10px 25px rgba(0,0,0,0.2)", textAlign:"center", margin:"10px" }}>
        <h1 style={{ fontSize:"28px", fontWeight:"700", color:"#2C3E50", marginBottom:"20px" }}>Congratulations, {user.full_name}!</h1>
        {user.photo && <img src={`${API}/uploads/${user.photo}`} alt={user.full_name} style={{ width:"100%", maxWidth:"200px", borderRadius:"10px", margin:"20px 0", border:"2px solid #2C3E50" }} />}
        <div style={{ textAlign:"left", margin:"20px 0", color:"#34495e", fontSize:"16px", lineHeight:"1.6" }}>
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
          onChange={(e)=>setWorkIdInput(e.target.value)}
          style={{ width:"100%", maxWidth:"300px", padding:"12px", fontSize:"16px", borderRadius:"8px", border:"1px solid #2C3E50", outline:"none", marginBottom:"10px" }}
        />
        <br />
        <button
          onClick={handleCheckDigitalId}
          style={{ padding:"12px 25px", fontSize:"16px", fontWeight:"600", border:"none", borderRadius:"8px", backgroundColor:"#2980b9", color:"#fff", cursor:"pointer", marginTop:"10px" }}
        >
          Go
        </button>
      </div>
    </div>
  ) : (
    <div style={{ minHeight:"100vh", display:"flex", justifyContent:"center", alignItems:"center", padding:"20px", backgroundColor:"#FFF8E7" }}>
      <div style={{ width:"100%", maxWidth:"650px", backgroundColor:"#fff8e7", padding:"30px", borderRadius:"15px", boxShadow:"0 10px 25px rgba(0,0,0,0.2)", textAlign:"center", margin:"10px" }}>
        {error ? <p style={{ color:"#c0392b", fontWeight:"bold", marginTop:"15px" }}>{error}</p> : <p>Loading user details...</p>}
      </div>
    </div>
  );
}

export default CongratulationPage;