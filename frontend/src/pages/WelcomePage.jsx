// frontend/src/pages/WelcomePage.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function WelcomePage() {
  const [passportId, setPassportId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Get token from URL param if any (App.js uses :token)
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

    // If the page has a passport ID in URL, check it automatically
    if (paramPassportId) {
      checkStatus(paramPassportId);
    }
  }, [paramPassportId]);

  const checkStatus = async (idToCheck) => {
    if (!idToCheck) return setError("Please enter your Passport ID");

    try {
      const res = await fetch(`https://kraft-heinz-digital-id.onrender.com/api/user/passport/${idToCheck}`);
      if (!res.ok) throw new Error("User not found");
      const user = await res.json();

      // Navigate to congratulations page
      navigate(`/congratulation/${user.passport_id}`);
    } catch (err) {
      setError(err.message || "Error fetching user");
    }
  };

  const handleCheckStatus = () => {
    checkStatus(passportId);
  };

  // --- Styles ---
  const container = {
    width:"95%",
    maxWidth:"750px",
    backgroundColor:"#fff8e7",
    padding:"30px",
    borderRadius:"15px",
    boxShadow:"0 10px 25px rgba(0,0,0,0.2)",
    textAlign:"center",
    overflowY:"auto",
    maxHeight:"90vh",
    boxSizing:"border-box"
  };
  const header = { fontSize:"30px", fontWeight:"700", color:"#2C3E50", marginBottom:"20px" };
  const text = { fontSize:"16px", color:"#34495e", lineHeight:"1.7", marginBottom:"20px" };
  const section = { textAlign:"left", margin:"30px 0" };
  const subHeader = { color:"#2C3E50", marginBottom:"10px", fontWeight:"600" };
  const input = { width:"100%", maxWidth:"400px", padding:"12px", fontSize:"16px", borderRadius:"8px", border:"1px solid #2C3E50", outline:"none", marginBottom:"15px", transition:"0.3s border,0.3s box-shadow", boxSizing:"border-box" };
  const inputFocus = (e)=>{ e.target.style.borderColor="#1F618D"; e.target.style.boxShadow="0 0 8px rgba(31,97,141,0.4)"; };
  const inputBlur = (e)=>{ e.target.style.borderColor="#2C3E50"; e.target.style.boxShadow="none"; };
  const button = { padding:"12px 25px", fontSize:"16px", fontWeight:"600", borderRadius:"8px", border:"none", cursor:"pointer", backgroundColor:"#2980b9", color:"#fff", transition:"all 0.3s" };
  const hoverButton=(e)=>e.target.style.backgroundColor="#1F618D";
  const outButton=(e)=>e.target.style.backgroundColor="#2980b9";
  const errorStyle={color:"#c0392b", fontWeight:"bold", marginTop:"12px"};
  const imageStyle={ width:"100%", borderRadius:"10px", marginBottom:"20px", height:"auto", objectFit:"cover" };

  return (
    <div style={container}>
      <img src="/images/kraftheinz.webp" alt="Kraft Heinz" style={imageStyle}/>
      <h1 style={header}>Welcome to Kraft Heinz <img src="/images/caflag.webp" alt="Canada" width="40"/></h1>
      <p style={text}>This is your acceptance system. You can check your acceptance status below.</p>

      <div style={section}>
        <h2 style={subHeader}>About the Company</h2>
        <p style={text}>In Canada, Kraft Heinz emphasizes flavourful, high-quality products and a commitment to community engagement and sustainability. The company’s Canadian operations align with the global mission and vision, ensuring that local consumers experience the same trusted quality and innovation as worldwide.</p>
        <img src="/images/kraftheinz2.webp" alt="Mission" style={imageStyle}/>
        <h3 style={subHeader}>Mission</h3>
        <p style={text}>Kraft Heinz Canada’s mission emphasizes creating joy and memorable moments through food. The company focuses on providing high-quality, trusted products that consumers know and love, from iconic brands like Heinz, Kraft, and Oscar Mayer to a wide range of condiments, meals, and snacks. The mission reflects a consumer-centric approach, ensuring that every product contributes to enjoyable eating experiences while maintaining nutritional value and quality.</p>
        <img src="/images/kraftheinz3.jpg" alt="Vision" style={imageStyle}/>
        <h3 style={subHeader}>Vision</h3>
        <p style={text}>The company’s vision is to sustainably grow by delighting more consumers globally. This vision highlights three key pillars: Sustainable growth, Consumer delight, Global expansion.</p>
      </div>

      <input
        type="text"
        placeholder="Enter your Passport ID"
        value={passportId}
        onChange={(e)=>setPassportId(e.target.value)}
        onFocus={inputFocus}
        onBlur={inputBlur}
        style={input}
      />
      <button
        onClick={handleCheckStatus}
        style={button}
        onMouseOver={hoverButton}
        onMouseOut={outButton}
      >
        Check Status
      </button>

      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
}

export default WelcomePage;