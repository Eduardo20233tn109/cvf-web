import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../config/env.js";

const CasaList = () => {
  const [casas, setCasas] = useState([]);

  useEffect(() => {
    fetch(API_ENDPOINTS.HOUSES)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setCasas(data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Estás seguro de que deseas eliminar esta casa?");
    if (!confirm) return;

    try {
      const res = await fetch(API_ENDPOINTS.DELETE_HOUSE(id), {
        method: "PUT",
      });

      const data = await res.json();
      if (data.ok) {
        alert("✅ Casa desactivada");
        setCasas(prev => prev.map(c => c._id === id ? { ...c, enabled: data.data.enabled } : c));
      } else {
        alert("Error al eliminar");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      {casas.map((casa) => (
        <div key={casa._id} style={{ border: "1px solid #ccc", padding: "1rem" }}>
          <h3>{casa.descripcion}</h3>
          <p>
            Dirección: {casa.calle}, {casa.ciudad}, {casa.codigoPostal}
          </p>
          {casa.imagen && (
            <img
              src={API_ENDPOINTS.UPLOADS(casa.imagen)}
              alt="Foto de la casa"
              style={{ width: "300px", borderRadius: "8px" }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CasaList;