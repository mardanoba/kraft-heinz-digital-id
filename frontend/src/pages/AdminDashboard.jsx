import { useState } from "react";

export default function AdminDashboard() {
  const [formData, setFormData] = useState({
    full_name: "",
    passport_id: "",
    work_id: "",
    work_type: "",
    sex: "",
    photo: null,
  });

  const [link, setLink] = useState(""); // <-- store the link returned by backend
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "photo")
      setFormData({ ...formData, photo: e.target.files[0] });
    else
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch("https://kraft-heinz-digital-id.onrender.com/api/admin/add-user", {
        method: "POST",
        headers: { Authorization: "Bearer " + token },
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        setMessage(result.message);
        setLink(result.link); // <-- set the link here
        setFormData({
          full_name: "",
          passport_id: "",
          work_id: "",
          work_type: "",
          sex: "",
          photo: null,
        });
      } else {
        setMessage(result.message);
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Admin Dashboard</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
        /><br /><br />
        <input
          name="passport_id"
          placeholder="Passport ID"
          value={formData.passport_id}
          onChange={handleChange}
        /><br /><br />
        <input
          name="work_id"
          placeholder="Work ID"
          value={formData.work_id}
          onChange={handleChange}
        /><br /><br />
        <input
          name="work_type"
          placeholder="Work Type"
          value={formData.work_type}
          onChange={handleChange}
        /><br /><br />

        <select name="sex" value={formData.sex} onChange={handleChange}>
          <option value="">Select Sex</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <br /><br />

        <input type="file" name="photo" onChange={handleChange} />

        <br /><br />

        <button type="submit">Add User</button>
      </form>

      {/* Display message */}
      {message && <p style={{ fontWeight: "bold", marginTop: "10px" }}>{message}</p>}

      {/* Display link if it exists */}
      {link && (
        <p>
          Access Welcome Page:{" "}
          <a href={link} target="_blank" rel="noopener noreferrer">
            {link}
          </a>
        </p>
      )}
    </div>
  );
}