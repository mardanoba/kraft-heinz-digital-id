import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/kraftheinz.webp";

const API = import.meta.env.VITE_API_URL;

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

  /* ... styles here ... */

  if (error) return <div style={{ minHeight:"100vh", display:"flex", justifyContent:"center", alignItems:"center", color:"red", fontWeight:"bold" }}>{error}</div>;
  if (!user) return <div style={{ minHeight:"100vh", display:"flex", justifyContent:"center", alignItems:"center" }}>Loading Digital ID...</div>;

  return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", fontFamily:"Segoe UI, sans-serif", padding:"20px" }}>
      <div style={{ width:"100%", maxWidth:"700px", backgroundColor:"#ffffff", borderRadius:"12px", border:"1px solid #dcdcdc", boxShadow:"0 6px 18px rgba(0,0,0,0.15)", overflow:"hidden" }}>
        <div style={{ backgroundColor:"#0B3C5D", color:"#ffffff", display:"flex", alignItems:"center", padding:"15px 20px", gap:"15px" }}>
          <img src={logo} alt="Kraft Heinz" style={{ width:"60px", height:"60px", objectFit:"contain", backgroundColor:"#fff", borderRadius:"6px", padding:"5px" }} />
          <div>
            <h2 style={{ margin:0 }}>Kraft Heinz</h2>
            <p style={{ margin:0, fontSize:"14px" }}>Official Employee Digital ID</p>
          </div>
        </div>

        <div style={{ display:"flex", padding:"25px", gap:"25px" }}>
          {user.photo && <img src={`${API}/uploads/${user.photo}`} alt={user.full_name} style={{ width:"160px", height:"200px", objectFit:"cover", borderRadius:"8px", border:"2px solid #0B3C5D" }}/>}
          <div style={{ flex:1, display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px 20px", fontSize:"15px", color:"#2c3e50" }}>
            <span style={{ fontWeight:"600", color:"#34495e" }}>Full Name</span>
            <span>{user.full_name}</span>
            <span style={{ fontWeight:"600", color:"#34495e" }}>Passport ID</span>
            <span>{user.passport_id}</span>
            <span style={{ fontWeight:"600", color:"#34495e" }}>Work ID</span>
            <span>{user.work_id}</span>
            <span style={{ fontWeight:"600", color:"#34495e" }}>Work Type</span>
            <span>{user.work_type}</span>
            <span style={{ fontWeight:"600", color:"#34495e" }}>Sex</span>
            <span>{user.sex}</span>
          </div>
        </div>

        <div style={{ borderTop:"1px solid #eee", padding:"12px 20px", fontSize:"13px", color:"#555", textAlign:"center", backgroundColor:"#fafafa" }}>
          This card is the property of Kraft Heinz. If found, please return to the company office.
        </div>
      </div>

      <button style={{ marginTop:"25px", padding:"12px 30px", fontSize:"16px", fontWeight:"600", borderRadius:"8px", border:"none", cursor:"pointer", backgroundColor:"#0B3C5D", color:"#fff" }}
        onClick={() => window.print()}
        onMouseOver={(e)=>e.target.style.backgroundColor="#07406a"}
        onMouseOut={(e)=>e.target.style.backgroundColor="#0B3C5D"}
      >
        Print Digital ID
      </button>
    </div>
  );
}

export default DigitalIdPage;