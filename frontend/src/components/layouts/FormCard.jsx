// FormCard.jsx
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./FormCard.css";

// Usa tu IP/host. Sin trailing slash.
const API_URL = (
  import.meta.env?.VITE_API_URL || "http://192.168.80.10:3000"
).replace(/\/$/, "");

// Debe coincidir con FileInterceptor('image') en NestJS
const FILE_FIELD_NAME = "image";

export default function FormCard({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    place_name: "",
    short_description: "",
    price_from: "",
    id_department: "",
    id_city: "",
    id_climate: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState([]);
  const [climates, setClimates] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Evita doble submit si el componente se re-renderiza
  const submittingRef = useRef(false);
  const log = (...a) => console.log("[FormCard]", ...a);

  useEffect(() => {
    const fetchData = async (endpoint, setter) => {
      try {
        const url = `${API_URL}/${endpoint}`;
        log("GET", url);
        const { data } = await axios.get(url);
        setter(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(`Error fetching ${endpoint}:`, err);
        setError((prev) => prev || `Failed to load ${endpoint}.`);
      }
    };
    fetchData("locations/departments", setDepartments);
    fetchData("climates", setClimates);
  }, []);

  useEffect(() => {
    if (!formData.id_department) {
      setCities([]);
      setFormData((f) => ({ ...f, id_city: "" }));
      return;
    }
    (async () => {
      try {
        const url = `${API_URL}/locations/cities/${formData.id_department}`;
        log("GET", url);
        const { data } = await axios.get(url);
        setCities(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching cities:", err);
        setError((prev) => prev || "Failed to load cities.");
      }
    })();
  }, [formData.id_department]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setPreviewImage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ⛔️ Guard anti-doble-submit
    if (submittingRef.current || loading) return;
    submittingRef.current = true;

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Validación mínima
      const required = [
        "place_name",
        "short_description",
        "price_from",
        "id_department",
        "id_city",
        "id_climate",
      ];
      for (const f of required) {
        if (!formData[f]) {
          setError(`Field "${f}" is required.`);
          return;
        }
      }

      const data = new FormData();
      data.append("place_name", formData.place_name);
      data.append("short_description", formData.short_description);
      data.append("price_from", Number(formData.price_from));
      data.append("id_department", Number(formData.id_department));
      data.append("id_city", Number(formData.id_city));
      data.append("id_climate", Number(formData.id_climate));
      if (imageFile) data.append(FILE_FIELD_NAME, imageFile); // "image"

      log("POST", `${API_URL}/places-recreationals`);
      for (const p of data.entries()) log("↪", p[0], p[1]);

      // Importante: multipart
      const res = await axios.post(`${API_URL}/places-recreationals`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("Place created successfully!");
      // 👉 No alerts, solo estado/UX. Deja al padre refrescar lista
      onSave?.(res.data);
      onClose?.();
    } catch (err) {
      const backend = err?.response?.data;
      console.error("Error creating place:", err, backend);

      // 👉 No alerts: mostramos el mensaje en la UI del formulario
      setError(
        backend?.message
          ? Array.isArray(backend.message)
            ? backend.message.join(", ")
            : backend.message
          : backend?.error || err.message
      );
    } finally {
      setLoading(false);
      submittingRef.current = false;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form-card"
      encType="multipart/form-data"
    >
      {previewImage && (
        <img src={previewImage} alt="preview" className="preview-img" />
      )}

      {error && <div className="form-message error-message">{error}</div>}
      {success && <div className="form-message success-message">{success}</div>}

      <div className="form-group">
        <label>Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      <div className="form-group">
        <label>Title</label>
        <input
          name="place_name"
          value={formData.place_name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="short_description"
          value={formData.short_description}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Price From</label>
        <input
          type="number"
          min="0"
          name="price_from"
          value={formData.price_from}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Department</label>
        <select
          name="id_department"
          value={formData.id_department}
          onChange={handleInputChange}
          required
        >
          <option value="">Select a department</option>
          {departments.map((d) => (
            <option key={d.id_department} value={d.id_department}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>City</label>
        <select
          name="id_city"
          value={formData.id_city}
          onChange={handleInputChange}
          required
          disabled={!formData.id_department || cities.length === 0}
        >
          <option value="">Select a city</option>
          {cities.map((c) => (
            <option key={c.id_city} value={c.id_city}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Climate</label>
        <select
          name="id_climate"
          value={formData.id_climate}
          onChange={handleInputChange}
          required
        >
          <option value="">Select a climate</option>
          {climates.map((cl) => (
            <option key={cl.id_climate} value={cl.id_climate}>
              {cl.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn-save" disabled={loading}>
        {loading ? "Creating..." : "Create Place"}
      </button>
    </form>
  );
}
