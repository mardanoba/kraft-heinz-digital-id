import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/kraftheinz.webp";

// ✅ Set your deployed backend URL here
const API = "https://kraft-heinz-digital-id.onrender.com";

function DigitalIdPage() {
  const { workId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API}/api/user/work/${workId}`);
        if (!res.ok) throw new Error("User not found");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message || "Error fetching user");
      }
    };

    if (workId) fetchUser();
  }, [workId]);

  if (error)
    return (
      <div style={{
        minHeight:"100vh", display:"flex", justifyContent:"center", alignItems:"center",
        color:"red", fontWeight:"bold"
      }}>
        {error}
      </div>
    );

  if (!user)
    return (
      <div style={{
        minHeight:"100vh", display:"flex", justifyContent:"center", alignItems:"center"
      }}>
        Loading Digital ID...
      </div>
    );

  return (
    <div style={{
      minHeight:"100vh", display:"flex", flexDirection:"column",
      justifyContent:"center", alignItems:"center", padding:"20px",
      fontFamily:"Segoe UI, sans-serif"
    }}>
      {/* 🎉 CONGRATULATIONS MESSAGE */}
      <div style={{ marginBottom:"25px", textAlign:"center" }}>
        <h1 style={{ color:"#27ae60", marginBottom:"10px" }}>
          🎉 Congratulations {user.full_name}!
        </h1>
        <p style={{ fontSize:"16px", color:"#2c3e50" }}>
          You have been officially accepted at Kraft Heinz.
        </p>
      </div>

      {/* DIGITAL ID CARD */}
      <div style={{
        width:"100%", maxWidth:"700px", backgroundColor:"#ffffff",
        borderRadius:"12px", border:"1px solid #dcdcdc",
        boxShadow:"0 6px 18px rgba(0,0,0,0.15)", overflow:"hidden"
      }}>
        <div style={{
          backgroundColor:"#0B3C5D", color:"#ffffff", display:"flex",
          alignItems:"center", padding:"15px 20px", gap:"15px"
        }}>
          <img src={logo} alt="Kraft Heinz" style={{
            width:"60px", height:"60px", objectFit:"contain",
            backgroundColor:"#fff", borderRadius:"6px", padding:"5px"
          }} />
          <div>
            <h2 style={{ margin:0 }}>Kraft Heinz</h2>
            <p style={{ margin:0, fontSize:"14px" }}>Official Employee Digital ID</p>
          </div>
        </div>

        <div style={{ display:"flex", padding:"25px", gap:"25px" }}>
          {/* ✅ Show user photo if exists, otherwise a placeholder */}
          <img
            src={user.photo ? `${API}/uploads/${user.photo}` : "/images/user-placeholder.png"}
            alt={user.full_name}
            style={{ width:"160px", height:"200px", objectFit:"cover", borderRadius:"8px", border:"2px solid #0B3C5D" }}
          />

          <div style={{ flex:1, display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px 20px", fontSize:"15px" }}>
            <span><strong>Full Name:</strong></span>
            <span>{user.full_name}</span>

            <span><strong>Passport ID:</strong></span>
            <span>{user.passport_id}</span>

            <span><strong>Work ID:</strong></span>
            <span>{user.work_id}</span>

            <span><strong>Work Type:</strong></span>
            <span>{user.work_type}</span>

            <span><strong>Sex:</strong></span>
            <span>{user.sex}</span>
          </div>
        </div>

        <div style={{ borderTop:"1px solid #eee", padding:"12px 20px", fontSize:"13px", textAlign:"center", backgroundColor:"#fafafa" }}>
          This card is the property of Kraft Heinz. If found, return to company office.
        </div>
      </div>

      <button style={{
        marginTop:"25px", padding:"12px 30px", fontSize:"16px", fontWeight:"600",
        borderRadius:"8px", border:"none", cursor:"pointer",
        backgroundColor:"#0B3C5D", color:"#fff"
      }}
        onClick={() => window.print()}
      >
        Print Digital ID
      </button>
    </div>
  );
}

export default DigitalIdPage;