import { useState } from "react";
import { db } from "../firebase/firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

function SeniorCouncil() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    preference1: "",
    preference2: "",
    preference3: "",
    documents: [],
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    // Force lowercase for email input
    if (name === "email") {
      updatedValue = value.toLowerCase();
    }

    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    setFormData((prev) => ({ ...prev, documents: Array.from(files) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, contact, preference1, preference2, preference3, documents } = formData;

    if (!name || !email || !contact || !preference1 || !preference2 || !preference3) {
      alert("Please fill all fields and select all 3 preferences.");
      return;
    }

    if (
      preference1 === preference2 ||
      preference1 === preference3 ||
      preference2 === preference3
    ) {
      alert("All 3 preferences must be different.");
      return;
    }

    setUploading(true);

    try {
      const uploadedURLs = [];

      for (let file of documents) {
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);
        uploadFormData.append("upload_preset", "InterviewFiles"); // your Cloudinary preset
        uploadFormData.append(
          "folder",
          `interviews/senior/${name.trim().replace(/\s+/g, "_")}`
        );

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dc7gv02kk/raw/upload",
          {
            method: "POST",
            body: uploadFormData,
          }
        );

        const data = await res.json();

        if (!data.secure_url) {
          throw new Error(
            `Upload failed for ${file.name}: ${data.error?.message || "Unknown error"}`
          );
        }

        uploadedURLs.push({
          name: file.name,
          url: data.secure_url,
        });
      }

      const docId = `${name.trim().replace(/\s+/g, "_")}_${Date.now()}`;
      const docRef = doc(db, "seniorCouncilApplications", docId);
      await setDoc(docRef, {
        name,
        email,
        contact,
        preference1,
        preference2,
        preference3,
        documents: uploadedURLs,
        timestamp: new Date(),
      });

      alert("Application submitted successfully!");
      setFormData({
        name: "",
        email: "",
        contact: "",
        preference1: "",
        preference2: "",
        preference3: "",
        documents: [],
      });
      navigate("/dashboard");
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Something went wrong:\n\n" + (err.message || err));
    } finally {
      setUploading(false);
    }
  };

  const positions = [
    "President",
    "Vice President",
    "Secretary",
    "Treasurer",
    "Editor",
    "Director",
    "Sergeant-at-Arms",
  ];

  return (
    <div className="form-container">
      <h2>Senior Council Application</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email ID"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ textTransform: "lowercase" }}
          onKeyDown={(e) => {
            if (e.getModifierState("Shift") && e.key >= "A" && e.key <= "Z") {
              e.preventDefault(); // block Shift + Uppercase
            }
          }}
        />
        <input
          type="tel"
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleChange}
          required
        />

        <label>1st Preference</label>
        <select name="preference1" value={formData.preference1} onChange={handleChange} required>
          <option value="">-- Select Position --</option>
          {positions.map((pos) => (
            <option key={pos} value={pos}>
              {pos}
            </option>
          ))}
        </select>

        <label>2nd Preference</label>
        <select name="preference2" value={formData.preference2} onChange={handleChange} required>
          <option value="">-- Select Position --</option>
          {positions.map((pos) => (
            <option key={pos} value={pos}>
              {pos}
            </option>
          ))}
        </select>

        <label>3rd Preference</label>
        <select name="preference3" value={formData.preference3} onChange={handleChange} required>
          <option value="">-- Select Position --</option>
          {positions.map((pos) => (
            <option key={pos} value={pos}>
              {pos}
            </option>
          ))}
        </select>

        <label>Upload Documents (SOPs, Resume, etc.)</label>
        <input
          type="file"
          name="documents"
          multiple
          accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
          onChange={handleFileChange}
        />

        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}

export default SeniorCouncil;
